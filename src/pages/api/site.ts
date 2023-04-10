import {prisma} from 'server/db'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res:NextApiResponse ) {
  const domain = req.query.domain as string

  const site = await prisma.site.findFirst({
    where: {
      domain: {
        name: domain
      },
    },
    include: {
      theme: true,
    }
  })

  res.status(200).json({themeName: site?.theme?.name})
}