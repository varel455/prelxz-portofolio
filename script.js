AOS.init();

// Dark Mode Toggle
const darkModeToggle = document.getElementById("darkModeToggle");
darkModeToggle.addEventListener("click", () => {
    document.body.classList.toggle("light-mode");
    darkModeToggle.textContent = document.body.classList.contains("light-mode") ? "☀️" : "🌙";
});

// Pemutar Lagu YouTube
const youtubeContainer = document.getElementById("youtubePlayer");
if (youtubeContainer) {
    youtubeContainer.innerHTML = `
        <iframe width="560" height="315" 
            src="https://www.youtube.com/embed/l08Zw-RY__Q?autoplay=1&loop=1&playlist=l08Zw-RY__Q" 
            title="Wildflower - Billie Eilish" 
            frameborder="0" allowfullscreen>
        </iframe>
    `;
}

// Efek Salju
const canvas = document.getElementById("snow");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const snowflakes = [];
for (let i = 0; i < 100; i++) {
    snowflakes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 4 + 1,
        d: Math.random() * 1.5,
    });
}

function drawSnow() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white";
    ctx.beginPath();
    for (let flake of snowflakes) {
        ctx.moveTo(flake.x, flake.y);
        ctx.arc(flake.x, flake.y, flake.r, 0, Math.PI * 2);
    }
    ctx.fill();
    moveSnow();
}

function moveSnow() {
    for (let flake of snowflakes) {
        flake.y += flake.d;
        if (flake.y > canvas.height) {
            flake.y = 0;
            flake.x = Math.random() * canvas.width;
        }
    }
}

setInterval(drawSnow, 30);
