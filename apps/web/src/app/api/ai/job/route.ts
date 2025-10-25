import { type NextRequest, NextResponse } from "next/server";
import { generateObject } from "ai";
import prompt from "@/app/api/ai/job/prompt";
import { JobName, SkillTreeData } from "@/lib/schemas/ai";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const { success, error } = JobName.safeParse(body.job);

  if (!success) {
    return NextResponse.json({ error }, { status: 400 });
  }

  const { job } = body;

  const result = await generateObject({
    model: "google/gemini-2.5-flash",
    schema: SkillTreeData,
    prompt: prompt(job),
  });

  return result.toJsonResponse();
}
