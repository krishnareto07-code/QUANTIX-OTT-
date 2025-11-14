import { Play, Plus, ThumbsUp, Share2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import ContentCarousel from "@/components/ContentCarousel";
import ReviewsSection from "@/components/ReviewsSection";
import { Link, useParams } from "react-router-dom";

const ContentDetail = () => {
  const { id } = useParams();

  // Mock data - in a real app, this would be fetched based on the ID
  const content = {
    title: "Stellar Odyssey",
    year: "2024",
    rating: "8.9",
    duration: "2h 24m",
    genre: "Sci-Fi, Adventure",
    description: "Embark on an epic journey through the cosmos. When a mysterious signal from deep space threatens humanity, a crew of brave explorers must venture beyond the known universe to uncover the truth. This groundbreaking space adventure redefines the boundaries of science fiction cinema.",
    image: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?q=80&w=2013&auto=format&fit=crop",
    cast: ["Alex Johnson", "Maria Rodriguez", "James Chen"],
    director: "Sarah Williams",
  };

  const similarContent = [
    { id: "2", title: "Neon Nights", image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop", rating: "8.7", year: "2024" },
    { id: "3", title: "The Last Kingdom", image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1925&auto=format&fit=crop", rating: "9.1", year: "2024" },
    { id: "4", title: "Ocean's Deep", image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?q=80&w=2070&auto=format&fit=crop", rating: "8.5", year: "2023" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-16">
        {/* Hero Section */}
        <div className="relative h-[70vh] w-full overflow-hidden">
          <div className="absolute inset-0">
            <img 
              src={content.image} 
              alt={content.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
            <div className="absolute inset-0 bg-gradient-hero" />
          </div>

          <div className="relative h-full container mx-auto px-4">
            <Link to="/" className="absolute top-4 left-4">
              <Button variant="glass" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>

            <div className="h-full flex items-center">
              <div className="max-w-2xl space-y-6 animate-fade-in">
                <h1 className="text-5xl md:text-6xl font-bold">{content.title}</h1>
                
                <div className="flex items-center gap-4 text-sm">
                  <span className="px-3 py-1 bg-primary/20 border border-primary text-primary rounded font-semibold">
                    {content.rating}
                  </span>
                  <span>{content.year}</span>
                  <span>{content.duration}</span>
                  <span className="text-muted-foreground">{content.genre}</span>
                </div>
                
                <p className="text-lg text-foreground/80">{content.description}</p>
                
                <div className="flex gap-4">
                  <Link to={`/watch/${id}`}>
                    <Button size="lg" className="gap-2">
                      <Play className="h-5 w-5" />
                      Play Now
                    </Button>
                  </Link>
                  <Button size="lg" variant="glass" className="gap-2">
                    <Plus className="h-5 w-5" />
                    My List
                  </Button>
                  <Button size="lg" variant="glass" className="gap-2">
                    <ThumbsUp className="h-5 w-5" />
                  </Button>
                  <Button size="lg" variant="glass" className="gap-2">
                    <Share2 className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Details Section */}
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Details</h2>
              <div className="space-y-2 text-foreground/80">
                <p><span className="text-foreground font-semibold">Director:</span> {content.director}</p>
                <p><span className="text-foreground font-semibold">Cast:</span> {content.cast.join(", ")}</p>
                <p><span className="text-foreground font-semibold">Genre:</span> {content.genre}</p>
              </div>
            </div>
          </div>

          <ContentCarousel title="More Like This" items={similarContent} />
          
          {/* Reviews Section */}
          <div className="mt-12">
            <ReviewsSection contentId={id || "1"} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default ContentDetail;
