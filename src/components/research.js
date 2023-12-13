import * as THREE from 'three'
import { randomNumber, getRandomInt } from '../functions.js'
const objectsDistance = 7

/**
 * Research Group
 */
const research = new THREE.Group()
const objects = new THREE.Group()

// Cubes
const parameter = {
  cubeCount: 7,
  sphereCount: 7,
  tetrahedronCount: 7
}

const colorBox = ['#f49e24', '#01a0e9', '#79bc29', '#e94e6d', '#e7378d', '#ffe501', '#6dc6d4']

const cubeGeometry = new THREE.BoxGeometry(1, 1, 1)
const sphereGeometry = new THREE.SphereGeometry(0.5, 10, 10)
const tetrahedronGeometry = new THREE.TetrahedronGeometry(1, 0)

const generateObjects = (count, geometry) => {

  for (let i = 0; i < count; i++) {

    const cubeSize = randomNumber(0.2, 0.4)

    const x = randomNumber(-4, 3)
    const y = - (randomNumber(objectsDistance * 0.00000001, objectsDistance * 0.5) - 1)
    const z = randomNumber(-5, 4)

    // Create the mesh
    const cube = new THREE.Mesh(
      geometry, 
      new THREE.MeshStandardMaterial({
        color: colorBox[getRandomInt(colorBox.length)]
      })
    )
    cube.scale.x = cubeSize
    cube.scale.y = cubeSize
    cube.scale.z = cubeSize

    cube.position.set(x, y, z)

    // Rotation
    cube.rotation.z = objectsDistance * 0.7 - Math.random() * objectsDistance * 5
    cube.rotation.y = objectsDistance * 0.7 - Math.random() * objectsDistance * 5

    cube.castShadow = true

    // Add to the cubes container
    objects.add(cube)
  }
}

generateObjects(parameter.cubeCount, cubeGeometry)
generateObjects(parameter.sphereCount, sphereGeometry)
generateObjects(parameter.tetrahedronCount, tetrahedronGeometry)

research.add(objects)

research.position.y = - objectsDistance * 1
research.position.x = - 4
research.castShadow = true

export default research
