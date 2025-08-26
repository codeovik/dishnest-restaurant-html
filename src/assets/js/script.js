gsap.registerPlugin(SplitText, ScrollTrigger);

// var
const primaryColor = getComputedStyle(document.documentElement).getPropertyValue('--primary-color').trim();

// dark mode
const toggleBtn = document.getElementById("darkToggle");
const html = document.documentElement;
if (localStorage.getItem("theme") === "dark") {
  html.classList.add("dark");
}
toggleBtn.addEventListener("click", () => {
  html.classList.toggle("dark");

  if (html.classList.contains("dark")) {
    localStorage.setItem("theme", "dark");
  } else {
    localStorage.setItem("theme", "light");
  }
});

// open menu in less than 1200px width devices
let menuTL = gsap.timeline();
menuTL.to("#menuBg", {
  opacity: 1,
  duration: 0.2,
});
menuTL.to("#menuContainer", {
  left: "0%",
  delay: 0,
  duration: 0.4
});
menuTL.pause();
document.querySelector("#openMenu").addEventListener("click", () => {
  document.querySelector("#closeMenuFromBackground").classList.remove("pointer-events-none");
  menuTL.play();
})
document.querySelector("#closeMenuFromBackground").addEventListener("click", () => {
  document.querySelector("#closeMenuFromBackground").classList.add("pointer-events-none");
  menuTL.reverse();
})
document.querySelector("#closeMenuFromButton").addEventListener("click", () => {
  menuTL.reverse();
})

// background cursor follower
gsap.to("#BackgroundCursor", {
  rotate: 360,
  duration: 5,
  repeat: -1,
  ease: "linear",
})
document.addEventListener("mousemove", (e) => {
  gsap.to("#BackgroundCursor", {
    x: e.clientX - 200,
    y: e.clientY - 200,
    duration: 2.5,
    ease: "power2.out"
  })
})

// navbar behavior in scroll
const nav = document.querySelector("nav");
window.addEventListener("scroll", () => {
  if (window.scrollY > 200) {
    // nav in more than 200px scroll down
    nav.classList.remove("absolute");
    nav.classList.add("fixed", "dark:bg-black/80", "backdrop-blur-xl");
  } else {
    // nav in top
    nav.classList.remove("fixed", "dark:bg-black/80", "backdrop-blur-xl");
    nav.classList.add("absolute");
  }
});

// footer dynamic year
document.getElementById('currentYear').textContent = new Date().getFullYear();

// cursor follower
let cursor = document.querySelector("#cursor");
let cursorSize = cursor.offsetWidth;
document.addEventListener("mousemove", (e) => {
  cursor.classList.add("lg:flex");
  gsap.to(cursor, {
    x: e.clientX - 10,
    y: e.clientY - 10,
    duration: 0.5,
    ease: "back.out",
  })
});
// document.addEventListener("click", () => {
//   gsap.to(cursor, {
//     scale: 0.5,
//     duration: 0.1,
//     onComplete: () => {
//       gsap.to(cursor, {
//         scale: 1,
//         duration: 0.3
//       });
//     }
//   });
// });

// cursor follower in button and links
document.querySelectorAll("button, a:not(.blog-link-in-image)").forEach(e => {
  e.addEventListener("mousemove", (e) => {
    gsap.to(cursor, {
      scale: 3.5,
    });
  });
  e.addEventListener("mouseleave", (e) => {
    gsap.to(cursor, {
      scale: 1,
    });
  });
});

// cursor follower in heading
document.querySelectorAll("h1, h2").forEach(e => {
  e.addEventListener("mousemove", (e) => {
    cursor.classList.add("mix-blend-difference");
    gsap.to(cursor, {
      scale: 4,
      backgroundColor: "#fff"
    });
  });
  e.addEventListener("mouseleave", (e) => {
    cursor.classList.remove("mix-blend-difference");
    gsap.to(cursor, {
      scale: 1,
      backgroundColor: primaryColor + "50"
    });
  });
});

// smooth scroll
const lenis = new Lenis({
  duration: 1,
  easing: (t) => t * (2 - t),
  smooth: true,
});
function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// go top
const goTopBtn = document.getElementById("goTopBtn");
const scrollProgress = document.getElementById("scrollProgress");
lenis.on("scroll", () => {
  const scrollTop = lenis.scroll;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrolled = (scrollTop / docHeight) * 100;
  scrollProgress.style.height = `${scrolled}%`;
  if (scrollTop > 250) {
    goTopBtn.classList.remove("opacity-0", "translate-y-10", "pointer-events-none");
    goTopBtn.classList.add("opacity-100", "translate-y-0", "pointer-events-auto");
  } else {
    goTopBtn.classList.add("opacity-0", "translate-y-10", "pointer-events-none");
    goTopBtn.classList.remove("opacity-100", "translate-y-0", "pointer-events-auto");
  }
});
goTopBtn.addEventListener("click", () => {
  lenis.scrollTo(0, { duration: 1.2, easing: (t) => t * (2 - t) });
});

// Customer review slider
var swiper = new Swiper(".mySwiper", {
  effect: "cards",
  grabCursor: true,
  loop: true,
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
});

// cursor follower in blog list
document.querySelectorAll("#blog img").forEach(e => {
  e.addEventListener("mousemove", (e) => {
    gsap.to(cursor, {
      scale: 6,
      backdropFilter: "blur(2px)",
    });
    cursor.innerHTML = "<span class='text-[3px]'>Read More</span>";
  });
  e.addEventListener("mouseleave", (e) => {
    gsap.to(cursor, {
      scale: 1,
      backdropFilter: "blur(0px)",
    });
    cursor.innerHTML = "";
  });
});

// odometer animation
document.querySelectorAll('[data-target-number]').forEach(function (el) {
  var targetStr = (el.getAttribute('data-target-number') || '').trim();
  if (!targetStr) return;
  var numOnly = targetStr.replace(/[^0-9.\-]/g, '');
  var targetVal = parseFloat(numOnly || '0');
  var prefixMatch = targetStr.match(/^[^\d\-\.]+/);
  var prefix = prefixMatch ? prefixMatch[0] : '';
  var suffix = targetStr.replace(/^[^\d\-\.]*/, '').replace(/-?\d[\d,]*(?:\.\d+)?/, '');
  var startNum = (el.textContent || '').trim().replace(/[^0-9.\-]/g, '');
  if (startNum === '') startNum = '0';
  el.textContent = '';
  if (prefix) {
    var pre = document.createElement('span');
    pre.className = 'odo-prefix';
    pre.textContent = prefix;
    el.appendChild(pre);
  }
  var numSpan = document.createElement('span');
  numSpan.className = 'odometer';
  numSpan.textContent = startNum;
  el.appendChild(numSpan);
  if (suffix) {
    var suf = document.createElement('span');
    suf.className = 'odo-suffix';
    suf.textContent = suffix;
    el.appendChild(suf);
  }
  var odo = new Odometer({
    el: numSpan,
    value: parseFloat(startNum),
    duration: +el.getAttribute('data-duration') || 2000,
    format: el.getAttribute('data-format') || '(,ddd).dd'
  });
  ScrollTrigger.create({
      trigger: el,
      toggleActions: "play none reset none",
      onEnter: function () {
        odo.update(targetVal);
      },
      onLeaveBack: function () {
        odo.update(startNum);
      }
    });
});

// animation
document.fonts.ready.then(() => {
  // all page h1 tag
  gsap.from(new SplitText("h1", { type: "chars" }).chars, {
    x: 100,
    opacity: 0,
    stagger: 0.03,
    duration: 0.3,
    ease: "back.out(1.7)",
    scrollTrigger: {
      trigger: "h1",
      toggleActions: "play none none reverse"
    }
  });

  // homepage hero section
  if (document.querySelector("#hero-subtitle")) {
    gsap.from(new SplitText("#hero-subtitle", { type: "lines" }).lines, {
      y: 100,
      opacity: 0,
      stagger: 0.05,
      duration: 0.5,
      delay: 1.5,
      ease: "back.out(1.7)",
      scrollTrigger: {
        trigger: "#hero-subtitle",
        toggleActions: "play none none reverse"
      }
    });
    gsap.from("#hero-button-container a", {
      opacity: 0,
      y: 60,
      delay: 2,
      stagger: 0.2,
    });
  }

  // about
  if (document.querySelector("#about-title")) {
      gsap.from("#about-title", {
      scrollTrigger: {
      trigger: "#about-title",
      toggleActions: "play none none reverse"
      },
      y: 50,
      opacity: 0,
      duration: 0.2,
      ease: "power3.out"
    });
    gsap.from(new SplitText("#about-subtitle", { type: "chars" }).chars, {
      x: 100,
      opacity: 0,
      stagger: 0.03,
      duration: 0.3,
      ease: "back.out(1.7)",
      scrollTrigger: {
      trigger: "#about-subtitle",
      toggleActions: "play none none reverse"
      }
    });
    ScrollReveal().reveal('#about .child', {
      interval: 300,
      origin: 'bottom',
      distance: '100px',
      duration: 1000,
      reset: false,
      once: false
    });
  }

  // stats
  if (document.querySelector("#stats-title")) {
    gsap.from("#stats-title", {
      scrollTrigger: {
        trigger: "#stats-title",
        toggleActions: "play none none reverse"
      },
      y: 50,
      opacity: 0,
      duration: 0.2,
      ease: "power3.out"
    });
    gsap.from(new SplitText("#stats-subtitle", { type: "chars" }).chars, {
      x: 100,
      opacity: 0,
      stagger: 0.03,
      duration: 0.3,
      ease: "back.out(1.7)",
      scrollTrigger: {
        trigger: "#stats-subtitle",
        toggleActions: "play none none reverse"
      }
    });
    ScrollReveal().reveal('#stats article', {
      interval: 300,
      origin: 'bottom',
      distance: '100px',
      duration: 1000,
      reset: false,
      once: false
    });
  }

  // menu
  if (document.querySelector("#menu article")) {
    gsap.from("#menu-title", {
      scrollTrigger: {
        trigger: "#menu-title",
        toggleActions: "play none none reverse"
      },
      y: 50,
      opacity: 0,
      duration: 0.2,
      ease: "power3.out"
    });
    gsap.from(new SplitText("#menu-subtitle", { type: "chars" }).chars, {
      x: 100,
      opacity: 0,
      stagger: 0.03,
      duration: 0.3,
      ease: "back.out(1.7)",
      scrollTrigger: {
        trigger: "#menu-subtitle",
        toggleActions: "play none none reverse"
      }
    });
    ScrollReveal().reveal('#menu article', {
      interval: 200,
      origin: 'bottom',
      distance: '100px',
      opacity: 0,
      duration: 1000,
      reset: false,
      once: false
    });
  }
  // gallery
  if (document.querySelector("#gallery")) {
    ScrollReveal().reveal('#gallery img', {
      interval: 300,
      origin: 'bottom',
      distance: '100px',
      duration: 1000,
      reset: false,
      once: false
    });
  }
  // gallery page
  if (document.querySelector("#gallery-page")) {
    ScrollReveal().reveal('#gallery-page img', {
      interval: 300,
      origin: 'bottom',
      distance: '100px',
      duration: 1000,
      reset: false,
      once: false
    });
  }
  // contact
  if (document.querySelector("#contact-title")) {
    gsap.from("#contact-title", {
      scrollTrigger: {
        trigger: "#contact-title",
        toggleActions: "play none none reverse"
      },
      y: 50,
      opacity: 0,
      duration: 0.2,
      ease: "power3.out"
    });
    gsap.from(new SplitText("#contact-subtitle", { type: "chars" }).chars, {
      x: 100,
      opacity: 0,
      stagger: 0.03,
      duration: 0.3,
      ease: "back.out(1.7)",
      scrollTrigger: {
        trigger: "#contact-subtitle",
        toggleActions: "play none none reverse"
      }
    });
    ScrollReveal().reveal('#contact .child', {
      interval: 300,
      origin: 'bottom',
      distance: '100px',
      duration: 1000,
      reset: false,
      once: false
    });
  }

  // review
  if (document.querySelector("#review-title")) {
    gsap.from(new SplitText("#review-title", { type: "words" }).words, {
      x: 100,
      opacity: 0,
      stagger: 0.3,
      delay: 0.5,
      duration: 1.2,
      ease: "back.out(1.7)",
      scrollTrigger: {
        trigger: "#review-title",
        toggleActions: "play none none reverse"
      }
    });
  }

  // book a table page
  if (document.querySelector("#contact-page-form")) {
    // form and iamge
    ScrollReveal().reveal('#contact-page-form .child', {
      interval: 300,
      origin: 'bottom',
      distance: '100px',
      duration: 1000,
      reset: false,
      once: false
    });
    // email, phone and address block
    ScrollReveal().reveal('#contact-page-alt-div li', {
      interval: 300,
      origin: 'bottom',
      distance: '100px',
      duration: 1000,
      reset: false,
      once: false
    });
    // google map embed
    ScrollReveal().reveal('iframe', {
      interval: 300,
      origin: 'bottom',
      distance: '100px',
      duration: 1000,
      reset: false,
      once: false
    });
    // heading for email, phone and address
    gsap.from(new SplitText("#contact-page-alt-heading", { type: "chars" }).chars, {
      x: 100,
      opacity: 0,
      stagger: 0.03,
      duration: 0.3,
      ease: "back.out(1.7)",
      scrollTrigger: {
        trigger: "#contact-page-alt-heading",
        toggleActions: "play none none reverse"
      }
    });
    // google map embed heading
    gsap.from(new SplitText("#contact-page-google-map-heading", { type: "chars" }).chars, {
      x: 100,
      opacity: 0,
      stagger: 0.03,
      duration: 0.3,
      ease: "back.out(1.7)",
      scrollTrigger: {
        trigger: "#contact-page-alt-heading",
        toggleActions: "play none none reverse"
      }
    });
  }

  // blog
  if (document.querySelector("#blog article")) {
    gsap.from("#blog-title", {
      scrollTrigger: {
        trigger: "#blog-title",
        toggleActions: "play none none reverse"
      },
      y: 50,
      opacity: 0,
      duration: 0.2,
      ease: "power3.out"
    });
    gsap.from(new SplitText("#blog-subtitle", { type: "chars" }).chars, {
      x: 100,
      opacity: 0,
      stagger: 0.03,
      duration: 0.3,
      ease: "back.out(1.7)",
      scrollTrigger: {
        trigger: "#blog-subtitle",
        toggleActions: "play none none reverse"
      }
    }
    );
    ScrollReveal().reveal('#blog article', {
      interval: 300,
      origin: 'bottom',
      distance: '100px',
      duration: 1000,
      reset: false,
      once: false
    });
  }

  // chef
  if (document.querySelector("#chef-title")) {
    gsap.from("#chef-title", {
      scrollTrigger: {
        trigger: "#chef-title",
        toggleActions: "play none none reverse"
      },
      y: 50,
      opacity: 0,
      duration: 0.2,
      ease: "power3.out"
    });
    gsap.from(new SplitText("#chef-subtitle", { type: "chars" }).chars, {
      x: 100,
      opacity: 0,
      stagger: 0.03,
      duration: 0.3,
      ease: "back.out(1.7)",
      scrollTrigger: {
        trigger: "#chef-subtitle",
        toggleActions: "play none none reverse"
      }
    }
    );
    ScrollReveal().reveal('#chef article', {
      interval: 300,
      origin: 'bottom',
      distance: '100px',
      duration: 1000,
      reset: false,
      once: false
    });
  }
});

// image magnet in stats
document.querySelectorAll("#stats article").forEach(box => {
  const img = box.querySelector("img");
  box.addEventListener("mouseenter", () => {
    gsap.to(img, {
      opacity: 0.6,
      duration: 0.3,
      ease: "power3.out",
    });
  });
  box.addEventListener("mousemove", e => {
    const rect = box.getBoundingClientRect();
    const x = e.clientX - rect.left - img.offsetWidth / 2;
    const y = e.clientY - rect.top - img.offsetHeight / 2;
    gsap.to(img, {
      x: x,
      y: y,
      duration: 3,
      ease: "power3.out"
    });
  });
  box.addEventListener("mouseleave", () => {
    gsap.to(img, {
      opacity: 0,
      duration: 0.3,
      ease: "power3.inOut"
    });
  });
});