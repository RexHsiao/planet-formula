import * as THREE from 'three'

const objectsDistance = 7
const parameters = {
  materialColor: '#ffeded'
}


/**
   * Texture
   */
const textureLoader = new THREE.TextureLoader()
const particlesTexture = textureLoader.load('/textures/particles/1.png')
particlesTexture.magFilter = THREE.NearestFilter

/**
 * Particles
 */
// Geometry
const particlesCount = 1000
const positions = new Float32Array(particlesCount * 3)

for(let i = 0; i < particlesCount; i++){
    positions[i * 3 + 0] = (Math.random() - 0.5) * 20
    positions[i * 3 + 1] = objectsDistance * 0.7 - Math.random() * objectsDistance * 5
    positions[i * 3 + 2] = (Math.random() - 0.5) * 20
}

const particlesGeometry = new THREE.BufferGeometry()
particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))

const particlesMaterial = new THREE.PointsMaterial({
    color: parameters.materialColor,
    sizeAttenuation: true,
    size: 0.03,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    alphaMap: particlesTexture
})

// Points
const particles = new THREE.Points(particlesGeometry, particlesMaterial)


export default particles