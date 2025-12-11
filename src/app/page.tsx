"use client"


import { LogoutButton } from "./logout";
import { useTRPC } from "@/trpc/client";
import { mutationOptions, QueryClient, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";





const page =  () => {
  
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const {data} = useQuery(trpc.getWorkflows.queryOptions());

  const testAi = useMutation(trpc.testAi.mutationOptions({
    onSuccess:()=>{
      toast.success("AI Job Queued")
    },
    onError:()=>{
      toast.error("Error queuing AI Job: ")
    }
  } 
  ));

  const create = useMutation(trpc.createWorkflow.mutationOptions({
      onSuccess:()=>{
        toast.success("Job Queued")
      }
    })
  );

  


  return (
    <div className="min-h-screen min-w-screen flex flex-col gap-4
    items-center justify-center">
      Protected Server Component
      <div>
        {JSON.stringify(data, null, 2)}
      </div>
      

      <Button
  disabled={testAi.isPending}
  onClick={() => {
    console.log('mutate testAi');
    console.log('testAi mutation object:', testAi);
console.log('testAi.options?.mutationFn:', (testAi as any)?.options?.mutationFn);
    testAi.mutate(undefined, {
      onSuccess: () => console.log('testAi success'),
      onError: (e) => console.error('testAi error', e)
    });
  }}
>Test AI</Button>

      <Button disabled={create.isPending} onClick={()=> create.mutate()}>
        Create Workflow
      </Button>
      <LogoutButton />
      
    </div>
  )
}

export default page