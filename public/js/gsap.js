gsap.registerPlugin(TextPlugin);

// Home
gsap.to(".portal", { duration: 1, delay: 0.5, text: "PORTAL ULPLTD KOTAMOBAGU" });

const count = document.querySelectorAll(".auto-count");

gsap.from(count, {
  textContent: 0,
  duration: 1.5,
  ease: Power1.easeIn,
  snap: { textContent: 1 },
});

gsap.from(".home .home-anim", { duration: 1.2, y: 100, opacity: 0, stagger: 0.4 });

// Data Mesin
gsap.from(".data-mesin .col-4", { duration: 1, y: -100, opacity: 0, stagger: 0.1 });

// Inventory
gsap.from(".gudang .col-3", { duration: 0.7, y: 100, opacity: 0, stagger: 0.2 });

// Company Profile
gsap.from(".hero-section .hero", { duration: 2, y: -100, ease: "bounce" });

gsap.to(".hero-section p", { duration: 2.5, delay: 1, text: "Kapasitas 8000 kW" });
