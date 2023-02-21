import { convertToHTML } from "draft-convert"
import { convertFromRaw } from "draft-js"
import type { RawDraftContentState } from "react-draft-wysiwyg"
import { sanitize } from "dompurify"

interface DisplayRichTextProps {
  data: string | undefined
  className?: string
}

const DisplayRichText = ({ data, className }: DisplayRichTextProps) => {
  if (!data) return <p>Currently, there is no content to display</p>

  const rawData = JSON.parse(data) as RawDraftContentState
  const html = convertToHTML(convertFromRaw(rawData))


  return <div className={className} dangerouslySetInnerHTML={{ __html: html }}></div>
}
export default DisplayRichText
