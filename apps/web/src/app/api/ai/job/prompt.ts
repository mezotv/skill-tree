export default function prompt(job: string): string {
  return `Generate a comprehensive skill tree for the occupation: "${job}".

The response should include:
- occupation: The job title "${job}"
- subjects: A list of relevant subjects (e.g., Math, Science, Language, History, etc.)
- ages: Array from 5 to 18
- schools: Array of "Elementary", "Middle School", "High School"
- skills: Array of skill objects for each age and subject combination that are relevant to becoming a ${job}

For each skill, provide:
- id: A unique identifier (e.g., "math-5-1", "science-12-2")
- subject: The subject area
- age: The age when this skill is typically learned (5-18)
- school: Either "Elementary", "Middle School", or "High School"
- level: Difficulty level from 1 (easiest) to 5 (hardest)
- completed: Set all to false by default
- description: A concise name for the skill (max 100 chars)
- explanation: Why this skill is relevant for the ${job} occupation (at least 20 chars)

Create a progressive learning path where skills build on each other naturally through the ages.
Include at least 20-30 skills spread across different subjects and ages.`;
}
