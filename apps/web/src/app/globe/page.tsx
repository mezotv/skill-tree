"use client";

import { useState, useRef } from "react";
import ReactGlobe from "react-globe";
import { careers } from "@/constants/career-constants";
import { universities } from "@/constants/university-constants";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function GlobePage() {
  const [selectedCareer, setSelectedCareer] = useState<string | null>(
    "Software Engineering"
  );
  const [mode, setMode] = useState<"career" | "university">("career");
  const [hoveredMarker, setHoveredMarker] = useState<any>(null);
  const [cursorPosition, setCursorPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const globeRef = useRef<HTMLDivElement>(null);

  // Generate markers based on current mode and selected career
  const getMarkers = () => {
    if (mode === "career") {
      if (!selectedCareer) return [];

      const career = careers.find((c) => c.name === selectedCareer);
      if (!career) return [];

      return career.hotspots.map((hotspot) => ({
        id: `${hotspot.city}, ${hotspot.country}`,
        coordinates: hotspot.coordinates,
        value: 50 + hotspot.intensity * 30, // Vary marker size: 80-200 based on intensity
        color: "hsl(220, 70%, 50%)", // Single blue color for all markers
      }));
    } else {
      return universities.map((university) => ({
        id: university.name,
        coordinates: university.coordinates,
        value: 100,
        color: "hsl(220, 70%, 50%)", // Blue
      }));
    }
  };

  const markers = getMarkers();

  const handleMarkerClick = (marker: any) => {
    // For now, just show the same preview as hover
    // TODO: Implement expanded detail panel
    console.log("Clicked marker:", marker);
  };

  const handleMarkerHover = (marker: any) => {
    setHoveredMarker(marker);
  };

  const handleMarkerLeave = () => {
    setHoveredMarker(null);
    setCursorPosition(null);
  };

  const handleMouseMove = (event: React.MouseEvent) => {
    if (hoveredMarker && globeRef.current) {
      const rect = globeRef.current.getBoundingClientRect();
      setCursorPosition({
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      });
    }
  };

  const getMarkerCardContent = (marker: any) => {
    if (mode === "career") {
      const career = careers.find((c) => c.name === selectedCareer);
      const hotspot = career?.hotspots.find(
        (h) => `${h.city}, ${h.country}` === marker.id
      );

      if (hotspot) {
        return (
          <div className="space-y-3">
            {/* City Image */}
            {hotspot.imageUrl && (
              <div className="relative w-full h-24 rounded-md overflow-hidden">
                <Image
                  src={hotspot.imageUrl}
                  alt={`${hotspot.city} cityscape`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 400px) 100vw, 300px"
                />
              </div>
            )}

            {/* City Info */}
            <div className="space-y-2">
              <h3 className="font-bold text-lg">{hotspot.city}</h3>
              <p className="text-sm text-muted-foreground">{hotspot.country}</p>
              <div className="space-y-1 text-sm">
                <p>
                  <span className="font-medium">Salary:</span>{" "}
                  {hotspot.salaryRange}
                </p>
                <p>
                  <span className="font-medium">Jobs:</span>{" "}
                  {hotspot.jobAvailability}
                </p>
                <p>
                  <span className="font-medium">Cost:</span>{" "}
                  {hotspot.costOfLiving}
                </p>
              </div>
            </div>
          </div>
        );
      }
    } else {
      const university = universities.find((u) => u.name === marker.id);
      if (university) {
        return (
          <div className="space-y-2">
            <h3 className="font-bold text-lg">{university.name}</h3>
            <p className="text-sm text-muted-foreground">
              {university.country}
            </p>
            <div className="text-sm">
              <p className="font-medium">Programs:</p>
              <p className="text-muted-foreground">
                {university.programs.join(", ")}
              </p>
            </div>
          </div>
        );
      }
    }
    return <div className="font-medium">{marker.id}</div>;
  };

  return (
    <div className="flex h-full">
      {/* Left Sidebar */}
      <div className="w-1/4 p-4 border-r bg-background">
        <div className="space-y-4">
          <h2 className="text-xl font-bold">Career Hotspots</h2>

          {/* Mode Switcher */}
          <div className="flex gap-2">
            <Button
              variant={mode === "career" ? "default" : "outline"}
              onClick={() => setMode("career")}
              className="flex-1"
            >
              Careers
            </Button>
            <Button
              variant={mode === "university" ? "default" : "outline"}
              onClick={() => setMode("university")}
              className="flex-1"
            >
              Universities
            </Button>
          </div>

          {/* Career List */}
          {mode === "career" && (
            <div className="space-y-2">
              <h3 className="font-semibold">Select Career:</h3>
              {careers.map((career) => (
                <Card
                  key={career.name}
                  className={`p-3 cursor-pointer transition-colors ${
                    selectedCareer === career.name
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-muted"
                  }`}
                  onClick={() => setSelectedCareer(career.name)}
                >
                  <div className="font-medium">{career.name}</div>
                  <div className="text-sm opacity-75">
                    {career.hotspots.length} hotspots
                  </div>
                </Card>
              ))}
            </div>
          )}

          {/* University Info */}
          {mode === "university" && (
            <div className="space-y-2">
              <h3 className="font-semibold">Universities:</h3>
              <div className="text-sm text-muted-foreground">
                Click on university markers on the globe to see details.
              </div>
              <div className="text-sm">
                <strong>Total:</strong> {universities.length} universities
              </div>
            </div>
          )}

          {/* Selected Career Info */}
          {mode === "career" && selectedCareer && (
            <div className="mt-4">
              <h3 className="font-semibold mb-2">Selected: {selectedCareer}</h3>
              <div className="text-sm text-muted-foreground">
                Showing {markers.length} hotspots on the globe
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Globe View */}
      <div
        ref={globeRef}
        className="flex-1 relative"
        onMouseMove={handleMouseMove}
      >
        <ReactGlobe
          markers={markers}
          options={{
            enableCameraAutoRotate: false,
            cameraAutoRotateSpeed: 0,
            focusAnimationDuration: 100,
            markerType: "bar",
            markerRadiusScaleRange: [0.2, 1.2], // Much wider range for dramatic size differences
            enableMarkerTooltip: false, // Disable coordinate tooltips
          }}
          onClickMarker={handleMarkerClick}
          onMouseOverMarker={handleMarkerHover}
          onMouseOutMarker={handleMarkerLeave}
          width={800}
          height={600}
        />

        {/* Cursor-following Card */}
        {hoveredMarker && cursorPosition && (
          <div
            className="absolute z-10 pointer-events-none"
            style={{
              left: cursorPosition.x + 15,
              top: cursorPosition.y - 10,
            }}
          >
            <Card className="p-4 max-w-xs shadow-lg border-2">
              {getMarkerCardContent(hoveredMarker)}
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
