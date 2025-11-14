import { Play, Plus, Check } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { useMyList } from "@/hooks/useMyList";

interface ContentCardProps {
  id: string;
  title: string;
  image: string;
  rating?: string;
  year?: string;
}

const ContentCard = ({ id, title, image, rating, year }: ContentCardProps) => {
  const { addToList, removeFromList, isInList } = useMyList();
  const inList = isInList(id);

  const handleListToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (inList) {
      removeFromList(id);
    } else {
      addToList({ content_id: id, title, image, rating, year });
    }
  };

  return (
    <Link to={`/content/${id}`} className="group relative block animate-fade-in">
      <div className="relative aspect-[2/3] rounded-lg overflow-hidden bg-card transition-smooth hover-scale card-glow">
        <img
          src={image} 
          alt={title}
          className="w-full h-full object-cover"
        />
        
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent opacity-0 group-hover:opacity-100 transition-smooth">
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <h3 className="text-sm font-semibold mb-2 line-clamp-1">{title}</h3>
            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
              {rating && <span className="text-primary font-medium">{rating}</span>}
              {year && <span>{year}</span>}
            </div>
            <div className="flex gap-2">
              <Link to={`/watch/${id}`} className="flex-1" onClick={(e) => e.stopPropagation()}>
                <Button size="sm" className="w-full">
                  <Play className="h-4 w-4 mr-1" />
                  Play
                </Button>
              </Link>
              <Button 
                size="sm" 
                variant={inList ? "default" : "glass"}
                onClick={handleListToggle}
              >
                {inList ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ContentCard;
