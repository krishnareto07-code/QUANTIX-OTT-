import { useEffect, useRef, useState } from "react";
import { Camera, Loader2, Smile, Frown, Angry, Meh, Zap, Heart } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import PrivacyConsentModal from "./PrivacyConsentModal";

interface EmotionDetectorProps {
  onEmotionDetected: (emotion: string) => void;
}

const emotionIcons = {
  happy: Smile,
  sad: Frown,
  angry: Angry,
  bored: Meh,
  excited: Zap,
  relaxed: Heart,
};

const emotionColors = {
  happy: "text-yellow-500",
  sad: "text-blue-500",
  angry: "text-red-500",
  bored: "text-gray-500",
  excited: "text-orange-500",
  relaxed: "text-green-500",
};

const EmotionDetector = ({ onEmotionDetected }: EmotionDetectorProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isActive, setIsActive] = useState(false);
  const [currentEmotion, setCurrentEmotion] = useState<string>("");
  const [showConsent, setShowConsent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const streamRef = useRef<MediaStream | null>(null);

  const startCamera = async () => {
    try {
      setIsLoading(true);
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: "user" } 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        setIsActive(true);
        startEmotionDetection();
      }
    } catch (error) {
      console.error("Error accessing camera:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setIsActive(false);
    setCurrentEmotion("");
  };

  const startEmotionDetection = () => {
    // Simulate emotion detection (in production, use @huggingface/transformers)
    const emotions = ["happy", "sad", "angry", "bored", "excited", "relaxed"];
    const interval = setInterval(() => {
      const randomEmotion = emotions[Math.floor(Math.random() * emotions.length)];
      setCurrentEmotion(randomEmotion);
      onEmotionDetected(randomEmotion);
    }, 3000);

    return () => clearInterval(interval);
  };

  const handleDetectMood = () => {
    setShowConsent(true);
  };

  const handleAcceptConsent = () => {
    setShowConsent(false);
    startCamera();
  };

  const handleDeclineConsent = () => {
    setShowConsent(false);
  };

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  const EmotionIcon = currentEmotion ? emotionIcons[currentEmotion as keyof typeof emotionIcons] : Camera;
  const emotionColor = currentEmotion ? emotionColors[currentEmotion as keyof typeof emotionColors] : "text-primary";

  return (
    <>
      <PrivacyConsentModal 
        open={showConsent} 
        onAccept={handleAcceptConsent}
        onDecline={handleDeclineConsent}
      />
      
      <div className="glass rounded-xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Mood Detection</h3>
          {currentEmotion && (
            <Badge className="glass">
              <EmotionIcon className={`w-4 h-4 mr-2 ${emotionColor}`} />
              {currentEmotion}
            </Badge>
          )}
        </div>

        {isActive && (
          <div className="relative aspect-video rounded-lg overflow-hidden bg-secondary">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover mirror"
            />
            {currentEmotion && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="glass px-6 py-3 rounded-full animate-fade-in">
                  <EmotionIcon className={`w-8 h-8 ${emotionColor}`} />
                </div>
              </div>
            )}
          </div>
        )}

        <div className="flex gap-3">
          {!isActive ? (
            <Button 
              className="flex-1" 
              onClick={handleDetectMood}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Starting...
                </>
              ) : (
                <>
                  <Camera className="w-4 h-4 mr-2" />
                  Detect Mood
                </>
              )}
            </Button>
          ) : (
            <Button 
              variant="outline" 
              className="flex-1" 
              onClick={stopCamera}
            >
              Stop Detection
            </Button>
          )}
        </div>
      </div>

      <style>{`
        .mirror {
          transform: scaleX(-1);
        }
      `}</style>
    </>
  );
};

export default EmotionDetector;
