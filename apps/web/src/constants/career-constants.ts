export interface Hotspot {
  city: string;
  country: string;
  coordinates: [number, number]; // [latitude, longitude]
  intensity: number; // 1-5 scale
  description: string;
  salaryRange: string;
  jobAvailability: "Low" | "Medium" | "High";
  costOfLiving: "Low" | "Medium" | "High";
  visaRequirements: string;
}

export interface Career {
  name: string;
  hotspots: Hotspot[];
}

export const careers: Career[] = [
  {
    name: "Software Engineering",
    hotspots: [
      {
        city: "San Francisco",
        country: "USA",
        coordinates: [37.7749, -122.4194],
        intensity: 5,
        description:
          "The heart of Silicon Valley with major tech companies and startups. High-energy, competitive environment with cutting-edge innovation.",
        salaryRange: "$120,000 - $250,000",
        jobAvailability: "High",
        costOfLiving: "High",
        visaRequirements: "H1B Visa",
      },
      {
        city: "New York City",
        country: "USA",
        coordinates: [40.7128, -74.006],
        intensity: 4,
        description:
          "Financial tech hub with fintech companies and Wall Street tech roles. Fast-paced, ambitious culture.",
        salaryRange: "$100,000 - $200,000",
        jobAvailability: "High",
        costOfLiving: "High",
        visaRequirements: "H1B Visa",
      },
      {
        city: "Seattle",
        country: "USA",
        coordinates: [47.6062, -122.3321],
        intensity: 4,
        description:
          "Home to Amazon and Microsoft. More laid-back than SF but still competitive tech scene.",
        salaryRange: "$110,000 - $220,000",
        jobAvailability: "High",
        costOfLiving: "High",
        visaRequirements: "H1B Visa",
      },
      {
        city: "Toronto",
        country: "Canada",
        coordinates: [43.6532, -79.3832],
        intensity: 3,
        description:
          "Growing tech hub with diverse opportunities. More affordable than US cities with good work-life balance.",
        salaryRange: "$80,000 - $150,000 CAD",
        jobAvailability: "Medium",
        costOfLiving: "Medium",
        visaRequirements: "Work Permit",
      },
      {
        city: "London",
        country: "UK",
        coordinates: [51.5074, -0.1278],
        intensity: 3,
        description:
          "European tech capital with fintech focus. International culture with strong startup scene.",
        salaryRange: "£60,000 - £120,000",
        jobAvailability: "Medium",
        costOfLiving: "High",
        visaRequirements: "Skilled Worker Visa",
      },
    ],
  },
  {
    name: "Data Science",
    hotspots: [
      {
        city: "San Francisco",
        country: "USA",
        coordinates: [37.7749, -122.4194],
        intensity: 5,
        description:
          "Leading AI/ML companies and research institutions. Cutting-edge data science opportunities.",
        salaryRange: "$130,000 - $280,000",
        jobAvailability: "High",
        costOfLiving: "High",
        visaRequirements: "H1B Visa",
      },
      {
        city: "Boston",
        country: "USA",
        coordinates: [42.3601, -71.0589],
        intensity: 4,
        description:
          "Strong academic presence with MIT and Harvard. Research-focused data science roles.",
        salaryRange: "$100,000 - $180,000",
        jobAvailability: "High",
        costOfLiving: "High",
        visaRequirements: "H1B Visa",
      },
      {
        city: "Singapore",
        country: "Singapore",
        coordinates: [1.3521, 103.8198],
        intensity: 3,
        description:
          "Asian financial hub with growing fintech and data analytics opportunities.",
        salaryRange: "S$80,000 - S$150,000",
        jobAvailability: "Medium",
        costOfLiving: "High",
        visaRequirements: "Employment Pass",
      },
    ],
  },
  {
    name: "Finance",
    hotspots: [
      {
        city: "New York City",
        country: "USA",
        coordinates: [40.7128, -74.006],
        intensity: 5,
        description:
          "Wall Street and global financial center. High-pressure, high-reward environment.",
        salaryRange: "$100,000 - $500,000+",
        jobAvailability: "High",
        costOfLiving: "High",
        visaRequirements: "H1B Visa",
      },
      {
        city: "London",
        country: "UK",
        coordinates: [51.5074, -0.1278],
        intensity: 4,
        description:
          "European financial capital with international banking and investment opportunities.",
        salaryRange: "£70,000 - £200,000",
        jobAvailability: "High",
        costOfLiving: "High",
        visaRequirements: "Skilled Worker Visa",
      },
      {
        city: "Hong Kong",
        country: "Hong Kong",
        coordinates: [22.3193, 114.1694],
        intensity: 4,
        description:
          "Asian financial hub with strong banking and investment sectors.",
        salaryRange: "HK$600,000 - HK$1,500,000",
        jobAvailability: "Medium",
        costOfLiving: "High",
        visaRequirements: "Work Visa",
      },
    ],
  },
  {
    name: "Product Management",
    hotspots: [
      {
        city: "San Francisco",
        country: "USA",
        coordinates: [37.7749, -122.4194],
        intensity: 5,
        description:
          "Tech product management hub with major companies and startups. Innovation-focused culture.",
        salaryRange: "$140,000 - $300,000",
        jobAvailability: "High",
        costOfLiving: "High",
        visaRequirements: "H1B Visa",
      },
      {
        city: "Seattle",
        country: "USA",
        coordinates: [47.6062, -122.3321],
        intensity: 4,
        description:
          "Strong PM culture at Amazon and Microsoft. Customer-focused product development.",
        salaryRange: "$120,000 - $250,000",
        jobAvailability: "High",
        costOfLiving: "High",
        visaRequirements: "H1B Visa",
      },
      {
        city: "Austin",
        country: "USA",
        coordinates: [30.2672, -97.7431],
        intensity: 3,
        description:
          "Growing tech scene with lower cost of living. Startup-friendly environment.",
        salaryRange: "$90,000 - $180,000",
        jobAvailability: "Medium",
        costOfLiving: "Medium",
        visaRequirements: "H1B Visa",
      },
    ],
  },
  {
    name: "Design",
    hotspots: [
      {
        city: "San Francisco",
        country: "USA",
        coordinates: [37.7749, -122.4194],
        intensity: 4,
        description:
          "Design-forward tech companies with strong UX/UI culture. Creative and innovative environment.",
        salaryRange: "$100,000 - $200,000",
        jobAvailability: "High",
        costOfLiving: "High",
        visaRequirements: "H1B Visa",
      },
      {
        city: "New York City",
        country: "USA",
        coordinates: [40.7128, -74.006],
        intensity: 4,
        description:
          "Creative capital with agencies, startups, and media companies. Diverse design opportunities.",
        salaryRange: "$80,000 - $160,000",
        jobAvailability: "High",
        costOfLiving: "High",
        visaRequirements: "H1B Visa",
      },
      {
        city: "Amsterdam",
        country: "Netherlands",
        coordinates: [52.3676, 4.9041],
        intensity: 3,
        description:
          "European design hub with strong creative culture and work-life balance.",
        salaryRange: "€50,000 - €90,000",
        jobAvailability: "Medium",
        costOfLiving: "Medium",
        visaRequirements: "EU Blue Card",
      },
    ],
  },
];
