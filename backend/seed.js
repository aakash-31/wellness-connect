const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

const User = require('./models/User');
const Post = require('./models/Post');
const Therapist = require('./models/Therapist');
const Journal = require('./models/Journal');

dotenv.config();

// Therapists
const therapistsData = [
  {
    name: 'Dr. Ananya Sharma',
    title: 'Clinical Psychologist',
    specialty: ['Anxiety', 'CBT', 'Mindfulness'],
    rating: 4.9,
    distanceInfo: 'Colaba, Mumbai',
    description: 'Expert in mindfulness-based cognitive therapy with 15 years of experience helping Mumbaikars find inner peace.',
    imageUrl: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=1974&auto=format&fit=crop',
    coordinates: { lat: 18.9220, lng: 72.8347 }
  },
  {
    name: 'Abhishek Gour, LMFT',
    title: 'Marriage & Family Therapist',
    specialty: ['Relationship', 'Trauma', 'Generational Patterns'],
    rating: 5.0,
    distanceInfo: 'Bandra West, Mumbai',
    description: 'Focusing on modern relationships and family dynamics in urban India.',
    imageUrl: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=2070&auto=format&fit=crop',
    coordinates: { lat: 19.0596, lng: 72.8295 }
  },
  {
    name: 'Dr. Priya Iyer',
    title: 'Integrative Psychiatrist',
    specialty: ['Depression', 'Bipolar Disorder', 'Medication Management'],
    rating: 4.8,
    distanceInfo: 'Andheri East, Mumbai',
    description: 'A holistic approach to mental health, combining traditional psychiatry with modern wellness practices.',
    imageUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=2070&auto=format&fit=crop',
    coordinates: { lat: 19.1136, lng: 72.8697 }
  },
  {
    name: 'Dr. Rohan Desai',
    title: 'Cognitive Behavioral Therapist',
    specialty: ['Stress Management', 'CBT', 'Anger Management'],
    rating: 4.7,
    distanceInfo: 'Juhu, Mumbai',
    description: 'Specializing in evidence-based treatments to help individuals overcome daily stress and anxiety.',
    imageUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=2000&auto=format&fit=crop',
    coordinates: { lat: 19.1075, lng: 72.8263 }
  },
  {
    name: 'Neha Kapoor, MSW',
    title: 'Licensed Clinical Social Worker',
    specialty: ['Grief Counseling', 'Trauma', 'Child & Adolescent'],
    rating: 4.9,
    distanceInfo: 'Powai, Mumbai',
    description: 'Providing a safe space for healing, processing grief, and navigating difficult life transitions.',
    imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=2000&auto=format&fit=crop',
    coordinates: { lat: 19.1176, lng: 72.9060 }
  }
];

// Community Posts 
const postsData = [
  {
    title: 'Small victories in a long week',
    content: "Today I finally managed to open my blinds and let the sunlight in. It sounds so small, but after three days of staying in the dark, it felt like a mountain was moved. I'm learning that recovery isn't a straight line...",
    category: 'Seeking Hope'
  },
  {
    title: "Does anyone else feel like they're observing the world through glass?",
    content: "I'm surrounded by people at work, but I feel entirely disconnected. It's like there's a barrier I can't break through. Just looking for some validation that I'm not the only one feeling this distance...",
    category: 'Loneliness'
  },
  {
    title: "The power of 5 minutes of stretching",
    content: "I've been trying the new mindfulness exercises on the app, and honestly incorporating just five minutes of mindful breathing before I check my phone has lowered my baseline anxiety noticeably.",
    category: 'Mindfulness'
  }
];

// Demo User Journal Entries 
const journalData = [
  {
    title: 'First day using Sanctuary',
    content: "Decided to give this app a proper try today. I've been struggling to articulate my feelings for a while now, and maybe writing them down will help. Feeling cautiously optimistic.",
    mood: 'Reflective'
  },
  {
    title: 'Tried the breathing exercise',
    content: "Used the Luminous Circle breathwork tool for 10 minutes before bed last night. I was skeptical but the 4-7-8 technique actually made a noticeable difference. Fell asleep faster than I have in weeks.",
    mood: 'Calm'
  },
  {
    title: 'Hard day at work',
    content: "Meetings back to back, no lunch break, and I got some critical feedback on a project I worked really hard on. Feeling a bit deflated. But I'm writing this down instead of doom-scrolling, so that's progress.",
    mood: 'Anxious'
  }
];

//Seeder 
const importData = async () => {
  try {
    await connectDB();

    console.log('Clearing existing data...');
    await User.deleteMany();
    await Post.deleteMany();
    await Therapist.deleteMany();
    await Journal.deleteMany();

    console.log('Creating demo user...');
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('demo123', salt);

    const demoUser = await User.create({
      username: 'demo_user',
      email: 'demo@wellnessconnect.com',
      password: hashedPassword
    });

    // Also create a second "community" author for variety
    const communityUser = await User.create({
      username: 'CommunityMember',
      email: 'member@sanctuary.com',
      password: hashedPassword
    });

    console.log('Inserting seed data...');

    await Therapist.insertMany(therapistsData);

    await Post.insertMany([
      { ...postsData[0], author: demoUser._id },
      { ...postsData[1], author: communityUser._id },
      { ...postsData[2], author: demoUser._id },
    ]);

    await Journal.insertMany(
      journalData.map(entry => ({ ...entry, user: demoUser._id }))
    );

    console.log('');
    console.log('Data Imported Successfully!');
    console.log('Demo Login Credentials:');
    console.log('Email: demo@wellnessconnect.com');
    console.log('Password: demo123');
    process.exit();
  } catch (error) {
    console.error('Error importing data:', error);
    process.exit(1);
  }
};

importData();
