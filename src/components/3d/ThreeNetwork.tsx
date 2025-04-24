import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'

const ThreeNetwork = () => {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!mountRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })

    const resizeRenderer = () => {
      if (!mountRef.current) return
      const width = mountRef.current.offsetWidth
      const height = mountRef.current.offsetHeight
      renderer.setSize(width, height)
      camera.aspect = width / height
      camera.updateProjectionMatrix()
    }

    // Attach renderer to DOM
    resizeRenderer()
    mountRef.current.appendChild(renderer.domElement)

    // Create network structure
    const networkGroup = new THREE.Group()
    scene.add(networkGroup)

    const nodeGeometry = new THREE.SphereGeometry(0.25, 32, 32)
    const nodeMaterial = new THREE.MeshPhongMaterial({
      color: 0xa855f7,
      emissive: 0x9333ea,
      emissiveIntensity: 0.3,
      shininess: 90,
    })

    const nodes: THREE.Mesh[] = []
    const nodePositions = [
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(-2, 2, -2),
      new THREE.Vector3(2, -2, -1),
      new THREE.Vector3(-2, -1, 2),
      new THREE.Vector3(2, 2, 1),
      new THREE.Vector3(0, 3, -2),
      new THREE.Vector3(-1, -2, -2),
    ]

    nodePositions.forEach((position, index) => {
      const node = new THREE.Mesh(nodeGeometry, nodeMaterial)
      node.position.copy(position)
      if (index === 0) node.scale.setScalar(1.5)
      nodes.push(node)
      networkGroup.add(node)
    })

    const connectionMaterial = new THREE.LineBasicMaterial({
      color: 0x9333ea,
      transparent: true,
      opacity: 0.6,
    })

    nodes.forEach((node, i) => {
      if (i === 0) return
      const geometry = new THREE.BufferGeometry().setFromPoints([
        nodes[0].position,
        node.position,
      ])
      const line = new THREE.Line(geometry, connectionMaterial)
      networkGroup.add(line)
    })

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
    scene.add(ambientLight)

    const pointLight = new THREE.PointLight(0xaa00ff, 1)
    pointLight.position.set(5, 5, 5)
    scene.add(pointLight)

    camera.position.z = 8
    camera.position.y = 2
    camera.lookAt(0, 0, 0)

    let frame = 0
    const animate = () => {
      frame = requestAnimationFrame(animate)
      networkGroup.rotation.y += 0.005
      networkGroup.rotation.x = Math.sin(Date.now() * 0.001) * 0.2

      nodes.forEach((node, i) => {
        const scale = i === 0 ? 1.5 : 1
        node.scale.setScalar(scale + Math.sin(Date.now() * 0.002 + i) * 0.1)
      })

      renderer.render(scene, camera)
    }
    animate()

    // ResizeObserver for dynamic responsiveness
    const resizeObserver = new ResizeObserver(resizeRenderer)
    resizeObserver.observe(mountRef.current)

    return () => {
      resizeObserver.disconnect()
      cancelAnimationFrame(frame)
      mountRef.current?.removeChild(renderer.domElement)
      scene.clear()
    }
  }, [])

  return (
    <div
      ref={mountRef}
      className="w-full h-full relative"
    />
  )
}

export default ThreeNetwork
