/* Menu Icon Navbar */
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

if (menuIcon) {
    menuIcon.addEventListener('click', () => {
        // toggle visual state
        menuIcon.classList.toggle('bx-x');
        const isOpen = navbar.classList.toggle('active');
        // accessibility: reflect state
        menuIcon.setAttribute('aria-expanded', String(isOpen));
    });
}
// close nav when clicking links (use event delegation)
document.querySelectorAll('.navbar a').forEach(a => {
    a.addEventListener('click', () => {
        if (navbar.classList.contains('active')) {
            navbar.classList.remove('active');
            menuIcon.classList.remove('bx-x');
            menuIcon.setAttribute('aria-expanded', 'false');
        }
    });
});

/* Scroll Sections Active Link */
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            });
        };
    });

    /* Sticky Navbar */
    let header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 100);

    /* Remove toggle icon and navbar when scrolling (mobile) */
    if (menuIcon && navbar) {
        menuIcon.classList.remove('bx-x');
        navbar.classList.remove('active');
        menuIcon.setAttribute('aria-expanded', 'false');
    }
};


/* Custom Cursor */
const cursorDot = document.querySelector('[data-cursor-dot]');
const cursorOutline = document.querySelector('[data-cursor-outline]');

window.addEventListener("mousemove", function (e) {
    const posX = e.clientX;
    const posY = e.clientY;

    cursorDot.style.left = `${posX}px`;
    cursorDot.style.top = `${posY}px`;

    // Animate outline with a slight delay or just standard follow
    cursorOutline.animate({
        left: `${posX}px`,
        top: `${posY}px`
    }, { duration: 500, fill: "forwards" });
});

// Add hover effect to cursor on clickable elements
const clickables = document.querySelectorAll('a, button, .btn');
clickables.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursorOutline.classList.add('hover');
    });
    el.addEventListener('mouseleave', () => {
        cursorOutline.classList.remove('hover');
    });
});

// Disable custom cursor on touch devices
if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
    const dot = document.querySelector('.cursor-dot');
    const outline = document.querySelector('.cursor-outline');
    if (dot) dot.style.display = 'none';
    if (outline) outline.style.display = 'none';
}


/* Text Animation (Typing Effect) */
const textElement = document.querySelector(".text-animate");
const textArray = ["Frontend Developer", "Web Designer", "Graphic Designer"];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    const currentText = textArray[textIndex];
    if (isDeleting) {
        textElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        textElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }

    if (!isDeleting && charIndex === currentText.length) {
        isDeleting = true;
        setTimeout(typeEffect, 2000); // Pause at end
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % textArray.length;
        setTimeout(typeEffect, 500); // Pause before new word
    } else {
        setTimeout(typeEffect, isDeleting ? 100 : 200);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    if (textElement) typeEffect();
});


/* Scroll Reveal Animation */
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        console.log(entry)
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        } else {
            // entry.target.classList.remove('show'); // Uncomment to re-animate every time
        }
    });
});

const hiddenElements = document.querySelectorAll('.home-content, .heading, .skills-box, .portfolio-box, .about-content');
hiddenElements.forEach((el) => {
    el.classList.add('hidden'); // Add initial hidden class
    observer.observe(el);
});

/* Contact form handling: simple validation and mailto fallback */
const contactForm = document.querySelector('.contact form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = contactForm.querySelector('input[type=text]')?.value.trim();
        const email = contactForm.querySelector('input[type=email]')?.value.trim();
        const subject = contactForm.querySelectorAll('input[type=text]')[1]?.value.trim() || 'Contact from portfolio';
        const message = contactForm.querySelector('textarea')?.value.trim();
        if (!name || !email || !message) {
            alert('Please fill all required fields.');
            return;
        }
        const mailto = `mailto:hello@example.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent('Name: '+name+'\nEmail: '+email+'\n\n'+message)}`;
        window.location.href = mailto;
    });
}

// Footer quick message form handling
const footerForm = document.getElementById('footer-contact');
if (footerForm) {
    footerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const femail = footerForm.querySelector('input[name=femail]')?.value.trim();
        const fmsg = footerForm.querySelector('textarea[name=fmsg]')?.value.trim();
        if (!femail || !fmsg) {
            alert('Please provide your email and a short message.');
            return;
        }
        // open mail client with message
        const mailto = `mailto:hello@example.com?subject=${encodeURIComponent('Quick message from portfolio')}&body=${encodeURIComponent('Email: '+femail+'\n\n'+fmsg)}`;
        window.location.href = mailto;
    });
}
