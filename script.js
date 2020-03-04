let camera
let controls
let renderer
let scene
let mesh

function init() {
    container = document.querySelector('#container')

    scene = new THREE.Scene()
    scene.background = new THREE.Color(0xccccff)

    createCamera()
    createControls()
    createLights()

    createFox()
    createFloor()

    createIntroduce()
    // createMeshes()
    createRenderer()

    renderer.setAnimationLoop(() => {
        update()
        render()
    })
}

const createCamera = () => {
    camera = new THREE.PerspectiveCamera(
        55,
        container.clientWidth / container.clientHeight,
        0.1,
        20000,
    )

    camera.position.set(0, 1000, 800)
    camera.lookAt(scene.position)
}

const createControls = () => {
    controls = new THREE.OrbitControls(camera, container)
}
const createLights = () => {
    const ambientLight = new THREE.HemisphereLight(0xddeeff, 0x202020, 5)

    const mainLight = new THREE.DirectionalLight(0xffffff, 5)
    mainLight.position.set(10, 10, 10)

    scene.add(ambientLight, mainLight)
}

const createFox = () => {
    var materialArray = []
    materialArray.push(
        new THREE.MeshBasicMaterial({
            map: THREE.ImageUtils.loadTexture('images/bao123.jpg'),
        }),
    )
    materialArray.push(
        new THREE.MeshBasicMaterial({
            map: THREE.ImageUtils.loadTexture('images/bao123.jpg'),
        }),
    )
    materialArray.push(
        new THREE.MeshBasicMaterial({
            map: THREE.ImageUtils.loadTexture('images/bao123.jpg'),
        }),
    )
    materialArray.push(
        new THREE.MeshBasicMaterial({
            map: THREE.ImageUtils.loadTexture('images/bao123.jpg'),
        }),
    )
    materialArray.push(
        new THREE.MeshBasicMaterial({
            map: THREE.ImageUtils.loadTexture('images/bao123.jpg'),
        }),
    )
    materialArray.push(
        new THREE.MeshBasicMaterial({
            map: THREE.ImageUtils.loadTexture('images/bao123.jpg'),
        }),
    )
    for (var i = 0; i < 6; i++) materialArray[i].side = THREE.BackSide
    var skyboxMaterial = new THREE.MeshFaceMaterial(materialArray)
    var skyboxGeom = new THREE.CubeGeometry(5000, 5000, 5000, 1, 1, 1)
    var skybox = new THREE.Mesh(skyboxGeom, skyboxMaterial)
    scene.add(skybox)
}

const createFloor = () => {
    var floorTexture = new THREE.ImageUtils.loadTexture(
        'images/checkerboard.jpg',
    )
    floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping
    floorTexture.repeat.set(50, 50)
    var floorMaterial = new THREE.MeshBasicMaterial({
        map: floorTexture,
        side: THREE.DoubleSide,
    })
    var floorGeometry = new THREE.PlaneGeometry(1000, 1000, 10, 10)
    var floor = new THREE.Mesh(floorGeometry, floorMaterial)
    floor.position.y = -0.5
    floor.rotation.x = Math.PI / 2
    scene.add(floor)
}

const createIntroduce = () => {
    var loader = new THREE.FontLoader().load(
        './fonts/helvetiker_bold.typeface.json',
        (font) => {
            var textGeo1 = new THREE.TextGeometry('Nguyen Le Tien Bao', {
                font: font,
                size: 50,
                height: 15,
                curveSegments: 12,

                bevelThickness: 1,
                bevelSize: 2,
                bevelEnabled: true,
            })

            var materialFront1 = new THREE.MeshBasicMaterial({
                color: 0xff0000,
            })
            var materialSide1 = new THREE.MeshBasicMaterial({ color: 0x000088 })
            var materialArray1 = [materialFront1, materialSide1]

            var textMaterial1 = new THREE.MeshFaceMaterial(materialArray1)
            textGeo1.computeBoundingBox()

            var mesh1 = new THREE.Mesh(textGeo1, textMaterial1)
            mesh1.position.set(-300, 30, -400)
            mesh1.rotation.x = -Math.PI / 4

            scene.add(mesh1)

            //Mssv
            var textGeo2 = new THREE.TextGeometry('Ps11095', {
                font: font,
                size: 25,
                height: 15,
                curveSegments: 12,

                bevelThickness: 1,
                bevelSize: 2,
                bevelEnabled: true,
            })

            var materialFront2 = new THREE.MeshBasicMaterial({
                color: 0xff0000,
            })
            var materialSide2 = new THREE.MeshBasicMaterial({ color: 0x000088 })
            var materialArray2 = [materialFront2, materialSide2]

            var textMaterial2 = new THREE.MeshFaceMaterial(materialArray2)
            textGeo2.computeBoundingBox()

            var mesh2 = new THREE.Mesh(textGeo2, textMaterial2)
            mesh2.position.set(-80, 30, -300)
            mesh2.rotation.x = -Math.PI / 4

            scene.add(mesh2)
        },
    )
}

const createRenderer = () => {
    renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(container.clientWidth, container.clientHeight)

    renderer.setPixelRatio(window.devicePixelRatio)

    renderer.physicallyCorrectLights = true

    container.appendChild(renderer.domElement)
}

const update = () => {}

const render = () => {
    renderer.render(scene, camera)
}

const onWindowResize = () => {
    camera.aspect = container.clientWidth / container.clientHeight

    camera.updateProjectionMatrix()

    renderer.setSize(container.clientWidth, container.clientHeight)
}

window.addEventListener('resize', onWindowResize)

init()
