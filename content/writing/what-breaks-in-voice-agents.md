---
title: What actually breaks when you build a voice agent
date: 2026-09-25
summary: I spent a week on an interruptible voice agent, and almost nothing that broke was the model.
draft: true
---

I built a voice agent last week. Speech in, speech out, over a WebSocket. It transcribes what you say, streams a reply from an LLM, and synthesises that reply one sentence at a time so you hear the first sentence while the rest is still being written.

Wiring up the model took an afternoon. Everything else took the week.

That surprised me. A voice conversation is a real-time system with an LLM somewhere in the middle, and the LLM turned out to be the most reliable part of it. Here is what actually went wrong.

## Whisper does not return nothing for silence

The agent kept hearing "Thank you." I had not said anything.

Whisper is trained on subtitled video. Hand it a few seconds of room tone and it does not return an empty string. It returns caption boilerplate. "Thank you." "Thanks for watching." Those became real conversational turns, and the agent answered them.

```
11.28s server transcript {"ms":483,"text":"Thank you.","bytes":170312}
```

I now guard this in two places. The client will not send a clip containing less than 300 ms of audible speech, and the server rejects the known artefacts when they arrive on a short clip. Someone genuinely saying thank you in a longer sentence is left alone.

Recognising the artefact is much cheaper than trying to stop the model producing it.

## Six recorders were running at once

The real reason Whisper kept seeing silence was worse.

I record continuously and flush a clip when you stop talking. `MediaRecorder.onstop` is asynchronous, and my stop handler cleared the recorder reference unconditionally. By the time it ran, the replacement recorder had already started. Clearing the reference orphaned it. It kept capturing forever, and the next cycle created another one.

I only found it because every orphan flushed at once when I hung up:

```
119.93s audio recording ready {"bytes":1756582}
119.93s audio recording ready {"bytes":1407822}
119.93s audio recording ready {"bytes":1043640}
119.93s audio recording ready {"bytes":792448}
119.93s audio recording ready {"bytes":451418}
119.93s audio recording ready {"bytes":116216}
```

Six recorders, each started at a different moment. Their transcripts contained the speech that had been going missing all week. The clip actually being sent was usually a fresh, nearly empty buffer, which is what Whisper was turning into "Thank you."

A shared discard flag had the same problem. The restart reset it before the old handler read it, so clips I had explicitly thrown away were sent anyway. Both fixes come down to the same rule: state that belongs to one recording has to live with that recording, not in a variable the next one can touch.

## A threshold that could never be crossed

For a while the agent only heard me if I shouted.

I was measuring loudness as the mean of `getByteFrequencyData`. That array is mostly high-frequency bins, and speech has almost no energy up there, so the average reads somewhere around 5 to 20 even when you are talking loudly. My speech threshold was 45. It was not a bad guess. It was an unreachable number.

Time-domain RMS gives a figure that means something: roughly 0.005 in a quiet room, 0.05 to 0.3 for normal speech.

Then I stopped hardcoding it. Microphone gain varies by an order of magnitude across machines, so a level that is obviously speech on one laptop sits below the noise floor on another. The agent now estimates the noise floor from a low percentile of recent frames and sets its thresholds as multiples of that. A percentile rather than a mean, so the estimate survives someone talking through the calibration.

## The first word is already gone

Then the transcripts started arriving with their beginnings missing. "Explain software engineering" came through as "engineering."

Detection needs about 250 ms of sustained sound before it can be confident you are speaking, and nobody starts a sentence at full volume. By the time the detector fires, the first word is over. In one recording the microphone started 640 ms after I did.

You cannot fix this by lowering the threshold, because the audio was never captured. The microphone has to be recording before you know anyone is talking. So it records for the whole call, and when a clip is sent the server trims back to 700 ms before the detected onset. The trim is a stream copy, which does no signal processing at all.

## Not every interruption is an interruption

Saying "mhm" while the agent talks should not stop it. Asking a question should.

You cannot tell those apart from the audio alone, and the words only exist after transcription. So the agent pauses rather than cancelling. It holds playback, transcribes the interruption, classifies it, and then either resumes from the exact pause point or commits to stopping.

The classifier is a set lookup, not a model call. It sits on the critical path between you speaking and the agent reacting, so it has to be instant and predictable. A model call there would add hundreds of milliseconds to the one measurement that matters most.

## The agent has to know what you heard

When you interrupt, the agent has usually generated more than it managed to say out loud.

My first version put the whole generated response into the conversation history. So the model believed it had said three sentences when you had only heard one, and the next turn referred back to things that were never spoken.

History now records only the sentences that finished playing, flagged as interrupted. What it never got to say is kept separately, which means you can come back later and ask it to continue, and it can.

## The watchdog cut off a 26-second answer

I added a watchdog to recover calls that got stuck. It recovers any busy state that stops making progress after 20 seconds.

Then it cut the agent off mid-sentence during a perfectly healthy answer.

The reply was 26 seconds of audio across three chunks. The server sent the last chunk, and then the browser spent 20 seconds playing it. During playback the client sends nothing at all, so from the server's side a long answer and a wedged call look identical.

The client now sends a heartbeat every four seconds while audio is playing. That was the missing signal.

## The free tier was never short of memory

I deployed to a free instance and measured memory carefully. Peak 343 MB against a 512 MB limit, 169 MB of headroom, no OOM. It passed.

Then a single turn took 104 seconds.

| | Local | Free tier |
| --- | --- | --- |
| LLM first token | 440 ms | 365 ms |
| ffmpeg convert | 120 ms | 5,200 ms |
| Local speech synthesis | 560 ms | 28,900 ms |

The instance has 0.1 vCPU. Anything computed on the box ran 25 to 50 times slower. Anything behind an API was unaffected, which is why the LLM looks fine in that table.

I had stress-tested the wrong resource. Memory was never the constraint and I never measured the one that was.

The fix was to stop computing on that box. Synthesis moved to a hosted API. The audio transcode disappeared entirely once I checked that Whisper accepts the browser's webm directly, so a clip that needs no trim is now forwarded untouched. Time to first audio went from 28,873 ms to 1,233 ms.

## What the caller actually feels

Two numbers matter, and they are not the same number.

The agent going quiet when you interrupt takes about 250 ms, because pausing does not wait for the transcript. That already feels immediate.

The agent *deciding* what to do takes about a second longer, because classifying an interruption needs the words, and the words need you to stop talking. The endpointing window is the largest controllable cost in that second, so over-speech uses a tighter one (450 ms) than a normal turn (900 ms). While the agent is paused, every millisecond is dead air.

> If reaction time is over a second, cut the endpointing window before you touch the model.

## None of this was visible until the logs were

Almost every bug above was found in an exported diagnostic file rather than by reasoning about the code.

A voice agent fails in ways a screenshot cannot show: a threshold that was never crossed, an event that arrived in the wrong order, audio that was sent but never transcribed. The recorder captures client events, socket traffic in both directions, the microphone level over time, and every line the server prints, all in one interleaved timeline you can export and read somewhere else.

```
68.32s vad        speech start {"rms":0.0421,"threshold":0.0163,"floor":0.0054}
68.32s audio      playback paused {"queued":0}
68.32s socket-out barge:detected {"turnId":2,"chunksPlayed":1}
68.65s server     [uKpOOw] <- barge:detected turnId=2 chunksPlayed=1
68.66s server     ⏸  Barge on turn 2 after 1 chunks
```

Client and server in the same file, ordered by time. Correlating two separate logs by hand would have hidden most of these.

## What I'd tell myself

Build the diagnostics before the features. I added the exportable log about halfway through, and every bug after that point took minutes instead of days.

Measure the constraint you actually have, not the one you expect. I tested memory thoroughly and shipped something 50 times too slow.

And do not assume the model is the risky part. It was the only component I never had to debug.

The code is at [github.com/AashishSinghal/voice-agent-demo](https://github.com/AashishSinghal/voice-agent-demo).
