// Example component showing how to use city images from career constants
import { careers } from "@/constants/career-constants";
import { Card } from "@/components/ui/card";
import Image from "next/image";

export function CityImageDemo() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {careers.map((career) => (
        <div key={career.name} className="space-y-4">
          <h3 className="text-lg font-semibold">{career.name}</h3>
          <div className="space-y-2">
            {career.hotspots.map((hotspot) => (
              <Card key={`${hotspot.city}-${hotspot.country}`} className="p-4">
                <div className="space-y-2">
                  <h4 className="font-medium">
                    {hotspot.city}, {hotspot.country}
                  </h4>
                  {hotspot.imageUrl && (
                    <div className="relative w-full h-32 rounded-md overflow-hidden">
                      <Image
                        src={hotspot.imageUrl}
                        alt={`${hotspot.city} cityscape`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                  )}
                  <p className="text-sm text-gray-600">{hotspot.description}</p>
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">{hotspot.salaryRange}</span>
                    <span
                      className={`px-2 py-1 rounded text-xs ${
                        hotspot.jobAvailability === "High"
                          ? "bg-green-100 text-green-800"
                          : hotspot.jobAvailability === "Medium"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {hotspot.jobAvailability} Jobs
                    </span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
