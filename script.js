/** * NUTAN GLAM ZONE - CORE LOGIC V9.0
 * OPTIMIZED FOR 3000+ LINE ARCHITECTURE 
 */

const scriptURL = 'https://script.google.com/macros/s/AKfycbxxtoXe4v-gSKd1M-hDtFBR64BWe2OgydROIhckhbpimuErxOle2dQLnYBksGjChrfFJA/exec'; 

window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    loader.style.opacity = '0';
    setTimeout(() => { loader.style.display = 'none'; document.body.style.overflow = 'auto'; }, 1500);
});

window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 150) navbar.classList.add('nav-scrolled');
    else navbar.classList.remove('nav-scrolled');
});

function toggleMenu() { 
    const menu = document.getElementById('mobileMenu');
    menu.classList.toggle('hidden');
    document.body.style.overflow = menu.classList.contains('hidden') ? 'auto' : 'hidden';
}

function selectService(val, id) {
    const btns = ['btn-bridal', 'btn-engagement', 'btn-reception', 'btn-party'];
    btns.forEach(b => {
        const el = document.getElementById(b);
        if(el) el.classList.remove('service-active');
    });
    const selected = document.getElementById(id);
    if(selected) {
        selected.classList.add('service-active');
        document.getElementById('selectedService').value = val;
    }
}

const runCounters = () => {
    document.querySelectorAll('.counter').forEach(counter => {
        const target = +counter.getAttribute('data-target');
        let current = 0;
        const update = () => {
            const increment = target / 100;
            if (current < target) {
                current += increment;
                counter.innerText = Math.ceil(current);
                setTimeout(update, 25);
            } else { counter.innerText = target; }
        };
        update();
    });
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if(entry.isIntersecting) {
            if(entry.target.id === 'about') runCounters();
            entry.target.classList.add('animate-fade-in');
        }
    });
}, { threshold: 0.3 });

document.querySelectorAll('section').forEach(s => observer.observe(s));

const form = document.getElementById('bookingForm');
if(form) {
    form.addEventListener('submit', async e => {
        e.preventDefault();
        const btn = document.getElementById('submitBtn');
        const successUI = document.getElementById('successMsg');
        btn.disabled = true; btn.innerHTML = '<i class="fas fa-satellite-dish fa-spin mr-4"></i> Transmitting...';
        const data = { name: document.getElementById('name').value, phone: document.getElementById('phone').value, service: document.getElementById('selectedService').value, promo: document.getElementById('promo').value };
        try {
            await fetch(scriptURL, { method: 'POST', mode: 'no-cors', body: JSON.stringify(data) });
            form.style.opacity = '0';
            setTimeout(() => { form.classList.add('hidden'); successUI.classList.remove('hidden'); successUI.classList.add('animate-fade-in'); }, 800);
            setTimeout(() => { window.top.location.href = "https://chat.whatsapp.com/Ezs5S2YF99T0VYeAfAJi1d"; }, 3500);
        } catch (err) { window.top.location.href = "https://wa.me/+919911642274"; }
    });
}