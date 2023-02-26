import { z } from "zod"
import { createTRPCRouter, protectedProcedure } from "server/api/trpc"
import { addDomainToVercelProject } from "server/vercel"

export const domainRouter = createTRPCRouter({
  addDomain: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        isCustom: z.boolean(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      if (input.isCustom) {
        const customDomain = await addDomainToVercelProject(`${input.name}`)

        if (!customDomain) {
          throw new Error("Domain already exists")
        }

        const customDomainAdded = await ctx.prisma.domain.create({
          data: {
            name: customDomain.name,
            apexName: customDomain.apexName,
            verified: customDomain.verified,
          },
        })

        return customDomainAdded
      }

      const domainAdded = await ctx.prisma.domain.create({
        data: {
          name: `${input.name}.kpwebdev.com`,
          apexName: "kpwebdev.com",
          verified: true,
        },
      })

      return domainAdded
    }),
  getDomains: protectedProcedure.query(async ({ ctx }) => {
    const domains = await ctx.prisma.domain.findMany()

    if (!domains) throw new Error("No domains found")

    return domains
  }),
  getAvailableDomains: protectedProcedure.query(async ({ ctx }) => {
    const domains = await ctx.prisma.domain.findMany({
      where: {
        site: null,
      },
    })

    if (!domains) throw new Error("No domains found")

    return domains
  }),
  checkDomainAvailability: protectedProcedure
    .input(
      z.object({
        name: z.string(),
      })
    )
    .query(async ({ input, ctx }) => {
      const domain = await ctx.prisma.domain.findFirst({
        where: {
          name: input.name,
        },
      })

      return {
        available: !domain,
      }
    }),
  deleteDomain: protectedProcedure.input(z.string()).mutation(async ({ input, ctx }) => {
    const domain = await ctx.prisma.domain.findFirst({
      where: {
        id: input,
      },
    })

    if (!domain) throw new Error("Domain not found")

    const deletedDomain = await ctx.prisma.domain.delete({
      where: {
        id: input,
      },
    })

    return deletedDomain
  }),
})
