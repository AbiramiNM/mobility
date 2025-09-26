import axios from 'axios';

// Unsplash API configuration
const UNSPLASH_ACCESS_KEY = 'your_unsplash_access_key'; // Replace with actual key
const UNSPLASH_BASE_URL = 'https://api.unsplash.com';

// OpenWeatherMap API configuration
const WEATHER_API_KEY = 'your_openweathermap_api_key'; // Replace with actual key
const WEATHER_BASE_URL = 'https://api.openweathermap.org/data/2.5';

export interface TravelImage {
  id: string;
  urls: {
    regular: string;
    small: string;
    thumb: string;
  };
  alt_description: string;
  user: {
    name: string;
  };
}

export interface WeatherData {
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
  };
  weather: Array<{
    main: string;
    description: string;
    icon: string;
  }>;
  name: string;
}

export interface SeasonInfo {
  season: 'spring' | 'summer' | 'autumn' | 'winter';
  icon: string;
  description: string;
  temperature: string;
}

// Mock data for development (when APIs are not available)
const MOCK_IMAGES: TravelImage[] = [
  {
    id: '1',
    urls: {
      regular: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
      small: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
      thumb: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=150&fit=crop'
    },
    alt_description: 'Beautiful mountain landscape',
    user: { name: 'Photographer' }
  },
  {
    id: '2',
    urls: {
      regular: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=600&fit=crop',
      small: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=300&fit=crop',
      thumb: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=200&h=150&fit=crop'
    },
    alt_description: 'Scenic nature view',
    user: { name: 'Nature Photographer' }
  },
  {
    id: '3',
    urls: {
      regular: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800&h=600&fit=crop',
      small: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=400&h=300&fit=crop',
      thumb: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=200&h=150&fit=crop'
    },
    alt_description: 'Peaceful lake view',
    user: { name: 'Landscape Photographer' }
  }
];

const MOCK_WEATHER: WeatherData = {
  main: {
    temp: 25,
    feels_like: 27,
    humidity: 65
  },
  weather: [{
    main: 'Clear',
    description: 'clear sky',
    icon: '01d'
  }],
  name: 'Destination'
};

// Fetch destination images from Unsplash
export async function fetchDestinationImages(destination: string, count: number = 3): Promise<TravelImage[]> {
  try {
    // For development, return mock data
    if (UNSPLASH_ACCESS_KEY === 'your_unsplash_access_key') {
      return MOCK_IMAGES.slice(0, count);
    }

    const response = await axios.get(`${UNSPLASH_BASE_URL}/search/photos`, {
      params: {
        query: destination,
        per_page: count,
        orientation: 'landscape'
      },
      headers: {
        'Authorization': `Client-ID ${UNSPLASH_ACCESS_KEY}`
      }
    });

    return response.data.results;
  } catch (error) {
    console.error('Error fetching images:', error);
    return MOCK_IMAGES.slice(0, count);
  }
}

// Fetch weather data for destination
export async function fetchWeatherData(destination: string): Promise<WeatherData> {
  try {
    // For development, return mock data
    if (WEATHER_API_KEY === 'your_openweathermap_api_key') {
      return { ...MOCK_WEATHER, name: destination };
    }

    const response = await axios.get(`${WEATHER_BASE_URL}/weather`, {
      params: {
        q: destination,
        appid: WEATHER_API_KEY,
        units: 'metric'
      }
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching weather:', error);
    return { ...MOCK_WEATHER, name: destination };
  }
}

// Get season information based on destination and current date
export function getSeasonInfo(destination: string, temperature: number): SeasonInfo {
  const month = new Date().getMonth();
  let season: 'spring' | 'summer' | 'autumn' | 'winter';
  let icon: string;
  let description: string;

  // Simple season determination (can be enhanced with location-based logic)
  if (month >= 2 && month <= 4) {
    season = 'spring';
    icon = '🌸';
    description = 'Spring';
  } else if (month >= 5 && month <= 7) {
    season = 'summer';
    icon = '☀️';
    description = 'Summer';
  } else if (month >= 8 && month <= 10) {
    season = 'autumn';
    icon = '🍂';
    description = 'Autumn';
  } else {
    season = 'winter';
    icon = '❄️';
    description = 'Winter';
  }

  return {
    season,
    icon,
    description,
    temperature: `${Math.round(temperature)}°C`
  };
}

// Get best season to visit based on destination (mock logic)
export function getBestSeasonToVisit(destination: string): { season: string; icon: string; reason: string } {
  const destinationLower = destination.toLowerCase();
  
  // Mock logic for best seasons
  if (destinationLower.includes('beach') || destinationLower.includes('tropical')) {
    return { season: 'Summer', icon: '☀️', reason: 'Perfect for beach activities' };
  } else if (destinationLower.includes('mountain') || destinationLower.includes('ski')) {
    return { season: 'Winter', icon: '❄️', reason: 'Best for winter sports' };
  } else if (destinationLower.includes('garden') || destinationLower.includes('park')) {
    return { season: 'Spring', icon: '🌸', reason: 'Beautiful blooming season' };
  } else {
    return { season: 'Autumn', icon: '🍂', reason: 'Pleasant weather and fewer crowds' };
  }
}
