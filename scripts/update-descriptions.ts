import { db } from "../server/db";
import { attractions } from "../shared/schema";
import { eq } from "drizzle-orm";

const updates = [
  { name: "Grand Palace", description: "Official residence of Thai monarchs featuring dazzling gold spires and ornate architecture." },
  { name: "Petra", description: "Ancient city carved into rose-red sandstone cliffs, showcasing Nabataean architecture." },
  { name: "Table Mountain", description: "Africa's iconic landmark offering breathtaking panoramic views of Cape Town." },
  { name: "Neuschwanstein Castle", description: "Fairy-tale castle perched dramatically in the Bavarian Alps with white limestone walls." },
  { name: "Duomo", description: "Masterpiece of Italian Gothic with revolutionary dome and multicolored marble facade." },
  { name: "Machu Picchu", description: "Lost City of Incas hidden in Andes mountains, a mystical 15th century citadel." },
  { name: "Christ the Redeemer", description: "Colossal Art Deco statue towering over Rio, a global icon of Brazil." },
  { name: "The Louvre Abu Dhabi", description: "Modern museum with spectacular geometric dome and world-class art collections." },
  { name: "Dome of the Rock", description: "Golden dome rising from Temple Mount since 691 AD, sacred to multiple faiths." },
  { name: "Duomo di Milano", description: "World's largest Gothic cathedral covered in intricate spires and sculptures." },
  { name: "Edinburgh Castle", description: "Fortress atop volcano dominating Edinburgh's skyline for over a thousand years." },
  { name: "Mont Saint-Michel", description: "Medieval abbey crowning a rocky island rising dramatically from Normandy coast." },
  { name: "Chichen Itza", description: "Major Mayan site with El Castillo pyramid, sacred cenotes, and carvings." },
  { name: "Angkor Wat", description: "World's largest religious monument, stunning 12th century Khmer temple complex." },
  { name: "Alhambra", description: "Islamic fortress-palace with ornate carvings, graceful arches, geometric patterns." },
  { name: "Buckingham Palace", description: "Official royal residence with neoclassical architecture and famous guard ceremony." },
  { name: "Tower of London", description: "Historic fortress guarding Thames for a thousand years, housing Crown Jewels." },
  { name: "Reichstag Building", description: "Germany's parliament with stunning architecture and iconic dome with city views." },
  { name: "Temple of Heaven", description: "Sacred 15th century complex where emperors performed rituals for harvests." },
  { name: "Hagia Sophia", description: "Byzantine masterpiece with revolutionary dome blending Christian and Islamic art." },
  { name: "Meiji Shrine", description: "Serene Shinto shrine in forest sanctuary offering peaceful respite from city." },
  { name: "Acropolis", description: "Home to Parthenon, humanity's greatest classical achievement from 2,500 years ago." },
  { name: "Musée d'Orsay", description: "Former train station showcasing Impressionist masterpieces by Monet, Van Gogh." },
  { name: "Schönbrunn Palace", description: "Austria's grandest palace with opulent Rococo architecture and grand gardens." },
  { name: "Pompeii", description: "Roman city frozen in time by Vesuvius eruption, revealing ancient daily life." },
  { name: "Palace Museum", description: "World's greatest Chinese imperial art collection spanning 8,000 years history." },
  { name: "Statue of Liberty", description: "Colossal copper statue symbolizing freedom, welcoming millions over a century." },
  { name: "Blue Mosque", description: "Ottoman mosque with six minarets and thousands of hand-painted blue tiles." },
  { name: "Sagrada Familia", description: "Gaudí's unfinished basilica with soaring towers and stained glass masterpiece." },
  { name: "Hermitage Museum", description: "Former Winter Palace housing world's greatest collection with 3 million works." },
  { name: "St. Mark's Basilica", description: "Byzantine masterpiece with five domes, golden mosaics, and shimmering marble." },
  { name: "Cologne Cathedral", description: "Gothic cathedral with twin 157-meter spires built over 600 years to complete." },
  { name: "Eiffel Tower", description: "Iconic iron tower piercing Parisian sky at 330 meters, built for 1889 Fair." },
  { name: "Burj Khalifa", description: "World's tallest building at 829.8 meters with incredible observation views." },
  { name: "British Museum", description: "World-class museum with Rosetta Stone, Egyptian mummies, and free admission." },
  { name: "Vatican Museums", description: "Housing Michelangelo's Sistine Chapel ceiling and Renaissance masterpieces." },
  { name: "Taj Mahal", description: "Ivory-white marble mausoleum with perfect symmetry, world's most beautiful." },
  { name: "Colosseum", description: "Ancient Roman amphitheater from 80 AD, pinnacle of Roman engineering power." },
  { name: "Lincoln Memorial", description: "Tribute to Lincoln where MLK delivered his I Have a Dream speech." },
  { name: "Palace of Versailles", description: "Symbol of monarchy with Hall of Mirrors, lavish apartments, grand gardens." },
  { name: "Sydney Opera House", description: "Iconic sail-shaped shells rising majestically from Sydney Harbour waterfront." },
  { name: "Louvre Museum", description: "World's most visited museum with Mona Lisa and iconic glass pyramid entrance." },
  { name: "Hollywood Walk of Fame", description: "Over 2,700 brass stars honoring entertainment legends along Hollywood Boulevard." },
  { name: "Great Wall of China", description: "Engineering marvel snaking across mountains for thousands of kilometers." },
  { name: "St. Peter's Basilica", description: "World's largest church and Renaissance masterpiece with Michelangelo's dome." },
  { name: "Sacré-Cœur Basilica", description: "White basilica on Montmartre hill with sweeping panoramic views of Paris." },
  { name: "Notre-Dame Cathedral", description: "Gothic masterpiece famous for flying buttresses, rose windows, stonework." },
  { name: "Forbidden City", description: "World's largest palace complex with 1,000 golden-roofed buildings inside." },
  { name: "Niagara Falls", description: "Natural wonder with massive cascading waterfalls creating rainbows in mist." },
  { name: "Senso-ji Temple", description: "Tokyo's oldest temple in Asakusa with giant red lantern and vibrant energy." },
];

for (const u of updates) {
  await db.update(attractions).set({ description: u.description }).where(eq(attractions.name, u.name));
  console.log("Updated:", u.name);
}
console.log("All done!");
process.exit(0);
