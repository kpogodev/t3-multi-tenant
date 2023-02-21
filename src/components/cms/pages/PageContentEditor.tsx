import { useState, useContext } from "react"
import { EditorState, convertFromRaw, convertToRaw } from "draft-js"
import { toast } from "react-toastify"
import { CmsContext } from "../context/CmsContext"
import { api } from "../../../utils/api"
import RichTextEditor from "../../common/RichTextEditor"
import type { RawDraftContentState } from "react-draft-wysiwyg"
import DisplayRichText from "../../common/DisplayRichText"

const PageContentEditor = () => {
  const ctx = useContext(CmsContext)
  const client = api.useContext()
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty())
  const [draftMode, setDraftMode] = useState(false)
  const editorStateStringified = JSON.stringify(convertToRaw(editorState.getCurrentContent()))
  const editorEmpty = editorState.getCurrentContent().getPlainText().length === 0

  const { mutate: saveDraft } = api.cms.pageContent.updateDraft.useMutation()
  const { mutate: publish } = api.cms.pageContent.updatePublished.useMutation()

  const { data: pagePublishedContent } = api.cms.pageContent.getPublishedByPageId.useQuery(ctx.currentPageId, {
    onSuccess: (published: string) => {
      if (published) {
        const publishedContent = JSON.parse(published) as RawDraftContentState
        setEditorState(EditorState.createWithContent(convertFromRaw(publishedContent)))
      }
    },
  })

  const { data: pageDraftContent } = api.cms.pageContent.getDraftByPageId.useQuery(ctx.currentPageId, {
    onSuccess: (draft: string) => {
      if (draft) {
        const draftContent = JSON.parse(draft) as RawDraftContentState
        setEditorState(EditorState.createWithContent(convertFromRaw(draftContent)))
      }
    },
  })

  const onEditorStateChange = (currentState: EditorState) => {
    setEditorState(currentState)
    if (!draftMode) setDraftMode(true)
  }

  const onSaveDraft = () => {
    saveDraft(
      { pageId: ctx.currentPageId, draft: editorStateStringified },
      {
        onSuccess: () => {
          toast.success("Draft saved")
          setDraftMode(false)
          void client.cms.pageContent.getDraftByPageId.invalidate()
        },
        onError: () => toast.error("Failed to save draft"),
      }
    )
  }

  const onPublish = () => {
    publish(
      { pageId: ctx.currentPageId, published: editorStateStringified },
      {
        onSuccess: () => {
          toast.success("Page published")
          void client.cms.pageContent.getPublishedByPageId.invalidate()
          void client.cms.pageContent.getDraftByPageId.invalidate()
        },
        onError: () => toast.error("Failed to publish page"),
      }
    )
  }

  return (
    <div className='flex flex-col items-end rounded-md bg-base-200 p-4'>
      <RichTextEditor onEditorStateChange={onEditorStateChange} editorState={editorState} />
      <div className='mt-4 flex w-full items-center justify-end gap-4'>
        {draftMode && <p className='mr-auto animate-pulse italic text-base-content opacity-90'>Changes detected...</p>}
        <button className='btn-accent btn' onClick={onSaveDraft} disabled={!draftMode || editorEmpty}>
          Save draft
        </button>
        <button className='btn-primary btn' onClick={onPublish} disabled={draftMode || !pageDraftContent}>
          Publish
        </button>
      </div>
      <DisplayRichText data={pageDraftContent} className='w-full prose prose-lg mr-auto' />
    </div>
  )
}
export default PageContentEditor
