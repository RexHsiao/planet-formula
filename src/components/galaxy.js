import * as THREE from 'three'

/**
 * Texture
 */
const textureLoader = new THREE.TextureLoader()
const particlesTexture = textureLoader.load('/textures/particles/1.png')
particlesTexture.magFilter = THREE.NearestFilter

/**
 * Galaxy
 */
const galaxyParameters = {}
galaxyParameters.count = 100000
galaxyParameters.size = 0.03
galaxyParameters.radius = 5
galaxyParameters.branches = 4
galaxyParameters.spin = 1
galaxyParameters.randomness = 0.3
galaxyParameters.randomnessPower = 2.35
galaxyParameters.insideColor = '#ff6030'
galaxyParameters.outsideColor = '#1b3984'

// Geometry
const galaxyPositions = new Float32Array(galaxyParameters.count * 3)

const colors = new Float32Array(galaxyParameters.count * 3)
    
const colorInside = new THREE.Color(galaxyParameters.insideColor)
const colorOutside = new THREE.Color(galaxyParameters.outsideColor)

for(let i = 0; i < galaxyParameters.count; i++){

    // Position
    const radius = Math.random() * galaxyParameters.radius
    const spinAngle = radius * galaxyParameters.spin
    const branchAngle = (i % galaxyParameters.branches) / galaxyParameters.branches * Math.PI * 2

    const randomX = Math.pow(Math.random(), galaxyParameters.randomnessPower) * (Math.random() > 0.5 ? 1 : -1)
    const randomY = Math.pow(Math.random(), galaxyParameters.randomnessPower) * (Math.random() > 0.5 ? 1 : -1)
    const randomZ = Math.pow(Math.random(), galaxyParameters.randomnessPower) * (Math.random() > 0.5 ? 1 : -1)
    
    galaxyPositions[i * 3 + 0] = Math.cos(branchAngle + spinAngle) * radius + randomX
    galaxyPositions[i * 3 + 1] = Math.sin(branchAngle + spinAngle) * radius + randomZ
    galaxyPositions[i * 3 + 2] = randomY

    // Color
    const mixedColor = colorInside.clone()
    mixedColor.lerp(colorOutside, radius / galaxyParameters.radius)

    colors[i * 3 + 0] = mixedColor.r
    colors[i * 3 + 1] = mixedColor.g
    colors[i * 3 + 2] = mixedColor.b
}

const galaxyGeometry = new THREE.BufferGeometry()

galaxyGeometry.setAttribute(
    'position', 
    new THREE.BufferAttribute(galaxyPositions, 3)
)

galaxyGeometry.setAttribute(
    'color',
    new THREE.BufferAttribute(colors, 3)
)

const galaxyMaterial = new THREE.PointsMaterial({
    size: galaxyParameters.size,
    sizeAttenuation: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    vertexColors: true,
    alphaMap: particlesTexture
})

// Galaxy
const galaxy = new THREE.Points(galaxyGeometry, galaxyMaterial)

galaxy.position.x = 4
galaxy.position.y = .5

export default galaxy

