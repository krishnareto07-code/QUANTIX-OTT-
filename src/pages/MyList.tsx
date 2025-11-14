import Header from "@/components/Header";
import ContentCard from "@/components/ContentCard";
import { useMyList } from "@/hooks/useMyList";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const MyList = () => {
  const { list, loading } = useMyList();
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user && !loading) {
      navigate("/auth");
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-16">
          <div className="container mx-auto px-4 py-8 flex items-center justify-center min-h-[50vh]">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-16">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold mb-2 gradient-text">My List</h1>
          <p className="text-muted-foreground mb-8">
            {list.length} {list.length === 1 ? 'item' : 'items'} in your list
          </p>

          {list.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <svg
                  className="w-12 h-12 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold mb-2">Your list is empty</h2>
              <p className="text-muted-foreground mb-6 max-w-md">
                Start adding movies and shows you want to watch later by clicking the + button on any title
              </p>
              <Button onClick={() => navigate("/browse")}>
                Browse Content
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {list.map((item) => (
                <ContentCard
                  key={item.id}
                  id={item.content_id}
                  title={item.title}
                  image={item.image}
                  rating={item.rating}
                  year={item.year}
                />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default MyList;