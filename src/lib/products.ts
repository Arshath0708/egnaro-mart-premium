export type Product = {
  id: string;
  name: string;
  price: number;
  original: number;
  discount: number;
  category: string;
  image: string;
  rating: number;
  reviews: number;
  description: string;
  specs: Record<string, string>;
};

export const PRODUCTS: Product[] = [
  {
    id: "cctv-security-camera",
    name: "CCTV Security Camera",
    price: 1999,
    original: 2999,
    discount: 33,
    category: "Electronics",
    image: "/images/cctv.png",
    rating: 4.6,
    reviews: 248,
    description:
      "High-definition CCTV security camera with night vision, motion detection and weatherproof body. Ideal for home and commercial surveillance.",
    specs: {
      Resolution: "1080p Full HD",
      "Night Vision": "Up to 20m",
      Connectivity: "Wi-Fi + LAN",
      Warranty: "1 Year",
    },
  },

  {
    id: "extension-board-multi-plug",
    name: "Extension Board Multi Plug",
    price: 1233,
    original: 1999,
    discount: 38,
    category: "Electricals",
    image: "/images/extensionboard.png",
    rating: 4.4,
    reviews: 189,
    description:
      "Premium multi-socket extension board with surge protection, individual switches and fire-retardant body.",
    specs: {
      Sockets: "6",
      "Cord Length": "2m",
      Protection: "Surge + Overload",
      Warranty: "1 Year",
    },
  },

  {
    id: "extension-cord",
    name: "Extension Cord",
    price: 548,
    original: 700,
    discount: 22,
    category: "Electricals",
    image: "/images/extensioncord.png",
    rating: 4.3,
    reviews: 132,
    description:
      "Heavy-duty extension cord with copper wiring for safe and reliable power delivery anywhere in your home or workspace.",
    specs: {
      Length: "5m",
      Capacity: "10A",
      Material: "Pure Copper",
      Warranty: "6 Months",
    },
  },

  {
    id: "laptop-adapter",
    name: "Laptop Adapter",
    price: 1499,
    original: 1999,
    discount: 25,
    category: "Electronics",
    image: "/images/laptopadapter.png",
    rating: 4.5,
    reviews: 311,
    description:
      "Universal laptop adapter compatible with major brands. Smart chip protection and stable power output.",
    specs: {
      Output: "65W",
      Compatibility: "Universal",
      Protection: "OVP + OCP",
      Warranty: "1 Year",
    },
  },

  {
    id: "water-heater-25l",
    name: "Water Heater 25L",
    price: 4500,
    original: 6000,
    discount: 25,
    category: "Home Application",
    image: "/images/waterheater.png",
    rating: 4.7,
    reviews: 421,
    description:
      "25L electric storage water heater with rust-proof tank, energy efficient heating element and multi-layer safety.",
    specs: {
      Capacity: "25L",
      Power: "2000W",
      "Tank Material": "Glass-lined",
      Warranty: "5 Years",
    },
  },

  {
    id: "paint-brush-set",
    name: "Paint Brush Set",
    price: 350,
    original: 500,
    discount: 30,
    category: "Hardware",
    image: "/images/paintbrush.png",
    rating: 4.2,
    reviews: 96,
    description:
      "Professional grade paint brush set for smooth, streak-free finishes on walls, wood and metal surfaces.",
    specs: {
      "Brushes Included": "5",
      "Bristle Type": "Synthetic",
      Use: "Interior + Exterior",
      Warranty: "NA",
    },
  },

  {
    id: "submersible-pump-1hp",
    name: "Submersible Pump 1HP",
    price: 8999,
    original: 12000,
    discount: 25,
    category: "Motor Pump",
    image: "/images/pump.png",
    rating: 4.8,
    reviews: 512,
    description:
      "1HP submersible pump engineered for deep wells and continuous operation with high efficiency motor.",
    specs: {
      Power: "1 HP",
      "Head Range": "Up to 60m",
      Discharge: "40 LPM",
      Warranty: "2 Years",
    },
  },

  {
    id: "wire-roll-90m",
    name: "Wire Roll 90m",
    price: 1800,
    original: 2200,
    discount: 18,
    category: "Electricals",
    image: "/images/wireroll.png",
    rating: 4.5,
    reviews: 174,
    description:
      "ISI certified 90m copper wire roll with PVC insulation. Suitable for residential and commercial wiring.",
    specs: {
      Length: "90m",
      Conductor: "Pure Copper",
      Certification: "ISI",
      Warranty: "1 Year",
    },
  },
];

export const CATEGORIES = [
  "Electronics",
  "Electricals",
  "Hardware",
  "Motor Pump & Submersible",
  "Home Application",
  "Industrial Goods",
];

export function inr(n: number) {
  return "₹" + n.toLocaleString("en-IN");
}