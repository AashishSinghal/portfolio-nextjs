<!--
LinkedIn draft. Not part of the site.
Intended blog path once published: /writing/what-breaks-in-voice-agents
Replace [link] below with the live URL before posting.
-->

My voice agent kept replying to things I had not said. It was hearing "Thank you."

Whisper is trained on subtitled video. Give it a few seconds of room tone and it does not return an empty string, it returns caption boilerplate. Those became real conversational turns, and the agent answered them.

That was one of a week's worth of failures, and almost none of them were the model. Wiring up the LLM took an afternoon. The infrastructure around it took the week.

A few of the others:

- Six MediaRecorders were running at once. `onstop` is asynchronous, and my cleanup cleared the reference to a recorder that had already been replaced, orphaning it every cycle.
- The agent only heard me if I shouted. I was measuring loudness as an average over frequency bins, which reads about 5 to 20 even for loud speech. My threshold was 45.
- I deployed to a free instance, measured memory carefully, and passed with 169 MB of headroom. Then one turn took 104 seconds. The constraint was 0.1 vCPU, which I had never measured.

The fix for most of this was not cleverness, it was visibility. Once client events, socket traffic and server logs landed in one exportable timeline, bugs that had taken days started taking minutes.

Full write-up, with the numbers and the log excerpts: [link]

Code: https://github.com/AashishSinghal/voice-agent-demo

#VoiceAI #AIEngineering
