// Royalty-free city background images from Unsplash
export const cityBackgrounds = [
    {
      url: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1920&h=1080&fit=crop',
      city: 'New York',
      photographer: 'Unsplash'
    },
    {
      url: 'https://images.unsplash.com/photo-1502602898535-0b4c0b0b0b0b?w=1920&h=1080&fit=crop',
      city: 'Paris',
      photographer: 'Unsplash'
    },
    {
      url: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=1920&h=1080&fit=crop',
      city: 'Tokyo',
      photographer: 'Unsplash'
    },
    {
      url: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=1920&h=1080&fit=crop',
      city: 'London',
      photographer: 'Unsplash'
    },
    {
      url: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1920&h=1080&fit=crop',
      city: 'Dubai',
      photographer: 'Unsplash'
    },
    {
      url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop',
      city: 'San Francisco',
      photographer: 'Unsplash'
    },
    {
      url: 'https://images.unsplash.com/photo-1538970272646-f61fabb3a8a2?w=1920&h=1080&fit=crop',
      city: 'Singapore',
      photographer: 'Unsplash'
    },
    {
      url: 'https://images.unsplash.com/photo-1522083165195-3424ed129620?w=1920&h=1080&fit=crop',
      city: 'Barcelona',
      photographer: 'Unsplash'
    },
    {
      url: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=1920&h=1080&fit=crop',
      city: 'Hong Kong',
      photographer: 'Unsplash'
    },
    {
      url: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=1920&h=1080&fit=crop',
      city: 'Sydney',
      photographer: 'Unsplash'
    },
    {
      url: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=1920&h=1080&fit=crop',
      city: 'Chicago',
      photographer: 'Unsplash'
    },
    {
      url: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?w=1920&h=1080&fit=crop',
      city: 'Amsterdam',
      photographer: 'Unsplash'
    }
  ];
  
  export const getRandomCityBackground = () => {
    const randomIndex = Math.floor(Math.random() * cityBackgrounds.length);
    return cityBackgrounds[randomIndex];
  };
  
  export const getCityBackgroundByIndex = (index: number) => {
    return cityBackgrounds[index % cityBackgrounds.length];
  };