const cityData = {
  decatur: {
    title: 'Make room for the outdoors.',
    overline: 'THE RIVER TOWN',
    description: 'Decatur pairs a relaxed river-town feel with easy ways to get outside. Think wildlife refuges, riverside paths, local food, and community events when you need a change of scenery.',
    guide: 'https://www.visitdecatural.org/', guideText: 'Explore the Decatur guide', photoClass: 'decatur-photo', letter: 'D.', image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Decatur_Alabama_-_Tennessee_River_view.jpg?width=1200', imageAlt: 'Tennessee River in Decatur, Alabama', credit: 'Photo: AlabamaGuy2007 / Wikimedia Commons · Public domain', creditUrl: 'https://commons.wikimedia.org/wiki/File:Decatur_Alabama_-_Tennessee_River_view.jpg',
    highlights: [
      ['⌁','Wheeler National Wildlife Refuge','Wildlife watching, birding, and nature','https://www.fws.gov/refuge/wheeler'],
      ['☼','Point Mallard Park','Outdoor recreation and seasonal fun','https://www.pointmallardpark.com/'],
      ['♡','Downtown Decatur','Local restaurants, shops, and events','https://www.visitdecatural.org/']
    ]
  },
  huntsville: {
    title: 'Find your next favorite view.',
    overline: 'THE ROCKET CITY',
    description: 'Huntsville blends mountain scenery with museums, live events, local food, and a lively downtown. It is an easy place to turn a free afternoon into a mini-adventure.',
    guide: 'https://www.huntsville.org/', guideText: 'Explore the Huntsville guide', photoClass: 'huntsville-photo', letter: 'H.', image: 'https://commons.wikimedia.org/wiki/Special:FilePath/MonteSanoStateParkhsval.jpg?width=1200', imageAlt: 'Mountain scenery at Monte Sano State Park in Huntsville, Alabama', credit: 'Photo: Alabamadem / Wikimedia Commons · CC BY-SA 4.0', creditUrl: 'https://commons.wikimedia.org/wiki/File:MonteSanoStateParkhsval.jpg',
    highlights: [
      ['⌁','Monte Sano State Park','Hiking trails, overlooks, and camping','https://www.alapark.com/parks/monte-sano-state-park'],
      ['✦','U.S. Space & Rocket Center','Space history and hands-on exhibits','https://www.rocketcenter.com/'],
      ['♫','Lowe Mill ARTS & Entertainment','Artist studios, shops, and events','https://lowemill.art/']
    ]
  },
  madison: {
    title: 'Make a little space to recharge.',
    overline: 'EASYGOING & OUTDOORSY',
    description: 'Madison offers greenways, parks, local community events, and convenient access to the wider Huntsville area. It is a great starting point for a walk, a casual meal, or a low-key weekend.',
    guide: 'https://www.madisonal.gov/', guideText: 'Explore the City of Madison', photoClass: 'madison-photo', letter: 'M.', image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Madison_Alabama_Downtown_2024.jpg?width=1200', imageAlt: 'Downtown Madison, Alabama', credit: 'Photo: Republic of Selmaria / Wikimedia Commons · CC BY-SA', creditUrl: 'https://commons.wikimedia.org/wiki/File:Madison_Alabama_Downtown_2024.jpg',
    highlights: [
      ['⌁','Rainbow Mountain Nature Preserve','Rocky trails and wooded scenery','https://www.madisonal.gov/681/Greenways-Trails'],
      ['↗','Madison greenways & trails','Walking, jogging, and fresh air','https://www.madisonal.gov/681/Greenways-Trails'],
      ['⚾','Toyota Field','Catch a Trash Pandas baseball game','https://www.milb.com/rocket-city']
    ]
  }
};
const tabs = document.querySelectorAll('.city-tab');
const cityPhoto = document.querySelector('.city-photo');
function showCity(key) {
  const city = cityData[key];
  if (!city) return;
  tabs.forEach(tab => {
    const selected = tab.dataset.city === key;
    tab.classList.toggle('active', selected);
    tab.setAttribute('aria-selected', String(selected));
  });
  document.querySelector('#city-title').textContent = city.title;
  document.querySelector('.city-overline').textContent = city.overline;
  document.querySelector('#city-description').textContent = city.description;
  document.querySelector('#city-guide').href = city.guide;
  document.querySelector('#city-guide').innerHTML = `${city.guideText} <span>↗</span>`;
  cityPhoto.className = `city-photo ${city.photoClass}`;
  const cityImage = cityPhoto.querySelector('.city-photo-image');
  cityImage.src = city.image;
  cityImage.alt = city.imageAlt;
  document.querySelector('#city-highlights').innerHTML = city.highlights.map(([icon, title, detail, url]) => `
    <div><span class="highlight-icon">${icon}</span><span><strong>${title}</strong><small>${detail}</small></span><a href="${url}" target="_blank" rel="noreferrer" aria-label="Visit ${title} website">↗</a></div>`).join('');
}
tabs.forEach(tab => tab.addEventListener('click', () => showCity(tab.dataset.city)));
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
menuToggle.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
  menuToggle.textContent = isOpen ? '×' : '☰';
});
document.querySelectorAll('.nav a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open'); menuToggle.setAttribute('aria-expanded','false'); menuToggle.setAttribute('aria-label','Open navigation'); menuToggle.textContent='☰';
}));
const sections = document.querySelectorAll('main section[id]');
const navLinks = document.querySelectorAll('.nav-link');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`));
  }), {rootMargin:'-35% 0px -55% 0px'});
  sections.forEach(section => observer.observe(section));
}
document.querySelector('#year').textContent = new Date().getFullYear();
