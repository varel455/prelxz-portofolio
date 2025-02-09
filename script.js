AOS.init();

gsap.from(".hero h1", { duration: 1, y: -50, opacity: 0 });
gsap.from(".hero p", { duration: 1, delay: 0.5, y: 50, opacity: 0 });

document.querySelectorAll(".content").forEach((section) => {
    section.addEventListener("mouseenter", () => {
        gsap.to(section, { scale: 1.1, duration: 0.3 });
    });
    section.addEventListener("mouseleave", () => {
        gsap.to(section, { scale: 1, duration: 0.3 });
    });
});
