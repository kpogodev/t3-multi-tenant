import { useState, useContext } from "react"
import { EditorState, convertFromRaw, convertToRaw } from "draft-js"
import { toast } from "react-toastify"
import { CmsContext } from "../context/CmsContext"
import { api } from "utils/api"
import RichTextEditor from "components/common/RichTextEditor"
import type { RawDraftContentState } from "react-draft-wysiwyg"
import DisplayRichText from "components/common/DisplayRichText"
import Heading from "components/common/Heading"

const PageContentEditor = () => {
  const ctx = useContext(CmsContext)
  const client = api.useContext()
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty())
  const [draftMode, setDraftMode] = useState(false)
  const editorStateStringified = JSON.stringify(convertToRaw(editorState.getCurrentContent()))
  const editorEmpty = editorState.getCurrentContent().getPlainText().length === 0

  const { mutate: saveDraft } = api.cms.pageContent.updateDraft.useMutation()
  const { mutate: publish } = api.cms.pageContent.updatePublished.useMutation()

  api.cms.pageContent.getPublishedByPageId.useQuery(ctx.currentView.id ?? "", {
    onSuccess: (published: string) => {
      if (published) {
        const publishedContent = JSON.parse(published) as RawDraftContentState
        setEditorState(EditorState.createWithContent(convertFromRaw(publishedContent)))
      }
    },
  })
  const { data: pageDraftContent } = api.cms.pageContent.getDraftByPageId.useQuery(ctx.currentView.id ?? "", {
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
    if (!ctx.currentView.id) return
    saveDraft(
      { pageId: ctx.currentView.id, draft: editorStateStringified },
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
    if (!ctx.currentView.id) return
    publish(
      { pageId: ctx.currentView.id, published: editorStateStringified },
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
    <>
      <div className='flex w-full flex-col items-end rounded-md bg-base-200 p-4'>
        <RichTextEditor onEditorStateChange={onEditorStateChange} editorState={editorState} />
        <div className='mt-4 flex w-full items-center justify-end gap-4'>
          {draftMode && (
            <p className='mr-auto animate-pulse italic text-base-content opacity-90'>Changes detected...</p>
          )}
          <button className='btn-accent btn' onClick={onSaveDraft} disabled={!draftMode || editorEmpty}>
            Save draft
          </button>
          <button className='btn-primary btn' onClick={onPublish} disabled={draftMode || !pageDraftContent}>
            Publish
          </button>
        </div>
      </div>
      <Heading text='Draf Preview' />
      <DisplayRichText data={pageDraftContent} className='prose w-full xl:prose-xl' />
    </>
  )
}
export default PageContentEditor
