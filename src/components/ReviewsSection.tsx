import { useState } from "react";
import { Star, ThumbsUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";

interface Review {
  id: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  comment: string;
  date: string;
  helpful: number;
}

interface ReviewsSectionProps {
  contentId: string;
}

const ReviewsSection = ({ contentId }: ReviewsSectionProps) => {
  const { toast } = useToast();
  const [userRating, setUserRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [userComment, setUserComment] = useState("");
  const [reviews, setReviews] = useState<Review[]>([
    {
      id: "1",
      userName: "Sarah Miller",
      userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
      rating: 5,
      comment: "Absolutely stunning visuals and an incredible story! One of the best sci-fi films I've ever watched. The character development is phenomenal.",
      date: "2024-03-15",
      helpful: 24,
    },
    {
      id: "2",
      userName: "Michael Chen",
      userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
      rating: 4,
      comment: "Great cinematography and sound design. The plot could have been tighter in the second act, but overall a solid watch.",
      date: "2024-03-14",
      helpful: 18,
    },
    {
      id: "3",
      userName: "Emma Wilson",
      userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
      rating: 5,
      comment: "Mind-blowing! The way they handled the time dilation concept was brilliant. A must-watch for any sci-fi fan.",
      date: "2024-03-13",
      helpful: 31,
    },
  ]);

  const averageRating = reviews.length > 0 
    ? (reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length).toFixed(1)
    : "0.0";

  const handleSubmitReview = () => {
    if (userRating === 0) {
      toast({
        title: "Please select a rating",
        description: "You must provide a star rating before submitting.",
        variant: "destructive",
      });
      return;
    }

    if (userComment.trim().length < 10) {
      toast({
        title: "Comment too short",
        description: "Please write at least 10 characters.",
        variant: "destructive",
      });
      return;
    }

    const newReview: Review = {
      id: Date.now().toString(),
      userName: "You",
      rating: userRating,
      comment: userComment,
      date: new Date().toISOString().split('T')[0],
      helpful: 0,
    };

    setReviews([newReview, ...reviews]);
    setUserRating(0);
    setUserComment("");

    toast({
      title: "Review submitted!",
      description: "Thank you for your feedback.",
    });
  };

  const renderStars = (rating: number, interactive = false) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            disabled={!interactive}
            onClick={() => interactive && setUserRating(star)}
            onMouseEnter={() => interactive && setHoveredRating(star)}
            onMouseLeave={() => interactive && setHoveredRating(0)}
            className={`transition-all ${interactive ? 'hover:scale-110 cursor-pointer' : 'cursor-default'}`}
          >
            <Star
              className={`w-5 h-5 ${
                star <= (interactive ? (hoveredRating || userRating) : rating)
                  ? "fill-primary text-primary"
                  : "fill-muted text-muted-foreground"
              }`}
            />
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-8">
      {/* Average Rating */}
      <div className="glass rounded-2xl p-8">
        <h2 className="text-3xl font-bold mb-6">Ratings & Reviews</h2>
        
        <div className="flex items-center gap-8 mb-8">
          <div className="text-center">
            <div className="text-6xl font-bold gradient-text mb-2">{averageRating}</div>
            <div className="flex justify-center mb-2">{renderStars(parseFloat(averageRating))}</div>
            <p className="text-sm text-muted-foreground">{reviews.length} reviews</p>
          </div>

          <div className="flex-1 space-y-2">
            {[5, 4, 3, 2, 1].map((star) => {
              const count = reviews.filter((r) => r.rating === star).length;
              const percentage = reviews.length > 0 ? (count / reviews.length) * 100 : 0;
              
              return (
                <div key={star} className="flex items-center gap-3">
                  <span className="text-sm w-8">{star} ★</span>
                  <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary transition-all"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className="text-sm text-muted-foreground w-8">{count}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Write Review */}
        <div className="border-t border-border pt-8">
          <h3 className="text-xl font-semibold mb-4">Write a Review</h3>
          
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Your Rating *</label>
              {renderStars(userRating, true)}
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Your Comment *</label>
              <Textarea
                placeholder="Share your thoughts about this content..."
                value={userComment}
                onChange={(e) => setUserComment(e.target.value)}
                className="min-h-[100px]"
                maxLength={500}
              />
              <p className="text-xs text-muted-foreground mt-1">
                {userComment.length}/500 characters
              </p>
            </div>

            <Button onClick={handleSubmitReview}>Submit Review</Button>
          </div>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        <h3 className="text-2xl font-bold">User Reviews</h3>
        
        {reviews.map((review) => (
          <div key={review.id} className="glass rounded-xl p-6 space-y-4 animate-fade-in">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={review.userAvatar} />
                  <AvatarFallback>{review.userName[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">{review.userName}</p>
                  <p className="text-xs text-muted-foreground">{review.date}</p>
                </div>
              </div>
              {renderStars(review.rating)}
            </div>

            <p className="text-foreground/80">{review.comment}</p>

            <div className="flex items-center gap-2 pt-2">
              <Button variant="ghost" size="sm" className="gap-2">
                <ThumbsUp className="w-4 h-4" />
                Helpful ({review.helpful})
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewsSection;
