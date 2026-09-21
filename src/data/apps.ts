export type Game = {
  title: string;
  description: string;
  image: string;
  imageAlt: string;
};

export type StoreAvailability = {
  appStore?: string;
  googlePlay?: string;
};

export type DidactivApp = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  audience: string;
  icon: string;
  iconAlt: string;
  stores: StoreAvailability;
  games: Game[];
};

export const slove: DidactivApp = {
  slug: 'slove',
  name: 'Slove',
  tagline: 'Joacă-te cu limba română.',
  description: 'Patru jocuri scurte pentru a testa și exersa limba română, într-un ritm al tău.',
  audience: 'Pentru oricine vrea să se apropie de limba română — fără presiune și fără cont.',
  icon: '/assets/slove-icon.png',
  iconAlt: 'Simbolul Slove, un S stilizat',
  stores: {},
  games: [
    {
      title: 'Corect sau greșit?',
      description: 'Alege varianta corectă și verifică-ți intuiția gramaticală.',
      image: '/assets/screenshots/grammar.png',
      imageAlt: 'Ecran Slove pentru jocul Corect sau greșit?',
    },
    {
      title: 'Ce înseamnă?',
      description: 'Găsește definiția potrivită pentru un cuvânt și descoperă sensuri noi.',
      image: '/assets/screenshots/vocabulary.png',
      imageAlt: 'Ecran Slove pentru jocul Ce înseamnă?',
    },
    {
      title: 'Vorba vine',
      description: 'Descoperă sensul expresiilor românești în contexte ușor de recunoscut.',
      image: '/assets/screenshots/idioms.png',
      imageAlt: 'Ecran Slove pentru jocul Vorba vine',
    },
    {
      title: 'Găsește greșeala',
      description: 'Caută greșelile dintr-un text înainte să expire cele 60 de secunde.',
      image: '/assets/screenshots/spot.png',
      imageAlt: 'Ecran Slove pentru jocul Găsește greșeala',
    },
  ],
};

export const apps: DidactivApp[] = [slove];
