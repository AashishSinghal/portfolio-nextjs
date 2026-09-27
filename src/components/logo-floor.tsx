import { useEffect, useLayoutEffect, useMemo, useRef } from "react"
import { Canvas, useFrame, useThree, type ThreeEvent } from "@react-three/fiber"
import * as THREE from "three"
import { BRICK_H, BRICK_W, LOGO_SIZE, logoBricks } from "@/lib/logo-bricks"

// The hero: the logo mark laid out as gold bricks on a floor, seen from above at an angle.
// Hovering (or tapping) a brick makes it jump and vibrate. Renders on demand: nothing is drawn
// while nothing moves.

// World units: one brick is 1 long, 0.5 deep (the PNG's 8×4 px cell), BRICK_HEIGHT tall
const BRICK_HEIGHT = 0.34
const MORTAR = 0.09

// The camera sits 42° above the floor, far enough away to fit the whole logo: 29 units on wide
// heroes, further back on narrow (phone) ones. It aims a little in front of the logo's centre,
// which lifts the logo in the frame and clears the avatar overlapping the bottom-left corner.
const ELEVATION = (42 * Math.PI) / 180
const cameraDistance = (aspect: number) => Math.max(29, 50 / aspect)
const LOOK_AT = [0, 0, 1.6] as const

const bricks = (() => {
  const raw = logoBricks.flatMap(([row, lefts]) =>
    lefts.map((left) => {
      const x0 = Math.max(0, left)
      const x1 = Math.min(LOGO_SIZE, left + BRICK_W)
      return {
        x: (x0 + x1) / 2 / BRICK_W,
        z: ((row + 0.5) * BRICK_H) / BRICK_W,
        length: (x1 - x0) / BRICK_W,
      }
    })
  )
  // Centre the logo on the origin
  const xs = raw.map((b) => b.x)
  const zs = raw.map((b) => b.z)
  const cx = (Math.min(...xs) + Math.max(...xs)) / 2
  const cz = (Math.min(...zs) + Math.max(...zs)) / 2
  return raw.map((b) => ({ ...b, x: b.x - cx, z: b.z - cz }))
})()

function Bricks({ still }: { still: boolean }) {
  const mesh = useRef<THREE.InstancedMesh>(null)
  const shake = useRef(new Float32Array(bricks.length))
  const phase = useMemo(() => bricks.map(() => Math.random() * Math.PI * 2), [])
  const dummy = useMemo(() => new THREE.Object3D(), [])
  const invalidate = useThree((state) => state.invalidate)

  const place = (i: number, t: number) => {
    const brick = bricks[i]
    const s = shake.current[i]
    const p = phase[i]
    dummy.position.set(
      brick.x + Math.sin(t * 70 + p) * 0.045 * s,
      BRICK_HEIGHT / 2 + s * 0.22,
      brick.z + Math.cos(t * 61 + p) * 0.03 * s
    )
    dummy.rotation.set(
      Math.sin(t * 83 + p) * 0.05 * s,
      Math.sin(t * 57 + p) * 0.08 * s,
      Math.sin(t * 75 + p) * 0.06 * s
    )
    dummy.scale.set(brick.length - MORTAR, 1, 1)
    dummy.updateMatrix()
    mesh.current!.setMatrixAt(i, dummy.matrix)
  }

  useLayoutEffect(() => {
    const instanced = mesh.current!
    const color = new THREE.Color()
    bricks.forEach((_, i) => {
      place(i, 0)
      // Each brick a slightly different shade of the logo gold
      color
        .set("#c49d71")
        .offsetHSL(
          (Math.random() - 0.5) * 0.02,
          (Math.random() - 0.5) * 0.1,
          (Math.random() - 0.5) * 0.1
        )
      instanced.setColorAt(i, color)
    })
    instanced.instanceMatrix.needsUpdate = true
    if (instanced.instanceColor) instanced.instanceColor.needsUpdate = true
    instanced.computeBoundingSphere()
    invalidate()
    // Runs once: place() only reads refs and the static brick list
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    let moving = false
    let changed = false
    shake.current.forEach((s, i) => {
      if (s === 0) return
      const next = s * 0.93
      shake.current[i] = next < 0.01 ? 0 : next
      place(i, t)
      changed = true
      if (next >= 0.01) moving = true
    })
    if (changed) mesh.current!.instanceMatrix.needsUpdate = true
    if (moving) invalidate()
  })

  const hit = (event: ThreeEvent<PointerEvent>) => {
    if (still || event.instanceId === undefined) return
    event.stopPropagation()
    shake.current[event.instanceId] = 1
    invalidate()
  }

  return (
    <instancedMesh
      ref={mesh}
      args={[undefined, undefined, bricks.length]}
      castShadow
      receiveShadow
      onPointerMove={hit}
      onPointerDown={hit}
    >
      <boxGeometry args={[1, BRICK_HEIGHT, 0.5 - MORTAR]} />
      <meshStandardMaterial roughness={0.55} metalness={0.2} />
    </instancedMesh>
  )
}

// The camera drifts a little with the mouse (desktop only) for a sense of depth
function CameraRig({ still }: { still: boolean }) {
  const camera = useThree((state) => state.camera)
  const aspect = useThree((state) => state.size.width / state.size.height)
  const invalidate = useThree((state) => state.invalidate)
  const target = useRef({ x: 0, y: 0 })

  useEffect(() => {
    if (still || !window.matchMedia("(pointer: fine)").matches) return
    const onMove = (event: PointerEvent) => {
      target.current = {
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: (event.clientY / window.innerHeight) * 2 - 1,
      }
      invalidate()
    }
    window.addEventListener("pointermove", onMove)
    return () => window.removeEventListener("pointermove", onMove)
  }, [still, invalidate])

  useFrame(() => {
    const distance = cameraDistance(aspect)
    const x = target.current.x * 2.2
    const y = distance * Math.sin(ELEVATION)
    const z = distance * Math.cos(ELEVATION) + target.current.y * 1.2
    const dx = x - camera.position.x
    const dy = y - camera.position.y
    const dz = z - camera.position.z
    if (Math.abs(dx) + Math.abs(dy) + Math.abs(dz) < 0.001) return
    camera.position.x += dx * 0.06
    camera.position.y += dy * 0.06
    camera.position.z += dz * 0.06
    camera.lookAt(...LOOK_AT)
    invalidate()
  })

  return null
}

export default function LogoFloor() {
  const still = useMemo(() => window.matchMedia("(prefers-reduced-motion: reduce)").matches, [])

  return (
    <Canvas
      frameloop="demand"
      shadows
      dpr={[1, 2]}
      camera={{ position: [0, 29 * Math.sin(ELEVATION), 29 * Math.cos(ELEVATION)], fov: 30 }}
      onCreated={({ camera }) => camera.lookAt(...LOOK_AT)}
      gl={{ antialias: true, alpha: true }}
      aria-label="The logo mark, built from gold bricks lying on the floor. Hover a brick to shake it."
      role="img"
    >
      <ambientLight intensity={0.55} />
      <hemisphereLight args={["#fff4e6", "#0a0a0a", 0.6]} />
      <directionalLight
        position={[-7, 14, 8]}
        intensity={2.2}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-left={-14}
        shadow-camera-right={14}
        shadow-camera-top={14}
        shadow-camera-bottom={-14}
      />
      <Bricks still={still} />
      {/* The floor: invisible except for the bricks' shadows */}
      <mesh rotation-x={-Math.PI / 2} receiveShadow>
        <planeGeometry args={[120, 120]} />
        <shadowMaterial opacity={0.55} />
      </mesh>
      <CameraRig still={still} />
    </Canvas>
  )
}
