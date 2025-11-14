import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";
import ContentCard from "./ContentCard";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";

interface Content {
  id: string;
  title: string;
  image: string;
  rating?: string;
  year?: string;
}

interface ContentCarouselProps {
  title: string;
  items: Content[];
}

const ContentCarousel = ({ title, items }: ContentCarouselProps) => {
  return (
    <div className="mb-8 animate-fade-in">
      <h2 className="text-2xl font-bold mb-4 px-4">{title}</h2>
      <div className="relative group">
        <ScrollArea className="w-full whitespace-nowrap">
          <div className="flex gap-4 px-4 pb-4">
            {items.map((item) => (
              <div key={item.id} className="w-[200px] flex-shrink-0">
                <ContentCard {...item} />
              </div>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </div>
  );
};

export default ContentCarousel;
