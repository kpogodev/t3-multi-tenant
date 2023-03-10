import { useState, useCallback, type ChangeEvent, type FormEvent } from "react"

type FileReaderResult = string | ArrayBuffer | null

type CurrenLoad = {
  load: number
  proportion: number
}

interface IUseFileUploader {
  onSubmit: (files: FileReaderResult[]) => void
  limit: number
  multiple?: boolean
}

const useFileUplaoder = ({ limit, onSubmit, multiple = false }: IUseFileUploader) => {
  const [files, setFiles] = useState<FileReaderResult[] | []>([])
  const [currentLoad, setCurrentLoad] = useState<CurrenLoad>({
    load: 0,
    proportion: 0,
  })

  const processFile = useCallback((file: File) => {
    setCurrentLoad((prevState) => {
      const load = prevState.load + file.size
      return {
        load,
        proportion: load / limit,
      }
    })
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      setFiles((prevState) => [...prevState, reader.result])
    }
  }, [limit])


  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const files = e.currentTarget.files
      if(!files || typeof files[0] === 'undefined') return
      return multiple ? [...files].forEach((file) => processFile(file)) : processFile(files[0])
    },
    [multiple, processFile]
  )

  const resetFiles = useCallback(() => {
    setFiles([])
    setCurrentLoad({
      load: 0,
      proportion: 0,
    })
  }, [])

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onSubmit(files)
  }

  return { files, currentLoad, handleChange, handleSubmit, resetFiles }
}

export default useFileUplaoder
