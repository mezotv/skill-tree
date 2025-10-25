import { type NextRequest, NextResponse } from "next/server";
import { generateObject } from "ai";
import prompt from "@/app/api/ai/image/prompt";
import { JobName, JobObject } from "@/lib/schemas/ai";

export async function POST(req: NextRequest) {

  const body = await req.json();
  const { success, error } = JobName.safeParse(body);

  if (!success) {
    return NextResponse.json({ error }, { status: 400 });
  }

  const { job } = body;

const result = await generateObject({
    model: "google/gemini-2.5-pro",
    schema: JobObject,
    prompt: prompt(job),
  });

  return result.toJsonResponse();
}