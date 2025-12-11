import { inngest } from "./client";
import prisma from "@/lib/db";
import { generateText } from "ai";
import { createGoogleGenerativeAI } from "@ai-sdk/google";

const google = createGoogleGenerativeAI();

export const execute = inngest.createFunction(
  { id: "execute-ai" },
  { event: "execute/ai" },
  async ({ event, step }) => {
    await step.sleep("pretend-we-are-doing-something", "4s");
    const {steps} = await step.ai.wrap("gemini-generate-text",
        generateText,
        {
          model: google('gemini-2.5-flash'),
          prompt: "what is 2+2?",
          system: "You are a helpful assistant.",
           experimental_telemetry: {
            isEnabled: true,
            recordInputs: true,
            recordOutputs: true,
          },
        }
    );
    return steps;
  },

  
);