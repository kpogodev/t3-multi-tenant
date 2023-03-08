import { z } from "zod"
import { createTRPCRouter, publicProcedure } from "server/api/trpc"

export const slideshowRouter = createTRPCRouter({
  getSlideshows: publicProcedure.input(z.string()).query(async ({ ctx, input }) => {

    const domainToLookFor = process.env.NODE_ENV === "production" ? input : input.replace(".localhost:3000", ".kpwebdev.com")

    const slideshows = await ctx.prisma.site.findFirst({
      where: {
        domain: {
          name: domainToLookFor,
        },
      },
      select: {
        components: {
          where: {
            feature: {
              type: "SLIDESHOW",
            }
          },
          select: {
            componentsRelation: {
              select: {
                slideshow: {
                  include: {
                    slides: {
                      include: {
                        image: true,
                      },
                    }
                  }
                }
              }
            }
          }
        }
      }
    })

    if (!slideshows) throw new Error("Slideshows not found")

    const newSlideshows = slideshows.components.map((component) => component?.componentsRelation?.slideshow)

    return newSlideshows
  })
})
