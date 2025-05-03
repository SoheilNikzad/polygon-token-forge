
import React from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { CalendarDays, Clock, TrendingUp, Users } from "lucide-react";

interface ProjectCardProps {
  project: {
    id: string;
    name: string;
    description: string;
    tokenSymbol: string;
    status: "upcoming" | "live" | "ended" | "filled";
    raised: number;
    goal: number;
    startDate: Date;
    endDate: Date;
    participants: number;
    tokenPrice: number;
    logoUrl: string;
  };
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const progress = (project.raised / project.goal) * 100;
  const now = new Date();
  const isLive = now >= project.startDate && now <= project.endDate;
  const isUpcoming = now < project.startDate;
  const isEnded = now > project.endDate;
  
  const formatDate = (date: Date): string => {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };
  
  const getStatusColor = () => {
    switch (project.status) {
      case "upcoming":
        return "bg-blue-100 text-blue-800 hover:bg-blue-200";
      case "live":
        return "bg-green-100 text-green-800 hover:bg-green-200";
      case "ended":
        return "bg-gray-100 text-gray-800 hover:bg-gray-200";
      case "filled":
        return "bg-purple-100 text-purple-800 hover:bg-purple-200";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-200";
    }
  };
  
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <CardHeader className="pb-4">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full overflow-hidden bg-muted flex items-center justify-center">
              {project.logoUrl ? (
                <img
                  src={project.logoUrl}
                  alt={`${project.name} logo`}
                  className="h-full w-full object-cover"
                />
              ) : (
                <span className="text-lg font-bold">
                  {project.name.charAt(0)}
                </span>
              )}
            </div>
            <div>
              <CardTitle className="text-base sm:text-lg flex items-center">
                {project.name}
                <Badge variant="outline" className="ml-2 text-xs">
                  {project.tokenSymbol}
                </Badge>
              </CardTitle>
            </div>
          </div>
          <Badge
            className={`${getStatusColor()} transition-colors cursor-default`}
            variant="secondary"
          >
            {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground line-clamp-2">
          {project.description}
        </p>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Progress</span>
            <span className="font-medium">
              {progress.toFixed(1)}% ({project.raised} / {project.goal} MATIC)
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center text-xs text-muted-foreground">
            <CalendarDays className="h-3.5 w-3.5 mr-1" />
            <span>
              {formatDate(project.startDate)} -{" "}
              {formatDate(project.endDate)}
            </span>
          </div>
          
          <div className="flex items-center justify-end text-xs text-muted-foreground">
            <Users className="h-3.5 w-3.5 mr-1" />
            <span>{project.participants} participants</span>
          </div>
          
          <div className="flex items-center text-xs">
            <TrendingUp className="h-3.5 w-3.5 mr-1 text-polygon" />
            <span className="font-medium">
              1 {project.tokenSymbol} = {project.tokenPrice} MATIC
            </span>
          </div>
          
          <div className="flex items-center justify-end text-xs">
            <Clock className="h-3.5 w-3.5 mr-1" />
            <span>
              {isUpcoming
                ? "Starts in " +
                  Math.ceil(
                    (project.startDate.getTime() - now.getTime()) /
                      (1000 * 60 * 60 * 24)
                  ) +
                  " days"
                : isLive
                ? "Ends in " +
                  Math.ceil(
                    (project.endDate.getTime() - now.getTime()) /
                      (1000 * 60 * 60 * 24)
                  ) +
                  " days"
                : "Sale ended"}
            </span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="pt-0">
        <Button
          variant="default"
          className="w-full bg-polygon hover:bg-polygon-dark"
          disabled={!isLive}
        >
          {isUpcoming
            ? "Sale Upcoming"
            : isLive
            ? "Participate in Sale"
            : "Sale Ended"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProjectCard;
