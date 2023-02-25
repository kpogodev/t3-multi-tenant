import { z } from "zod"
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../../trpc"
import { Prisma } from "@prisma/client"
import { randomUUID } from "crypto"
import S3 from "aws-sdk/clients/s3"

const s3 = new S3({
  apiVersion: "2006-03-01",
  accessKeyId: process.env.S3_BUCKET_ACCESS_KEY_ID,
  secretAccessKey: process.env.S3_BUCKET_SECRET,
  region: process.env.S3_BUCKET_REGION,
  signatureVersion: "v4",
})

export const pageContentRouter = createTRPCRouter({
  getDraftByPageId: protectedProcedure.input(z.string()).query(async ({ input, ctx }) => {
    const pageContent = await ctx.prisma.pageContent.findUnique({
      where: {
        pageId: input,
      },
    })

    return pageContent?.draft
  }),
  getPublishedByPageId: protectedProcedure.input(z.string()).query(async ({ input, ctx }) => {
    const pageContent = await ctx.prisma.pageContent.findUnique({
      where: {
        pageId: input,
      },
    })

    return pageContent?.published
  }),
  updateDraft: protectedProcedure
    .input(
      z.object({
        pageId: z.string(),
        draft: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const pageContent = await ctx.prisma.pageContent.update({
        where: {
          pageId: input.pageId,
        },
        data: {
          draft: input.draft,
        },
      })

      return pageContent
    }),
  updatePublished: protectedProcedure
    .input(
      z.object({
        pageId: z.string(),
        published: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const pageContent = await ctx.prisma.pageContent.update({
        where: {
          pageId: input.pageId,
        },
        data: {
          published: input.published,
          draft: Prisma.DbNull,
        },
      })

      return pageContent
    }),
  getPreSignedPostUrl: protectedProcedure
    .input(
      z.object({
        fileType: z.string(),
      })
    )
    .mutation(({ input }) => {
      if (!input.fileType) throw new Error("No file type provided")
      const ext = input.fileType.split('/')[1] as string

      const Key = `${randomUUID()}.${ext}`


      const s3Params = {
        Bucket: process.env.S3_BUCKET_NAME,
        Fields: {
          key: Key,
          ContentType: input.fileType,
        },
        Expires: 60,
        Conditions: [
          ["content-length-range", 0, 5242880], // up to 5 MB
        ],
      }

      const url = s3.createPresignedPost(s3Params)

      return { url, key: Key }
    }),
  getSignedImgUrl: protectedProcedure.input(z.string()).mutation(({ input }) => {
    const s3Params = {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: input,
    }
    const url = s3.getSignedUrl("getObject", s3Params)

    return url
  }),
})
