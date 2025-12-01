import { inngest } from "./client";
import prisma from "@/lib/db";

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event, step }) => {
    //Fetching the video
    await step.sleep("transcribing", "5s");

    //Transcoding the video
    await step.sleep("transcoding", "10s");

    //Sending transcription to AI
    await step.sleep("sending transcription to AI", "3s");

    await step.run("create-workflow", ()=>{
        return prisma.workflow.create({
          data: {
            name: "workflow-from-inngest",
          }
        }); 
    })
  },
);