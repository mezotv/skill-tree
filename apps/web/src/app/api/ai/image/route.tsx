import { type NextRequest, NextResponse } from "next/server";
import { streamText } from 'ai';
import { JobName } from "@/lib/schemas/ai";
import prompt from "@/app/api/ai/image/prompt";

export async function POST(req: NextRequest) {

  const body = await req.json()
  const { success, error } = JobName.safeParse(body);

  if (!success) {
    return NextResponse.json({ error }, { status: 400 });
  }

  const { job } = body;

   const result = streamText({
    model: 'google/gemini-2.5-flash-image-preview',
    providerOptions: {
      google: { responseModalities: ['IMAGE'] },
    },
    prompt: prompt(job)
  });
  const base64Image = (await result.files).at(0)?.base64;
  return NextResponse.json({ image: base64Image });
}