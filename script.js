// --- Mobile Menu Toggle ---
document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });

        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
            });
        });
    }

    // --- Intersection Observer for Fade-In Effect ---
    const sections = document.querySelectorAll('.fade-in-section');

    const observerOptions = {
        root: null, // relative to the viewport
        rootMargin: '0px',
        threshold: 0.1 // Trigger when 10% of the element is visible
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });

    // --- Form Handling ---
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
    }
});

function updateFormMessage(message, isSuccess = true) {
    const msgBox = document.getElementById('formMessage');
    msgBox.textContent = message;
    msgBox.classList.remove('hidden', 'bg-red-100', 'text-red-700', 'bg-green-100', 'text-green-700');
    if (isSuccess) {
        msgBox.classList.add('bg-green-100', 'text-green-700');
    } else {
        msgBox.classList.add('bg-red-100', 'text-red-700');
    }
    msgBox.classList.remove('hidden');
    setTimeout(() => {
        msgBox.classList.add('hidden');
    }, 5000);
}

function handleFormSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    if (name && email && message) {
        console.log('Contact form submitted successfully:', { name, email, message });
        updateFormMessage('Thank you for your message! We will get back to you as soon as possible.', true);
        form.reset();
    } else {
        updateFormMessage('Please fill out all required fields before submitting.', false);
    }
}// JavaScript Document