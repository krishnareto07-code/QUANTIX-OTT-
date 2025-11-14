import { useState } from "react";
import { Search, Mic, Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import EmotionDetector from "@/components/EmotionDetector";
import ContentCard from "@/components/ContentCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const moodToGenreMap: Record<string, string[]> = {
  happy: ["comedy", "musical", "family"],
  sad: ["drama", "romance"],
  angry: ["action", "thriller"],
  bored: ["adventure", "mystery", "sci-fi"],
  excited: ["action", "thriller", "adventure"],
  relaxed: ["romance", "documentary", "nature"],
};

const mockContent = [
  { id: "1", title: "The Dark Knight", image: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=300&h=450&fit=crop", rating: "9.0", year: "2008", genre: "action" },
  { id: "2", title: "La La Land", image: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=300&h=450&fit=crop", rating: "8.0", year: "2016", genre: "musical" },
  { id: "3", title: "Inception", image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=300&h=450&fit=crop", rating: "8.8", year: "2010", genre: "sci-fi" },
  { id: "4", title: "The Notebook", image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=300&h=450&fit=crop", rating: "7.8", year: "2004", genre: "romance" },
  { id: "5", title: "Superbad", image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=300&h=450&fit=crop", rating: "7.6", year: "2007", genre: "comedy" },
  { id: "6", title: "Planet Earth", image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=450&fit=crop", rating: "9.4", year: "2006", genre: "documentary" },
];

const MoodSearch = () => {
  const [detectedEmotion, setDetectedEmotion] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isListening, setIsListening] = useState(false);

  const handleEmotionDetected = (emotion: string) => {
    setDetectedEmotion(emotion);
  };

  const handleVoiceSearch = () => {
    if (!('webkitSpeechRecognition' in window)) {
      alert("Voice search not supported in this browser");
      return;
    }

    const recognition = new (window as any).webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setSearchQuery(transcript);
      setIsListening(false);
    };

    recognition.onerror = () => {
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  const getFilteredContent = () => {
    let filtered = mockContent;

    if (detectedEmotion) {
      const genres = moodToGenreMap[detectedEmotion] || [];
      filtered = filtered.filter(item => genres.includes(item.genre));
    }

    if (searchQuery) {
      filtered = filtered.filter(item => 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.genre.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filtered;
  };

  const filteredContent = getFilteredContent();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8 mt-20">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="text-center space-y-2 animate-fade-in">
            <h1 className="text-4xl font-bold gradient-text">
              <Sparkles className="inline w-8 h-8 mr-2" />
              Smart Mood Search
            </h1>
            <p className="text-muted-foreground text-lg">
              Discover content that matches your mood
            </p>
          </div>

          <Tabs defaultValue="emotion" className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
              <TabsTrigger value="emotion">Emotion Detection</TabsTrigger>
              <TabsTrigger value="search">Manual Search</TabsTrigger>
            </TabsList>

            <TabsContent value="emotion" className="space-y-6 mt-6">
              <EmotionDetector onEmotionDetected={handleEmotionDetected} />
              
              {detectedEmotion && (
                <div className="glass rounded-lg p-4 text-center animate-fade-in">
                  <p className="text-sm text-muted-foreground mb-2">
                    Showing content for mood:
                  </p>
                  <p className="text-xl font-semibold capitalize">{detectedEmotion}</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="search" className="space-y-6 mt-6">
              <div className="glass rounded-xl p-6">
                <div className="flex gap-3">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search by title, genre, actor, or mood..."
                      className="pl-10 pr-12 h-12 bg-background/50"
                    />
                  </div>
                  <Button
                    size="lg"
                    variant={isListening ? "default" : "glass"}
                    onClick={handleVoiceSearch}
                    className={isListening ? "animate-pulse" : ""}
                  >
                    <Mic className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">
              {filteredContent.length} Results
            </h2>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {filteredContent.map((item) => (
                <ContentCard
                  key={item.id}
                  id={item.id}
                  title={item.title}
                  image={item.image}
                  rating={item.rating}
                  year={item.year}
                />
              ))}
            </div>

            {filteredContent.length === 0 && (
              <div className="text-center py-12 glass rounded-xl">
                <p className="text-muted-foreground">
                  No content found matching your criteria
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default MoodSearch;
