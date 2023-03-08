import { z } from "zod"
import { createTRPCRouter, publicProcedure } from "server/api/trpc"

const domainName = (dom: string) => {
  return process.env.NODE_ENV === "production" ? dom : dom.replace(".localhost:3000", ".kpwebdev.com")
}

export const slideshowRouter = createTRPCRouter({
  getSlideshows: publicProcedure.input(z.string()).query(async ({ ctx, input }) => {
    const slideshows = await ctx.prisma.site.findFirst({
      where: {
        domain: {
          name: domainName(input),
        },
      },
      select: {
        components: {
          where: {
            feature: {
              type: "SLIDESHOW",
            },
          },
          select: {
            componentsRelation: {
              select: {
                slideshow: {
                  include: {
                    slides: {
                      include: {
                        image: {
                          select: {
                            width: true,
                            height: true,
                            secure_url: true,
                            created_at: true,
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    })

    if (!slideshows) throw new Error("Slideshows not found")

    const response = slideshows.components.map((component) => component?.componentsRelation?.slideshow)

    return response
  }),
  getSlideshowByName: publicProcedure
    .input(
      z.object({
        name: z.string(),
        domain: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const slideshow = await ctx.prisma.site.findFirst({
        where: {
          domain: {
            name: domainName(input.domain),
          },
        },
        select: {
          components: {
            where: {
              name: input.name,
              feature: {
                type: "SLIDESHOW",
              },
            },
            select: {
              componentsRelation: {
                select: {
                  slideshow: {
                    include: {
                      slides: {
                        include: {
                          image: {
                            select: {
                              width: true,
                              height: true,
                              secure_url: true,
                              created_at: true,
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      })

      if (!slideshow) throw new Error("Slideshows not found")

      const response = slideshow.components.map((component) => component?.componentsRelation?.slideshow)[0]

      return response
    }),
})
