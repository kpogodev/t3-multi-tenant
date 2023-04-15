import type { NextApiRequest, NextApiResponse } from "next"
import cloudinary from "utils/cloudinary"
import formidable from "formidable"
import { prisma } from "server/db"

export const config = {
  api: {
    bodyParser: false,
  },
}

type DataType = {
  fields: formidable.Fields
  files: formidable.Files
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method?.toLocaleLowerCase() !== "post") return res.status(405).json({ message: "Method not allowed" })

  const data: DataType = await new Promise((resolve, reject) => {
    const form = formidable({ multiples: false })
    form.parse(req, (err, fields, files) => {
      if (err) return reject(err)
      resolve({ fields, files })
    })
  })

  if (!data.fields.userId) throw new Error("User ID not provided")
  if (typeof data.fields.userId !== "string") throw new Error("User ID must be a string")

  if (!data.files.video) throw new Error("Video file not provided")
  if (Array.isArray(data.files.video)) throw new Error("Only single file upload is allowed")

  const siteInfo = await prisma.site.findFirst({
    where: {
      userId: data.fields.userId,
    },
    select: {
      name: true,
    },
  })

  if (!siteInfo) throw new Error("Site name not found")

  const siteNameSlug = siteInfo.name.toLowerCase().replace(/ /g, "_")

  const video = await cloudinary.uploader.upload(data.files?.video?.filepath, {
    resource_type: "video",
    folder: `sites/videos/${siteNameSlug}`,
  })

  const formattedResponse = {
    public_id: video.public_id,
    width: video.width,
    height: video.height,
    format: video.format,
    secure_url: video.secure_url,
    resource_type: video.resource_type,
  }

  return res.status(200).json(formattedResponse)
}
