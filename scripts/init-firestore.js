const { initializeApp } = require('firebase/app');
const { getFirestore, doc, setDoc } = require('firebase/firestore');
require('dotenv').config({ path: '.env.local' });

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const initialData = {
  hero: {
    title: 'Elevate Your Digital Presence',
    subtitle: 'Creative social media marketing and multimedia production that builds trust and drives growth. Positive vibes, professional results.'
  },
  contact: {
    email: 'hello@smediahub.com',
    phone: '+1 (555) 000-0000',
    address: 'Dubai, UAE',
    instagram: '@smediahub',
    facebook: 'smediahub',
    x: 'smediahub',
    tiktok: '@smediahub'
  },
  stats: {
    projects: '120+',
    retention: '95%',
    reach: '10M+',
    support: '24/7'
  },
  services: [
    { 
      title: 'Social Media Management', 
      description: 'Complete strategy and execution to grow your audience across all platforms.',
      image: 'https://cdn-icons-png.flaticon.com/512/3121/3121601.png'
    },
    { 
      title: 'Multimedia Production', 
      description: 'Cinematic video production and professional photography that captures your brand essence.',
      image: 'https://cdn-icons-png.flaticon.com/512/3221/3221803.png'
    },
    { 
      title: 'Brand Identity', 
      description: 'Visual storytelling and graphic design that builds a consistent and premium brand image.',
      image: 'https://cdn-icons-png.flaticon.com/512/3222/3222672.png'
    }
  ],
  portfolio: [
    {
      title: "Social Growth Strategy",
      category: "Marketing",
      metric: "+240% Engagement",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: "Lifestyle Branding",
      category: "Photography",
      metric: "Premium Visuals",
      image: "https://images.unsplash.com/photo-1492691523567-6170c3295db5?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: "Corporate Identity",
      category: "Design",
      metric: "Unified Vision",
      image: "https://images.unsplash.com/photo-1557838923-2985c318be48?auto=format&fit=crop&q=80&w=800"
    }
  ],
  theme: {
    primaryColor: '#ff4d4d',
    backgroundColor: '#ffffff',
    fontHeading: 'Lexend',
    fontBody: 'Outfit'
  }
};

async function init() {
  console.log('🚀 Initializing Firestore with professional defaults...');
  try {
    await setDoc(doc(db, 'site_content', 'config'), initialData);
    console.log('✅ Database built successfully! Your site is now live with real data.');
  } catch (error) {
    console.error('❌ Error building database:', error);
    console.log('\nTip: Make sure you have created a Firestore database in your Firebase Console and set rules to "test mode" or allow reads/writes.');
  }
}

init();
