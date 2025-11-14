import { Play, Info } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

interface HeroBannerProps {
  id: string;
  title: string;
  description: string;
  image: string;
  rating?: string;
}

const HeroBanner = ({ id, title, description, image, rating }: HeroBannerProps) => {
  return (
    <div className="relative h-[80vh] w-full overflow-hidden animate-fade-in">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-hero" />
      </div>

      {/* Content */}
      <div className="relative h-full container mx-auto px-4 flex items-center">
        <div className="max-w-2xl space-y-6">
          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            {title}
          </h1>
          
          {rating && (
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 bg-primary/20 border border-primary text-primary rounded text-sm font-semibold">
                {rating}
              </span>
            </div>
          )}
          
          <p className="text-lg text-foreground/80 line-clamp-3">
            {description}
          </p>
          
          <div className="flex gap-4">
            <Link to={`/watch/${id}`}>
              <Button size="lg" className="gap-2">
                <Play className="h-5 w-5" />
                Play Now
              </Button>
            </Link>
            <Link to={`/content/${id}`}>
              <Button size="lg" variant="glass" className="gap-2">
                <Info className="h-5 w-5" />
                More Info
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
