import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Info } from "lucide-react";

interface HeaderProps {
  rating: number;
  maxRating: number;
  title: string;
  info?: string;
  className?: string;
}

export default function Header({ 
  rating, 
  maxRating, 
  title, 
  info, 
  className 
}: HeaderProps) {
  // Calculate percentage completion for progress bar
  const percentage = (rating / maxRating) * 100;
  
  // Determine color based on rating percentage
  const getColorClass = () => {
    if (percentage >= 80) return "bg-finops-green";
    if (percentage >= 60) return "bg-finops-yellow";
    return "bg-finops-red";
  };

  return (
    <div className={cn("flex flex-col animate-fade-in", className)}>
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
        <div className="flex items-center">
          <div className="text-4xl font-semibold tracking-tight mr-2">
            {rating.toFixed(1)}
          </div>
          
          {info && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button className="inline-flex opacity-70 hover:opacity-100 transition-opacity">
                    <Info className="h-5 w-5" />
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="w-[200px] text-sm">{info}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
      </div>
      
      <div className="flex items-center gap-4 w-full">
        <div className="bg-black text-white font-semibold px-6 py-2">
          FPI Rating:
        </div>
        <div className="flex-1">
          <Progress 
            value={percentage} 
            className={cn("h-9", getColorClass())} 
          />
        </div>
      </div>
    </div>
  );
}