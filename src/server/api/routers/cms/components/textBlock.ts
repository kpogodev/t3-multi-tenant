import { z } from "zod"
import { createTRPCRouter, protectedProcedure } from "server/api/trpc"
import { TRPCError } from "@trpc/server"

export const textBlockRouter = createTRPCRouter({
  getTextBlock: protectedProcedure.input(z.object({
    componentId: z.string(),
  })).query(async ({ ctx, input }) => {
    const textBlock = await ctx.prisma.textBlock.findFirst({
      where: {
        component: {
          componentId: input.componentId,
        },
      },
    })

    if (!textBlock) {
      throw new TRPCError({message: "Text block not found" , code: "NOT_FOUND"})
    }

    return textBlock
  }),
  updateTextBlock: protectedProcedure.input(z.object({
    textBlockId: z.string(),
    text: z.string(),
  })).mutation(async ({ ctx, input }) => {
    const textBlock = await ctx.prisma.textBlock.update({
      where: {
        id: input.textBlockId,
      },
      data: {
        text: input.text,
      },
    })

    if (!textBlock) {
      throw new TRPCError({message: "Text block not found" , code: "NOT_FOUND"})
    }

    return textBlock
  }),
})
