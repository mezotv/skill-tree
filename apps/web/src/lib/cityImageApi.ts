// Unsplash API integration for city images
const UNSPLASH_ACCESS_KEY = "5Vbypt0IQxhpoKgfxrZKTLgC1RPJxxquPs39nrZp2ng";

export interface UnsplashImage {
  id: string;
  urls: {
    regular: string;
    small: string;
    thumb: string;
  };
  alt_description: string;
}

export interface UnsplashResponse {
  results: UnsplashImage[];
  total: number;
}

export async function getCityImage(
  cityName: string,
  countryName: string
): Promise<string | undefined> {
  try {
    // Create a search query that includes city name and country for better results
    const query = `${cityName} ${countryName} cityscape skyline urban`;

    const response = await fetch(
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(
        query
      )}&per_page=1&orientation=landscape&client_id=${UNSPLASH_ACCESS_KEY}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Unsplash API error: ${response.status}`);
    }

    const data: UnsplashResponse = await response.json();

    if (data.results && data.results.length > 0) {
      return data.results[0].urls.regular;
    }

    return undefined;
  } catch (error) {
    console.error("Error fetching city image:", error);
    return undefined;
  }
}

// Pre-defined city images for better performance and consistency
export const CITY_IMAGES: Record<string, string> = {
  "San Francisco":
    "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800&h=600&fit=crop",
  "New York City":
    "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800&h=600&fit=crop",
  Seattle:
    "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&h=600&fit=crop",
  Toronto:
    "https://images.unsplash.com/photo-1517935706615-2717063c2225?w=800&h=600&fit=crop",
  London:
    "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&h=600&fit=crop",
  Boston:
    "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1f?w=800&h=600&fit=crop",
  Singapore:
    "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=800&h=600&fit=crop",
  "Hong Kong":
    "https://images.unsplash.com/photo-1539650116574-75c0c6d73c6e?w=800&h=600&fit=crop",
  Austin:
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
  Amsterdam:
    "https://images.unsplash.com/photo-1534351590666-13e3e96b5017?w=800&h=600&fit=crop",
};

export function getCityImageUrl(cityName: string): string | undefined {
  return CITY_IMAGES[cityName] || undefined;
}
