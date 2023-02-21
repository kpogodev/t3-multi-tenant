import dynamic from "next/dynamic"
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"
import type { EditorState } from "draft-js"

interface RichTextEditorProps {
  editorState: EditorState
  onEditorStateChange: (editorState: EditorState) => void
}

const Editor = dynamic(() => import("react-draft-wysiwyg").then((mod) => mod.Editor), {
  ssr: false,
  loading: () => <div className='min-h-[500px] w-full animate-pulse bg-base-200'></div>,
})

const RichTextEditor = ({ editorState, onEditorStateChange }: RichTextEditorProps) => {
  return (
    <Editor
      editorState={editorState}
      toolbarClassName='flex sticky top-0 z-50 !justify-center mx-auto'
      editorClassName='bg-base-100 shadow-md rounded-md p-4 mt-4 !h-[500px]'
      onEditorStateChange={onEditorStateChange}
    />
  )
}
export default RichTextEditor
