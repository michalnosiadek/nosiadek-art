export type PrintSize = {
  label: string;
  dimensions: string;
  price: number;
};

export type Artwork = {
  slug: string;
  title: string;
  year: string;
  medium: string;
  dimensions: string;
  description: string;
  image: string;
  featured?: boolean;
  original: {
    available: boolean;
    price?: number;
  };
  prints: PrintSize[];
};

export const artworks: Artwork[] = [
  {
    slug: "the-last-dawn",
    title: "The Last Dawn",
    year: "2026",
    medium: "Acrylic on canvas",
    dimensions: "60 × 80 cm",
    description:
      "A lone rider crosses the threshold of a dying kingdom as the sun breaks blood-red over the mountains. Painted as the closing image of a story — the last light before the dark.",
    image: "/images/the-last-dawn.jpg",
    featured: true,
    original: { available: true, price: 1400 },
    prints: [
      { label: "Small", dimensions: "30 × 40 cm", price: 55 },
      { label: "Medium", dimensions: "45 × 60 cm", price: 95 },
      { label: "Large", dimensions: "60 × 80 cm", price: 160 },
    ],
  },
  {
    slug: "the-end",
    title: "The End",
    year: "2026",
    medium: "Acrylic on canvas",
    dimensions: "70 × 100 cm",
    description:
      "A ring of fire opens over a mountain range, indifferent and total. A study in scale — how small a peak looks against something ending.",
    image: "/images/the-end.jpg",
    original: { available: true, price: 1600 },
    prints: [
      { label: "Small", dimensions: "30 × 40 cm", price: 55 },
      { label: "Medium", dimensions: "50 × 70 cm", price: 100 },
      { label: "Large", dimensions: "70 × 100 cm", price: 175 },
    ],
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
    original: { available: false },
    prints: [
      { label: "Small", dimensions: "30 × 30 cm", price: 50 },
      { label: "Medium", dimensions: "40 × 50 cm", price: 90 },
    ],
  },
];

export function getArtwork(slug: string) {
  return artworks.find((a) => a.slug === slug);
}
