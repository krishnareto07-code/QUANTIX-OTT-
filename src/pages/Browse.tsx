import Header from "@/components/Header";
import ContentCarousel from "@/components/ContentCarousel";
import { useState } from "react";
import { Button } from "@/components/ui/button";

// Extensive movie collection organized by genre
const actionMovies = [
  { id: "a1", title: "Mad Max: Fury Road", image: "https://image.tmdb.org/t/p/original/hA2ple9q4qnwxp3hKVNhroipsir.jpg", rating: "8.1", year: "2015" },
  { id: "a2", title: "John Wick", image: "https://image.tmdb.org/t/p/original/fZPSd91yGE9fCcCe6OoQr6E3Bev.jpg", rating: "7.4", year: "2014" },
  { id: "a3", title: "Die Hard", image: "https://image.tmdb.org/t/p/original/yFihWxQcmqcaBR31QM6Y8gT6aYV.jpg", rating: "8.2", year: "1988" },
  { id: "a4", title: "The Raid", image: "https://image.tmdb.org/t/p/original/3RMLbSEXOn2jFWHzOiHu9UyivhB.jpg", rating: "7.6", year: "2011" },
  { id: "a5", title: "Mission: Impossible", image: "https://image.tmdb.org/t/p/original/2M6VqEBh6ZSTOhyQR8cTT6T78D2.jpg", rating: "7.1", year: "2023" },
  { id: "a6", title: "Gladiator", image: "https://image.tmdb.org/t/p/original/ty8TGRuvJLPUmAR1H1nRIsgwvim.jpg", rating: "8.5", year: "2000" },
  { id: "a7", title: "The Bourne Identity", image: "https://image.tmdb.org/t/p/original/bXQIL36VQdzJ69lcjQR1WQzJqQR.jpg", rating: "7.9", year: "2002" },
];

const sciFiMovies = [
  { id: "s1", title: "Blade Runner 2049", image: "https://image.tmdb.org/t/p/original/gajva2L0rPYkEWjzgFlBXCAVBE5.jpg", rating: "8.0", year: "2017" },
  { id: "s2", title: "Arrival", image: "https://image.tmdb.org/t/p/original/x2FJsf1ElAgr63Y3PNPtJrcmpoe.jpg", rating: "7.9", year: "2016" },
  { id: "s3", title: "Ex Machina", image: "https://image.tmdb.org/t/p/original/9goPE2IoMIXxTLWzl7aizwuIiLh.jpg", rating: "7.7", year: "2014" },
  { id: "s4", title: "The Martian", image: "https://image.tmdb.org/t/p/original/5BHuvQ6p9kfc091Z8RiFNhCwL4b.jpg", rating: "8.0", year: "2015" },
  { id: "s5", title: "Minority Report", image: "https://image.tmdb.org/t/p/original/w0TDnKR5aFYLPjvLXQMoJb8ZQYJ.jpg", rating: "7.6", year: "2002" },
  { id: "s6", title: "Edge of Tomorrow", image: "https://image.tmdb.org/t/p/original/uUHvlkLavotfGsNtosDy8ShsIYF.jpg", rating: "7.9", year: "2014" },
  { id: "s7", title: "Tenet", image: "https://image.tmdb.org/t/p/original/k68nPLbIST6NP96JmTxmZijEvCA.jpg", rating: "7.3", year: "2020" },
];

const dramaMovies = [
  { id: "d1", title: "The Green Mile", image: "https://image.tmdb.org/t/p/original/velWPhVMQeQKcxggNEU8YmIo52R.jpg", rating: "8.6", year: "1999" },
  { id: "d2", title: "Schindler's List", image: "https://image.tmdb.org/t/p/original/sF1U4EUQS8YHUYjNl3pMGNIQyr0.jpg", rating: "8.9", year: "1993" },
  { id: "d3", title: "12 Years a Slave", image: "https://image.tmdb.org/t/p/original/kb3X943WMIJYVg4SOAyK0pmWL5D.jpg", rating: "8.1", year: "2013" },
  { id: "d4", title: "Good Will Hunting", image: "https://image.tmdb.org/t/p/original/bABCBKYBK7A5G1x0FzoeoNfuj2.jpg", rating: "8.3", year: "1997" },
  { id: "d5", title: "The Pianist", image: "https://image.tmdb.org/t/p/original/2hFvxCCWrTmCYwfy7yum0GKRi3Y.jpg", rating: "8.5", year: "2002" },
  { id: "d6", title: "Whiplash", image: "https://image.tmdb.org/t/p/original/7fn624j5lj3xTme2SgiLCeuedmO.jpg", rating: "8.5", year: "2014" },
  { id: "d7", title: "The Social Network", image: "https://image.tmdb.org/t/p/original/n0ybibhJtQ5icDqTp8eRytcIHJx.jpg", rating: "7.7", year: "2010" },
];

const comedyMovies = [
  { id: "c1", title: "The Grand Budapest Hotel", image: "https://image.tmdb.org/t/p/original/eWdyYQreja6JGCzqHWXpWHDrrPo.jpg", rating: "8.1", year: "2014" },
  { id: "c2", title: "Superbad", image: "https://image.tmdb.org/t/p/original/ek8e8txUyUwd2BNqj6lFEerJfbq.jpg", rating: "7.6", year: "2007" },
  { id: "c3", title: "Step Brothers", image: "https://image.tmdb.org/t/p/original/wRR62sfV82P11wJWa77C0yR9pTQ.jpg", rating: "6.9", year: "2008" },
  { id: "c4", title: "Parasite", image: "https://image.tmdb.org/t/p/original/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg", rating: "8.6", year: "2019" },
  { id: "c5", title: "The Big Lebowski", image: "https://image.tmdb.org/t/p/original/d9CEz5IVVqKZAGvJvh0VqIWwL8v.jpg", rating: "8.1", year: "1998" },
  { id: "c6", title: "Knives Out", image: "https://image.tmdb.org/t/p/original/pThyQovXQrw2m0s9x82twj48Jq4.jpg", rating: "7.9", year: "2019" },
  { id: "c7", title: "The Nice Guys", image: "https://image.tmdb.org/t/p/original/uXdJpXqe5H8e02uTMCcZqr6G5Lq.jpg", rating: "7.4", year: "2016" },
];

const horrorMovies = [
  { id: "h1", title: "The Shining", image: "https://image.tmdb.org/t/p/original/xazWoLealQwEgqZ89MLZklLZD3k.jpg", rating: "8.4", year: "1980" },
  { id: "h2", title: "Get Out", image: "https://image.tmdb.org/t/p/original/tFXcEccSQMf3lfhfXKSU9iRBpa3.jpg", rating: "7.7", year: "2017" },
  { id: "h3", title: "A Quiet Place", image: "https://image.tmdb.org/t/p/original/nAU74GmpUk7t5iklEp3bufwDq4n.jpg", rating: "7.5", year: "2018" },
  { id: "h4", title: "Hereditary", image: "https://image.tmdb.org/t/p/original/p9fmuz2Oj3HtUVdER7F3WBz4vEf.jpg", rating: "7.3", year: "2018" },
  { id: "h5", title: "The Conjuring", image: "https://image.tmdb.org/t/p/original/wVYREutTvI2tmxr6ujrHT704wGF.jpg", rating: "7.5", year: "2013" },
  { id: "h6", title: "It", image: "https://image.tmdb.org/t/p/original/9E2y5Q7WlCVNEhP5GiVTjhEhx1o.jpg", rating: "7.3", year: "2017" },
  { id: "h7", title: "The Witch", image: "https://image.tmdb.org/t/p/original/zap5hpFCWSvdWSuPGAQyjUv2wAC.jpg", rating: "6.9", year: "2015" },
];

const thrillerMovies = [
  { id: "t1", title: "Se7en", image: "https://image.tmdb.org/t/p/original/6yoghtyTpznpBik8EngEmJskVUO.jpg", rating: "8.6", year: "1995" },
  { id: "t2", title: "Shutter Island", image: "https://image.tmdb.org/t/p/original/4GDy0PHYX3VRXUtwK5ysFbg3kEx.jpg", rating: "8.2", year: "2010" },
  { id: "t3", title: "Gone Girl", image: "https://image.tmdb.org/t/p/original/lv5xShBIDPe7m4ufdlV0IAc7Avk.jpg", rating: "8.1", year: "2014" },
  { id: "t4", title: "The Silence of the Lambs", image: "https://image.tmdb.org/t/p/original/uS9m8OBk1A8eM9I042bx8XXpqAq.jpg", rating: "8.6", year: "1991" },
  { id: "t5", title: "Zodiac", image: "https://image.tmdb.org/t/p/original/6YmeO4pB7XOrP4WDudCqCCQC20K.jpg", rating: "7.7", year: "2007" },
  { id: "t6", title: "Prisoners", image: "https://image.tmdb.org/t/p/original/uhviyknTT5cEQXbn6vWIqfM4vGm.jpg", rating: "8.1", year: "2013" },
  { id: "t7", title: "Nightcrawler", image: "https://image.tmdb.org/t/p/original/j9HrX8f7GbZQm1BrBiR40uFQZSb.jpg", rating: "7.8", year: "2014" },
];

const animatedMovies = [
  { id: "an1", title: "Spirited Away", image: "https://image.tmdb.org/t/p/original/39wmItIWsg5sZMyRUHLkWBcuVCM.jpg", rating: "8.6", year: "2001" },
  { id: "an2", title: "WALL-E", image: "https://image.tmdb.org/t/p/original/hbhFnRzzg6ZDmm8YAmxBnQpQIPh.jpg", rating: "8.4", year: "2008" },
  { id: "an3", title: "Inside Out", image: "https://image.tmdb.org/t/p/original/2H1TmgdfNtsKlU9jKdeNyYL5y8T.jpg", rating: "8.1", year: "2015" },
  { id: "an4", title: "Coco", image: "https://image.tmdb.org/t/p/original/gGEsBPAijhVUFoiNpgZXqRVWJt2.jpg", rating: "8.4", year: "2017" },
  { id: "an5", title: "Spider-Verse", image: "https://image.tmdb.org/t/p/original/iiZZdoQBEYBv6id8su7ImL0oCbD.jpg", rating: "8.4", year: "2018" },
  { id: "an6", title: "Up", image: "https://image.tmdb.org/t/p/original/vpbaStTMt8qqXaEgnOR2EE4DNJk.jpg", rating: "8.2", year: "2009" },
  { id: "an7", title: "The Lion King", image: "https://image.tmdb.org/t/p/original/sKCr78MXSLixwmZ8DyJLrpMsd15.jpg", rating: "8.5", year: "1994" },
];

const Browse = () => {
  const [selectedGenre, setSelectedGenre] = useState<string>("all");

  const genres = [
    { id: "all", label: "All" },
    { id: "action", label: "Action" },
    { id: "scifi", label: "Sci-Fi" },
    { id: "drama", label: "Drama" },
    { id: "comedy", label: "Comedy" },
    { id: "horror", label: "Horror" },
    { id: "thriller", label: "Thriller" },
    { id: "animated", label: "Animated" },
  ];

  const genreContent: Record<string, typeof actionMovies> = {
    action: actionMovies,
    scifi: sciFiMovies,
    drama: dramaMovies,
    comedy: comedyMovies,
    horror: horrorMovies,
    thriller: thrillerMovies,
    animated: animatedMovies,
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-16">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold mb-8 gradient-text">Browse Movies</h1>
          
          {/* Genre Filter */}
          <div className="flex flex-wrap gap-2 mb-8">
            {genres.map((genre) => (
              <Button
                key={genre.id}
                variant={selectedGenre === genre.id ? "default" : "outline"}
                onClick={() => setSelectedGenre(genre.id)}
                className="transition-all"
              >
                {genre.label}
              </Button>
            ))}
          </div>

          {/* Content Sections */}
          {selectedGenre === "all" ? (
            <>
              <ContentCarousel title="Action & Adventure" items={actionMovies} />
              <ContentCarousel title="Science Fiction" items={sciFiMovies} />
              <ContentCarousel title="Drama" items={dramaMovies} />
              <ContentCarousel title="Comedy" items={comedyMovies} />
              <ContentCarousel title="Horror" items={horrorMovies} />
              <ContentCarousel title="Thriller" items={thrillerMovies} />
              <ContentCarousel title="Animated" items={animatedMovies} />
            </>
          ) : (
            <ContentCarousel 
              title={genres.find(g => g.id === selectedGenre)?.label || ""} 
              items={genreContent[selectedGenre] || []} 
            />
          )}
        </div>
      </main>
    </div>
  );
};

export default Browse;
