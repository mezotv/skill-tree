"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/theme-toggle";
import { ArrowRight, Loader2 } from "lucide-react";
import Link from "next/link";
import { UserButton } from "@stackframe/stack";
import SkillTree, {
  fetchSkillTreeData,
  type SkillNode,
  type SkillTreeData,
} from "@/components/skill-tree";

const SAMPLE_JOBS = [
  "Software Engineer",
  "Data Scientist",
  "Product Manager",
  "UX Designer",
  "Marketing Manager",
];

type JobSuggestion = {
  title: string;
  relevance: string;
};

type JobsEnvelope = {
  jobs: JobSuggestion[];
};

function isJobsEnvelope(value: unknown): value is JobsEnvelope {
  if (typeof value !== "object" || value === null) return false;
  const maybe = value as { jobs?: unknown };
  if (!Array.isArray(maybe.jobs)) return false;
  return maybe.jobs.every(
    (item) =>
      typeof item === "object" &&
      item !== null &&
      typeof (item as { title?: unknown }).title === "string" &&
      typeof (item as { relevance?: unknown }).relevance === "string"
  );
}

export default function Home() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>(SAMPLE_JOBS);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedJob, setSelectedJob] = useState<string | null>(null);
  const nextSectionRef = useRef<HTMLDivElement>(null);

  const [skillTreeData, setSkillTreeData] = useState<SkillTreeData | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [selectedSkill, setSelectedSkill] = useState<SkillNode | null>(null);

  useEffect(() => {
    if (selectedJob) {
      const loadSkillTree = async () => {
        try {
          const data = await fetchSkillTreeData(selectedJob);
          setSkillTreeData(data);
        } catch (error) {
          console.error("Failed to load skill tree:", error);
        } finally {
          setLoading(false);
        }
      };
      loadSkillTree();
    }
  }, [selectedJob]);

  const handleSkillClick = (skill: SkillNode) => {
    setSelectedSkill(skill);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!query.trim()) return;

    setIsLoading(true);
    setSuggestions([]);

    try {
      const response = await fetch("/api/ai/suggest-jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });

      if (!response.ok) {
        let message = `${response.status} ${response.statusText}`;
        try {
          const text = await response.text();
          if (text) {
            try {
              const data = JSON.parse(text) as unknown;
              const fromJson =
                (typeof data === "object" &&
                data !== null &&
                "error" in data &&
                typeof (data as { error?: unknown }).error === "string"
                  ? (data as { error: string }).error
                  : undefined) ||
                (typeof data === "object" &&
                data !== null &&
                "message" in data &&
                typeof (data as { message?: unknown }).message === "string"
                  ? (data as { message: string }).message
                  : undefined);
              if (fromJson) message = fromJson;
              else message = text;
            } catch {
              message = text;
            }
          }
        } catch {}
        throw new Error(message);
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });

          // Try to parse the accumulated buffer
          try {
            // Split by newlines and process each complete JSON object
            const lines = buffer.split("\n");
            buffer = lines.pop() || ""; // Keep the last incomplete line in buffer

            for (const line of lines) {
              const trimmed = line.trim();
              if (trimmed) {
                const jsonCandidate = trimmed.startsWith("data:")
                  ? trimmed.slice(5).trim()
                  : trimmed;
                const parsed = JSON.parse(jsonCandidate) as unknown;
                if (isJobsEnvelope(parsed)) {
                  setSuggestions(parsed.jobs.map((job) => job.title));
                }
              }
            }
          } catch {
            // Continue accumulating if JSON is incomplete
          }
        }

        // Try to parse any remaining buffer
        if (buffer.trim()) {
          try {
            const remaining = buffer.trim().startsWith("data:")
              ? buffer.trim().slice(5).trim()
              : buffer;
            const parsed = JSON.parse(remaining) as unknown;
            if (isJobsEnvelope(parsed)) {
              setSuggestions(parsed.jobs.map((job) => job.title));
            }
          } catch (e) {
            console.error("Failed to parse final buffer:", e);
          }
        }
      }
    } catch (error) {
      console.error("Error fetching suggestions:", error);
      setSuggestions(SAMPLE_JOBS);
    } finally {
      setIsLoading(false);
    }
  };

  const handleJobSelect = (job: string) => {
    setSelectedJob(job);
    nextSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 border-b border-border bg-background/95 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-primary" />
          <span className="text-lg font-semibold">Skill Tree</span>
        </div>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <UserButton />
        </div>
      </header>

      <main className="flex flex-col items-center justify-center px-6 py-20 md:py-32 pt-32">
        <div className="w-full max-w-3xl space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold text-balance">
              What career do you want to explore?
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              Discover your personalized skill tree and learning path
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Type a career or interest... (e.g., 'Dog Pooper Scooper')"
                className="h-14 pr-14 rounded-full bg-muted/50 border-border text-foreground placeholder:text-muted-foreground text-base"
                disabled={isLoading}
              />
              <Button
                type="submit"
                size="icon"
                disabled={isLoading || !query.trim()}
                className="absolute right-1 top-1 h-12 w-12 rounded-full"
              >
                {isLoading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <ArrowRight className="h-5 w-5" />
                )}
              </Button>
            </div>

            <div className="flex flex-wrap gap-2 justify-center min-h-[40px]">
              {isLoading ? (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span className="text-sm">Finding relevant careers...</span>
                </div>
              ) : suggestions.length > 0 ? (
                suggestions.map((job) => (
                  <Badge
                    key={job}
                    variant="outline"
                    className="cursor-pointer hover:bg-accent hover:text-accent-foreground transition-colors px-4 py-2 text-sm"
                    onClick={() => handleJobSelect(job)}
                  >
                    {job}
                  </Badge>
                ))
              ) : null}
            </div>
          </form>
        </div>
      </main>

      {/* Next Section Placeholder */}
      {selectedJob && (
        <section
          ref={nextSectionRef}
          className="flex items-center justify-center bg-muted/30"
        >
          {skillTreeData ? (
            <SkillTree
              data={skillTreeData || undefined}
              onSkillClick={handleSkillClick}
            />
          ) : (
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold">
                Building your skill tree for {selectedJob}...
              </h2>
              <p className="text-muted-foreground">
                This is where the interactive skill tree will appear
              </p>
            </div>
          )}
        </section>
      )}

      {/* Footer */}
      <footer className="fixed bottom-0 left-0 right-0 py-4 text-center text-sm text-muted-foreground bg-background/80 backdrop-blur-sm border-t border-border">
        <p>Built for the hackathon</p>
      </footer>
    </div>
  );
}
