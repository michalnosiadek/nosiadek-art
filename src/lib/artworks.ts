export type PrintSize = {
  label: string;
  dimensions: string;
  price: number;
};

export type Poem = {
  title: string;
  year?: string;
  medium?: string;
  body: string;
};

export type Artwork = {
  slug: string;
  title: string;
  year: string;
  medium: string;
  dimensions: string;
  description: string;
  image: string;
  /** native pixel dimensions of the image file, used to render the full painting without cropping */
  imageWidth: number;
  imageHeight: number;
  featured?: boolean;
  poem?: Poem;
  /** path to an audio file for the per-painting music player, once provided */
  track?: string;
  original: {
    available: boolean;
    price?: number;
  };
  prints: PrintSize[];
  /** flat add-on price for framing, applies to prints and originals alike */
  framingPrice: number;
};

export const artworks: Artwork[] = [
  {
    slug: "the-last-dawn",
    title: "The Last Dawn",
    year: "2026",
    medium: "Acrylic on canvas",
    dimensions: "60 × 80 cm",
    description:
      "A lone rider crosses the threshold of a dying kingdom as the sun breaks blood-red over the mountains, painted as the closing image of a story: the last light before the dark.",
    image: "/images/the-last-dawn.jpg",
    imageWidth: 2000,
    imageHeight: 1599,
    featured: true,
    original: { available: true, price: 1400 },
    prints: [
      { label: "Small", dimensions: "30 × 40 cm", price: 55 },
      { label: "Medium", dimensions: "45 × 60 cm", price: 95 },
      { label: "Large", dimensions: "60 × 80 cm", price: 160 },
    ],
    framingPrice: 60,
  },
  {
    slug: "the-end",
    title: "The Murder of a Star",
    year: "2025",
    medium: "Oil on canvas",
    dimensions: "70 × 100 cm",
    description:
      "A ring of fire opens over a mountain range, indifferent and total. A study in scale: how small a peak looks against something ending.",
    image: "/images/the-end.jpg",
    imageWidth: 2000,
    imageHeight: 1430,
    poem: {
      title: "The Murder of a Star",
      year: "2025",
      medium: "Oils",
      body: "At the summit of men's hatred\nChanneled by hubris and greed\nA blow is struck that cannot be undone\nThat ends the world once and for all",
    },
    original: { available: true, price: 1600 },
    prints: [
      { label: "Small", dimensions: "30 × 40 cm", price: 55 },
      { label: "Medium", dimensions: "50 × 70 cm", price: 100 },
      { label: "Large", dimensions: "70 × 100 cm", price: 175 },
    ],
    framingPrice: 70,
  },
  {
    slug: "the-second-moon",
    title: "The Second Moon",
    year: "2025",
    medium: "Oil on canvas",
    dimensions: "40 × 50 cm",
    description:
      "An eye rendered close and unblinking, lit like a second moon rising. Warmth and watchfulness in the same brushstroke.",
    image: "/images/the-second-moon.jpg",
    imageWidth: 2000,
    imageHeight: 1583,
    poem: {
      title: "The Second Moon",
      body: "the Second Moon is watching\nso is the sleeping forest\nIn the depths of reflection\nOf a lake long forgotten",
    },
    original: { available: false },
    prints: [
      { label: "Small", dimensions: "30 × 30 cm", price: 50 },
      { label: "Medium", dimensions: "40 × 50 cm", price: 90 },
    ],
    framingPrice: 45,
  },
  {
    slug: "celtic",
    title: "Celtic",
    year: "2026",
    medium: "Oil on canvas",
    dimensions: "60 × 48 cm",
    description:
      "A skull, a candle, a tankard of ale: vanitas rendered through a pagan lens. Beyond the window, a sickly green moon hangs over bare trees, the only witness left once the last light gutters out.",
    image: "/images/celtic.jpg",
    imageWidth: 2000,
    imageHeight: 1599,
    original: { available: true, price: 900 },
    prints: [
      { label: "Small", dimensions: "30 × 24 cm", price: 45 },
      { label: "Medium", dimensions: "45 × 36 cm", price: 80 },
      { label: "Large", dimensions: "60 × 48 cm", price: 130 },
    ],
    framingPrice: 50,
  },
  {
    slug: "eclipse",
    title: "Eclipse",
    year: "2026",
    medium: "Oil on canvas",
    dimensions: "60 × 60 cm",
    description:
      "Totality over a mountain line: a black sun ringed in fire, indifferent to the peaks beneath it. A companion study to the end of things, seen from a different angle of the same sky.",
    image: "/images/eclipse.jpg",
    imageWidth: 2000,
    imageHeight: 1996,
    original: { available: true, price: 1100 },
    prints: [
      { label: "Small", dimensions: "30 × 30 cm", price: 50 },
      { label: "Medium", dimensions: "45 × 45 cm", price: 90 },
      { label: "Large", dimensions: "60 × 60 cm", price: 145 },
    ],
    framingPrice: 55,
  },
  {
    slug: "edephious",
    title: "Edephious",
    year: "2026",
    medium: "Oil on canvas",
    dimensions: "60 × 48 cm",
    description:
      "A red-carpeted hallway stretches toward a pale, watching face framed in a window at its end, while a door left ajar spills warm light from the other direction. A choice between two thresholds, neither one comfortable.",
    image: "/images/edephious.jpg",
    imageWidth: 2000,
    imageHeight: 1600,
    original: { available: true, price: 950 },
    prints: [
      { label: "Small", dimensions: "30 × 24 cm", price: 45 },
      { label: "Medium", dimensions: "45 × 36 cm", price: 80 },
      { label: "Large", dimensions: "60 × 48 cm", price: 130 },
    ],
    framingPrice: 50,
  },
  {
    slug: "edge-of-the-night",
    title: "Edge of the Night",
    year: "2026",
    medium: "Oil on canvas",
    dimensions: "50 × 64 cm",
    description:
      "A cloaked figure dissolves into, or is born from, a torrent of crimson light against total black. The instant before dawn, or the instant after everything else has gone out.",
    image: "/images/edge-of-the-night.jpg",
    imageWidth: 2000,
    imageHeight: 2560,
    original: { available: true, price: 1000 },
    prints: [
      { label: "Small", dimensions: "30 × 38 cm", price: 45 },
      { label: "Medium", dimensions: "40 × 51 cm", price: 85 },
      { label: "Large", dimensions: "50 × 64 cm", price: 135 },
    ],
    framingPrice: 50,
  },
  {
    slug: "isle-of-the-dead",
    title: "Isle of the Dead",
    year: "2026",
    medium: "Oil on canvas",
    dimensions: "60 × 48 cm",
    description:
      "A tomb carved into rock, glowing from within like an ember that refuses to go out. A reinterpretation of the old motif: the threshold to whatever waits past the dead, lit rather than shrouded.",
    image: "/images/isle-of-the-dead.jpg",
    imageWidth: 2000,
    imageHeight: 1600,
    original: { available: true, price: 1050 },
    prints: [
      { label: "Small", dimensions: "30 × 24 cm", price: 50 },
      { label: "Medium", dimensions: "45 × 36 cm", price: 90 },
      { label: "Large", dimensions: "60 × 48 cm", price: 140 },
    ],
    framingPrice: 55,
  },
  {
    slug: "self-portrait-study",
    title: "Self-Portrait Study",
    year: "2026",
    medium: "Oil on canvas",
    dimensions: "50 × 62 cm",
    description:
      "A direct, unflinching self-portrait built from hard chiaroscuro: half the face lit, half given to the dark, the way most things about a person are.",
    image: "/images/self-portrait-study.jpg",
    imageWidth: 2000,
    imageHeight: 2499,
    original: { available: false },
    prints: [
      { label: "Small", dimensions: "30 × 37 cm", price: 60 },
      { label: "Medium", dimensions: "50 × 62 cm", price: 100 },
    ],
    framingPrice: 45,
  },
  {
    slug: "moon",
    title: "Moon",
    year: "2026",
    medium: "Oil on canvas",
    dimensions: "50 × 50 cm",
    description:
      "A lone red moon adrift in a near-black sky. Restraint over detail: everything the painting needs is already there in the color.",
    image: "/images/moon.jpg",
    imageWidth: 2000,
    imageHeight: 1999,
    original: { available: true, price: 700 },
    prints: [
      { label: "Small", dimensions: "30 × 30 cm", price: 40 },
      { label: "Medium", dimensions: "40 × 40 cm", price: 70 },
    ],
    framingPrice: 35,
  },
  {
    slug: "moongoose",
    title: "Moongoose",
    year: "2026",
    medium: "Oil on canvas",
    dimensions: "60 × 48 cm",
    description:
      "A vast, tusked lunar eye dominates the frame while a small penguin stands beneath it, unbothered. Scale and strangeness: a stray moment of dark humor let into the work.",
    image: "/images/moongoose.jpg",
    imageWidth: 2000,
    imageHeight: 1600,
    original: { available: true, price: 850 },
    prints: [
      { label: "Small", dimensions: "30 × 24 cm", price: 45 },
      { label: "Medium", dimensions: "45 × 36 cm", price: 80 },
    ],
    framingPrice: 45,
  },
  {
    slug: "orgrimmar",
    title: "Orgrimmar",
    year: "2026",
    medium: "Oil on canvas",
    dimensions: "70 × 56 cm",
    description:
      "A fortress gate flanked by towers built as giant horned eyes, watching every approach. A road lined with broken fences leads travelers toward the fire glowing at its heart.",
    image: "/images/orgrimmar.jpg",
    imageWidth: 2000,
    imageHeight: 1599,
    original: { available: true, price: 1200 },
    prints: [
      { label: "Small", dimensions: "35 × 28 cm", price: 55 },
      { label: "Medium", dimensions: "50 × 40 cm", price: 95 },
      { label: "Large", dimensions: "70 × 56 cm", price: 150 },
    ],
    framingPrice: 60,
  },
  {
    slug: "pandemonium",
    title: "Pandemonium",
    year: "2026",
    medium: "Oil on canvas",
    dimensions: "70 × 50 cm",
    description:
      "Named for Milton's capital of ruin: a vast colonnade burns through the night as robed figures process past it, torches and banners held high against the dark it's built from.",
    image: "/images/pandemonium.jpg",
    imageWidth: 2000,
    imageHeight: 1397,
    original: { available: true, price: 1300 },
    prints: [
      { label: "Small", dimensions: "35 × 25 cm", price: 55 },
      { label: "Medium", dimensions: "50 × 36 cm", price: 100 },
      { label: "Large", dimensions: "70 × 50 cm", price: 160 },
    ],
    framingPrice: 65,
  },
  {
    slug: "wish-you-were-here",
    title: "Wish You Were Here",
    year: "2026",
    medium: "Oil on canvas",
    dimensions: "60 × 48 cm",
    description:
      "Sunset over still water, two figures at rest beneath it: a rare warm, tender scene set against the darker currents running through the rest of the work. Quiet gratitude, given room to breathe.",
    image: "/images/wish-you-were-here.jpg",
    imageWidth: 2000,
    imageHeight: 1596,
    poem: {
      title: "Wish You Were Here",
      year: "2026",
      medium: "Oils",
      body: "As the Sun sets upon the mountain view,\nIn its light I see what I love most,\nThe warmth, comfort and beauty\nOf simple kindness and compassion.",
    },
    original: { available: true, price: 1000 },
    prints: [
      { label: "Small", dimensions: "30 × 24 cm", price: 45 },
      { label: "Medium", dimensions: "45 × 36 cm", price: 85 },
      { label: "Large", dimensions: "60 × 48 cm", price: 135 },
    ],
    framingPrice: 50,
  },
  {
    slug: "witches",
    title: "Witches",
    year: "2026",
    medium: "Oil on canvas",
    dimensions: "60 × 48 cm",
    description:
      "A gathering at the forest's edge: two figures lit by campfire beneath a rising moon and a glowing ridge of mountains. Firelight and moonlight are the only witnesses to whatever rite this is.",
    image: "/images/witches.jpg",
    imageWidth: 2000,
    imageHeight: 1600,
    track: "/audio/witches.mp3",
    original: { available: true, price: 1100 },
    prints: [
      { label: "Small", dimensions: "30 × 24 cm", price: 50 },
      { label: "Medium", dimensions: "45 × 36 cm", price: 90 },
      { label: "Large", dimensions: "60 × 48 cm", price: 145 },
    ],
    framingPrice: 55,
  },
];

export function getArtwork(slug: string) {
  return artworks.find((a) => a.slug === slug);
}
