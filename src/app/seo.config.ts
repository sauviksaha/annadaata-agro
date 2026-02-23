export const companyInfo = {
  name: 'Annadaata Agro Industries',
  shortName: 'Annadaata Agro Industries',
  address: 'Baharampur, Shyamsundar, Bardhaman - 713424, West Bengal, India',
  phone: ['+919064389085', '+919832170531'],
  email: 'industries.annadaataagro@gmail.com',
  businessHours: 'Monday to Sunday 9am to 8pm',
  // socialMedia: {
  //   facebook: 'https://facebook.com/annadaatafoodproducts', // Update with actual URL
  //   linkedin: 'https://linkedin.com/company/annadaatafoodproducts', // Update with actual URL
  // }
};

export const productInfo = {
  mainProducts: [
    'Minikit Rice',
    'Swarna Rice (Bodhana Rice)',
    'Kuruva Rice',
    'IR-36 Rice',
    'Banshkathi Rice',
    '10-10 Rice',
    'Gobindobhog Rice (Jeerakhasala Rice)'
  ],
  flagshipProduct: 'Jeerakhasala Rice',
  productFeatures: [
    'Premium Quality Rice',
    'Traditional Processing Methods',
    'Modern Quality Control',
    'Wholesale Quantities Available',
    'Direct from Manufacturing Unit'
  ]
};

export const seoKeywords = [
  // Primary Keywords
  'rice manufacturer West Bengal',
  'rice mill Bardhaman',
  'Gobindobhog Rice manufacturer',
  'rice processing unit Bardhaman',
  'wholesale rice supplier',
  'rice manufacturing company India',
  
  // Location-based Keywords
  'rice manufacturer Shyamsundar',
  'rice supplier Bardhaman',
  'rice mill West Bengal',
  'rice wholesaler Baharampur',
  'rice manufacturer near Kolkata',
  'rice manufacturer in West Bengal',
  
  // Product-specific Keywords
  'Minikit Rice manufacturer',
  'Swarna Rice supplier',
  'Kuruva Rice wholesale',
  'IR-36 Rice bulk supplier',
  'Banshkathi Rice manufacturer',
  'Gobindobhog Rice wholesale',
  
  // Long-tail Keywords
  'bulk rice supplier West Bengal',
  'traditional rice manufacturer India',
  'rice processing unit Bardhaman',
  'wholesale rice supplier West Bengal',
  'premium quality rice manufacturer',
  
  // Business-specific Keywords
  'rice mill direct supply',
  'rice manufacturing unit',
  'rice processing facility',
  'rice wholesale business',
  'rice bulk orders'
];

export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "FoodManufacturer",
  "name": companyInfo.name,
  "image": [
    "https://annadaataagro.com/apple-icon.png", 
    // "https://annadaataagro.com/hero.webp",
  ],
  "description": "Leading rice manufacturer in Bardhaman, West Bengal. We specialize in premium rice varieties including Minikit, Swarna, Kuruva, IR-36, Banshkathi, and Gobindobhog Rice. Direct supply from our manufacturing unit.",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Baharampur, Shyamsundar",
    "addressLocality": "Bardhaman",
    "postalCode": "713424",
    "addressRegion": "West Bengal",
    "addressCountry": "IN"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "23.1281039",
    "longitude": "87.8500515"
  },
  "telephone": companyInfo.phone,
  "email": companyInfo.email,
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday"
    ],
    "opens": "09:00",
    "closes": "20:00"
  },
  // "sameAs": [
  //   companyInfo.socialMedia.facebook,
  //   companyInfo.socialMedia.linkedin
  // ]
}; 