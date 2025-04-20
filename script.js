const matrixCanvas = document.getElementById('matrix');
const ctx = matrixCanvas.getContext('2d');
matrixCanvas.width = window.innerWidth;
matrixCanvas.height = window.innerHeight;

const letters = "LOLA❤LOLA❤";
const fontSize = 14;
const columns = matrixCanvas.width / fontSize;
const drops = Array(Math.floor(columns)).fill(1);

function drawMatrix() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
  ctx.fillRect(0, 0, matrixCanvas.width, matrixCanvas.height);
  ctx.fillStyle = "#ff80c0";
  ctx.font = fontSize + "px monospace";

  for (let i = 0; i < drops.length; i++) {
    const text = letters.charAt(Math.floor(Math.random() * letters.length));
    ctx.fillText(text, i * fontSize, drops[i] * fontSize);

    if (drops[i] * fontSize > matrixCanvas.height && Math.random() > 0.975) {
      drops[i] = 0;
    }

    drops[i]++;
  }
}
setInterval(drawMatrix, 33);


let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

let renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById('bg'),
  alpha: true,
  antialias: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);


function heartShape(t) {
  let x = 16 * Math.pow(Math.sin(t), 3);
  let y = 13 * Math.cos(t) - 5 * Math.cos(2*t) - 2 * Math.cos(3*t) - Math.cos(4*t);
  return new THREE.Vector3(x / 20, y / 20, 0);
}


const count = 1000;
const positions = new Float32Array(count * 3);
for (let i = 0; i < count; i++) {
  let t = Math.random() * Math.PI * 2;
  let point = heartShape(t);
  positions[i * 3] = point.x + (Math.random() - 0.5) * 0.4;
  positions[i * 3 + 1] = point.y + (Math.random() - 0.5) * 0.4;
  positions[i * 3 + 2] = (Math.random() - 0.5) * 0.4;
}
const geometry = new THREE.BufferGeometry();
geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

const material = new THREE.PointsMaterial({
  color: 0xff1a75,
  size: 0.05,
  sizeAttenuation: true
});

const points = new THREE.Points(geometry, material);
scene.add(points);


let mouse = { x: 0, y: 0 };
document.addEventListener('mousemove', (e) => {
  mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
});


function animate() {
  requestAnimationFrame(animate);
  points.rotation.y += (mouse.x * 0.5 - points.rotation.y) * 0.05;
  points.rotation.x += (mouse.y * 0.5 - points.rotation.x) * 0.05;
  renderer.render(scene, camera);
}
animate();


document.addEventListener('click', () => {
  const name = document.getElementById('name');
  name.style.opacity = 1;
});


window.addEventListener('resize', () => {
  matrixCanvas.width = window.innerWidth;
  matrixCanvas.height = window.innerHeight;
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
