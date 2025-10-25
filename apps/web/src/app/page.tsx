"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ThemeToggle } from "@/components/theme-toggle"
import { ArrowRight, Loader2 } from "lucide-react"

const SAMPLE_JOBS = ["Software Engineer", "Data Scientist", "Product Manager", "UX Designer", "Marketing Manager"]

export default function Home() {
  const [query, setQuery] = useState("")
  const [suggestions, setSuggestions] = useState<string[]>(SAMPLE_JOBS)
  const [isLoading, setIsLoading] = useState(false)
  const [selectedJob, setSelectedJob] = useState<string | null>(null)
  const nextSectionRef = useRef<HTMLDivElement>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!query.trim()) return

    setIsLoading(true)
    setSuggestions([])

    try {
      const response = await fetch("/api/suggest-jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      })

      if (!response.ok) throw new Error(JSON.stringify(response))
      if (!response.ok) throw new Error("Failed to fetch suggestions")

      const reader = response.body?.getReader()
      const decoder = new TextDecoder()
      let buffer = ""

      if (reader) {
        while (true) {
          const { done, value } = await reader.read()
          if (done) break

          buffer += decoder.decode(value, { stream: true })

          // Try to parse the accumulated buffer
          try {
            // Split by newlines and process each complete JSON object
            const lines = buffer.split("\n")
            buffer = lines.pop() || "" // Keep the last incomplete line in buffer

            for (const line of lines) {
              if (line.trim()) {
                const parsed = JSON.parse(line)
                if (parsed.jobs && Array.isArray(parsed.jobs)) {
                  setSuggestions(parsed.jobs.map((job: any) => job.title))
                }
              }
            }
          } catch (e) {
            // Continue accumulating if JSON is incomplete
          }
        }

        // Try to parse any remaining buffer
        if (buffer.trim()) {
          try {
            const parsed = JSON.parse(buffer)
            if (parsed.jobs && Array.isArray(parsed.jobs)) {
              setSuggestions(parsed.jobs.map((job: any) => job.title))
            }
          } catch (e) {
            console.error("Failed to parse final buffer:", e)
          }
        }
      }
    } catch (error) {
      console.error("Error fetching suggestions:", error)
      setSuggestions(SAMPLE_JOBS)
    } finally {
      setIsLoading(false)
    }
  }

  const handleJobSelect = (job: string) => {
    setSelectedJob(job)
    nextSectionRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 border-b border-border bg-background/95 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-primary" />
          <span className="text-lg font-semibold">Skill Tree</span>
        </div>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Button variant="ghost">Sign in</Button>
          <Button>Get started</Button>
        </div>
      </header>

      <main className="flex flex-col items-center justify-center px-6 py-20 md:py-32 pt-32">
        <div className="w-full max-w-3xl space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold text-balance">What career do you want to explore?</h1>
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
                {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <ArrowRight className="h-5 w-5" />}
              </Button>
            </div>

            <div className="flex flex-wrap gap-2 justify-center min-h-[40px]">
              {isLoading ? (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span className="text-sm">Finding relevant careers...</span>
                </div>
              ) : suggestions.length > 0 ? (
                suggestions.map((job, index) => (
                  <Badge
                    key={`${job}-${index}`}
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
        <section ref={nextSectionRef} className="min-h-screen flex items-center justify-center px-6 py-20 bg-muted/30">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold">Building your skill tree for {selectedJob}...</h2>
            <p className="text-muted-foreground">This is where the interactive skill tree will appear</p>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="fixed bottom-0 left-0 right-0 py-4 text-center text-sm text-muted-foreground bg-background/80 backdrop-blur-sm border-t border-border">
        <p>Built for the hackathon</p>
      </footer>
    </div>
  )
}
