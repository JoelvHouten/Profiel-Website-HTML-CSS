import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

let camera, scene, renderer, controls;
let loadingBar, loadingContainer, logo;

init();
loadModel();
animate();

function init() {
	scene = new THREE.Scene();
	scene.background = new THREE.Color(0x000033);

	camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.25, 300);
	camera.position.set(0, 5, 5);

	renderer = new THREE.WebGLRenderer({ antialias: true });
	renderer.setPixelRatio(window.devicePixelRatio);
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.toneMapping = THREE.ACESFilmicToneMapping;
	renderer.toneMappingExposure = 1;
	document.body.appendChild(renderer.domElement);

	controls = new OrbitControls(camera, renderer.domElement);
	controls.minDistance = 2;
	controls.maxDistance = 50;
	controls.target.set(0, 0, 0);
	controls.update();

	const pointLight = new THREE.PointLight(0xffffff, 1, 5000);
	pointLight.position.set(0, 0, 7);
	scene.add(pointLight);

	const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
	scene.add(ambientLight);

	const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
	directionalLight.position.set(3, 5, 2);
	scene.add(directionalLight);

	loadingContainer = document.createElement('div');
	loadingContainer.style.position = 'fixed';
	loadingContainer.style.top = '50%';
	loadingContainer.style.left = '0';
	loadingContainer.style.width = '100%';
	loadingContainer.style.height = '5px';
	loadingContainer.style.background = '#222';
	loadingContainer.style.zIndex = '100';
	loadingContainer.style.display = 'none';

	loadingBar = document.createElement('div');
	loadingBar.style.height = '100%';
	loadingBar.style.width = '0%';
	loadingBar.style.background = '#4caf50';
	loadingBar.style.transition = 'width 0.3s ease';

	loadingContainer.appendChild(loadingBar);
	document.body.appendChild(loadingContainer);

	logo = document.createElement('img');
	logo.src = 'a500/amiga.png';
	logo.style.position = 'fixed';
	logo.style.top = 'calc(50% - 200px)';
	logo.style.left = '50%';
	logo.style.transform = 'translateX(-50%)';
	logo.style.zIndex = '101';
	logo.style.width = '400px';
	logo.style.userSelect = 'none';
	logo.style.pointerEvents = 'none';
	logo.style.display = 'none';

	document.body.appendChild(logo);

	window.addEventListener('resize', onWindowResize);
}

function loadModel() {
	const manager = new THREE.LoadingManager();

	manager.onStart = () => {
		loadingContainer.style.display = 'block';
		logo.style.display = 'block';
	};

	manager.onProgress = (url, loaded, total) => {
		loadingBar.style.width = `${(loaded / total) * 100}%`;
	};

	manager.onLoad = () => {
		loadingContainer.style.display = 'none';
		logo.style.display = 'none';
	};

	const loader = new GLTFLoader(manager).setPath('a500/');
	loader.load('scene.gltf', (gltf) => {
		scene.add(gltf.scene);
		render();
	});
}

function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
	render();
}

function render() {
	renderer.render(scene, camera);
}

function animate() {
	requestAnimationFrame(animate);
	controls.update();
	render();
}
