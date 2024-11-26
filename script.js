const timeline = document.querySelector('.timeline');
const eras = document.querySelectorAll('.era');
const prevBtn = document.getElementById('prevEra');
const nextBtn = document.getElementById('nextEra');
const progressFill = document.querySelector('.progress-fill');

let currentEra = 0;
const totalEras = eras.length;

function updateTimeline() {
    // Translate timeline and update active states
    timeline.style.transform = `translateX(-${currentEra * 25}%)`;

    // Reset and set active era
    eras.forEach((era, index) => {
        era.classList.toggle('active', index === currentEra);
    });

    // Update progress bar
    progressFill.style.width = `${(currentEra / (totalEras - 1)) * 100}%`;
}

nextBtn.addEventListener('click', () => {
    if (currentEra < totalEras - 1) {
        currentEra++;
        updateTimeline();
    }
});

prevBtn.addEventListener('click', () => {
    if (currentEra > 0) {
        currentEra--;
        updateTimeline();
    }
});

// Optional: Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') {
        nextBtn.click();
    } else if (e.key === 'ArrowLeft') {
        prevBtn.click();
    }
});

// Données des diapositives
let slideData = [
    {
        'src': 'https://images.unsplash.com/photo-1506765336936-bb05e7e06295?ixlib=rb-0.3.5&s=d40582dbbbb66c7e0812854374194c2e&auto=format&fit=crop&w=1050&q=80',
        'title': 'Slide 1',
        'copy': 'DOLOR SIT AMET, CONSECTETUR ADIPISCING ELIT.'
    },
    {
        'src': 'https://images.unsplash.com/photo-1496309732348-3627f3f040ee?ixlib=rb-0.3.5&s=4d04f3d5a488db4031d90f5a1fbba42d&auto=format&fit=crop&w=1050&q=80',
        'title': 'Slide 2',
        'copy': 'DOLOR SIT AMET, CONSECTETUR ADIPISCING ELIT.'
    },
    {
        'src': 'https://images.unsplash.com/photo-1504271863819-d279190bf871?ixlib=rb-0.3.5&s=7a2b986d405a04b3f9be2e56b2be40dc&auto=format&fit=crop&w=334&q=80',
        'title': 'Slide 3',
        'copy': 'DOLOR SIT AMET, CONSECTETUR ADIPISCING ELIT.'
    }
];

// Variables pour les diapositives et légendes
let slides = [],
    captions = [];

// Démarrer la lecture automatique des diapositives toutes les 5 secondes
let autoplay = setInterval(nextSlide, 5000);

let leftSlider = document.getElementById('left-col');
let downButton = document.getElementById('down_button');

// Événement pour changer de diapositive
downButton.addEventListener('click', function (e) {
    e.preventDefault();
    clearInterval(autoplay);
    nextSlide();
    autoplay;
});

// Création dynamique des diapositives et légendes
slideData.forEach((slideInfo, index) => {
    let slide = document.createElement('div');
    let caption = document.createElement('div');
    let slideTitle = document.createElement('div');

    slide.classList.add('slide');
    slide.setAttribute('style', 'background:url(' + slideInfo.src + ')');
    caption.classList.add('caption');
    slideTitle.classList.add('caption-heading');
    slideTitle.innerHTML = '<h1>' + slideInfo.title + '</h1>';

    if (index === 0) {
        slide.classList.add('current');
        caption.classList.add('current-caption');
    } else if (index === 1) {
        slide.classList.add('next');
        caption.classList.add('next-caption');
    } else {
        slide.classList.add('previous');
        caption.classList.add('previous-caption');
    }

    caption.appendChild(slideTitle);
    caption.insertAdjacentHTML('beforeend', '<div class="caption-subhead"><span>' + slideInfo.copy + '</span></div>');

    slides.push(slide);
    captions.push(caption);

    leftSlider.appendChild(slide);
    container.appendChild(caption);
});

// Fonction pour passer à la diapositive suivante
function nextSlide() {
    slides[0].classList.remove('current');
    slides[0].classList.add('previous', 'change');
    slides[1].classList.remove('next');
    slides[1].classList.add('current');
    slides[2].classList.add('next');
    slides[slides.length - 1].classList.remove('previous');

    captions[0].classList.remove('current-caption');
    captions[0].classList.add('previous-caption', 'change');
    captions[1].classList.remove('next-caption');
    captions[1].classList.add('current-caption');
    captions[2].classList.add('next-caption');
    captions[captions.length - 1].classList.remove('previous-caption');

    // Déplace les éléments dans les tableaux
    let placeholder = slides.shift();
    let captionsPlaceholder = captions.shift();
    slides.push(placeholder);
    captions.push(captionsPlaceholder);
}
