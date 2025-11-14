import { CheckCircle2, Sparkles } from "lucide-react";
import { Dialog, DialogContent } from "./ui/dialog";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

interface PaymentSuccessModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  planName: string;
}

const PaymentSuccessModal = ({ open, onOpenChange, planName }: PaymentSuccessModalProps) => {
  const navigate = useNavigate();

  const handleContinue = () => {
    onOpenChange(false);
    navigate("/");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md p-0 gap-0 overflow-hidden border-0">
        <div className="relative glass rounded-lg p-8 text-center animate-scale-in">
          {/* Animated background effects */}
          <div className="absolute inset-0 overflow-hidden rounded-lg">
            <div className="absolute top-0 left-1/4 w-32 h-32 bg-primary/20 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-0 right-1/4 w-32 h-32 bg-accent/20 rounded-full blur-3xl animate-pulse delay-75" />
          </div>
          
          <div className="relative z-10">
            {/* Success icon with animation */}
            <div className="mb-6 flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-pulse" />
                <CheckCircle2 className="w-20 h-20 text-primary animate-scale-in relative z-10" />
                <Sparkles className="w-6 h-6 text-primary absolute -top-2 -right-2 animate-float" />
                <Sparkles className="w-4 h-4 text-accent absolute -bottom-1 -left-1 animate-float delay-100" />
              </div>
            </div>
            
            <h2 className="text-3xl font-bold mb-2 gradient-text animate-fade-in">
              Payment Successful!
            </h2>
            
            <p className="text-muted-foreground mb-6 animate-fade-in">
              Welcome to <span className="text-primary font-semibold">{planName}</span>
            </p>
            
            <div className="glass rounded-lg p-4 mb-6 animate-fade-in">
              <p className="text-sm text-foreground/80">
                Your subscription is now active and you have full access to:
              </p>
              <ul className="mt-3 space-y-2 text-sm">
                <li className="flex items-center gap-2 text-foreground/90">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  Unlimited streaming
                </li>
                <li className="flex items-center gap-2 text-foreground/90">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  HD/4K quality content
                </li>
                <li className="flex items-center gap-2 text-foreground/90">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  Download for offline viewing
                </li>
              </ul>
            </div>
            
            <Button
              onClick={handleContinue}
              className="w-full pulse-glow"
              size="lg"
            >
              Start Watching
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentSuccessModal;
