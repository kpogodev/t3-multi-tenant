import { useState, useCallback } from "react"

type FileReaderResult = string | ArrayBuffer | null

const useFileUplaoder = ({onSubmit} : {onSubmit: () => void}) => {
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

  const handleSubmit = () => {
    onSubmit()
    setFiles([])
  }

  return { files, handleChange, handleSubmit }
}

export default useFileUplaoder
