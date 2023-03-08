import dynamic from "next/dynamic"
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"
import type { EditorState } from "draft-js"
import { api } from "utils/api"

interface RichTextEditorProps {
  editorState: EditorState
  onEditorStateChange: (editorState: EditorState) => void
}

const Editor = dynamic(() => import("react-draft-wysiwyg").then((mod) => mod.Editor), {
  ssr: false,
  loading: () => <div className='min-h-[500px] w-full animate-pulse bg-base-200'></div>,
})

const RichTextEditor = ({ editorState, onEditorStateChange }: RichTextEditorProps) => {
  const { mutateAsync: uploadImage } = api.cms.pageContent.uploadRichTextImage.useMutation()

  const uploadImageCallBack = async (file: File) => {
    const reader = new FileReader()
    const data = await new Promise<string>((resolve) => {
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result as string)
    })

    const imgLink = await uploadImage({ imgData: data })

    if(imgLink instanceof Error) return

    return { data: { link: imgLink.link } }
  }

  return (
    <Editor
      editorState={editorState}
      toolbarClassName='flex sticky top-0 z-50 !justify-center mx-auto'
      editorClassName='bg-base-100 shadow-md rounded-md p-4 mt-4 !h-[500px] prose max-w-full'
      onEditorStateChange={onEditorStateChange}
      toolbar={{
        options: [
          "inline",
          "blockType",
          "list",
          "textAlign",
          "colorPicker",
          "link",
          "embedded",
          "emoji",
          "image",
          "remove",
          "history",
        ],
        blockType: {
          options: ["Normal", "H2", "H3", "H4", "H5", "H6", "Blockquote", "Code"],
        },
        image: {
          urlEnabled: true,
          uploadEnabled: true,
          uploadCallback: uploadImageCallBack,
          previewImage: true,
          inputAccept: "image/gif,image/jpeg,image/jpg,image/png,image/svg",
          alt: { present: true, mandatory: false },
          defaultSize: {
            height: "auto",
            width: "auto",
          },
        },
      }}
    />
  )
}
export default RichTextEditor
