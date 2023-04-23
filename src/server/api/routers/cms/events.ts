import { z } from "zod"
import { createTRPCRouter, protectedProcedure } from "server/api/trpc"
import { TRPCError } from "@trpc/server"

export const eventsRouter = createTRPCRouter({
  getEvents: protectedProcedure.query(async ({ ctx }) => {
    const events = await ctx.prisma.events.findMany({
      where: {
        siteId: ctx.session.user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        title: true,
        allDay: true,
        start: true,
        end: true
      }
    })

    if (!events) throw new TRPCError({ code: "NOT_FOUND", message: "Events not found" })

    return events
  }),
  createEvent: protectedProcedure.input(z.object({
    title: z.string(),
    allDay: z.boolean(),
    start: z.date(),
    end: z.date()
  })).mutation(async ({ ctx, input }) => {
    const event = await ctx.prisma.events.create({
      data: {
        ...input,
        siteId: ctx.session.user.id
      },
    })

    if (!event) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Your event couldn't be created" })

    return event
  }),
  editEvent: protectedProcedure.input(z.object({
    id: z.string(),
    title: z.string(),
    allDay: z.boolean(),
    start: z.date(),
    end: z.date()
  })).mutation(async ({ ctx, input }) => {
    const event = await ctx.prisma.events.update({
      where: {
        id: input.id
      },
      data: {
        ...input
      }
    })

    if (!event) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Your event couldn't be updated" })

    return event
  }),
  removeEvent: protectedProcedure.input(z.object({
    id: z.string()
  })).mutation(async ({ ctx, input }) => {
    const event = await ctx.prisma.events.delete({
      where: {
        id: input.id
      }
    })

    if (!event) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Your event couldn't be deleted" })

    return
  })
})
