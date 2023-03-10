import { z } from "zod"
import { createTRPCRouter, protectedProcedure } from "server/api/trpc"
import cloudinary from "utils/cloudinary"

export const welcomeBlockRouter = createTRPCRouter({
  getWelcomeBlock: protectedProcedure.input(z.object({ componentId: z.string() })).query(async ({ ctx, input }) => {
    const welcomeBlock = await ctx.prisma.welcomeBlock.findFirst({
      where: {
        component: {
          componentId: input.componentId,
        },
      },
      include: {
        image: {
          select: {
            public_id: true,
            secure_url: true,
            bytes: true,
            width: true,
            height: true,
          },
        },
      },
    })

    if (!welcomeBlock) {
      throw new Error("Welcome block not found")
    }

    return welcomeBlock
  }),
  uploadImage: protectedProcedure
    .input(z.object({ welcomeBlockId: z.string(), image: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const siteInfo = await ctx.prisma.site.findUnique({
        where: {
          userId: ctx.session.user.id,
        },
        select: {
          name: true,
        },
      })

      if (!siteInfo) throw new Error("Site name not found")

      const siteNameSlug = siteInfo.name.toLowerCase().replace(/ /g, "_")

      const image = await cloudinary.uploader.upload(input.image, {
        folder: `sites/${siteNameSlug}/welcome-blocks`,
        transformation: { width: 600, height: 800, crop: "fill" },
      })

      if (!image) throw new Error("Image not uploaded")

      const welcomeBlock = await ctx.prisma.welcomeBlock.update({
        where: {
          id: input.welcomeBlockId,
        },
        data: {
          image: {
            create: {
              public_id: image.public_id,
              asset_id: image?.asset_id as string,
              width: image.width,
              height: image.height,
              format: image.format,
              resource_type: image.resource_type,
              created_at: image.created_at,
              bytes: image.bytes,
              type: image.type,
              placeholder: image.placeholder,
              url: image.url,
              secure_url: image.secure_url,
              folder: image?.folder as string,
              access_mode: image.access_mode,
            },
          },
        },
      })

      if (!welcomeBlock) throw new Error("WelcomeBlock not updated")

      return welcomeBlock
    }),
})
