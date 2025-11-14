import { useState, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX, Maximize, Settings, Subtitles, SkipBack, SkipForward } from "lucide-react";
import { Button } from "./ui/button";
import { Slider } from "./ui/slider";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";

interface VideoControlsProps {
  videoRef: React.RefObject<HTMLVideoElement>;
  isPlaying: boolean;
  onPlayPause: () => void;
  currentTime: number;
  duration: number;
  volume: number;
  onVolumeChange: (value: number) => void;
  onSeek: (value: number) => void;
  onFullscreen: () => void;
  subtitlesEnabled: boolean;
  onSubtitlesToggle: () => void;
  selectedQuality: string;
  onQualityChange: (quality: string) => void;
}

const VideoControls = ({
  videoRef,
  isPlaying,
  onPlayPause,
  currentTime,
  duration,
  volume,
  onVolumeChange,
  onSeek,
  onFullscreen,
  subtitlesEnabled,
  onSubtitlesToggle,
  selectedQuality,
  onQualityChange,
}: VideoControlsProps) => {
  const [showControls, setShowControls] = useState(true);

  const formatTime = (time: number) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = Math.floor(time % 60);
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleSkip = (seconds: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = Math.max(0, Math.min(videoRef.current.currentTime + seconds, duration));
    }
  };

  return (
    <div 
      className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background via-background/80 to-transparent transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      {/* Progress Bar */}
      <div className="px-6 pb-2">
        <Slider
          value={[currentTime]}
          max={duration || 100}
          step={0.1}
          onValueChange={([value]) => onSeek(value)}
          className="cursor-pointer"
        />
        <div className="flex justify-between text-xs text-muted-foreground mt-1">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      {/* Control Buttons */}
      <div className="flex items-center justify-between px-6 pb-4">
        <div className="flex items-center gap-2">
          {/* Skip Back */}
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => handleSkip(-10)}
            className="text-foreground hover:text-primary"
          >
            <SkipBack className="h-5 w-5" />
          </Button>

          {/* Play/Pause */}
          <Button 
            variant="ghost" 
            size="icon"
            onClick={onPlayPause}
            className="text-foreground hover:text-primary"
          >
            {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
          </Button>

          {/* Skip Forward */}
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => handleSkip(10)}
            className="text-foreground hover:text-primary"
          >
            <SkipForward className="h-5 w-5" />
          </Button>

          {/* Volume */}
          <div className="flex items-center gap-2 ml-2">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => onVolumeChange(volume > 0 ? 0 : 1)}
              className="text-foreground hover:text-primary"
            >
              {volume === 0 ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
            </Button>
            <div className="w-24">
              <Slider
                value={[volume * 100]}
                max={100}
                step={1}
                onValueChange={([value]) => onVolumeChange(value / 100)}
              />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Subtitles Toggle */}
          <Button 
            variant="ghost" 
            size="icon"
            onClick={onSubtitlesToggle}
            className={`text-foreground hover:text-primary ${subtitlesEnabled ? 'text-primary' : ''}`}
          >
            <Subtitles className="h-5 w-5" />
          </Button>

          {/* Quality Selector */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon"
                className="text-foreground hover:text-primary"
              >
                <Settings className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="glass border-border/50">
              <DropdownMenuItem 
                onClick={() => onQualityChange("4K")}
                className={selectedQuality === "4K" ? "text-primary" : ""}
              >
                4K (2160p)
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => onQualityChange("1080p")}
                className={selectedQuality === "1080p" ? "text-primary" : ""}
              >
                Full HD (1080p)
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => onQualityChange("720p")}
                className={selectedQuality === "720p" ? "text-primary" : ""}
              >
                HD (720p)
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => onQualityChange("480p")}
                className={selectedQuality === "480p" ? "text-primary" : ""}
              >
                SD (480p)
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => onQualityChange("Auto")}
                className={selectedQuality === "Auto" ? "text-primary" : ""}
              >
                Auto
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Fullscreen */}
          <Button 
            variant="ghost" 
            size="icon"
            onClick={onFullscreen}
            className="text-foreground hover:text-primary"
          >
            <Maximize className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VideoControls;
