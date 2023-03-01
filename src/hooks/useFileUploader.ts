import { useState, useCallback, ChangeEvent } from "react"

type FileReaderResult = string | ArrayBuffer | null

const useFileUplaoder = ({onSubmit} : {onSubmit: (files: FileReaderResult[]) => void}) => {
  const [files, setFiles] = useState<FileReaderResult[]>([])

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files

    if (files) {
      [...files].forEach((file) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => {
          setFiles((prevState) => [...prevState, reader.result])
        }
      })
    }
  }, [])

  const resetFiles = useCallback(() => {
    setFiles([])
  }, [])

  const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()
    onSubmit(files)
  }

  return { files, handleChange, handleSubmit, resetFiles }
}

export default useFileUplaoder
