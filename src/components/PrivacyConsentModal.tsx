import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { Button } from "./ui/button";
import { Camera, Shield, X } from "lucide-react";

interface PrivacyConsentModalProps {
  open: boolean;
  onAccept: () => void;
  onDecline: () => void;
}

const PrivacyConsentModal = ({ open, onAccept, onDecline }: PrivacyConsentModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onDecline}>
      <DialogContent className="max-w-md glass animate-scale-in">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Shield className="w-5 h-5 text-primary" />
            Camera Access Required
          </DialogTitle>
          <DialogDescription className="text-muted-foreground mt-2">
            We need your permission to access your camera for emotion detection.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="flex items-start gap-3">
            <Camera className="w-5 h-5 text-primary mt-0.5" />
            <div>
              <h4 className="font-semibold text-sm mb-1">How it works</h4>
              <p className="text-sm text-muted-foreground">
                Your camera will analyze your facial expressions to detect emotions like happy, sad, excited, or relaxed.
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <Shield className="w-5 h-5 text-primary mt-0.5" />
            <div>
              <h4 className="font-semibold text-sm mb-1">Your privacy</h4>
              <p className="text-sm text-muted-foreground">
                All processing happens locally in your browser. No images or videos are stored or sent to any server.
              </p>
            </div>
          </div>
        </div>

        <div className="flex gap-3 mt-4">
          <Button 
            variant="outline" 
            className="flex-1" 
            onClick={onDecline}
          >
            <X className="w-4 h-4 mr-2" />
            Decline
          </Button>
          <Button 
            className="flex-1" 
            onClick={onAccept}
          >
            <Camera className="w-4 h-4 mr-2" />
            Allow Access
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PrivacyConsentModal;
