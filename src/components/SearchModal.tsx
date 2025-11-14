import { useState } from "react";
import { Search, X } from "lucide-react";
import { Dialog, DialogContent } from "./ui/dialog";
import { Input } from "./ui/input";
import { useNavigate } from "react-router-dom";

interface SearchModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const mockResults = [
  { id: 1, title: "Inception", type: "Movie", year: 2010, image: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=300&h=200&fit=crop" },
  { id: 2, title: "Stranger Things", type: "Series", year: 2016, image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=300&h=200&fit=crop" },
  { id: 3, title: "The Matrix", type: "Movie", year: 1999, image: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=300&h=200&fit=crop" },
  { id: 4, title: "Dark", type: "Series", year: 2017, image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=300&h=200&fit=crop" },
];

const SearchModal = ({ open, onOpenChange }: SearchModalProps) => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  
  const filteredResults = query
    ? mockResults.filter(item =>
        item.title.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const handleResultClick = (id: number) => {
    navigate(`/content/${id}`);
    onOpenChange(false);
    setQuery("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl p-0 gap-0 overflow-hidden animate-scale-in">
        <div className="glass border-0 rounded-lg">
          <div className="flex items-center gap-4 px-6 py-4 border-b border-border/50">
            <Search className="w-5 h-5 text-primary" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search movies, series, documentaries..."
              className="border-0 bg-transparent text-lg focus-visible:ring-0 focus-visible:ring-offset-0"
              autoFocus
            />
            <button
              onClick={() => onOpenChange(false)}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          {query && (
            <div className="max-h-[500px] overflow-y-auto p-4">
              {filteredResults.length > 0 ? (
                <div className="space-y-2">
                  {filteredResults.map((result) => (
                    <button
                      key={result.id}
                      onClick={() => handleResultClick(result.id)}
                      className="w-full flex items-center gap-4 p-3 rounded-lg hover:bg-secondary/50 transition-all group animate-fade-in"
                    >
                      <img
                        src={result.image}
                        alt={result.title}
                        className="w-20 h-12 object-cover rounded group-hover:scale-105 transition-transform"
                      />
                      <div className="flex-1 text-left">
                        <h3 className="font-semibold group-hover:text-primary transition-colors">
                          {result.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {result.type} • {result.year}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 text-muted-foreground animate-fade-in">
                  No results found for "{query}"
                </div>
              )}
            </div>
          )}
          
          {!query && (
            <div className="p-8 text-center text-muted-foreground animate-fade-in">
              Start typing to search for content...
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SearchModal;
