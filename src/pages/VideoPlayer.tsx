import { useRef, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import VideoControls from "@/components/VideoControls";
import { useToast } from "@/hooks/use-toast";

const VideoPlayer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const videoRef = useRef<HTMLVideoElement>(null);
  const playerContainerRef = useRef<HTMLDivElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [subtitlesEnabled, setSubtitlesEnabled] = useState(false);
  const [selectedQuality, setSelectedQuality] = useState("Auto");
  const [watchProgress, setWatchProgress] = useState(0);

  // Mock video URL - in production, this would come from your backend
  const videoUrl = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);
      const progress = (video.currentTime / video.duration) * 100;
      setWatchProgress(progress);
      
      // Save progress to localStorage (in production, this would be saved to backend)
      localStorage.setItem(`video_${id}_progress`, JSON.stringify({
        currentTime: video.currentTime,
        progress: progress,
        lastWatched: new Date().toISOString(),
      }));
    };

    const handleLoadedMetadata = () => {
      setDuration(video.duration);
      
      // Load saved progress
      const savedProgress = localStorage.getItem(`video_${id}_progress`);
      if (savedProgress) {
        const { currentTime: savedTime } = JSON.parse(savedProgress);
        if (savedTime > 0 && savedTime < video.duration - 10) {
          toast({
            title: "Resume watching?",
            description: `Continue from ${formatTime(savedTime)}`,
            action: (
              <Button size="sm" onClick={() => {
                if (videoRef.current) {
                  videoRef.current.currentTime = savedTime;
                }
              }}>
                Resume
              </Button>
            ),
          });
        }
      }
    };

    const handleEnded = () => {
      setIsPlaying(false);
      toast({
        title: "Video finished",
        description: "Thanks for watching!",
      });
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('ended', handleEnded);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('ended', handleEnded);
    };
  }, [id, toast]);

  const formatTime = (time: number) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = Math.floor(time % 60);
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVolumeChange = (value: number) => {
    if (videoRef.current) {
      videoRef.current.volume = value;
      setVolume(value);
    }
  };

  const handleSeek = (value: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = value;
      setCurrentTime(value);
    }
  };

  const handleFullscreen = () => {
    if (playerContainerRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        playerContainerRef.current.requestFullscreen();
      }
    }
  };

  const handleSubtitlesToggle = () => {
    setSubtitlesEnabled(!subtitlesEnabled);
    if (videoRef.current) {
      const tracks = videoRef.current.textTracks;
      if (tracks.length > 0) {
        tracks[0].mode = subtitlesEnabled ? 'hidden' : 'showing';
      }
    }
    toast({
      title: subtitlesEnabled ? "Subtitles disabled" : "Subtitles enabled",
    });
  };

  const handleQualityChange = (quality: string) => {
    setSelectedQuality(quality);
    toast({
      title: `Quality changed to ${quality}`,
      description: quality === "Auto" ? "Quality will adjust automatically" : undefined,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Back Button */}
      <div className="absolute top-4 left-4 z-50">
        <Button 
          variant="glass" 
          size="icon"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
      </div>

      {/* Video Player */}
      <div 
        ref={playerContainerRef}
        className="relative w-full h-screen bg-black flex items-center justify-center group"
      >
        <video
          ref={videoRef}
          src={videoUrl}
          className="w-full h-full"
          onClick={handlePlayPause}
          crossOrigin="anonymous"
        >
          <track
            kind="subtitles"
            srcLang="en"
            label="English"
            default
          />
        </video>

        <VideoControls
          videoRef={videoRef}
          isPlaying={isPlaying}
          onPlayPause={handlePlayPause}
          currentTime={currentTime}
          duration={duration}
          volume={volume}
          onVolumeChange={handleVolumeChange}
          onSeek={handleSeek}
          onFullscreen={handleFullscreen}
          subtitlesEnabled={subtitlesEnabled}
          onSubtitlesToggle={handleSubtitlesToggle}
          selectedQuality={selectedQuality}
          onQualityChange={handleQualityChange}
        />

        {/* Progress Indicator */}
        <div className="absolute top-4 right-4 glass px-3 py-1 rounded text-sm">
          {Math.round(watchProgress)}% watched
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
