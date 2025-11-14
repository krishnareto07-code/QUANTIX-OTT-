import { User, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const profiles = [
  { id: "1", name: "John", color: "from-blue-500 to-cyan-500" },
  { id: "2", name: "Sarah", color: "from-purple-500 to-pink-500" },
  { id: "3", name: "Kids", color: "from-green-500 to-emerald-500" },
];

const Profiles = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="text-center space-y-8 animate-fade-in">
        <h1 className="text-4xl font-bold">Who's watching?</h1>
        
        <div className="flex flex-wrap justify-center gap-6">
          {profiles.map((profile) => (
            <Link
              key={profile.id}
              to="/"
              className="group"
            >
              <div className="flex flex-col items-center gap-3">
                <div className={`w-32 h-32 rounded-lg bg-gradient-to-br ${profile.color} flex items-center justify-center transition-smooth hover-scale card-glow`}>
                  <User className="w-16 h-16 text-white" />
                </div>
                <span className="text-lg text-muted-foreground group-hover:text-foreground transition-colors">
                  {profile.name}
                </span>
              </div>
            </Link>
          ))}
          
          <button className="group">
            <div className="flex flex-col items-center gap-3">
              <div className="w-32 h-32 rounded-lg glass border-2 border-dashed border-border flex items-center justify-center transition-smooth hover-scale hover:border-primary">
                <Plus className="w-16 h-16 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
              <span className="text-lg text-muted-foreground group-hover:text-foreground transition-colors">
                Add Profile
              </span>
            </div>
          </button>
        </div>

        <Link to="/auth">
          <Button variant="outline" className="glass">
            Manage Profiles
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Profiles;
