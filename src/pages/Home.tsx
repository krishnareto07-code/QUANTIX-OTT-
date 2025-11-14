import Header from "@/components/Header";
import HeroBanner from "@/components/HeroBanner";
import ContentCarousel from "@/components/ContentCarousel";

// Mock data with famous movie posters
const featuredContent = {
  id: "1",
  title: "Interstellar",
  description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival. A mind-bending journey through space and time that challenges our understanding of love, sacrifice, and destiny.",
  image: "https://image.tmdb.org/t/p/original/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
  rating: "8.7",
};

const trendingNow = [
  { id: "2", title: "The Dark Knight", image: "https://image.tmdb.org/t/p/original/qJ2tW6WMUDux911r6m7haRef0WH.jpg", rating: "9.0", year: "2008" },
  { id: "3", title: "Inception", image: "https://image.tmdb.org/t/p/original/ljsZTbVsrQSqZgWeep2B1QiDKuh.jpg", rating: "8.8", year: "2010" },
  { id: "4", title: "The Matrix", image: "https://image.tmdb.org/t/p/original/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg", rating: "8.7", year: "1999" },
  { id: "5", title: "Avengers: Endgame", image: "https://image.tmdb.org/t/p/original/or06FN3Dka5tukK1e9sl16pB3iy.jpg", rating: "8.4", year: "2019" },
  { id: "6", title: "Guardians of the Galaxy", image: "https://image.tmdb.org/t/p/original/r7vmZjiyZw9rpJMQJdXpjgiCOk9.jpg", rating: "8.0", year: "2014" },
];

const newReleases = [
  { id: "7", title: "Oppenheimer", image: "https://image.tmdb.org/t/p/original/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg", rating: "8.3", year: "2023" },
  { id: "8", title: "Dune: Part Two", image: "https://image.tmdb.org/t/p/original/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg", rating: "8.5", year: "2024" },
  { id: "9", title: "The Batman", image: "https://image.tmdb.org/t/p/original/74xTEgt7R36Fpooo50r9T25onhq.jpg", rating: "7.8", year: "2022" },
  { id: "10", title: "Top Gun: Maverick", image: "https://image.tmdb.org/t/p/original/62HCnUTziyWcpDaBO2i1DX17ljH.jpg", rating: "8.3", year: "2022" },
  { id: "11", title: "Spider-Man: No Way Home", image: "https://image.tmdb.org/t/p/original/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg", rating: "8.0", year: "2021" },
];

const popularMovies = [
  { id: "12", title: "Pulp Fiction", image: "https://image.tmdb.org/t/p/original/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg", rating: "8.9", year: "1994" },
  { id: "13", title: "The Shawshank Redemption", image: "https://image.tmdb.org/t/p/original/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg", rating: "9.3", year: "1994" },
  { id: "14", title: "The Godfather", image: "https://image.tmdb.org/t/p/original/3bhkrj58Vtu7enYsRolD1fZdja1.jpg", rating: "9.2", year: "1972" },
  { id: "15", title: "Fight Club", image: "https://image.tmdb.org/t/p/original/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg", rating: "8.8", year: "1999" },
  { id: "16", title: "Forrest Gump", image: "https://image.tmdb.org/t/p/original/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg", rating: "8.8", year: "1994" },
];

const Home = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-16">
        <HeroBanner {...featuredContent} />
        
        <div className="container mx-auto py-8">
          <ContentCarousel title="Trending Now" items={trendingNow} />
          <ContentCarousel title="New Releases" items={newReleases} />
          <ContentCarousel title="Popular Movies" items={popularMovies} />
        </div>
      </main>
    </div>
  );
};

export default Home;
