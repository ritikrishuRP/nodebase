import { z } from 'zod';
import { baseProcedure, createTRPCRouter, protectedProcedure } from '../init';
import prisma from '@/lib/db';
import { inngest } from '@/inngest/client';
import { google } from '@ai-sdk/google';
import { generateText } from 'ai';


export const appRouter = createTRPCRouter({
  testAi: protectedProcedure.mutation(async()=>{
    await inngest.send({
      name: "execute/ai",
    });
    return { success: true, message: "AI Job Queued" };
  }),

  getWorkflows: protectedProcedure.query(({ ctx }) => {
    console.log({userId: ctx.auth.user.id});
      return prisma.workflow.findMany();
    }),

  createWorkflow: protectedProcedure.mutation(async()=>{
    await inngest.send({
      name: "test/hello.world",
      data: { email: "user@example.com" }
    })


    return ({ success: true, message: "Job Queued Successfully"})
  })  
});
// export type definition of API
export type AppRouter = typeof appRouter;