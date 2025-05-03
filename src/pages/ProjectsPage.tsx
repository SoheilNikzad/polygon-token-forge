
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import ProjectCard from "@/components/ProjectCard";

const ProjectsPage = () => {
  // Sample project data
  const projects = [
    {
      id: "1",
      name: "MetaWorld Game",
      description: "A decentralized metaverse gaming platform with play-to-earn mechanics and in-game NFTs.",
      tokenSymbol: "META",
      status: "live" as const,
      raised: 180,
      goal: 300,
      startDate: new Date(2025, 4, 1),
      endDate: new Date(2025, 4, 15),
      participants: 143,
      tokenPrice: 0.00025,
      logoUrl: "",
    },
    {
      id: "2",
      name: "DeFi Yield",
      description: "Automated yield farming protocol that maximizes returns across multiple DeFi platforms.",
      tokenSymbol: "YIELD",
      status: "upcoming" as const,
      raised: 0,
      goal: 500,
      startDate: new Date(2025, 5, 5),
      endDate: new Date(2025, 5, 20),
      participants: 0,
      tokenPrice: 0.0005,
      logoUrl: "",
    },
    {
      id: "3",
      name: "BlockHealth",
      description: "Decentralized healthcare records management system with tokenized incentives.",
      tokenSymbol: "HEALTH",
      status: "ended" as const,
      raised: 250,
      goal: 250,
      startDate: new Date(2025, 3, 10),
      endDate: new Date(2025, 3, 25),
      participants: 210,
      tokenPrice: 0.0003,
      logoUrl: "",
    },
    {
      id: "4",
      name: "PolyFinance",
      description: "DeFi lending protocol built specifically for Polygon with optimized gas usage and high yield strategies.",
      tokenSymbol: "PFIN",
      status: "filled" as const,
      raised: 400,
      goal: 400,
      startDate: new Date(2025, 3, 15),
      endDate: new Date(2025, 4, 1),
      participants: 320,
      tokenPrice: 0.0002,
      logoUrl: "",
    },
    {
      id: "5",
      name: "Green Energy Token",
      description: "Tokenized renewable energy certificates and carbon credits on the Polygon blockchain.",
      tokenSymbol: "GET",
      status: "live" as const,
      raised: 120,
      goal: 350,
      startDate: new Date(2025, 4, 3),
      endDate: new Date(2025, 4, 17),
      participants: 95,
      tokenPrice: 0.00035,
      logoUrl: "",
    },
    {
      id: "6",
      name: "Secure Data Chain",
      description: "Decentralized data marketplace for secure sharing and monetization of data assets.",
      tokenSymbol: "SDC",
      status: "upcoming" as const,
      raised: 0,
      goal: 275,
      startDate: new Date(2025, 5, 10),
      endDate: new Date(2025, 5, 25),
      participants: 0,
      tokenPrice: 0.00045,
      logoUrl: "",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2">Explore Projects</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Discover and participate in token sales from innovative projects building on Polygon
        </p>
      </div>

      <div className="mb-8">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search projects..." 
              className="pl-9"
            />
          </div>
          <Button className="bg-polygon hover:bg-polygon-dark">
            Search
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <div className="flex justify-center mb-6">
          <TabsList>
            <TabsTrigger value="all">All Projects</TabsTrigger>
            <TabsTrigger value="live">Live</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="ended">Ended</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="all" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="live" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects
              .filter((project) => project.status === "live")
              .map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
          </div>
        </TabsContent>

        <TabsContent value="upcoming" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects
              .filter((project) => project.status === "upcoming")
              .map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
          </div>
        </TabsContent>

        <TabsContent value="ended" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects
              .filter(
                (project) => project.status === "ended" || project.status === "filled"
              )
              .map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProjectsPage;
