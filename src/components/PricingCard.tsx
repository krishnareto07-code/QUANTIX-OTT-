import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface PricingCardProps {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  popular?: boolean;
  planId: string;
}

export const PricingCard = ({
  name,
  price,
  period,
  description,
  features,
  popular,
  planId,
}: PricingCardProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubscribe = () => {
    setIsLoading(true);
    // Demo payment flow - simulate API call
    setTimeout(() => {
      navigate(`/checkout/${planId}`);
      setIsLoading(false);
    }, 800);
  };

  return (
    <div
      className={`relative glass rounded-2xl p-8 transition-all hover-scale card-glow animate-scale-in ${
        popular ? "border-2 border-primary pulse-glow" : ""
      }`}
    >
      {popular && (
        <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground">
          Most Popular
        </Badge>
      )}
      <div className="mb-6">
        <h3 className="text-2xl font-bold mb-2">{name}</h3>
        <p className="text-muted-foreground text-sm">{description}</p>
      </div>
      <div className="mb-6">
        <div className="flex items-baseline gap-2">
          <span className="text-5xl font-bold gradient-text">{price}</span>
          <span className="text-muted-foreground">/{period}</span>
        </div>
      </div>
      <Button
        className="w-full mb-6"
        variant={popular ? "default" : "outline"}
        onClick={handleSubscribe}
        disabled={isLoading}
      >
        {isLoading ? "Processing..." : "Get Started"}
      </Button>
      <div className="space-y-3">
        {features.map((feature, index) => (
          <div key={index} className="flex items-start gap-3">
            <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <span className="text-sm text-foreground">{feature}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
