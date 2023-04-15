import { z } from "zod"
import { createTRPCRouter, protectedProcedure } from "server/api/trpc"
import { TRPCError } from "@trpc/server"
import cloudinary from "utils/cloudinary"

export const videoRouter = createTRPCRouter({
  getVideo: protectedProcedure.input(z.object({ componentId: z.string() })).query(async ({ ctx, input }) => {
    const video = await ctx.prisma.video.findFirst({
      where: {
        component: {
          componentId: input.componentId,
        },
      },
    })

    if (!video) {
      throw new TRPCError({ code: "NOT_FOUND", message: "Video not found" })
    }

    return video
  }),
  updateVideo: protectedProcedure.input(z.object({
    videoId: z.string(),
    public_id: z.string(),
    width: z.number(),
    height: z.number(),
    format: z.string(),
    secure_url: z.string(),
    resource_type: z.string(),
  })).mutation(async ({ ctx, input }) => {
    const video = await ctx.prisma.video.update({
      where: {
        id: input.videoId,
      },
      data: {
        public_id: input.public_id,
        width: input.width,
        height: input.height,
        format: input.format,
        secure_url: input.secure_url,
        resource_type: input.resource_type,
      },
    })

    if (!video) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Video not updated" })

    return video
  }),
  deleteVideo: protectedProcedure.input(z.object({ videoId: z.string() })).mutation(async ({ ctx, input }) => {
    const video = await ctx.prisma.video.findFirst({
      where: {
        id: input.videoId,
      },
    })

    if (!video || !video.public_id) {
      throw new TRPCError({ code: "NOT_FOUND", message: "Video not found" })
    }

    const deletedVideo = await ctx.prisma.video.update({
      where: {
        id: input.videoId,
      },
      data: {
        public_id: null,
        width: null,
        height: null,
        format: null,
        secure_url: null,
        resource_type: null,
      },
    })

    if (!deletedVideo) {
      throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Video not deleted" })
    }

    await cloudinary.uploader.destroy(video.public_id)

    return deletedVideo
  })
})