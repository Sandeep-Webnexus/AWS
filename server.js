const express = require('express');
const  {getMatchInfo} = require('./handler.js');
const app = express();
const port = 3000;

app.use(express.json());

const data = {
  social: [
    { platform: 'Facebook', link: 'https://facebook.com', description: 'Connect with friends and share updates.', founded: 2004 },
    { platform: 'Twitter', link: 'https://twitter.com', description: 'Real-time microblogging platform.', founded: 2006 },
    { platform: 'LinkedIn', link: 'https://linkedin.com', description: 'Professional networking platform.', founded: 2003 },
    { platform: 'Instagram', link: 'https://instagram.com', description: 'Photo and video sharing app.', founded: 2010 },
    { platform: 'Pinterest', link: 'https://pinterest.com', description: 'Visual discovery engine.', founded: 2010 },
    { platform: 'Snapchat', link: 'https://snapchat.com', description: 'Ephemeral photo and video sharing app.', founded: 2011 },
  ],
  tech: [
    { name: 'AWS', category: 'Cloud Computing', description: 'Scalable cloud computing solutions.', launchYear: 2006 },
    { name: 'Node.js', category: 'Backend', description: 'JavaScript runtime for backend development.', launchYear: 2009 },
    { name: 'React', category: 'Frontend', description: 'Library for building user interfaces.', launchYear: 2013 },
    { name: 'Python', category: 'Programming Language', description: 'Versatile and widely-used programming language.', launchYear: 1991 },
    { name: 'Docker', category: 'Containerization', description: 'Platform for containerized applications.', launchYear: 2013 },
    { name: 'Kubernetes', category: 'Orchestration', description: 'Automates deployment and scaling of containers.', launchYear: 2015 },
  ],
  food: [
    { name: 'Pizza', category: 'Fast Food', origin: 'Italy', description: 'Flatbread topped with sauce, cheese, and toppings.' },
    { name: 'Sushi', category: 'Seafood', origin: 'Japan', description: 'Vinegared rice with seafood or vegetables.' },
    { name: 'Tacos', category: 'Mexican', origin: 'Mexico', description: 'Tortilla filled with meat, cheese, and vegetables.' },
    { name: 'Pasta', category: 'Italian', origin: 'Italy', description: 'Noodles made from durum wheat flour.' },
    { name: 'Biryani', category: 'Indian', origin: 'India', description: 'Spiced rice with meat or vegetables.' },
    { name: 'Burger', category: 'Fast Food', origin: 'USA', description: 'Sandwich with a meat patty, lettuce, and condiments.' },
  ],
  animal: [
    { name: 'Tiger', category: 'Wild', habitat: 'Forests', description: 'A large, carnivorous feline with stripes.' },
    { name: 'Elephant', category: 'Wild', habitat: 'Forests', description: 'Largest land animal with a trunk and tusks.' },
    { name: 'Dog', category: 'Domestic', habitat: 'Homes', description: 'Loyal and intelligent domesticated mammal.' },
    { name: 'Cat', category: 'Domestic', habitat: 'Homes', description: 'Small, agile, and independent pet.' },
    { name: 'Penguin', category: 'Bird', habitat: 'Antarctica', description: 'Flightless bird adapted to cold climates.' },
    { name: 'Dolphin', category: 'Marine', habitat: 'Oceans', description: 'Intelligent marine mammal known for social behavior.' },
  ],
  temple: [
    { name: 'Taj Mahal', location: 'India', type: 'Mausoleum', description: 'UNESCO World Heritage site and iconic symbol of love.' },
    { name: 'Meenakshi Temple', location: 'Madurai, India', type: 'Hindu Temple', description: 'Historic temple dedicated to Goddess Meenakshi.' },
    { name: 'Angkor Wat', location: 'Cambodia', type: 'Hindu/Buddhist Temple', description: 'World’s largest religious structure.' },
    { name: 'Golden Temple', location: 'Amritsar, India', type: 'Sikh Gurudwara', description: 'Holiest shrine in Sikhism.' },
    { name: 'Borobudur', location: 'Indonesia', type: 'Buddhist Temple', description: 'Largest Buddhist temple in the world.' },
    { name: 'St. Peter’s Basilica', location: 'Vatican City', type: 'Church', description: 'Renaissance-era church, central to Christianity.' },
  ],
  cricketer: [
    { name: 'Virat Kohli', country: 'India', role: 'Batsman', description: 'Former captain of the Indian cricket team and a world-class batsman.' },
    { name: 'Sachin Tendulkar', country: 'India', role: 'Batsman', description: 'Known as the "God of Cricket" for his legendary career.' },
    { name: 'MS Dhoni', country: 'India', role: 'Wicketkeeper-Batsman', description: 'India’s most successful captain in limited-overs cricket.' },
    { name: 'Kane Williamson', country: 'New Zealand', role: 'Batsman', description: 'Known for his calm and consistent performances.' },
    { name: 'Ben Stokes', country: 'England', role: 'All-Rounder', description: 'Match-winning performances in high-pressure situations.' },
    { name: 'Muttiah Muralitharan', country: 'Sri Lanka', role: 'Bowler', description: 'Holds the record for most Test wickets.' },
  ],
  politician: [
    { name: 'Narendra Modi', country: 'India', role: 'Prime Minister', description: 'Current Prime Minister of India since 2014.' },
    { name: 'Joe Biden', country: 'USA', role: 'President', description: '46th President of the United States.' },
    { name: 'Angela Merkel', country: 'Germany', role: 'Chancellor', description: 'Former Chancellor known for her leadership in Europe.' },
    { name: 'Jacinda Ardern', country: 'New Zealand', role: 'Prime Minister', description: 'Former PM known for her progressive policies.' },
    { name: 'Barack Obama', country: 'USA', role: 'Former President', description: 'First African-American President of the US.' },
    { name: 'Mahatma Gandhi', country: 'India', role: 'Freedom Fighter', description: 'Leader of India’s independence movement.' },
  ],
};


app.post('/match-info', (req, res) => {
  const { key } = req.body;

  if (!key || !data[key]) {
    return res.status(400).json({ message: 'Invalid key or no data available for the provided key.' });
  }

  return res.status(200).json({ key, data: data[key] });
});

// app.post('/match-info', getMatchInfo);
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});