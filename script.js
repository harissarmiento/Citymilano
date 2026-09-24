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

requestAnimationFrame(() => {
  revealItems.forEach((item) => {
    const bounds = item.getBoundingClientRect();
    if (bounds.top < window.innerHeight && bounds.bottom > 0) {
      item.classList.add('visible');
      observer.unobserve(item);
    }
  });
});

const yearElement = document.getElementById('year');
if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

const originCards = document.querySelectorAll('.origin-card[data-origin]');
const mapModal = document.querySelector('.map-modal');
const mapFrame = document.querySelector('.origin-map');
const mapLocation = document.querySelector('.map-location');
const mapOriginType = document.querySelector('.map-origin-type');
const mapCloseButton = document.querySelector('.map-close');

const openOriginMap = (card) => {
  if (!mapModal || !mapFrame || !mapLocation) return;

  const latitude = Number(card.dataset.lat);
  const longitude = Number(card.dataset.lon);
  const origin = card.dataset.origin;
  const originType = card.dataset.originType || 'Origin map';
  if (!Number.isFinite(latitude) || !Number.isFinite(longitude) || !origin || !mapOriginType) return;

  const padding = 5;
  mapFrame.src =
    `https://www.openstreetmap.org/export/embed.html?bbox=${longitude - padding}%2C${latitude - padding}%2C` +
    `${longitude + padding}%2C${latitude + padding}&layer=mapnik&marker=${latitude}%2C${longitude}`;
  mapLocation.textContent = origin;
  mapOriginType.textContent = originType;
  mapModal.hidden = false;
  document.body.classList.add('map-open');
  mapCloseButton?.focus();
};

const closeOriginMap = () => {
  if (!mapModal || !mapFrame) return;
  mapModal.hidden = true;
  mapFrame.src = '';
  document.body.classList.remove('map-open');
};

originCards.forEach((card) => {
  card.addEventListener('click', () => openOriginMap(card));
  card.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      openOriginMap(card);
    }
  });
});

document.querySelectorAll('[data-close-map]').forEach((element) => {
  element.addEventListener('click', closeOriginMap);
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && mapModal && !mapModal.hidden) closeOriginMap();
});

const allergenTranslations = {
  en: {
    button: 'Allergen +',
    heading: 'Potential allergens',
    note: 'Please tell our team about any allergy or intolerance before ordering.',
    none: 'No common allergens listed',
    gluten: 'Gluten',
    milk: 'Milk',
    fish: 'Fish',
    crustaceans: 'Crustaceans',
    molluscs: 'Molluscs',
    eggs: 'Eggs',
    celery: 'Celery',
    mustard: 'Mustard',
    peanuts: 'Peanuts',
    soybeans: 'Soybeans',
    nuts: 'Tree nuts',
    sesame: 'Sesame',
    sulphites: 'Sulphites',
    lupin: 'Lupin',
    descriptions: {
      gluten: 'Proteins found in wheat, pasta, bread and other cereals.',
      milk: 'Milk proteins such as cream, butter, cheese and crème fraîche.',
      fish: 'Fish or fish products, including fish roe and some fish-based sauces.',
      crustaceans: 'Shellfish such as prawns, shrimp, crab and lobster.',
      molluscs: 'Shellfish such as clams, oysters, mussels and sea urchin.',
      eggs: 'Egg or ingredients made with egg, often used in fresh pasta.',
      celery: 'Celery, celeriac or celery used in a stock, sauce or jus.',
      mustard: 'Mustard seeds or mustard used in a dressing or sauce.',
      peanuts: 'Peanuts or ingredients made from peanuts.',
      soybeans: 'Soybeans or ingredients made from soy.',
      nuts: 'Tree nuts such as almonds, hazelnuts, walnuts or pistachios.',
      sesame: 'Sesame seeds or sesame oil.',
      sulphites: 'Sulphur dioxide or sulphites, sometimes used in wine or preserved ingredients.',
      lupin: 'Lupin flour, seeds or ingredients made from lupin.',
    },
  },
  it: {
    button: 'Allergeni +',
    heading: 'Possibili allergeni',
    note: 'Prima di ordinare, informa il nostro team di qualsiasi allergia o intolleranza.',
    none: 'Nessun allergene comune indicato',
    gluten: 'Glutine',
    milk: 'Latte',
    fish: 'Pesce',
    crustaceans: 'Crostacei',
    molluscs: 'Molluschi',
    eggs: 'Uova',
    celery: 'Sedano',
    mustard: 'Senape',
    peanuts: 'Arachidi',
    soybeans: 'Soia',
    nuts: 'Frutta a guscio',
    sesame: 'Sesamo',
    sulphites: 'Solfiti',
    lupin: 'Lupino',
    descriptions: {
      gluten: 'Proteine presenti in grano, pasta, pane e altri cereali.',
      milk: 'Proteine del latte come panna, burro, formaggio e crème fraîche.',
      fish: 'Pesce o prodotti ittici, compresi uova di pesce e alcune salse di pesce.',
      crustaceans: 'Crostacei come gamberi, mazzancolle, granchio e aragosta.',
      molluscs: 'Molluschi come vongole, ostriche, cozze e riccio di mare.',
      eggs: 'Uova o ingredienti a base di uova, spesso usati nella pasta fresca.',
      celery: 'Sedano o sedano rapa usato in fondo, salsa o jus.',
      mustard: 'Semi di senape o senape usati in condimenti e salse.',
      peanuts: 'Arachidi o ingredienti a base di arachidi.',
      soybeans: 'Soia o ingredienti a base di soia.',
      nuts: 'Frutta a guscio come mandorle, nocciole, noci o pistacchi.',
      sesame: 'Semi di sesamo o olio di sesamo.',
      sulphites: 'Anidride solforosa o solfiti, talvolta presenti nel vino o in ingredienti conservati.',
      lupin: 'Farina, semi o ingredienti a base di lupino.',
    },
  },
};

const allergenRules = [
  { match: 'SPAGHETTO GAMBERO ROSSO', allergens: ['gluten', 'crustaceans', 'fish', 'milk', 'eggs'] },
  { match: 'RISOTTO VONGOLE', allergens: ['molluscs', 'fish', 'milk'] },
  { match: 'FUSILLONE FRUTTI DI MARE', allergens: ['gluten', 'molluscs'] },
  { match: 'CANNELLONE ALLA NORMA', allergens: ['gluten', 'milk', 'eggs'] },
  { match: 'BOTTONE DI PASTA', allergens: ['gluten', 'milk', 'eggs'] },
  { match: 'SPIGOLA CON CREMA', allergens: ['fish', 'milk'] },
  { match: 'OMBRINA', allergens: ['fish', 'milk'] },
  { match: 'TONNO CON', allergens: ['fish'] },
  { match: 'FILETTO DI MANZO', allergens: ['milk', 'celery', 'sulphites'] },
  { match: 'SEGRETO DI MAIALINO', allergens: ['celery', 'sulphites'] },
  { match: 'SALMONE CON', allergens: ['fish', 'milk'] },
  { match: 'REGAL ORO', allergens: ['molluscs'] },
  { match: 'GORO', allergens: ['molluscs'] },
  { match: 'GILARDEAU', allergens: ['molluscs'] },
  { match: 'FINE DE CLAIRE', allergens: ['molluscs'] },
  { match: 'CLAM', allergens: ['molluscs'] },
  { match: 'SEA TRUFFLE CLAM', allergens: ['molluscs'] },
  { match: 'SMOOTH CLAM', allergens: ['molluscs'] },
  { match: 'SEA URCHIN', allergens: ['molluscs'] },
];

const getAllergensFor = (text) => {
  const rule = allergenRules.find(({ match }) => text.includes(match));
  return rule ? rule.allergens : [];
};

const allergenControls = [];
const addAllergenControl = (container, nameElement) => {
  const allergens = getAllergensFor(nameElement.textContent.trim().toUpperCase());
  const control = document.createElement('div');
  control.className = 'allergen-control';
  control.innerHTML =
    '<button class="allergen-button" type="button" aria-expanded="false"></button>' +
    '<div class="allergen-panel" hidden>' +
    '<strong class="allergen-heading"></strong>' +
    '<ul class="allergen-list"></ul>' +
    '<p class="allergen-note"></p>' +
    '</div>';

  const button = control.querySelector('.allergen-button');
  const panel = control.querySelector('.allergen-panel');
  button.addEventListener('click', (event) => {
    event.stopPropagation();
    const isOpen = !panel.hidden;
    panel.hidden = isOpen;
    button.setAttribute('aria-expanded', String(!isOpen));
  });
  control.querySelector('.allergen-list').dataset.allergens = JSON.stringify(allergens);
  container.append(control);
  allergenControls.push(control);
};

document.querySelectorAll('.menu-item').forEach((item) => {
  const name = item.querySelector('.menu-name');
  const content = item.querySelector('.menu-item-content') || item;
  if (name) addAllergenControl(content, name);
});

document.querySelectorAll('.oyster-card, .seafood-card').forEach((card) => {
  const name = card.querySelector('h3, h4');
  if (name) addAllergenControl(card.querySelector('.oyster-card-body, .seafood-card-body, .meat-card-body'), name);
});

const languageButtons = document.querySelectorAll('.language-button');
const languageTranslations = {
  it: {
    title: 'Guidelines | Ristorante',
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
    '#service h2': 'Linee guida del servizio agli ospiti',
    '#service .service-list': [
      'Accogliere l’ospite e accompagnarlo al tavolo.',
      'Una volta accomodato, portare il menu e chiedere se desidera acqua naturale o frizzante.',
      'Chiedere se desidera consultare la carta dei vini.',
      'Consigliare i piatti del menu e indicare quali carni e pesci sono disponibili.',
      'Quando gli ospiti ordinano, informare il Demi Chef de Rang o il membro aggiuntivo della squadra, così da preparare le posate corrette per ogni piatto.',
      'Preparare il pane e l’olio d’oliva per il servizio, spiegandone la provenienza.',
      'Servire l’entrée o l’amuse-bouche e presentare il piatto agli ospiti.',
      'Quando gli ospiti terminano l’entrée o l’amuse-bouche, sparecchiare e preparare le posate corrette per la portata successiva.',
      'Servire ogni portata e spiegare brevemente il piatto, compreso il metodo di preparazione.',
      'Controllare regolarmente che tutto proceda bene e chiedere se hanno bisogno di qualcosa.',
      'Far sentire gli ospiti a proprio agio e come a casa durante tutta la visita.',
      'Al termine del pasto, chiedere se desiderano vedere il menu dei dessert.',
      'Consigliare i dessert e rispondere a eventuali domande.',
      'Portare la piccola pasticceria quando ordinano il dessert o mentre stanno decidendo.',
      'Essere professionali, attenti e accoglienti durante tutto il servizio.',
    ],
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
    '#our-oysters .oyster-card:nth-child(4) .oyster-card-body p:last-child':
      'Delicata, leggermente minerale e dolcemente sapida.',
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
    title: 'Guidelines | Restaurant',
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
    '#service h2': 'Guest Service Guidelines',
    '#service .service-list': [
      'Welcome the guest and show them to their table.',
      'Once they are seated, bring them the menu and ask whether they would like still or sparkling water.',
      'Ask if they would like to see the wine list.',
      'Recommend dishes from the menu and tell them which meat and fish are available.',
      'When the guests order, inform the Demi Chef de Rang or extra team member so they can prepare the correct cutlery for each dish.',
      'Prepare the bread and olive oil for service, and explain where they come from.',
      'Serve the entrée or amuse-bouche and explain the dish to the guests.',
      'When guests finish the entrée or amuse-bouche, clear the plates and prepare the correct cutlery for the next course they ordered.',
      'Serve each course and briefly explain the dish, including how it is prepared.',
      'Check in with guests regularly to make sure everything is okay and ask if they need anything.',
      'Make guests feel comfortable and at home throughout their visit.',
      'When guests finish their meal, ask if they would like to see the dessert menu.',
      'Recommend desserts from the menu and answer any questions about them.',
      'Bring the petit fours when guests order dessert or while they are deciding.',
      'Be professional, attentive, and welcoming throughout the entire service.',
    ],
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
    '#our-oysters .oyster-card:nth-child(4) .oyster-card-body p:last-child':
      'Delicate, lightly mineral and gently saline.',
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
    if (selector === '#service .service-list') {
      document.querySelectorAll(`${selector} li`).forEach((element, index) => {
        const textElement = element.querySelector('span');
        if (textElement) {
          textElement.textContent = text[index];
        } else {
          element.textContent = text[index];
        }
      });
      return;
    }
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

  const allergenText = allergenTranslations[language];
  allergenControls.forEach((control) => {
    control.querySelector('.allergen-button').textContent = allergenText.button;
    control.querySelector('.allergen-heading').textContent = allergenText.heading;
    control.querySelector('.allergen-note').textContent = allergenText.note;
    const list = control.querySelector('.allergen-list');
    const allergens = JSON.parse(list.dataset.allergens || '[]');
    list.innerHTML = allergens.length
      ? allergens
          .map(
            (allergen) =>
              `<li><strong>${allergenText[allergen]}</strong><span>${allergenText.descriptions[allergen]}</span></li>`
          )
          .join('')
      : `<li>${allergenText.none}</li>`;
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

if (window.location.hash) {
  requestAnimationFrame(() => {
    const target = document.querySelector(window.location.hash);
    if (target) target.scrollIntoView({ block: 'start' });
  });
}
