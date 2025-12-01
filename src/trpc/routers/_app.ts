import { z } from 'zod';
import { baseProcedure, createTRPCRouter, protectedProcedure } from '../init';
import prisma from '@/lib/db';
import { inngest } from '@/inngest/client';
export const appRouter = createTRPCRouter({
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