export interface University {
  name: string;
  coordinates: [number, number]; // [latitude, longitude]
  programs: string[];
  description: string;
  country: string;
}

export const universities: University[] = [
  // Software Engineering
  {
    name: "Massachusetts Institute of Technology",
    coordinates: [42.3601, -71.0942],
    programs: ["Computer Science", "Software Engineering", "AI/ML"],
    description:
      "Leading institution in technology and engineering with cutting-edge research.",
    country: "USA",
  },
  {
    name: "Stanford University",
    coordinates: [37.4275, -122.1697],
    programs: [
      "Computer Science",
      "Software Engineering",
      "Human-Computer Interaction",
    ],
    description: "Silicon Valley powerhouse with strong industry connections.",
    country: "USA",
  },
  {
    name: "Carnegie Mellon University",
    coordinates: [40.4426, -79.9459],
    programs: ["Computer Science", "Software Engineering", "Robotics"],
    description: "Top-ranked CS program with strong industry partnerships.",
    country: "USA",
  },
  {
    name: "University of Waterloo",
    coordinates: [43.4723, -80.5449],
    programs: [
      "Computer Science",
      "Software Engineering",
      "Computer Engineering",
    ],
    description: "Strong co-op program with excellent industry connections.",
    country: "Canada",
  },

  // Data Science
  {
    name: "Harvard University",
    coordinates: [42.377, -71.1167],
    programs: ["Data Science", "Statistics", "Computer Science"],
    description:
      "Prestigious institution with strong research programs in data science.",
    country: "USA",
  },
  {
    name: "University of California, Berkeley",
    coordinates: [37.8719, -122.2585],
    programs: ["Data Science", "Statistics", "Computer Science"],
    description:
      "Leading public university with excellent data science programs.",
    country: "USA",
  },
  {
    name: "University of Toronto",
    coordinates: [43.6532, -79.3832],
    programs: ["Data Science", "Statistics", "Computer Science"],
    description:
      "Top Canadian university with strong research in AI and data science.",
    country: "Canada",
  },

  // Finance
  {
    name: "Wharton School (University of Pennsylvania)",
    coordinates: [39.9522, -75.1932],
    programs: ["Finance", "Economics", "Business"],
    description: "Premier business school with top-ranked finance programs.",
    country: "USA",
  },
  {
    name: "London School of Economics",
    coordinates: [51.5144, -0.1167],
    programs: ["Finance", "Economics", "Accounting"],
    description:
      "Leading social science institution with strong finance programs.",
    country: "UK",
  },
  {
    name: "New York University Stern",
    coordinates: [40.7295, -73.9965],
    programs: ["Finance", "Economics", "Business"],
    description:
      "Located in financial capital with strong Wall Street connections.",
    country: "USA",
  },

  // Product Management
  {
    name: "Stanford Graduate School of Business",
    coordinates: [37.4275, -122.1697],
    programs: ["MBA", "Product Management", "Entrepreneurship"],
    description:
      "Silicon Valley MBA program with strong product management focus.",
    country: "USA",
  },
  {
    name: "Kellogg School (Northwestern)",
    coordinates: [42.0565, -87.6753],
    programs: ["MBA", "Product Management", "Marketing"],
    description:
      "Top MBA program with excellent product management curriculum.",
    country: "USA",
  },
  {
    name: "INSEAD",
    coordinates: [48.8566, 2.3522],
    programs: ["MBA", "Product Management", "International Business"],
    description:
      "Global business school with strong product management programs.",
    country: "France",
  },

  // Design
  {
    name: "Rhode Island School of Design",
    coordinates: [41.8268, -71.4025],
    programs: ["Graphic Design", "Industrial Design", "Digital Media"],
    description:
      "Premier art and design school with strong industry connections.",
    country: "USA",
  },
  {
    name: "Parsons School of Design",
    coordinates: [40.7355, -73.9918],
    programs: ["Graphic Design", "Fashion Design", "Digital Design"],
    description: "Leading design school in New York with innovative programs.",
    country: "USA",
  },
  {
    name: "Royal College of Art",
    coordinates: [51.5074, -0.1278],
    programs: ["Graphic Design", "Industrial Design", "Digital Media"],
    description: "World-renowned art and design institution in London.",
    country: "UK",
  },
];
