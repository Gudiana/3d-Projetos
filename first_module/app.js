// var for setup

let container;
let camara;
let renderer;
let scene;
let gun;

function init() {
    container = document.querySelector('.scene');

    //create scene
    scene = new THREE.Scene();

    //camara setup
    const fov = 35;
    const aspect = container.clientWidth / container.clientHeight;
    const near = 0.1;
    const far = 10000;

    camara = new THREE.PerspectiveCamera(fov,aspect,near,far);

    camara.position.set(-10,40,450);

    const ambient = new THREE.AmbientLight(0x404040, 3);
    scene.add(ambient);

    const light = new THREE.DirectionalLight(0xffffff,5);
    light.position.set(-10,40,450);
    scene.add(light)


    //Renderar
    renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
    renderer.setSize(container.clientWidth,container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    container.appendChild(renderer.domElement);


    //load gun
    let loader = new THREE.GLTFLoader();
    loader.load('./gun/scene.gltf',function(gltf){
        gun = gltf.scene.children[0];
        gun.scale.set(70,70,70);
        scene.add(gltf.scene);
        animate();
    });
}
function animate(){
    requestAnimationFrame(animate);
    gun.rotation.z += 0.005;
    renderer.render(scene,camara);
}
init();