import { streamObject } from "ai"
import { z } from "zod"

const jobSuggestionsSchema = z.object({
  jobs: z
    .array(
      z.object({
        title: z.string().describe("Job title"),
        relevance: z.string().describe("Why this job is relevant to the query"),
      }),
    )
    .length(5)
    .describe("Exactly 5 job suggestions"),
})

export async function POST(req: Request) {
  const { query } = await req.json()

  if (!query || query.trim().length === 0) {
    return Response.json({ error: "Query is required" }, { status: 400 })
  }

  const result = streamObject({
    model: "openai/gpt-5-mini",
    schema: jobSuggestionsSchema,
    prompt: `Given the user's interest or query: "${query}", suggest exactly 5 relevant career paths or job titles.

IMPORTANT RULES:
- Use VERY SHORT job titles (1-3 words maximum)
- Use simple, child-friendly language that an elementary school student would understand
- Use common, well-known job titles that kids recognize
- Avoid technical jargon, complex terms, or industry-specific language
- Think of jobs that would appear in children's books or career day presentations

Examples of GOOD titles: "Dog Walker", "Veterinarian", "Pet Store Owner", "Animal Trainer", "Zoo Keeper"
Examples of BAD titles: "Canine Behaviorist", "Veterinary Technician", "Pet Daycare Attendant", "Boarding Facility Manager"

Consider:
- Related careers in the same field
- Jobs that use similar skills
- Jobs kids would recognize and understand
    
Return exactly 5 diverse and relevant job suggestions with SHORT, SIMPLE titles.`,
    maxOutputTokens: 1000,
  })

  return result.toTextStreamResponse()
}
