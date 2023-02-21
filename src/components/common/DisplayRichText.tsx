import { convertToHTML } from "draft-convert"
import { convertFromRaw } from "draft-js"
import type { RawDraftContentState } from "react-draft-wysiwyg"
import DOMPurify from "dompurify"

interface DisplayRichTextProps {
  data: string | undefined
  className?: string
}

const DisplayRichText = ({ data, className }: DisplayRichTextProps) => {
  if (!data) return <p>Currently, there is no content to display</p>

  const rawData = JSON.parse(data) as RawDraftContentState
  const html = convertToHTML(convertFromRaw(rawData))
  const sanitizedHtml = DOMPurify.sanitize(html)

  return <div className={className} dangerouslySetInnerHTML={{ __html: sanitizedHtml }}></div>
}
export default DisplayRichText
