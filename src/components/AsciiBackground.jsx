import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function AsciiBackground() {
  const containerRef = useRef(null)
  const rendererRef = useRef(null)
  const frameRef = useRef(0)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Scene setup
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.z = 30

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.domElement.style.width = '100%'
    renderer.domElement.style.height = '100%'
    renderer.domElement.style.display = 'block'
    container.appendChild(renderer.domElement)
    rendererRef.current = renderer

    // Create ASCII-like text geometry using particles
    const chars = ['@', '#', '$', '%', '&', '*', '+', '=', '~', '^', 'S', 'I', 'K']
    const particles = []
    const particleCount = 800
    
    const geometry = new THREE.BufferGeometry()
    const positions = new Float32Array(particleCount * 3)
    const colors = new Float32Array(particleCount * 3)
    const sizes = new Float32Array(particleCount)

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3
      positions[i3] = (Math.random() - 0.5) * 80
      positions[i3 + 1] = (Math.random() - 0.5) * 60
      positions[i3 + 2] = (Math.random() - 0.5) * 40

      // Gradient from teal to purple
      const t = Math.random()
      colors[i3] = t * 0.08 + (1 - t) * 0.6     // R
      colors[i3 + 1] = t * 0.95 + (1 - t) * 0.27 // G
      colors[i3 + 2] = t * 0.58 + (1 - t) * 1.0  // B

      sizes[i] = Math.random() * 2 + 0.5
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1))

    // Custom shader for ASCII-like particles
    const material = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) }
      },
      vertexShader: `
        attribute float size;
        attribute vec3 color;
        varying vec3 vColor;
        uniform float uTime;
        
        void main() {
          vColor = color;
          vec3 pos = position;
          pos.y += sin(uTime * 0.5 + position.x * 0.1) * 2.0;
          pos.x += cos(uTime * 0.3 + position.y * 0.1) * 1.0;
          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
          gl_PointSize = size * uPixelRatio * (30.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        
        void main() {
          float dist = length(gl_PointCoord - vec2(0.5));
          if (dist > 0.5) discard;
          float alpha = 1.0 - smoothstep(0.3, 0.5, dist);
          gl_FragColor = vec4(vColor, alpha * 0.6);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    })

    const points = new THREE.Points(geometry, material)
    scene.add(points)

    // Add wireframe Solana S shape
    const shapeGroup = new THREE.Group()
    
    // Create S-like curve using tube geometry
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-8, 8, 0),
      new THREE.Vector3(-4, 8, 2),
      new THREE.Vector3(0, 4, 0),
      new THREE.Vector3(-4, 0, -2),
      new THREE.Vector3(0, -4, 0),
      new THREE.Vector3(4, -8, 2),
      new THREE.Vector3(8, -8, 0),
    ])
    
    const tubeGeo = new THREE.TubeGeometry(curve, 64, 0.3, 8, false)
    const tubeMat = new THREE.MeshBasicMaterial({
      color: 0x14f195,
      transparent: true,
      opacity: 0.15,
      wireframe: true
    })
    const tube = new THREE.Mesh(tubeGeo, tubeMat)
    shapeGroup.add(tube)
    
    // Add secondary wireframe
    const tubeMat2 = new THREE.MeshBasicMaterial({
      color: 0x9945ff,
      transparent: true,
      opacity: 0.1,
      wireframe: true
    })
    const tube2 = new THREE.Mesh(tubeGeo, tubeMat2)
    tube2.scale.set(1.1, 1.1, 1.1)
    shapeGroup.add(tube2)
    
    scene.add(shapeGroup)

    // Animation
    let time = 0
    const animate = () => {
      frameRef.current = requestAnimationFrame(animate)
      time += 0.01
      
      material.uniforms.uTime.value = time
      shapeGroup.rotation.y = time * 0.2
      shapeGroup.rotation.x = Math.sin(time * 0.3) * 0.1
      
      renderer.render(scene, camera)
    }
    animate()

    // Resize handler
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
      material.uniforms.uPixelRatio.value = Math.min(window.devicePixelRatio, 2)
    }
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(frameRef.current)
      renderer.dispose()
      geometry.dispose()
      material.dispose()
      tubeGeo.dispose()
      tubeMat.dispose()
      tubeMat2.dispose()
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
    }
  }, [])

  return (
    <div 
      ref={containerRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
        opacity: 0.7
      }}
    />
  )
}
