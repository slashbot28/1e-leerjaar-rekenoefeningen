export type BlokId = 1 | 2;

export type ExerciseDomain =
  | 'alles'
  | 'getallen'
  | 'bewerkingen'
  | 'vergelijken'
  | 'meten'
  | 'logica';

export interface Exercise {
  id: string;
  blok: BlokId;
  category: ExerciseCategory;
  title: string;
  instruction: string;
  speechText: string;
  type:
    | 'choice-number'
    | 'choice-image'
    | 'compare'
    | 'enough'
    | 'row-position'
    | 'pattern-complete'
    | 'pattern-spot-error'
    | 'order-length'
    | 'one-more-less'
    | 'spatial-direction'
    | 'plus-minus'
    | 'compare-equal'
    | 'crocodile-compare'
    | 'equation-addition'
    | 'number-line'
    | 'order-volume'
    | 'order-mass'
    | 'balance-scale'
    | 'pixel-grid'
    | 'subitizing-tenframe';
  visual: {
    kind: string;
    items?: string[];
    count?: number;
    subtext?: string;
    left?: { label: string; count: number; icon: string; items: string[] };
    right?: { label: string; count: number; icon: string; items: string[] };
    rowItems?: { id: number; icon: string; label: string }[];
    pattern?: string[];
    candidates?: string[];
    lengths?: { id: number; label: string; heightPercent: number; icon: string }[];
    targetPos?: string;
    targetProp?: string;
    detail?: string;
    story?: {
      sceneIcon: string;
      actionText: string;
      isPlus: boolean;
      itemsLeft?: string[];
      itemsAction?: string[];
    };
    equation?: {
      part1: number;
      part2: number;
      operation: '+' | '-';
      icon1?: string;
      icon2?: string;
      label1?: string;
      label2?: string;
      showCommutative?: boolean;
    };
    numberLine?: {
      min: number;
      max: number;
      missingPos: number;
      curved?: boolean;
    };
    volumeCups?: {
      id: number;
      label: string;
      percentFull: number;
      liquidColor?: string;
    }[];
    massItems?: {
      id: number;
      label: string;
      weightRank: number;
      icon: string;
    }[];
    balance?: {
      leftItem: { icon: string; label: string; weight: number };
      rightItem: { icon: string; label: string; weight: number };
      tilted: 'left' | 'right' | 'balanced';
      question: 'heaviest' | 'lightest' | 'balanced';
    };
    pixelGrid?: {
      codeText: string;
      targetCount: number;
      totalCells: number;
      color: string;
      themeIcon?: string;
    };
    tenFrame?: {
      filled: number;
      total: number;
      itemIcon: string;
    };
    chocolate?: {
      pieces: number;
    };
  };
  options?: (number | string)[];
  correctAnswer: any;
  hint?: string;
}

export type ExerciseCategory =
  // Blok 1
  | 'tellen'
  | 'meer-minder'
  | 'een-meer-minder'
  | 'rangtelwoorden'
  | 'ruimte-richting'
  | 'patronen'
  | 'lengte-orden'
  | 'schrijven'
  // Blok 2 (100% digitaal op scherm, geen papieren werkboek nodig)
  | 'b2-getal-0'
  | 'b2-getal-5-6'
  | 'b2-erbij-eraf'
  | 'b2-optellen'
  | 'b2-gelijk-ongelijk'
  | 'b2-krokodillentekens'
  | 'b2-getallenas'
  | 'b2-kwadraatbeelden'
  | 'b2-inhoud-massa'
  | 'b2-pixel-herhaling';

export interface CategoryMeta {
  id: ExerciseCategory;
  blok: BlokId;
  domain: ExerciseDomain;
  title: string;
  shortTitle: string;
  badge: string;
  color: string;
  bgLight: string;
  borderColor: string;
  iconName: string;
  description: string;
  pageRef: string;
}

export const CATEGORIES: CategoryMeta[] = [
  // ==========================================
  // BLOK 1 CATEGORIES (100% op scherm)
  // ==========================================
  {
    id: 'tellen',
    blok: 1,
    domain: 'getallen',
    title: 'Tellen tot en met 6',
    shortTitle: 'Tellen 1-6',
    badge: 'Getallenkennis',
    color: 'from-amber-500 to-orange-500',
    bgLight: 'bg-amber-50 hover:bg-amber-100/70',
    borderColor: 'border-amber-300',
    iconName: 'Hash',
    description: 'Tel de voorwerpen en stippen op de dobbelsteen (1 t.e.m. 6)',
    pageRef: '100% Digitaal op scherm',
  },
  {
    id: 'meer-minder',
    blok: 1,
    domain: 'vergelijken',
    title: 'Meer, Minder of Evenveel?',
    shortTitle: 'Meer & Minder',
    badge: 'Vergelijken',
    color: 'from-blue-500 to-cyan-500',
    bgLight: 'bg-blue-50 hover:bg-blue-100/70',
    borderColor: 'border-blue-300',
    iconName: 'Scale',
    description: 'Vergelijk groepjes en controleer: "Zijn er genoeg?"',
    pageRef: '100% Digitaal op scherm',
  },
  {
    id: 'een-meer-minder',
    blok: 1,
    domain: 'getallen',
    title: '1 Meer en 1 Minder (+1 / -1)',
    shortTitle: '1 Meer / Minder',
    badge: 'Buren',
    color: 'from-emerald-500 to-teal-500',
    bgLight: 'bg-emerald-50 hover:bg-emerald-100/70',
    borderColor: 'border-emerald-300',
    iconName: 'PlusMinus',
    description: 'Zoek de getallenburen: wat is eentje minder en eentje meer?',
    pageRef: '100% Digitaal op scherm',
  },
  {
    id: 'rangtelwoorden',
    blok: 1,
    domain: 'getallen',
    title: 'Waar in de rij? (Rangtelwoorden)',
    shortTitle: 'In de rij',
    badge: 'Rangorde',
    color: 'from-purple-500 to-pink-500',
    bgLight: 'bg-purple-50 hover:bg-purple-100/70',
    borderColor: 'border-purple-300',
    iconName: 'ListOrdered',
    description: 'Eerste, tweede, middelste, voorlaatste en laatste in de rij',
    pageRef: '100% Digitaal op scherm',
  },
  {
    id: 'ruimte-richting',
    blok: 1,
    domain: 'logica',
    title: 'Ruimte & Richting (Links, Rechts, Boven)',
    shortTitle: 'Links & Rechts',
    badge: 'Oriëntatie',
    color: 'from-rose-500 to-red-500',
    bgLight: 'bg-rose-50 hover:bg-rose-100/70',
    borderColor: 'border-rose-300',
    iconName: 'Compass',
    description: 'Links en rechts met het handje, boven, onder, in en op',
    pageRef: '100% Digitaal op scherm',
  },
  {
    id: 'patronen',
    blok: 1,
    domain: 'logica',
    title: 'Patronen Voortzetten & Fouten',
    shortTitle: 'Patronen',
    badge: 'Patronen',
    color: 'from-indigo-500 to-violet-500',
    bgLight: 'bg-indigo-50 hover:bg-indigo-100/70',
    borderColor: 'border-indigo-300',
    iconName: 'Sparkles',
    description: 'Maak de rij met vormen of kleuren af en zoek de foute figuur',
    pageRef: '100% Digitaal op scherm',
  },
  {
    id: 'lengte-orden',
    blok: 1,
    domain: 'meten',
    title: 'Lengtes: Van Kort naar Lang',
    shortTitle: 'Kort naar Lang',
    badge: 'Meten',
    color: 'from-amber-600 to-yellow-600',
    bgLight: 'bg-yellow-50 hover:bg-yellow-100/70',
    borderColor: 'border-yellow-400',
    iconName: 'Ruler',
    description: 'Geef nummers 1, 2 en 3 van het kortste naar het langste',
    pageRef: '100% Digitaal op scherm',
  },
  {
    id: 'schrijven',
    blok: 1,
    domain: 'getallen',
    title: 'Cijfers Schrijven & Overtrekken',
    shortTitle: 'Cijfer Schrijven',
    badge: 'Schrijven',
    color: 'from-green-500 to-emerald-600',
    bgLight: 'bg-green-50 hover:bg-green-100/70',
    borderColor: 'border-green-300',
    iconName: 'PenTool',
    description: 'Volg de pijlen met de vinger of muis en schrijf de cijfers 1 tot 6',
    pageRef: '100% Digitaal op scherm',
  },

  // ==========================================
  // BLOK 2 CATEGORIES (100% op scherm)
  // ==========================================
  {
    id: 'b2-getal-0',
    blok: 2,
    domain: 'getallen',
    title: 'Het Getal 0 (Niets & Leeg)',
    shortTitle: 'Het Getal 0',
    badge: 'Getal 0',
    color: 'from-blue-500 to-indigo-600',
    bgLight: 'bg-blue-50 hover:bg-blue-100/70',
    borderColor: 'border-blue-300',
    iconName: 'Circle',
    description: 'Lege vissenkom, leeg vogelkooitje en het cijfer 0 leren schrijven',
    pageRef: '100% Digitaal op scherm',
  },
  {
    id: 'b2-getal-5-6',
    blok: 2,
    domain: 'getallen',
    title: 'De Getallen 5 en 6',
    shortTitle: 'Getallen 5 & 6',
    badge: 'Getallen 5 & 6',
    color: 'from-amber-500 to-orange-600',
    bgLight: 'bg-amber-50 hover:bg-amber-100/70',
    borderColor: 'border-amber-300',
    iconName: 'Hash',
    description: '5 vingers aan een hand, 6 insectenpoten en cijfers overtrekken',
    pageRef: '100% Digitaal op scherm',
  },
  {
    id: 'b2-erbij-eraf',
    blok: 2,
    domain: 'bewerkingen',
    title: 'Erbij (+) of Eraf (-)?',
    shortTitle: 'Erbij of Eraf',
    badge: 'Plus & Min',
    color: 'from-rose-500 to-red-600',
    bgLight: 'bg-rose-50 hover:bg-rose-100/70',
    borderColor: 'border-rose-300',
    iconName: 'PlusMinus',
    description: 'Rekenverhalen: kindjes op de bus, paddenstoelen plukken, spaarvarken',
    pageRef: '100% Digitaal op scherm',
  },
  {
    id: 'b2-optellen',
    blok: 2,
    domain: 'bewerkingen',
    title: 'Optellen tot en met 6 (+)',
    shortTitle: 'Optellen tot 6',
    badge: 'Optellen',
    color: 'from-violet-500 to-purple-600',
    bgLight: 'bg-violet-50 hover:bg-violet-100/70',
    borderColor: 'border-violet-300',
    iconName: 'Calculator',
    description: '4 en 2 is 6, wisseleigenschap (5+1 en 1+5) en sommen noteren',
    pageRef: '100% Digitaal op scherm',
  },
  {
    id: 'b2-gelijk-ongelijk',
    blok: 2,
    domain: 'vergelijken',
    title: 'Gelijk (=) of Niet Gelijk (≠)',
    shortTitle: 'Gelijk = en ≠',
    badge: 'Vergelijken',
    color: 'from-cyan-500 to-blue-600',
    bgLight: 'bg-cyan-50 hover:bg-cyan-100/70',
    borderColor: 'border-cyan-300',
    iconName: 'Equal',
    description: 'Evenveel (=) of niet evenveel (≠) met hondjes, katjes en stippen',
    pageRef: '100% Digitaal op scherm',
  },
  {
    id: 'b2-krokodillentekens',
    blok: 2,
    domain: 'vergelijken',
    title: 'Krokodillentekens (< en >)',
    shortTitle: 'Krokodil < en >',
    badge: 'Krokodillentekens',
    color: 'from-emerald-600 to-green-700',
    bgLight: 'bg-emerald-50 hover:bg-emerald-100/70',
    borderColor: 'border-emerald-300',
    iconName: 'Crocodile',
    description: 'De hongerige krokodil kiest het meeste! Kleiner dan (<) en groter dan (>)',
    pageRef: '100% Digitaal op scherm',
  },
  {
    id: 'b2-getallenas',
    blok: 2,
    domain: 'getallen',
    title: 'Getallenas & Ordenen (0-6)',
    shortTitle: 'Getallenas 0-6',
    badge: 'Getallenas',
    color: 'from-sky-500 to-cyan-600',
    bgLight: 'bg-sky-50 hover:bg-sky-100/70',
    borderColor: 'border-sky-300',
    iconName: 'ArrowRight',
    description: 'Getallenas aanvullen, vlaggenlijnen en getallen van 0 tot 6 ordenen',
    pageRef: '100% Digitaal op scherm',
  },
  {
    id: 'b2-kwadraatbeelden',
    blok: 2,
    domain: 'getallen',
    title: 'Kwadraatbeelden & Tienveld',
    shortTitle: 'Kwadraatbeelden',
    badge: 'Flitsbeelden',
    color: 'from-amber-600 to-yellow-600',
    bgLight: 'bg-amber-50 hover:bg-amber-100/70',
    borderColor: 'border-amber-300',
    iconName: 'LayoutGrid',
    description: 'Chocoladerepen met blokjes, eierdozen en bakken vlot herkennen tot 6',
    pageRef: '100% Digitaal op scherm',
  },
  {
    id: 'b2-inhoud-massa',
    blok: 2,
    domain: 'meten',
    title: 'Inhoud & Massa (Licht/Zwaar)',
    shortTitle: 'Inhoud & Massa',
    badge: 'Meten & Wegen',
    color: 'from-teal-500 to-emerald-600',
    bgLight: 'bg-teal-50 hover:bg-teal-100/70',
    borderColor: 'border-teal-300',
    iconName: 'Scale',
    description: 'Glazen van leeg naar vol, veer vs baksteen en de balans die doorbuigt',
    pageRef: '100% Digitaal op scherm',
  },
  {
    id: 'b2-pixel-herhaling',
    blok: 2,
    domain: 'logica',
    title: 'Pixeltekenen & Herhaling Blok 2',
    shortTitle: 'Pixel & Herhaling',
    badge: 'Herhaling',
    color: 'from-pink-500 to-rose-600',
    bgLight: 'bg-pink-50 hover:bg-pink-100/70',
    borderColor: 'border-pink-300',
    iconName: 'CheckCircle2',
    description: 'Vakjes kleuren met getallencode en de grote herhaling van Blok 2',
    pageRef: '100% Digitaal op scherm',
  },
];

export const EXERCISES: Exercise[] = [
  // ==========================================
  // BLOK 1 OEFENINGEN (100% digitaal op scherm)
  // ==========================================
  {
    id: 'tel-1',
    blok: 1,
    category: 'tellen',
    title: 'Vissen in de bokaal',
    instruction: 'Hoeveel vissen zwemmen er in de kom? Klik op het juiste getal.',
    speechText: 'Hoeveel vissen zwemmen er in de kom op het scherm? Tel ze en klik op het juiste getal!',
    type: 'choice-number',
    visual: {
      kind: 'fish-jar',
      count: 3,
      items: ['🐠', '🐟', '🐡'],
      detail: 'Kom met 3 vissen',
    },
    options: [1, 2, 3, 4, 5, 6],
    correctAnswer: 3,
    hint: 'Wijs ze één voor één aan met je vinger of muis.',
  },
  {
    id: 'tel-2',
    blok: 1,
    category: 'tellen',
    title: 'Appels in de boomgaard',
    instruction: 'Hoeveel rode appels tel je? Klik op het juiste cijfer.',
    speechText: 'Hoeveel rode appels zie je hier op het scherm? Tel ze rustig en klik op het cijfer.',
    type: 'choice-number',
    visual: {
      kind: 'grid-items',
      count: 5,
      items: ['🍎', '🍎', '🍎', '🍎', '🍎'],
    },
    options: [2, 3, 4, 5, 6],
    correctAnswer: 5,
    hint: 'Vijf appels: 1, 2, 3, 4, 5!',
  },
  {
    id: 'tel-3',
    blok: 1,
    category: 'tellen',
    title: 'Dobbelsteen stippenbeeld',
    instruction: 'Welk getal hoort bij deze stippen op de dobbelsteen?',
    speechText: 'Kijk naar het stippenbeeld op het scherm. Welk cijfer hoort hierbij?',
    type: 'choice-number',
    visual: {
      kind: 'dice',
      count: 4,
    },
    options: [2, 3, 4, 5],
    correctAnswer: 4,
    hint: 'Vier stippen, twee links en twee rechts: 4.',
  },
  {
    id: 'tel-4',
    blok: 1,
    category: 'tellen',
    title: 'Beren in de klas',
    instruction: 'Hoeveel knuffelberen zie je op het scherm? Tel en klik.',
    speechText: 'Kijk naar het scherm. Hoeveel knuffelberen zie je?',
    type: 'choice-number',
    visual: {
      kind: 'grid-items',
      count: 2,
      items: ['🧸', '🧸'],
    },
    options: [1, 2, 3, 4],
    correctAnswer: 2,
    hint: 'Eén beer, twee beren!',
  },
  {
    id: 'tel-5',
    blok: 1,
    category: 'tellen',
    title: 'Dobbelsteen zes',
    instruction: 'Welk getal zie je op deze dobbelsteen?',
    speechText: 'Hoeveel stippen staan er op deze dobbelsteen?',
    type: 'choice-number',
    visual: {
      kind: 'dice',
      count: 6,
    },
    options: [3, 4, 5, 6],
    correctAnswer: 6,
    hint: 'Twee rijen van drie stippen is zes: 6!',
  },
  {
    id: 'vergelijk-1',
    blok: 1,
    category: 'meer-minder',
    title: 'Wie heeft er MEER?',
    instruction: 'Kijk naar de twee groepjes. Klik op het groepje met de MEESTE spullen!',
    speechText: 'Waar zie je er MEER? Klik op het vakje met de meeste spullen.',
    type: 'compare',
    visual: {
      kind: 'compare-groups',
      left: { label: 'Links: Eenden', count: 4, icon: '🦆', items: ['🦆', '🦆', '🦆', '🦆'] },
      right: { label: 'Rechts: Kikkers', count: 2, icon: '🐸', items: ['🐸', '🐸'] },
    },
    correctAnswer: 'left',
    hint: 'Vier eenden is meer dan twee kikkers! Klik op de linkerkant.',
  },
  {
    id: 'vergelijk-2',
    blok: 1,
    category: 'meer-minder',
    title: 'Zijn er genoeg mutsen?',
    instruction: 'Er zijn 4 kinderen en 4 warme mutsen. Heeft elk kind een muts?',
    speechText: 'Kijk goed: zijn er genoeg mutsen voor alle kinderen? Klik op JA of NEE.',
    type: 'enough',
    visual: {
      kind: 'enough-check',
      left: { label: 'Kinderen', count: 4, icon: '🧒', items: ['👧', '👦', '👧', '👦'] },
      right: { label: 'Mutsen', count: 4, icon: '🧢', items: ['🧢', '🧢', '🧢', '🧢'] },
    },
    options: ['ja', 'nee'],
    correctAnswer: 'ja',
    hint: 'Er zijn 4 kinderen en 4 mutsen: dat is precies evenveel!',
  },
  {
    id: 'een-meer-minder-1',
    blok: 1,
    category: 'een-meer-minder',
    title: 'Eén vogel vliegt weg (-1)',
    instruction: 'Er zaten 3 vogels op een tak. Eentje vliegt weg. Hoeveel blijven er over?',
    speechText: 'Er zaten 3 vogels op een tak. Eentje vliegt weg. Hoeveel vogels blijven er over?',
    type: 'choice-number',
    visual: {
      kind: 'math-story',
      count: 2,
      items: ['🐦', '🐦'],
      detail: '3 vogels min 1 vogel = ?',
    },
    options: [1, 2, 3, 4],
    correctAnswer: 2,
    hint: 'Als er 1 minder is dan 3, blijven er 2 over.',
  },
  {
    id: 'een-meer-minder-5',
    blok: 1,
    category: 'een-meer-minder',
    title: 'Getallenburen van 5',
    instruction: 'Kijk naar het getal 5. Wat is 1 minder en wat is 1 meer?',
    speechText: 'Welk cijfer komt net vóór de vijf, en welk cijfer komt net ná de vijf?',
    type: 'one-more-less',
    visual: {
      kind: 'neighbors',
      count: 5,
    },
    correctAnswer: { less: 4, more: 6 },
    hint: '4 ... 5 ... 6!',
  },
  {
    id: 'rij-1',
    blok: 1,
    category: 'rangtelwoorden',
    title: 'Wie staat er VOORAAN?',
    instruction: 'De dieren lopen in een rij naar school. Klik op het EERSTE dier!',
    speechText: 'De dieren stappen in een rij naar links. Wie is het EERSTE dier vooraan in de rij?',
    type: 'row-position',
    visual: {
      kind: 'row',
      rowItems: [
        { id: 1, icon: '🐶', label: 'Hondje' },
        { id: 2, icon: '🐱', label: 'Katje' },
        { id: 3, icon: '🐰', label: 'Konijn' },
        { id: 4, icon: '🐢', label: 'Schildpad' },
      ],
      targetPos: 'eerste',
    },
    correctAnswer: 1,
    hint: 'Het hondje loopt helemaal vooraan!',
  },
  {
    id: 'ruimte-1',
    blok: 1,
    category: 'ruimte-richting',
    title: 'Links of Rechts?',
    instruction: 'Met welke hand zwaait de jongen? Kijk naar het handje met de open duim.',
    speechText: 'Maak met je linkerhand een L. Welke kant is links en welke rechts?',
    type: 'spatial-direction',
    visual: {
      kind: 'direction-choice',
      targetProp: 'links',
    },
    options: ['Links', 'Rechts'],
    correctAnswer: 'Links',
    hint: 'Je linkerhand vormt de letter L!',
  },
  {
    id: 'patroon-1',
    blok: 1,
    category: 'patronen',
    title: 'Kralenketting afmaken',
    instruction: 'Rood, Blauw, Rood, Blauw... Welke kraal komt er nu?',
    speechText: 'Kijk naar de ketting op het scherm: rood, blauw, rood, blauw. Welke kraal hoort er nu?',
    type: 'pattern-complete',
    visual: {
      kind: 'color-pattern',
      pattern: ['🔴', '🔵', '🔴', '🔵', '❓'],
      candidates: ['🔴', '🔵', '🟢', '🟡'],
    },
    correctAnswer: '🔴',
    hint: 'Na een blauwe kraal komt weer een rode kraal!',
  },
  {
    id: 'lengte-1',
    blok: 1,
    category: 'lengte-orden',
    title: 'Rupsen van kort naar lang',
    instruction: 'Geef de rupsen nummers 1, 2 en 3 van het KORTSTE naar het LANGSTE.',
    speechText: 'Zet de rupsen in de juiste volgorde van kort naar lang. 1 is het kortst, 3 is het langst.',
    type: 'order-length',
    visual: {
      kind: 'caterpillars',
      lengths: [
        { id: 1, label: 'Groene rups', heightPercent: 40, icon: '🐛' },
        { id: 2, label: 'Gele rups', heightPercent: 90, icon: '🐛' },
        { id: 3, label: 'Blauwe rups', heightPercent: 65, icon: '🐛' },
      ],
    },
    correctAnswer: [1, 3, 2],
    hint: 'De groene is 1 (kortst), de blauwe is 2 (middel), de gele is 3 (langst).',
  },
  {
    id: 'schrijf-1',
    blok: 1,
    category: 'schrijven',
    title: 'Cijfer 1 schrijven',
    instruction: 'Begin bij de groene stip en trek het cijfer 1 over op het scherm!',
    speechText: 'Zet je vinger of muis op de groene stip en trek het cijfer 1 netjes over.',
    type: 'choice-number',
    visual: {
      kind: 'tracing',
    },
    correctAnswer: 1,
    hint: 'Eerst schuin omhoog naar het puntje, en dan recht omlaag naar de lijn.',
  },

  // ==========================================================================
  // BLOK 2 OEFENINGEN (100% ZELFSTANDIG DIGITAAL OP SCHERM - GEEN BOEK NODIG)
  // ==========================================================================

  // --- HET GETAL 5 EN 6 ---
  {
    id: 'b2-getal5-1',
    blok: 2,
    category: 'b2-getal-5-6',
    title: 'Vijf vingers aan je hand',
    instruction: 'Kijk naar de hand op het scherm. Hoeveel vingers heeft één hand? Tel en klik.',
    speechText: 'Kijk naar de hand op het scherm. Hoeveel vingers heeft één hand?',
    type: 'choice-number',
    visual: {
      kind: 'grid-items',
      count: 5,
      items: ['🖐️'],
      detail: '1 hand = 5 vingers (duim, wijsvinger, middelvinger, ringvinger, pink)',
    },
    options: [3, 4, 5, 6],
    correctAnswer: 5,
    hint: 'Eén volle hand heeft altijd 5 vingers!',
  },
  {
    id: 'b2-getal5-2',
    blok: 2,
    category: 'b2-getal-5-6',
    title: 'Bloemen in de vaas',
    instruction: 'Kijk naar de vazen op het scherm. Welke vaas heeft er precies VIJF bloemen?',
    speechText: 'Zoek de vaas op het scherm met precies 5 bloemen.',
    type: 'compare',
    visual: {
      kind: 'compare-groups',
      left: { label: 'Vaas A: 3 bloemen', count: 3, icon: '🌸', items: ['🌸', '🌸', '🌸'] },
      right: { label: 'Vaas B: 5 bloemen', count: 5, icon: '🌸', items: ['🌸', '🌸', '🌸', '🌸', '🌸'] },
    },
    correctAnswer: 'right',
    hint: 'Tel de bloemen: Vaas B heeft er 1, 2, 3, 4, 5!',
  },
  {
    id: 'b2-getal5-3',
    blok: 2,
    category: 'b2-getal-5-6',
    title: 'Dobbelsteenbeeld van 5',
    instruction: 'Herken het stippenbeeld: 4 stippen op de hoeken en 1 in het midden. Welk cijfer is dit?',
    speechText: 'Vier stippen op de hoeken en eentje in het midden. Welk getal hoort bij dit dobbelsteenbeeld?',
    type: 'choice-number',
    visual: {
      kind: 'dice',
      count: 5,
    },
    options: [3, 4, 5, 6],
    correctAnswer: 5,
    hint: 'Dit is het kwadraatbeeld van 5!',
  },
  {
    id: 'b2-getal5-4',
    blok: 2,
    category: 'b2-getal-5-6',
    title: 'Cijfer 5 overtrekken',
    instruction: 'Overtrek het cijfer 5 op het scherm! Begin bij de groene stip.',
    speechText: 'Begin bij de groene stip en schrijf het cijfer 5 netjes op de lijn.',
    type: 'choice-number',
    visual: {
      kind: 'tracing',
    },
    correctAnswer: 5,
    hint: 'Het cijfer 5 heeft een dikke buik en een petje op!',
  },
  {
    id: 'b2-getal6-1',
    blok: 2,
    category: 'b2-getal-5-6',
    title: 'Zes poten van het insect',
    instruction: 'Een insect heeft 3 poten links en 3 poten rechts. Hoeveel poten zijn dat samen?',
    speechText: 'Kijk naar het insect op het scherm. Drie poten links en drie rechts. Hoeveel poten samen?',
    type: 'choice-number',
    visual: {
      kind: 'grid-items',
      count: 6,
      items: ['🐜'],
      detail: '3 poten + 3 poten = 6 poten',
    },
    options: [4, 5, 6, 7],
    correctAnswer: 6,
    hint: '3 en 3 is 6!',
  },
  {
    id: 'b2-getal6-2',
    blok: 2,
    category: 'b2-getal-5-6',
    title: 'Eierdoos met zes eieren',
    instruction: 'In een doos passen eieren: 3 boven en 3 onder. Hoeveel eieren zitten er in een volle doos?',
    speechText: 'Tel de eieren in de doos op het scherm: drie bovenaan en drie onderaan.',
    type: 'choice-number',
    visual: {
      kind: 'ten-frame-tray',
      tenFrame: {
        filled: 6,
        total: 6,
        itemIcon: '🥚',
      },
    },
    options: [4, 5, 6],
    correctAnswer: 6,
    hint: 'Drie en drie is samen 6 eieren!',
  },
  {
    id: 'b2-getal6-3',
    blok: 2,
    category: 'b2-getal-5-6',
    title: 'Stippen op het lieveheersbeestje',
    instruction: 'Het lieveheersbeestje heeft 3 stippen links en 3 rechts. Hoeveel stippen samen?',
    speechText: 'Drie stippen links en drie stippen rechts op het lieveheersbeestje. Hoeveel stippen samen?',
    type: 'choice-number',
    visual: {
      kind: 'grid-items',
      count: 6,
      items: ['🐞'],
      detail: '3 stippen + 3 stippen = 6 stippen',
    },
    options: [4, 5, 6],
    correctAnswer: 6,
    hint: '3 + 3 = 6!',
  },
  {
    id: 'b2-getal6-4',
    blok: 2,
    category: 'b2-getal-5-6',
    title: 'Cijfer 6 overtrekken',
    instruction: 'Overtrek het cijfer 6 op het scherm! Begin bovenaan bij de groene stip.',
    speechText: 'Begin bij de groene startstip en schrijf het cijfer 6.',
    type: 'choice-number',
    visual: {
      kind: 'tracing',
    },
    correctAnswer: 6,
    hint: 'Van boven naar beneden en een krul erin: 6!',
  },

  // --- HET GETAL 0 ---
  {
    id: 'b2-getal0-1',
    blok: 2,
    category: 'b2-getal-0',
    title: 'De lege vissenkom',
    instruction: 'Alle vissen zijn weggespringd! Hoeveel vissen zitten er nu nog in de bokaal?',
    speechText: 'Kijk naar de vissenkom op het scherm. Er zit geen enkele vis in. Welk getal hoort bij leeg?',
    type: 'choice-number',
    visual: {
      kind: 'empty-zero',
      detail: 'Lege vissenkom: geen vissen = 0',
      items: [],
    },
    options: [0, 1, 2, 3],
    correctAnswer: 0,
    hint: 'Als er niets in zit, is het cijfer 0 (nul)!',
  },
  {
    id: 'b2-getal0-2',
    blok: 2,
    category: 'b2-getal-0',
    title: 'Het lege vogelkooitje',
    instruction: 'Het deurtje van de kooi stond open. De vogel vloog weg! Hoeveel vogels zitten er in de kooi?',
    speechText: 'De kooi op het scherm is helemaal leeg. Welk cijfer is dat?',
    type: 'choice-number',
    visual: {
      kind: 'empty-zero',
      detail: 'Leeg vogelkooitje: 0 vogels',
      items: [],
    },
    options: [0, 1, 2],
    correctAnswer: 0,
    hint: 'Nul betekent: er is er geen één meer!',
  },
  {
    id: 'b2-getal0-3',
    blok: 2,
    category: 'b2-getal-0',
    title: 'De ballon vloog weg',
    instruction: 'Oeps! De ballon vloog hoog in de lucht weg. Hoeveel ballonnen heeft het kindje nog vast?',
    speechText: 'De ballon is weggevlogen. Hoeveel ballonnen heeft het kindje nog in zijn hand?',
    type: 'choice-number',
    visual: {
      kind: 'empty-zero',
      detail: 'Geen ballonnen meer = 0',
      items: [],
    },
    options: [0, 1, 2, 3],
    correctAnswer: 0,
    hint: 'De hand is leeg: 0 ballonnen!',
  },
  {
    id: 'b2-getal0-4',
    blok: 2,
    category: 'b2-getal-0',
    title: 'Cijfer 0 overtrekken',
    instruction: 'Schrijf het cijfer 0 op het scherm! Begin bovenaan en draai een mooi rondje.',
    speechText: 'Zet je vinger op de groene stip en teken een mooie ronde nul.',
    type: 'choice-number',
    visual: {
      kind: 'tracing',
    },
    correctAnswer: 0,
    hint: 'Net als een lekker rond eitje: 0!',
  },

  // --- REKENVERHALEN ERBIJ (+) OF ERAF (-) ---
  {
    id: 'b2-verhaal-1',
    blok: 2,
    category: 'b2-erbij-eraf',
    title: 'Kindjes stappen in de bus',
    instruction: 'Aan de bushalte stappen 2 kinderen IN de bus. Is dat ERBIJ (+) of ERAF (-)?',
    speechText: 'De bus stopt en twee kinderen stappen in. Komt er iets bij (+), of gaat er iets af (-)?',
    type: 'plus-minus',
    visual: {
      kind: 'story-plus-minus',
      story: {
        sceneIcon: '🚌',
        actionText: '2 kinderen stappen in de bus',
        isPlus: true,
        itemsLeft: ['👧', '👦', '👦'],
        itemsAction: ['👧', '👦'],
      },
    },
    correctAnswer: '+',
    hint: 'Er komen kinderen BIJ op de bus: dat is een plus (+)!',
  },
  {
    id: 'b2-verhaal-2',
    blok: 2,
    category: 'b2-erbij-eraf',
    title: 'De heks plukt paddenstoelen',
    instruction: 'De heks plukt paddenstoelen uit het bos in haar mandje. Gaan er paddenstoelen uit het bos AF of BIJ?',
    speechText: 'De heks plukt paddenstoelen weg uit het gras. Is dat erbij (+) of eraf (-)?',
    type: 'plus-minus',
    visual: {
      kind: 'story-plus-minus',
      story: {
        sceneIcon: '🧙‍♀️',
        actionText: 'De heks trekt paddenstoelen uit de grond',
        isPlus: false,
        itemsLeft: ['🍄', '🍄', '🍄'],
        itemsAction: ['🧺'],
      },
    },
    correctAnswer: '-',
    hint: 'De paddenstoelen gaan WEG uit het bos: dat is eraf (-)!',
  },
  {
    id: 'b2-verhaal-3',
    blok: 2,
    category: 'b2-erbij-eraf',
    title: 'Bomen waaien om door de storm',
    instruction: 'Het stormt heel hard! Een boom knakt om en valt neer. Is dat erbij (+) of eraf (-)?',
    speechText: 'Er stonden vier bomen. Eén boom waait om en verdwijnt. Is dat erbij (+) of eraf (-)?',
    type: 'plus-minus',
    visual: {
      kind: 'story-plus-minus',
      story: {
        sceneIcon: '💨',
        actionText: 'Een boom waait om door de hevige wind',
        isPlus: false,
        itemsLeft: ['🌲', '🌲', '🌲'],
      },
    },
    correctAnswer: '-',
    hint: 'Er staat nu een boom minder: eraf (-)!',
  },
  {
    id: 'b2-verhaal-4',
    blok: 2,
    category: 'b2-erbij-eraf',
    title: 'Vogels vliegen naar de tak',
    instruction: 'Er zitten 2 vogels op de tak. Er vliegen 3 vogels BIJ op de tak. Is dat erbij (+) of eraf (-)?',
    speechText: 'Twee vogels zitten op de tak. Drie vogels vliegen erbij. Komt er iets bij of gaat er iets af?',
    type: 'plus-minus',
    visual: {
      kind: 'story-plus-minus',
      story: {
        sceneIcon: '🌿',
        actionText: '3 vogeltjes strijken neer op de tak',
        isPlus: true,
        itemsLeft: ['🐦', '🐦'],
        itemsAction: ['🐦', '🐦', '🐦'],
      },
    },
    correctAnswer: '+',
    hint: 'Ze vliegen er gezellig bij: dat is een plus (+)!',
  },
  {
    id: 'b2-verhaal-5',
    blok: 2,
    category: 'b2-erbij-eraf',
    title: 'Centje in het spaarvarken',
    instruction: 'Het meisje stopt een glimmend muntje in haar spaarvarken. Is dat erbij (+) of eraf (-)?',
    speechText: 'Het meisje spaart een centje in haar spaarvarken. Komt er geld bij in het varken, of gaat het eraf?',
    type: 'plus-minus',
    visual: {
      kind: 'story-plus-minus',
      story: {
        sceneIcon: '🐷',
        actionText: 'Een muntje in de gleuf stoppen',
        isPlus: true,
        itemsAction: ['🪙'],
      },
    },
    correctAnswer: '+',
    hint: 'Haar spaarpot wordt voller: erbij (+)!',
  },
  {
    id: 'b2-verhaal-6',
    blok: 2,
    category: 'b2-erbij-eraf',
    title: 'Kegels omgooien bij het bowlen',
    instruction: 'Je gooit de bal: pats! Er vallen 3 kegels omver. Staan er nu kegels erbij (+) of eraf (-)?',
    speechText: 'De bal raakt de kegels en ze vallen omver. Is dat erbij of eraf?',
    type: 'plus-minus',
    visual: {
      kind: 'story-plus-minus',
      story: {
        sceneIcon: '🎳',
        actionText: '3 kegels vallen omver op de grond',
        isPlus: false,
        itemsLeft: ['🎳', '🎳', '🎳'],
      },
    },
    correctAnswer: '-',
    hint: 'De kegels die overeind staan worden minder: eraf (-)!',
  },
  {
    id: 'b2-verhaal-7',
    blok: 2,
    category: 'b2-erbij-eraf',
    title: 'Kindjes duiken in het zwembad',
    instruction: 'In het opblaasbadje zit al 1 kind. Twee vriendjes springen er BIJ in het water! Erbij (+) of eraf (-)?',
    speechText: 'Twee vriendjes springen erbij in het plonsbadje. Is dat plus (+) of min (-)?',
    type: 'plus-minus',
    visual: {
      kind: 'story-plus-minus',
      story: {
        sceneIcon: '🏊',
        actionText: 'Kindjes springen in het water',
        isPlus: true,
        itemsAction: ['👦', '👧'],
      },
    },
    correctAnswer: '+',
    hint: 'Er zijn nu meer kinderen in het bad: erbij (+)!',
  },

  // --- GELIJK (=) OF NIET GELIJK (≠) ---
  {
    id: 'b2-gelijk-1',
    blok: 2,
    category: 'b2-gelijk-ongelijk',
    title: 'Puppies en katjes vergelijken',
    instruction: 'Links zie je 4 puppies. Rechts zie je 3 katjes. Is dat evenveel (=) of niet evenveel (≠)?',
    speechText: 'Vier puppies en drie katjes. Is vier gelijk aan drie (=), of niet gelijk aan drie (≠)?',
    type: 'compare-equal',
    visual: {
      kind: 'compare-equal-signs',
      left: { label: '4 puppies', count: 4, icon: '🐶', items: ['🐶', '🐶', '🐶', '🐶'] },
      right: { label: '3 katjes', count: 3, icon: '🐱', items: ['🐱', '🐱', '🐱'] },
      detail: '4 ... 3',
    },
    options: ['=', '≠'],
    correctAnswer: '≠',
    hint: '4 is niet evenveel als 3: kies het niet-gelijk teken (≠)!',
  },
  {
    id: 'b2-gelijk-2',
    blok: 2,
    category: 'b2-gelijk-ongelijk',
    title: 'Zes driehoeken en zes cirkels',
    instruction: 'Links staan 6 rode driehoeken. Rechts staan 6 rode bollen. Welk teken past: = of ≠?',
    speechText: 'Zes driehoeken en zes bollen. Is zes gelijk aan zes?',
    type: 'compare-equal',
    visual: {
      kind: 'compare-equal-signs',
      left: { label: '6 driehoeken', count: 6, icon: '🔺', items: ['🔺', '🔺', '🔺', '🔺', '🔺', '🔺'] },
      right: { label: '6 bollen', count: 6, icon: '🔴', items: ['🔴', '🔴', '🔴', '🔴', '🔴', '🔴'] },
      detail: '6 ... 6',
    },
    options: ['=', '≠'],
    correctAnswer: '=',
    hint: '6 is precies evenveel als 6: dat is gelijk aan (=)!',
  },
  {
    id: 'b2-gelijk-3',
    blok: 2,
    category: 'b2-gelijk-ongelijk',
    title: 'Vijf stippen en vijf blokjes',
    instruction: 'Links zie je 5 stippen. Rechts zie je 5 rode blokjes. Is 5 ... 5 gelijk (=) of ongelijk (≠)?',
    speechText: 'Vijf stippen en vijf blokjes. Welk teken past ertussen: gelijk aan (=) of niet gelijk (≠)?',
    type: 'compare-equal',
    visual: {
      kind: 'compare-equal-signs',
      left: { label: '5 stippen', count: 5, icon: '⚫', items: ['⚫', '⚫', '⚫', '⚫', '⚫'] },
      right: { label: '5 blokjes', count: 5, icon: '🟥', items: ['🟥', '🟥', '🟥', '🟥', '🟥'] },
      detail: '5 ... 5',
    },
    options: ['=', '≠'],
    correctAnswer: '=',
    hint: '5 = 5 (evenveel)!',
  },
  {
    id: 'b2-gelijk-4',
    blok: 2,
    category: 'b2-gelijk-ongelijk',
    title: 'Vul in: 6 ... 2',
    instruction: 'Vergelijk de getallen: 6 en 2. Welk teken hoort ertussen: = of ≠?',
    speechText: 'Is zes gelijk aan twee, of niet gelijk aan twee? Klik op het juiste teken.',
    type: 'compare-equal',
    visual: {
      kind: 'compare-equal-signs',
      detail: '6 [ ? ] 2',
    },
    options: ['=', '≠'],
    correctAnswer: '≠',
    hint: '6 en 2 zijn niet hetzelfde getal: kies ≠!',
  },
  {
    id: 'b2-gelijk-5',
    blok: 2,
    category: 'b2-gelijk-ongelijk',
    title: 'Vul het getal aan: 5 = [ ? ]',
    instruction: 'Welk getal moet in het vakje staan zodat het klopt? 5 = ...',
    speechText: 'Vijf is gelijk aan welk getal? Klik op het juiste getal.',
    type: 'choice-number',
    visual: {
      kind: 'math-story',
      detail: '5 = [ ? ]',
      items: ['⭐', '⭐', '⭐', '⭐', '⭐'],
    },
    options: [3, 4, 5, 6],
    correctAnswer: 5,
    hint: '5 = 5!',
  },

  // --- GETALLENAS & ORDENEN TOT 6 ---
  {
    id: 'b2-as-1',
    blok: 2,
    category: 'b2-getallenas',
    title: 'De rechte getallenas aanvullen',
    instruction: 'Kijk naar de getallenas van 0 tot 6: 0, 1, 2, [ ? ], 4, 5, 6. Welk getal ontbreekt?',
    speechText: 'Kijk naar de getallenas op het scherm: nul, één, twee... Welk cijfer hoort op de ontbrekende plek?',
    type: 'number-line',
    visual: {
      kind: 'number-line',
      numberLine: {
        min: 0,
        max: 6,
        missingPos: 3,
      },
    },
    options: [2, 3, 4, 5],
    correctAnswer: 3,
    hint: 'Tussen 2 en 4 ligt het getal 3!',
  },
  {
    id: 'b2-as-2',
    blok: 2,
    category: 'b2-getallenas',
    title: 'Het begin van de getallenas',
    instruction: 'Waar begint de getallenas? [ ? ], 1, 2, 3, 4, 5, 6. Welk getal staat helemaal links?',
    speechText: 'Welk getal staat aan het begin van de getallenas op het scherm, nog vóór de 1?',
    type: 'number-line',
    visual: {
      kind: 'number-line',
      numberLine: {
        min: 0,
        max: 6,
        missingPos: 0,
      },
    },
    options: [0, 1, 2, 3],
    correctAnswer: 0,
    hint: 'De as begint bij 0 (nul)!',
  },
  {
    id: 'b2-as-3',
    blok: 2,
    category: 'b2-getallenas',
    title: 'Het einde van de getallenas',
    instruction: '0, 1, 2, 3, 4, 5, [ ? ]. Welk getal staat na 5?',
    speechText: 'Tellen op de as: nul, één, twee, drie, vier, vijf... En wie komt er na vijf?',
    type: 'number-line',
    visual: {
      kind: 'number-line',
      numberLine: {
        min: 0,
        max: 6,
        missingPos: 6,
      },
    },
    options: [4, 5, 6, 7],
    correctAnswer: 6,
    hint: 'Na 5 komt 6!',
  },
  {
    id: 'b2-as-4',
    blok: 2,
    category: 'b2-getallenas',
    title: 'Vlaggenlijn feestversiering',
    instruction: 'Aan de vlaggenlijn hangen vlaggetjes: 0, 1, 2, 3, [ ? ], 5. Welk cijfer schrijf je op de vlag?',
    speechText: 'Welk cijfer hoort op het vlaggetje tussen 3 en 5 op het scherm?',
    type: 'choice-number',
    visual: {
      kind: 'pattern-complete',
      pattern: ['🚩 0', '🚩 1', '🚩 2', '🚩 3', '❓', '🚩 5'],
    },
    options: [3, 4, 5, 6],
    correctAnswer: 4,
    hint: 'Na vlag 3 komt vlag 4!',
  },
  {
    id: 'b2-as-5',
    blok: 2,
    category: 'b2-getallenas',
    title: 'Verbind de getallen van 0 tot 6',
    instruction: 'In welke volgorde verbind je de getallen: 0 ➔ 1 ➔ 2 ➔ 3 ➔ 4 ➔ [ ? ] ➔ 6?',
    speechText: 'Verbind de getallen van klein naar groot: 0, 1, 2, 3, 4... Welk getal volgt nu?',
    type: 'choice-number',
    visual: {
      kind: 'math-story',
      detail: '0 ➔ 1 ➔ 2 ➔ 3 ➔ 4 ➔ [ ? ] ➔ 6',
      items: ['⭐', '⭐', '⭐', '⭐', '⭐'],
    },
    options: [3, 4, 5, 6],
    correctAnswer: 5,
    hint: 'Vóór 6 verbind je nummer 5!',
  },

  // --- OPTELLEN TOT EN MET 6 (+) ---
  {
    id: 'b2-plus-1',
    blok: 2,
    category: 'b2-optellen',
    title: 'Busverhaal: 4 en 2 is 6',
    instruction: 'In de bus zitten al 4 kinderen. Er stappen 2 kinderen bij. Hoeveel kinderen samen? 4 + 2 = ?',
    speechText: 'Vier kinderen zitten in de bus en twee stappen in. Hoeveel is vier plus twee?',
    type: 'equation-addition',
    visual: {
      kind: 'addition-equation',
      equation: {
        part1: 4,
        part2: 2,
        operation: '+',
        icon1: '👧',
        icon2: '👦',
        label1: 'In de bus (4)',
        label2: 'Stappen in (2)',
      },
    },
    options: [4, 5, 6, 7],
    correctAnswer: 6,
    hint: 'Tel door vanaf 4: 5, 6! Dus 4 + 2 = 6.',
  },
  {
    id: 'b2-plus-2',
    blok: 2,
    category: 'b2-optellen',
    title: 'Vogels in de struik: 2 en 3 is 5',
    instruction: '2 vogels zitten in de struik en 3 vogels vliegen erbij. Hoeveel vogels samen? 2 + 3 = ?',
    speechText: 'Twee vogels in de struik en drie komen erbij. Hoeveel is twee plus drie?',
    type: 'equation-addition',
    visual: {
      kind: 'addition-equation',
      equation: {
        part1: 2,
        part2: 3,
        operation: '+',
        icon1: '🐦',
        icon2: '🐦',
        label1: 'In de struik (2)',
        label2: 'Vliegen erbij (3)',
      },
    },
    options: [4, 5, 6],
    correctAnswer: 5,
    hint: '2 + 3 = 5 vogels!',
  },
  {
    id: 'b2-plus-3',
    blok: 2,
    category: 'b2-optellen',
    title: 'Bloemen in de vaas: 2 en 2 is 4',
    instruction: 'Er staan 2 bloemen in de vaas. Mama zet er nog 2 bloemen bij. 2 + 2 = ?',
    speechText: 'Twee bloemen in de vaas en twee erbij. Hoeveel is twee plus twee?',
    type: 'equation-addition',
    visual: {
      kind: 'addition-equation',
      equation: {
        part1: 2,
        part2: 2,
        operation: '+',
        icon1: '🌷',
        icon2: '🌷',
        label1: 'Al in de vaas (2)',
        label2: 'Erbij gezet (2)',
      },
    },
    options: [3, 4, 5],
    correctAnswer: 4,
    hint: 'Twee en twee is samen 4!',
  },
  {
    id: 'b2-plus-4',
    blok: 2,
    category: 'b2-optellen',
    title: 'Bijen op de zonnebloem: 3 en 3 is 6',
    instruction: '3 bijtjes zoemen op de bloem en 3 bijtjes komen aanvliegen. Hoeveel is 3 + 3?',
    speechText: 'Drie bijen op de bloem en drie bijen vliegen erbij. Hoeveel is drie plus drie?',
    type: 'equation-addition',
    visual: {
      kind: 'addition-equation',
      equation: {
        part1: 3,
        part2: 3,
        operation: '+',
        icon1: '🐝',
        icon2: '🐝',
        label1: 'Op de bloem (3)',
        label2: 'Vliegen erbij (3)',
      },
    },
    options: [5, 6, 7],
    correctAnswer: 6,
    hint: 'De dubbelen: 3 + 3 = 6!',
  },
  {
    id: 'b2-plus-5',
    blok: 2,
    category: 'b2-optellen',
    title: 'Wisseleigenschap: 5 + 1 en 1 + 5',
    instruction: '5 + 1 = 6. Hoeveel is 1 + 5 dan? (Schrijf op 2 manieren!)',
    speechText: 'Als vijf plus één gelijk is aan zes, hoeveel is één plus vijf dan als je ze omdraait?',
    type: 'equation-addition',
    visual: {
      kind: 'addition-equation',
      equation: {
        part1: 1,
        part2: 5,
        operation: '+',
        showCommutative: true,
      },
      detail: '5 + 1 = 6  ➔  1 + 5 = ?',
    },
    options: [4, 5, 6, 7],
    correctAnswer: 6,
    hint: 'Bij optellen mag je de getallen wisselen: het antwoord blijft 6!',
  },
  {
    id: 'b2-plus-6',
    blok: 2,
    category: 'b2-optellen',
    title: 'Optellen met stippen: 4 + 0',
    instruction: 'Je hebt 4 stippen en doet er 0 stippen bij. Hoeveel heb je dan? 4 + 0 = ?',
    speechText: 'Vier stippen plus nul stippen erbij. Hoeveel heb je dan?',
    type: 'equation-addition',
    visual: {
      kind: 'addition-equation',
      equation: {
        part1: 4,
        part2: 0,
        operation: '+',
      },
    },
    options: [0, 4, 5, 6],
    correctAnswer: 4,
    hint: 'Als je er nul (niets) bij doet, verandert er niets: 4 + 0 = 4!',
  },

  // --- KROKODILLENTEKENS < EN > ---
  {
    id: 'b2-krokodil-1',
    blok: 2,
    category: 'b2-krokodillentekens',
    title: 'Krokodil kiest de meeste potjes',
    instruction: '4 potjes en 3 potjes. De hongerige krokodil eet de meeste! Welk teken hoort ertussen: 4 > 3 of 4 < 3?',
    speechText: 'Vier is groter dan drie. De bek van de krokodil hapt naar de vier: vier is groter dan drie!',
    type: 'crocodile-compare',
    visual: {
      kind: 'crocodile-compare',
      left: { label: '4 potjes', count: 4, icon: '🥣', items: ['🥣', '🥣', '🥣', '🥣'] },
      right: { label: '3 potjes', count: 3, icon: '🥣', items: ['🥣', '🥣', '🥣'] },
      detail: '4 [ ? ] 3',
    },
    options: ['>', '<', '='],
    correctAnswer: '>',
    hint: 'De krokodil spert zijn bek open naar het grootste getal (4): dus > (groter dan)!',
  },
  {
    id: 'b2-krokodil-2',
    blok: 2,
    category: 'b2-krokodillentekens',
    title: 'Tomaten vergelijken: 4 en 5',
    instruction: '4 rode tomaten en 5 rode tomaten. 4 is minder dan 5. Welk teken past: 4 < 5 of 4 > 5?',
    speechText: 'Vier tomaten is minder dan vijf tomaten. De bek spert open naar de vijf. Kies kleiner dan of groter dan.',
    type: 'crocodile-compare',
    visual: {
      kind: 'crocodile-compare',
      left: { label: '4 tomaten', count: 4, icon: '🍅', items: ['🍅', '🍅', '🍅', '🍅'] },
      right: { label: '5 tomaten', count: 5, icon: '🍅', items: ['🍅', '🍅', '🍅', '🍅', '🍅'] },
      detail: '4 [ ? ] 5',
    },
    options: ['<', '>', '='],
    correctAnswer: '<',
    hint: '4 is kleiner dan 5: kies <!',
  },
  {
    id: 'b2-krokodil-3',
    blok: 2,
    category: 'b2-krokodillentekens',
    title: 'Kastanjes vergelijken: 2 en 4',
    instruction: 'Links 2 kastanjes, rechts 4 kastanjes. Welk krokodillendteken past: 2 ... 4?',
    speechText: 'Twee kastanjes en vier kastanjes. Welk teken hoort erbij?',
    type: 'crocodile-compare',
    visual: {
      kind: 'crocodile-compare',
      left: { label: '2 kastanjes', count: 2, icon: '🌰', items: ['🌰', '🌰'] },
      right: { label: '4 kastanjes', count: 4, icon: '🌰', items: ['🌰', '🌰', '🌰', '🌰'] },
      detail: '2 [ ? ] 4',
    },
    options: ['<', '>', '='],
    correctAnswer: '<',
    hint: '2 is kleiner dan 4 (2 < 4)!',
  },
  {
    id: 'b2-krokodil-4',
    blok: 2,
    category: 'b2-krokodillentekens',
    title: 'Getallen vergelijken: 5 ... 2',
    instruction: 'Kijk naar de getallen 5 en 2. Welk teken hoort ertussen?',
    speechText: 'Vijf en twee. Is vijf groter dan twee (>), kleiner dan twee (<), of gelijk aan twee (=)?',
    type: 'crocodile-compare',
    visual: {
      kind: 'crocodile-compare',
      detail: '5 [ ? ] 2',
    },
    options: ['>', '<', '='],
    correctAnswer: '>',
    hint: '5 is groter dan 2 (5 > 2)!',
  },
  {
    id: 'b2-krokodil-5',
    blok: 2,
    category: 'b2-krokodillentekens',
    title: 'Getallen vergelijken: 1 ... 6',
    instruction: 'Kijk naar 1 en 6. Welk teken hoort ertussen?',
    speechText: 'Eén en zes. Welk teken past hier?',
    type: 'crocodile-compare',
    visual: {
      kind: 'crocodile-compare',
      detail: '1 [ ? ] 6',
    },
    options: ['<', '>', '='],
    correctAnswer: '<',
    hint: '1 is veel kleiner dan 6: dus 1 < 6!',
  },
  {
    id: 'b2-krokodil-6',
    blok: 2,
    category: 'b2-krokodillentekens',
    title: 'Getallen vergelijken: 3 ... 3',
    instruction: 'Kijk naar 3 en 3. Welk teken hoort ertussen: <, > of =?',
    speechText: 'Drie en drie: ze zijn precies gelijk!',
    type: 'crocodile-compare',
    visual: {
      kind: 'crocodile-compare',
      detail: '3 [ ? ] 3',
    },
    options: ['=', '<', '>'],
    correctAnswer: '=',
    hint: '3 en 3 zijn evenveel: 3 = 3!',
  },

  // --- MASSA EN INHOUD ---
  {
    id: 'b2-inhoud-1',
    blok: 2,
    category: 'b2-inhoud-massa',
    title: 'Glazen sap: van leeg naar vol',
    instruction: 'Welk glas op het scherm is helemaal LEEG? Klik op het juiste glas.',
    speechText: 'Kijk naar de vier glazen limonade op het scherm. Welk glas is helemaal leeg?',
    type: 'choice-number',
    visual: {
      kind: 'cups-volume',
      volumeCups: [
        { id: 1, label: 'Glas A', percentFull: 0, liquidColor: '#fb923c' },
        { id: 2, label: 'Glas B', percentFull: 35, liquidColor: '#fb923c' },
        { id: 3, label: 'Glas C', percentFull: 70, liquidColor: '#fb923c' },
        { id: 4, label: 'Glas D', percentFull: 100, liquidColor: '#fb923c' },
      ],
    },
    options: [1, 2, 3, 4],
    correctAnswer: 1,
    hint: 'Glas A heeft 0% sap: het is helemaal leeg!',
  },
  {
    id: 'b2-inhoud-2',
    blok: 2,
    category: 'b2-inhoud-massa',
    title: 'Welk glas heeft de MEESTE inhoud?',
    instruction: 'Kijk naar de twee bekers op het scherm. Welke beker zit het VOLST (heeft de meeste inhoud)?',
    speechText: 'Welk glas heeft de meeste limonade? Klik op links of rechts.',
    type: 'compare',
    visual: {
      kind: 'compare-groups',
      left: { label: 'Halfvol glas', count: 2, icon: '🥛', items: ['🧃', '🧃'] },
      right: { label: 'Helemaal vol glas', count: 5, icon: '🥤', items: ['🧃', '🧃', '🧃', '🧃', '🧃'] },
    },
    correctAnswer: 'right',
    hint: 'Het rechter glas zit tot aan het randje vol!',
  },
  {
    id: 'b2-massa-1',
    blok: 2,
    category: 'b2-inhoud-massa',
    title: 'Vogelveer of baksteen?',
    instruction: 'Wat voelt het LICHTST: de zachte veer of de zware baksteen?',
    speechText: 'Wat is licht en wat is zwaar? Klik op wat het allerlichtst is.',
    type: 'compare',
    visual: {
      kind: 'compare-groups',
      left: { label: 'De vogelveer', count: 1, icon: '🪶', items: ['🪶'] },
      right: { label: 'De baksteen', count: 1, icon: '🧱', items: ['🧱'] },
    },
    correctAnswer: 'left',
    hint: 'Een veer dwarrelt door de lucht: dat is heel licht!',
  },
  {
    id: 'b2-massa-2',
    blok: 2,
    category: 'b2-inhoud-massa',
    title: 'De balans weegt: wie zakt omlaag?',
    instruction: 'Op een balans zakt de ZWAARSTE kant altijd naar beneden. Welke kant is het zwaarst?',
    speechText: 'Kijk naar de weegschaal op het scherm. De kant die omlaag zakt is het zwaarst. Klik op de zwaarste kant.',
    type: 'balance-scale',
    visual: {
      kind: 'balance-scale',
      balance: {
        leftItem: { icon: '🪨', label: 'Grote steen', weight: 5 },
        rightItem: { icon: '🍃', label: 'Blaadje', weight: 1 },
        tilted: 'left',
        question: 'heaviest',
      },
    },
    options: ['Links (Grote steen)', 'Rechts (Blaadje)'],
    correctAnswer: 'Links (Grote steen)',
    hint: 'De steen zakt helemaal naar beneden: links is het zwaarst!',
  },
  {
    id: 'b2-massa-3',
    blok: 2,
    category: 'b2-inhoud-massa',
    title: 'Wie is het ZWAARST in de rij?',
    instruction: 'Kijk naar de dieren op het scherm: een muis 🐭 of een reuze olifant 🐘. Wie weegt het MEEST?',
    speechText: 'Kijk naar de dieren op het scherm. Wie weegt het allermeest?',
    type: 'compare',
    visual: {
      kind: 'compare-groups',
      left: { label: 'Klein muisje', count: 1, icon: '🐭', items: ['🐭'] },
      right: { label: 'Reuze olifant', count: 1, icon: '🐘', items: ['🐘'] },
    },
    correctAnswer: 'right',
    hint: 'Een olifant weegt duizenden kilo\'s!',
  },
  {
    id: 'b2-massa-4',
    blok: 2,
    category: 'b2-inhoud-massa',
    title: 'Wat is het LICHTSTE voorwerp?',
    instruction: 'Op het scherm zie je: een fiets, een rode ballon, een auto en een vliegtuig. Wat is het LICHTST?',
    speechText: 'Welk voorwerp op het scherm is het allerlichtst: de fiets, de ballon, de auto of het vliegtuig?',
    type: 'choice-image',
    visual: {
      kind: 'grid-items',
      items: ['🚲', '🎈', '🚗', '✈️'],
      detail: 'Fiets, Ballon, Auto, Vliegtuig',
    },
    options: ['🚲 Fiets', '🎈 Ballon', '🚗 Auto', '✈️ Vliegtuig'],
    correctAnswer: '🎈 Ballon',
    hint: 'De ballon zweeft vanzelf omhoog: die weegt bijna niets!',
  },
  {
    id: 'b2-massa-5',
    blok: 2,
    category: 'b2-inhoud-massa',
    title: 'Voertuigen nummeren: licht (1) naar zwaar (4)',
    instruction: 'Nummer van LICHT (1) naar ZWAAR (4): driewieler (1), fiets (2), auto (3), vrachtwagen (4). Welk nummer krijgt de vrachtwagen?',
    speechText: 'We nummeren van licht naar zwaar. Eén is het lichtst, vier is het zwaarst. Welk nummer heeft de grote vrachtwagen?',
    type: 'choice-number',
    visual: {
      kind: 'mass-ordering',
      massItems: [
        { id: 1, label: 'Driewieler', weightRank: 1, icon: '🛞' },
        { id: 2, label: 'Gewone fiets', weightRank: 2, icon: '🚲' },
        { id: 3, label: 'Personenauto', weightRank: 3, icon: '🚗' },
        { id: 4, label: 'Grote vrachtwagen', weightRank: 4, icon: '🚚' },
      ],
    },
    options: [1, 2, 3, 4],
    correctAnswer: 4,
    hint: 'De vrachtwagen is het allerzwaarst, dus nummer 4!',
  },

  // --- KWADRAATBEELDEN & TIENVELD ---
  {
    id: 'b2-beeld-1',
    blok: 2,
    category: 'b2-kwadraatbeelden',
    title: 'Chocoladereep met 4 blokjes',
    instruction: 'Kijk naar de lekkere reep chocolade: 2 blokjes boven en 2 onder. Hoeveel blokjes tel je?',
    speechText: 'Kijk naar de chocoladereep op het scherm. Hoeveel blokjes chocolade tel je?',
    type: 'choice-number',
    visual: {
      kind: 'chocolate-bar',
      chocolate: { pieces: 4 },
    },
    options: [2, 3, 4, 5],
    correctAnswer: 4,
    hint: 'Twee boven en twee onder: 4 blokjes chocolade!',
  },
  {
    id: 'b2-beeld-2',
    blok: 2,
    category: 'b2-kwadraatbeelden',
    title: 'Chocoladereep met 6 blokjes',
    instruction: 'Twee rijtjes van 3 blokjes chocolade. Welk getal hoort bij deze reep?',
    speechText: 'Twee rijen van drie blokjes. Welk cijfer hoort bij deze volle reep?',
    type: 'choice-number',
    visual: {
      kind: 'chocolate-bar',
      chocolate: { pieces: 6 },
    },
    options: [4, 5, 6],
    correctAnswer: 6,
    hint: 'Drie en drie is 6!',
  },
  {
    id: 'b2-beeld-3',
    blok: 2,
    category: 'b2-kwadraatbeelden',
    title: 'Koffiebekers op de tray',
    instruction: 'Kijk naar de tray met koffiebekers: 2 voor en 2 achter. Hoeveel bekers staan erop?',
    speechText: 'Kijk naar de koffiebekers op het scherm. Hoeveel bekers tel je?',
    type: 'choice-number',
    visual: {
      kind: 'grid-items',
      count: 4,
      items: ['☕', '☕', '☕', '☕'],
      detail: 'Tray met 4 bekers',
    },
    options: [3, 4, 5],
    correctAnswer: 4,
    hint: 'Twee en twee is 4 bekers!',
  },
  {
    id: 'b2-beeld-4',
    blok: 2,
    category: 'b2-kwadraatbeelden',
    title: 'Fruitsapjes in een multipack',
    instruction: 'Op een rij staan brikjes fruitsap. Hoeveel brikjes sap zie je?',
    speechText: 'Hoeveel brikjes fruitsap staan er in de verpakking op het scherm?',
    type: 'choice-number',
    visual: {
      kind: 'grid-items',
      count: 3,
      items: ['🧃', '🧃', '🧃'],
    },
    options: [2, 3, 4],
    correctAnswer: 3,
    hint: 'Drie pakjes sap: 1, 2, 3!',
  },
  {
    id: 'b2-beeld-5',
    blok: 2,
    category: 'b2-kwadraatbeelden',
    title: 'Yoghurtpotjes in de verpakking',
    instruction: 'Vier potjes op de hoeken en eentje in het midden. Hoeveel yoghurtpotjes zijn dat?',
    speechText: 'Vier op de hoeken en één in het midden: het kwadraatbeeld van welk getal?',
    type: 'choice-number',
    visual: {
      kind: 'dice',
      count: 5,
    },
    options: [4, 5, 6],
    correctAnswer: 5,
    hint: 'Dit is het getalbeeld van 5!',
  },

  // --- PIXELTEKENEN & HERHALING BLOK 2 ---
  {
    id: 'b2-pixel-1',
    blok: 2,
    category: 'b2-pixel-herhaling',
    title: 'Pixelcode: 1 blauw, 4 wit',
    instruction: 'Kijk naar de telcode: "1 BLAUW, 4 WIT". Hoeveel vakjes moet je blauw kleuren in een rij van 5?',
    speechText: 'De code zegt: één blauw en vier wit. Hoeveel vakjes kleur je blauw?',
    type: 'pixel-grid',
    visual: {
      kind: 'pixel-grid',
      pixelGrid: {
        codeText: 'Code: 1 blauw, 4 wit',
        targetCount: 1,
        totalCells: 5,
        color: '#3b82f6',
      },
    },
    options: [1, 2, 3, 4],
    correctAnswer: 1,
    hint: 'De code zegt 1 blauw: kleur 1 vakje!',
  },
  {
    id: 'b2-pixel-2',
    blok: 2,
    category: 'b2-pixel-herhaling',
    title: 'Pixelcode: 5 blauw',
    instruction: 'De code zegt: "5 BLAUW". Hoeveel vakjes van de rij moet je blauw kleuren?',
    speechText: 'De code zegt vijf blauw. Hoeveel vakjes moet je blauw kleuren?',
    type: 'pixel-grid',
    visual: {
      kind: 'pixel-grid',
      pixelGrid: {
        codeText: 'Code: 5 blauw',
        targetCount: 5,
        totalCells: 5,
        color: '#3b82f6',
      },
    },
    options: [3, 4, 5],
    correctAnswer: 5,
    hint: 'Alle 5 vakjes in de rij moeten blauw!',
  },
  {
    id: 'b2-herhaling-1',
    blok: 2,
    category: 'b2-pixel-herhaling',
    title: 'Herhaling: Vissen in bokalen tellen',
    instruction: 'In een bokaal zwemmen 0 vissen. Welk cijfer schrijf je op het kaartje?',
    speechText: 'In de kom op het scherm zwemt geen enkele vis. Welk getal hoort daarbij?',
    type: 'choice-number',
    visual: {
      kind: 'empty-zero',
      detail: '0 vissen',
      items: [],
    },
    options: [0, 1, 2, 3],
    correctAnswer: 0,
    hint: 'Niets = 0!',
  },
  {
    id: 'b2-herhaling-2',
    blok: 2,
    category: 'b2-pixel-herhaling',
    title: 'Herhaling: 3 < 6 of 3 > 6?',
    instruction: 'Vergelijk de getallen: 3 ... 6. Welk teken hoort erbij?',
    speechText: 'Drie en zes. Is drie kleiner dan zes (<), of groter dan zes (>)?',
    type: 'crocodile-compare',
    visual: {
      kind: 'crocodile-compare',
      detail: '3 [ ? ] 6',
    },
    options: ['<', '>', '='],
    correctAnswer: '<',
    hint: '3 is kleiner dan 6: dus 3 < 6!',
  },
  {
    id: 'b2-herhaling-3',
    blok: 2,
    category: 'b2-pixel-herhaling',
    title: 'Herhaling: Optellen tot 6',
    instruction: 'Hoeveel is 2 + 4 samen? Tel met je vingers of rekenblokjes.',
    speechText: 'Hoeveel is twee plus vier? Twee en vier is...',
    type: 'equation-addition',
    visual: {
      kind: 'addition-equation',
      equation: {
        part1: 2,
        part2: 4,
        operation: '+',
      },
    },
    options: [4, 5, 6, 7],
    correctAnswer: 6,
    hint: '2 + 4 = 6!',
  },
];

export interface Sticker {
  id: string;
  name: string;
  icon: string;
  requiredStars: number;
  unlocked: boolean;
  color: string;
}

export const INITIAL_STICKERS: Sticker[] = [
  // Blok 1 stickers
  { id: 'stk-1', name: 'Rekenbeer', icon: '🧸', requiredStars: 1, unlocked: false, color: 'bg-amber-100 border-amber-300' },
  { id: 'stk-2', name: 'Gele Ster', icon: '⭐', requiredStars: 3, unlocked: false, color: 'bg-yellow-100 border-yellow-300' },
  { id: 'stk-3', name: 'Slimme Vos', icon: '🦊', requiredStars: 5, unlocked: false, color: 'bg-orange-100 border-orange-300' },
  { id: 'stk-4', name: 'Ruimteraket', icon: '🚀', requiredStars: 8, unlocked: false, color: 'bg-blue-100 border-blue-300' },
  { id: 'stk-5', name: 'Goudvisje', icon: '🐠', requiredStars: 12, unlocked: false, color: 'bg-cyan-100 border-cyan-300' },
  { id: 'stk-6', name: 'Vrolijke Kikker', icon: '🐸', requiredStars: 16, unlocked: false, color: 'bg-emerald-100 border-emerald-300' },
  { id: 'stk-7', name: 'Rekenkoning Kroon', icon: '👑', requiredStars: 20, unlocked: false, color: 'bg-purple-100 border-purple-300' },
  { id: 'stk-8', name: 'Kampioen Trofee', icon: '🏆', requiredStars: 25, unlocked: false, color: 'bg-rose-100 border-rose-300' },
  // Blok 2 stickers!
  { id: 'stk-9', name: 'Hongerige Krokodil', icon: '🐊', requiredStars: 30, unlocked: false, color: 'bg-emerald-100 border-emerald-400' },
  { id: 'stk-10', name: 'Rekenbus', icon: '🚌', requiredStars: 36, unlocked: false, color: 'bg-amber-100 border-amber-400' },
  { id: 'stk-11', name: 'Pixelvlinder', icon: '🦋', requiredStars: 42, unlocked: false, color: 'bg-pink-100 border-pink-400' },
  { id: 'stk-12', name: 'Chocoladereep', icon: '🍫', requiredStars: 48, unlocked: false, color: 'bg-yellow-100 border-yellow-400' },
  { id: 'stk-13', name: 'Slimme Weegschaal', icon: '⚖️', requiredStars: 55, unlocked: false, color: 'bg-teal-100 border-teal-400' },
  { id: 'stk-14', name: 'Grootmeester Medaille', icon: '🎖️', requiredStars: 65, unlocked: false, color: 'bg-indigo-100 border-indigo-400' },
];
