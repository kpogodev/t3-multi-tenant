import type { RawDraftContentState } from "react-draft-wysiwyg"
import type { JSONValue } from "superjson/dist/types"
import draftToHtml from "draftjs-to-html"

interface DisplayRichTextProps {
  data: string | undefined | JSONValue
  className?: string
}

const DisplayRichText = ({ data, className }: DisplayRichTextProps) => {
  if (!data) return <p>Currently, there is no content to display</p>

  const rawData = JSON.parse(data as string) as RawDraftContentState

  const html = draftToHtml(rawData)

  return (
    <div className='flex w-full justify-start rounded-lg '>
      <div className={className} dangerouslySetInnerHTML={{ __html: html }}></div>
    </div>
  )
}
export default DisplayRichText
