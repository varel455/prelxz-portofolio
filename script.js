import * as THREE from "https://cdn.jsdelivr.net/npm/three@latest/build/three.module.js";

// Setup scene, camera, renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Audio setup
const audio = document.getElementById("audio");
const audioContext = new (window.AudioContext || window.webkitAudioContext)();
const analyser = audioContext.createAnalyser();
const source = audioContext.createMediaElementSource(audio);
source.connect(analyser);
analyser.connect(audioContext.destination);
analyser.fftSize = 256;

const dataArray = new Uint8Array(analyser.frequencyBinCount);

// 🔥 1. Orb Energi
const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
const sphereMaterial = new THREE.MeshStandardMaterial({ color: 0x00ffcc, emissive: 0x00ffcc, emissiveIntensity: 1 });
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
scene.add(sphere);

// 🔥 2. Grid Neon
const gridHelper = new THREE.GridHelper(10, 20, 0x00ffcc, 0x00ffcc);
scene.add(gridHelper);

// 🔥 3. Gelombang Partikel
const particleCount = 500;
const particles = new THREE.Group();
for (let i = 0; i < particleCount; i++) {
    const particleGeometry = new THREE.SphereGeometry(0.05, 8, 8);
    const particleMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });
    const particle = new THREE.Mesh(particleGeometry, particleMaterial);
    particle.position.set(Math.random() * 10 - 5, Math.random() * 10 - 5, Math.random() * 10 - 5);
    particles.add(particle);
}
scene.add(particles);

// 🔥 4. Portal Black Hole
const portalGeometry = new THREE.TorusGeometry(2, 0.5, 16, 100);
const portalMaterial = new THREE.MeshStandardMaterial({ color: 0x9900ff, emissive: 0x9900ff, emissiveIntensity: 2 });
const portal = new THREE.Mesh(portalGeometry, portalMaterial);
portal.rotation.x = Math.PI / 2;
scene.add(portal);

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0x00ffcc, 2, 10);
pointLight.position.set(0, 2, 3);
scene.add(pointLight);

// 🔄 Animasi
function animate() {
    requestAnimationFrame(animate);
    analyser.getByteFrequencyData(dataArray);

    const bass = dataArray[1] / 255;
    const mid = dataArray[10] / 255;
    
    // Animasi Orb
    sphere.scale.set(1 + bass * 1.5, 1 + bass * 1.5, 1 + bass * 1.5);
    sphere.material.emissiveIntensity = 1 + bass * 2;

    // Animasi Grid
    gridHelper.rotation.z += bass * 0.02;

    // Animasi Partikel
    particles.children.forEach((p, i) => {
        p.position.y += Math.sin(i + bass * 5) * 0.005;
        p.position.x += Math.cos(i + mid * 5) * 0.005;
    });

    // Animasi Portal
    portal.rotation.y += mid * 0.05;
    portal.scale.set(1 + mid * 0.5, 1 + mid * 0.5, 1 + mid * 0.5);

    renderer.render(scene, camera);
}

animate();
