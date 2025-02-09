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
