// SHOW MENU

const showMenu = (toggleId, navId) => {
    const toggle = document.getElementById(toggleId);
    nav = document.getElementById(navId);

    if (toggle && nav) {
        toggle.addEventListener('click', () => {
            nav.classList.toggle('show-menu');
        })
    }
}

showMenu('nav-toggle', 'nav-menu');

// REMOVE MENU MOBILE

const navLink = document.querySelectorAll('.nav__link');

function linkAction() {
    const navMenu = document.getElementById('nav-menu');
    // when we click on each nav link, we remove the show menu class
    navMenu.classList.remove('show-menu');
}

navLink.forEach(n => n.addEventListener('click', linkAction));

// SCROLL SECTIONS ACTIVE LINK

const sections = document.querySelectorAll('section[id]');

function scrollActive() {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 50;
        sectionId = current.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active-link');
        } else {
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active-link');
        }
    })
}

window.addEventListener('scroll', scrollActive);

// SCROLL TOP

function scrollTop() {
    const scrollTop = document.getElementById('scroll-top');
    // when scroll is higher then 560 vh, add the show scroll class
    return this.scrollY >= 200 ? scrollTop.classList.add('show-scroll') : scrollTop.classList.remove('show-scroll');
    // if (this.scrollY >= 200) scrollTop.classList.add('show-scroll'); else scrollTop.classList.remove('show-scroll');
}
window.addEventListener('scroll', scrollTop);

// DARK LIGHT THEME

const themeButton = document.getElementById('theme-button');
const darkTheme = 'dark-theme';
const iconTheme = 'bx-sun';

// Previouslu selected topic (if user selected)

const selectedTheme = localStorage.getItem('selected-theme');
const selectedIcon = localStorage.getItem('selected-icon');

// We obtain the current theme that interface has by validating the dark-theme class

const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light';

const getCurrentIcon = () => document.body.classList.contains(iconTheme) ? 'bx-moon' : 'bx-sun';

// We validate if the user previouslu chose a topic
if (selectedTheme) {
    // if validation is true, we ask what the issue was to know if we activated or deactivated dark theme
    document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme);
    document.body.classList[selectedIcon === 'bxs-moon' ? 'add' : 'remove'](iconTheme);
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener('click', () => {
    // add or remove the dark / icon theme
    document.body.classList.toggle(darkTheme);
    themeButton.classList.toggle(iconTheme);

    // we save the theme and current icon that user chose
    localStorage.setItem('selected-theme', getCurrentTheme());
    localStorage.setItem('selected-icon', getCurrentIcon());
})

// REDUCE THE SIZE AND PRINT ON AN A4 SHEET

function scaleCv() {
    document.body.classList.add('scale-cv');
}

// REMOVE THE SIZE WHEN CV IS DOWNLOADED

function removeScale() {
    document.body.classList.remove('scale-cv');
}

// GENERATE PDF

let areaCv = document.getElementById('area-cv');

let resumeButton = document.getElementById('resume-button');

// Html2Pdf options
let opt = {
    margin: 1,
    filename: 'myResume.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 4 },
    jsPDF: { format: 'a4', orientation: 'portrait' }
};

// function to call areaCv and Html2Pdf options
function generateresume() {
    html2pdf(areaCv, opt);
}

// When button is clicked it executes three functions

resumeButton.addEventListener('click', () => {
    // add scale class
    scaleCv();
    // generate pdf
    generateresume();
    // remove scale class
    setTimeout(removeScale, 5000);
})