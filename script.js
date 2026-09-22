const toggleButton = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

if (toggleButton && navLinks) {
  toggleButton.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    toggleButton.setAttribute('aria-expanded', String(isOpen));
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      toggleButton.setAttribute('aria-expanded', 'false');
    });
  });
}

const revealItems = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.2,
  }
);

revealItems.forEach((item) => observer.observe(item));

const yearElement = document.getElementById('year');
if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

const languageButtons = document.querySelectorAll('.language-button');
const languageTranslations = {
  it: {
    title: 'Haris Notes | Ristorante',
    '.language-label': 'Lingua',
    '.nav-links a:nth-child(1)': 'Menu',
    '.nav-links a:nth-child(2)': 'Olio e Pane',
    '.nav-links a:nth-child(3)': 'Le nostre ostriche',
    '.nav-links a:nth-child(4)': 'Carne',
    '.nav-links a:nth-child(5)': 'Frutti di mare',
    '.nav-links a:nth-child(6)': 'Servizio',
    '#our-oysters .section-tag': 'Le nostre ostriche',
    '#our-oysters h2': 'Aperte al momento, servite fredde, con il ritmo del mare.',
    '#oil-and-bread .section-tag': 'Olio e Pane',
    '#oil-and-bread h2': 'Dal forno e dal frantoio, il primo assaggio della serata.',
    '#meat .section-tag': 'Carne',
    '#meat h2': 'Tagli selezionati, frollati e cotti al carbone.',
    '#seafood .section-tag': 'Frutti di mare',
    '#seafood h2': 'Dal Mediterraneo, con tutto il carattere del mare.',
    '#service .section-tag': 'Servizio',
    '#service h2': 'Un’esperienza personale, dal primo calice all’ultima portata.',
    '#menu-section .section-tag': 'Menu',
    '#menu-section h2': 'Piatti d’autore',
    '#menu-section .menu-category:first-child h3': 'Primi Piatti',
    '#menu-section .menu-category:last-child h3': 'Secondi Piatti',
    '#our-oysters .menu-category h3': 'Selezione',
    '#our-oysters .oyster-card:nth-child(1) .oyster-card-body p:last-child':
      'Delicata, cremosa e raffinata.',
    '#our-oysters .oyster-card:nth-child(2) .oyster-card-body p:last-child':
      'Setosa, ricca e splendidamente sapida.',
    '#our-oysters .oyster-card:nth-child(3) .oyster-card-body p:last-child':
      'Pura, salmastra e raffinata nella consistenza.',
    '#oil-and-bread .info-card:nth-child(1) h3': 'PANE',
    '#oil-and-bread .info-card:nth-child(1) p':
      'Multicereale · Lievito madre · Fatto in casa · Ingredienti siciliani',
    '#oil-and-bread .info-card:nth-child(2) h3': 'OLIO',
    '#oil-and-bread .info-card:nth-child(2) p':
      'Val di Mazara DOP · EVO · Cerasuola · Biancolilla · Nocellara del Belice',
    '#meat .meat-card:nth-child(1) p:nth-of-type(1)': 'Tomahawk di Wagyu australiano',
    '#meat .meat-card:nth-child(2) p:nth-of-type(1)': 'Bistecca T-bone di bovino piemontese',
    '#meat .meat-card:nth-child(3) p:nth-of-type(1)': 'Carne di Manzetta Prussiana',
    '#meat .meat-card:nth-child(4) p:nth-of-type(1)': 'Filetto di manzo argentino',
    '#seafood .seafood-card:nth-child(1) .seafood-card-body p:last-child':
      'Vongola fresca dal gusto pulito e delicato di mare.',
    '#seafood .seafood-card:nth-child(2) .seafood-card-body p:last-child':
      'Rara vongola tartufo, dalla sapidità profonda e minerale.',
    '#seafood .seafood-card:nth-child(3) .seafood-card-body p:last-child':
      'Vongola liscia e setosa, dal finale brillante e salmastro.',
    '#seafood .seafood-card:nth-child(4) .seafood-card-body p:last-child':
      'Riccio di mare delicato, dalla consistenza ricca e cremosa.',
    '#menu-section .menu-category:first-child .menu-item:nth-of-type(1) p:first-of-type':
      '“Spaghetto con gambero rosso, burro salato, limone e caviale. Delicato, cremoso e fresco.”',
    '#menu-section .menu-category:first-child .menu-item:nth-of-type(2) p:first-of-type':
      '“Risotto con vongole, ricci di mare, zafferano ed essenza di bergamotto. Cremoso, marino e aromatico.”',
    '#menu-section .menu-category:first-child .menu-item:nth-of-type(3) p:first-of-type':
      '“Fusillone ai frutti di mare e olio al basilico. Fresco e mediterraneo.”',
    '#menu-section .menu-category:first-child .menu-item:nth-of-type(4) p:first-of-type':
      '“Cannellone alla Norma affumicato, con melanzane, pomodoro e formaggio.”',
    '#menu-section .menu-category:first-child .menu-item:nth-of-type(5) p:first-of-type':
      '“Pasta ripiena con stracotto di manzo, primo sale e zafferano. Ricca e delicata.”',
    '#menu-section .menu-category:last-child .menu-item:nth-of-type(1) p:first-of-type':
      '“Spigola con crema di scalogno, funghi Cardoncelli e olio al rosmarino.”',
    '#menu-section .menu-category:last-child .menu-item:nth-of-type(2) p:first-of-type':
      '“Ombrina con crema di finocchio, prugna e patate.”',
    '#menu-section .menu-category:last-child .menu-item:nth-of-type(3) p:first-of-type':
      '“Tonno con cavolfiore, cipolla e liquirizia.”',
    '#menu-section .menu-category:last-child .menu-item:nth-of-type(4) p:first-of-type':
      '“Filetto di manzo con bietole, jus di manzo e fonduta di Vastedda del Belice.”',
    '#menu-section .menu-category:last-child .menu-item:nth-of-type(5) p:first-of-type':
      '“Segreto di maialino iberico con carote novelle, carciofo grigliato, crumble di olive nere e jus di maiale.”',
    '#menu-section .menu-category:last-child .menu-item:nth-of-type(6) p:first-of-type':
      '“Salmone con crème fraîche, erba cipollina e caviale.”',
  },
  en: {
    title: 'Haris Notes | Restaurant',
    '.language-label': 'Language',
    '.nav-links a:nth-child(1)': 'Menu',
    '.nav-links a:nth-child(2)': 'Oil and Bread',
    '.nav-links a:nth-child(3)': 'Our Oysters',
    '.nav-links a:nth-child(4)': 'Meat',
    '.nav-links a:nth-child(5)': 'Seafood',
    '.nav-links a:nth-child(6)': 'Service',
    '#our-oysters .section-tag': 'Our Oysters',
    '#our-oysters h2': 'Freshly shucked, chilled, and served with the rhythm of the sea.',
    '#oil-and-bread .section-tag': 'Oil & Bread',
    '#oil-and-bread h2': 'From the oven and the grove, the first taste of the evening.',
    '#meat .section-tag': 'Meat',
    '#meat h2': 'Selected cuts, dry-aged and charcoal-grilled.',
    '#seafood .section-tag': 'Seafood',
    '#seafood h2': 'From the Mediterranean, with the character of the sea.',
    '#service .section-tag': 'Service',
    '#service h2': 'Dining that feels personal from the first pour to the final course.',
    '#menu-section .section-tag': 'Menu',
    '#menu-section h2': 'Signature plates',
    '#menu-section .menu-category:first-child h3': 'Primi Piatti',
    '#menu-section .menu-category:last-child h3': 'Secondo Piatti',
    '#our-oysters .menu-category h3': 'Selection',
    '#our-oysters .oyster-card:nth-child(1) .oyster-card-body p:last-child':
      'Delicate, creamy and distinctly elegant.',
    '#our-oysters .oyster-card:nth-child(2) .oyster-card-body p:last-child':
      'Silky, rich and beautifully saline.',
    '#our-oysters .oyster-card:nth-child(3) .oyster-card-body p:last-child':
      'Pure, briny and refined in texture.',
    '#oil-and-bread .info-card:nth-child(1) h3': 'BREAD',
    '#oil-and-bread .info-card:nth-child(1) p':
      'Multigrain · Sourdough · Made in house · Sicilian ingredients',
    '#oil-and-bread .info-card:nth-child(2) h3': 'OIL',
    '#oil-and-bread .info-card:nth-child(2) p':
      'Val di Mazara DOP · EVO · Cerasuola · Biancolilla · Nocellara del Belice',
    '#meat .meat-card:nth-child(1) p:nth-of-type(1)': 'Australian Wagyu Tomahawk',
    '#meat .meat-card:nth-child(2) p:nth-of-type(1)': 'Piedmontese Beef T-Bone Steak',
    '#meat .meat-card:nth-child(3) p:nth-of-type(1)': 'Manzetta Prussiana Beef',
    '#meat .meat-card:nth-child(4) p:nth-of-type(1)': 'Argentinian Beef Fillet',
    '#seafood .seafood-card:nth-child(1) .seafood-card-body p:last-child':
      'Fresh clam with a clean, delicate ocean flavour.',
    '#seafood .seafood-card:nth-child(2) .seafood-card-body p:last-child':
      'Rare sea truffle clam with a deep, mineral salinity.',
    '#seafood .seafood-card:nth-child(3) .seafood-card-body p:last-child':
      'Silky smooth clam with a bright, briny finish.',
    '#seafood .seafood-card:nth-child(4) .seafood-card-body p:last-child':
      'Delicate sea urchin with a rich, creamy texture.',
    '#menu-section .menu-category:first-child .menu-item:nth-of-type(1) p:first-of-type':
      '“Spaghetti with red prawn, salted butter, lemon and caviar. Delicate, creamy and fresh.”',
    '#menu-section .menu-category:first-child .menu-item:nth-of-type(2) p:first-of-type':
      '“Risotto with clams, sea urchin, saffron and bergamot. Creamy, marine and aromatic.”',
    '#menu-section .menu-category:first-child .menu-item:nth-of-type(3) p:first-of-type':
      '“Fusillone with seafood and basil oil. Fresh and Mediterranean.”',
    '#menu-section .menu-category:first-child .menu-item:nth-of-type(4) p:first-of-type':
      '“Smoked Cannellone alla Norma, with eggplant, tomato and cheese.”',
    '#menu-section .menu-category:first-child .menu-item:nth-of-type(5) p:first-of-type':
      '“Filled pasta with slow-braised beef, Primo Sale and saffron. Rich and delicate.”',
    '#menu-section .menu-category:last-child .menu-item:nth-of-type(1) p:first-of-type':
      '“Sea bass with shallot cream, Cardoncelli mushrooms and rosemary oil.”',
    '#menu-section .menu-category:last-child .menu-item:nth-of-type(2) p:first-of-type':
      '“Meagre with fennel cream, plum and potatoes.”',
    '#menu-section .menu-category:last-child .menu-item:nth-of-type(3) p:first-of-type':
      '“Tuna with cauliflower, onion and liquorice.”',
    '#menu-section .menu-category:last-child .menu-item:nth-of-type(4) p:first-of-type':
      '“Beef fillet with Swiss chard, beef jus and Vastedda del Belice fondue.”',
    '#menu-section .menu-category:last-child .menu-item:nth-of-type(5) p:first-of-type':
      '“Iberian pork secreto with baby carrots, grilled artichoke, black olive crumble and pork jus.”',
    '#menu-section .menu-category:last-child .menu-item:nth-of-type(6) p:first-of-type':
      '“Salmon with crème fraîche, chives and caviar.”',
  },
};

const setLanguage = (language) => {
  const translations = languageTranslations[language];
  if (!translations) return;

  document.title = translations.title;
  Object.entries(translations).forEach(([selector, text]) => {
    if (selector === 'title') return;
    document.querySelectorAll(selector).forEach((element) => {
      element.textContent = text;
    });
  });

  const utensilTranslations = {
    'Pasta fork': 'Forchetta da pasta',
    'Risotto spoon': 'Cucchiaio da risotto',
    'Fork + knife': 'Forchetta + coltello',
    'Fish fork + fish knife': 'Forchetta da pesce + coltello da pesce',
    'Fork + meat knife': 'Forchetta + coltello da carne',
  };
  document.querySelectorAll('.menu-cutlery span').forEach((element) => {
    const utensil = element.textContent.split(':').slice(1).join(':').trim();
    const translatedUtensil = language === 'it' ? utensilTranslations[utensil] : utensil;
    element.textContent = `${language === 'it' ? 'Posate consigliate' : 'Recommended cutlery'}: ${translatedUtensil}`;
  });

  document.documentElement.lang = language;
  languageButtons.forEach((button) => {
    const isActive = button.dataset.language === language;
    button.classList.toggle('active', isActive);
    button.setAttribute('aria-pressed', String(isActive));
  });
  localStorage.setItem('haris-notes-language', language);
};

languageButtons.forEach((button) => {
  button.addEventListener('click', () => setLanguage(button.dataset.language));
});

setLanguage(localStorage.getItem('haris-notes-language') || 'en');
