import { useState, useCallback, type ChangeEvent } from "react"

type FileReaderResult = string | ArrayBuffer | null

interface CurrenLoad {
  load: number
  proportion: number
}

const useFileUplaoder = ({onSubmit} : {onSubmit: (files: FileReaderResult[]) => void}) => {
  const [files, setFiles] = useState<FileReaderResult[]>([])
  const [currentLoad, setCurrentLoad] = useState<CurrenLoad>({
    load: 0,
    proportion: 0,
  })

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files

    if (files) {
      [...files].forEach((file) => {
        setCurrentLoad((prevState) => {
          const load = prevState.load + (file.size / 1000)
          return {
            load,
            proportion: load / 10000,
          }
        })
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

  return { files,currentLoad, handleChange, handleSubmit, resetFiles }
}

export default useFileUplaoder
