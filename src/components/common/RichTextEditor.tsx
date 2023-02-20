import dynamic from "next/dynamic"
import { useState, useEffect } from "react"
import { useDebounce } from "use-debounce"
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"
import { EditorState, convertFromRaw, convertToRaw } from "draft-js"

const Editor = dynamic(() => import("react-draft-wysiwyg").then((mod) => mod.Editor), {
  ssr: false,
})

const RichTextEditor = () => {
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty())
  const [isTyping, setIsTyping] = useState(false)
  const [debouncedContent] = useDebounce(editorState, 2000)

  useEffect(() => {
    setIsTyping(false)
  }, [debouncedContent])

  const onEditorStateChange = (currentState: EditorState) => {
    setEditorState(currentState)
    setIsTyping(true)
    console.log(convertToRaw(currentState.getCurrentContent()))
  }

  return (
    <div className='flex flex-col items-end rounded-md bg-base-200 p-4'>
      <Editor
        editorState={editorState}
        toolbarClassName='flex sticky top-0 z-50 !justify-center mx-auto'
        editorClassName='bg-base-100 shadow-md rounded-md p-4 mt-4 !h-[500px]'
        onEditorStateChange={onEditorStateChange}
      />
      <div className="flex justify-end items-center w-full mt-4 gap-4">
        <p className='text-sm font-light italic mr-auto opacity-90'>{isTyping && "User is typing..."}</p>
        <button className="btn btn-accent">Save draft</button>
        <button className="btn btn-primary">Publish</button>
      </div>
    </div>
  )
}
export default RichTextEditor
