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
            id: true,
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
        transformation: { width: 1024, height: 768, crop: "fill", format: "webp", quality: "auto", fetch_format: "webp" },
        format: "webp",
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
  reuploadImage: protectedProcedure
    .input(z.object({ imageId: z.string(), imagePublicId: z.string(), image: z.string() }))
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
        transformation: { width: 1024, height: 768, crop: "fill", format: "webp", quality: "auto", fetch_format: "webp" },
        format: "webp",
      })

      if (!image) throw new Error("Image not re-uploaded")

      const reuploadedImage = await ctx.prisma.externalImage.update({
        where: {
          id: input.imageId,
        },
        data: {
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
      })

      if (!reuploadedImage) throw new Error("Re-uploaded image was not updated in database")

      await cloudinary.uploader
        .destroy(input.imagePublicId, {
          invalidate: true,
        })
        .catch((err) => {
          if (err) throw new Error("Cloudinary error when removing old image")
        })

      return true
    }),
  updateWelcomeBlock: protectedProcedure
    .input(
      z.object({
        welcomeBlockId: z.string(),
        header: z.string().optional(),
        text: z.string().optional(),
        linkText: z.string().optional(),
        linkUrl: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const welcomeBlock = await ctx.prisma.welcomeBlock.update({
        where: {
          id: input.welcomeBlockId,
        },
        data: {
          header: input.header,
          text: input.text,
          linkText: input.linkText,
          linkUrl: input.linkUrl,
        },
      })

      if (!welcomeBlock) throw new Error("WelcomeBlock not updated")

      return welcomeBlock
    }),
  deleteImage: protectedProcedure
    .input(z.object({ imageId: z.string(), imagePublicId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const deletedImage = await ctx.prisma.externalImage.delete({
        where: {
          id: input.imageId,
        },
      })

      if (!deletedImage) throw new Error("Image not deleted from database")

      await cloudinary.uploader
        .destroy(input.imagePublicId, {
          invalidate: true,
        })
        .catch((err) => {
          if (err) throw new Error("Cloudinary error when removing image")
        })

      return true
    }),
})
