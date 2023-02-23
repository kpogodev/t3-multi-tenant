import { convertToHTML } from "draft-convert"
import { convertFromRaw } from "draft-js"
import type { RawDraftContentState } from "react-draft-wysiwyg"
import { sanitize } from "dompurify"
import { JSONValue } from "superjson/dist/types"

interface DisplayRichTextProps {
  data: string | undefined | JSONValue
  className?: string
}

const DisplayRichText = ({ data, className }: DisplayRichTextProps) => {
  if (!data) return <p>Currently, there is no content to display</p>

  const rawData = JSON.parse(data as string) as RawDraftContentState
  const html = convertToHTML(convertFromRaw(rawData))

  return <div className={className} dangerouslySetInnerHTML={{ __html: html }}></div>
}
export default DisplayRichText
