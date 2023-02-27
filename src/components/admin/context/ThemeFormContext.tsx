import { createContext, useState, useCallback } from "react"
import { generateRandomKey } from "utils/generateRandomKey"
import { api } from "utils/api"
import { toast } from "react-toastify"

type UseThemeFormStateManagerResult = ReturnType<typeof useThemeFormStateManager>

export const ThemeFormContext = createContext<UseThemeFormStateManagerResult>({} as UseThemeFormStateManagerResult)

interface IChosenFeature {
  id: string
  name: string
  featureId: string
}

interface IComponent {
  name: string
  featureId: string
}

const useThemeFormStateManager = () => {
  const [themeName, setThemeName] = useState<string>("")
  const [chosenFeatures, setChosenFeatures] = useState<IChosenFeature[]>([])
  const [components, setComponents] = useState<IComponent[]>([])

  const { mutate: createTheme } = api.admin.theme.addTheme.useMutation({
    onSuccess: () => {
      toast.success("Theme created successfully")
      resetStates()
    },
    onError: (err) => {
      console.log(err)
      toast.error(err.message)
    },
  })

  //Theme Name Input
  const onThemeNameChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setThemeName(e.target.value)
  }, [])

  //Features Drag and Drop
  const onFeatureDragStart = useCallback((e: React.DragEvent<HTMLDivElement>, featureId: string, name: string) => {
    e.dataTransfer.setData("featureName", name)
    e.dataTransfer.setData("featureId", featureId)
    e.dataTransfer.setData("id", generateRandomKey())
    e.dataTransfer.setDragImage(e.currentTarget, 0, 0)
  }, [])

  const onFeatureDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    const newComponent = {
      id: e.dataTransfer.getData("id"),
      name: e.dataTransfer.getData("featureName"),
      featureId: e.dataTransfer.getData("featureId"),
    }

    setChosenFeatures((prev) => {
      const prevStateCopy = [...prev]
      prevStateCopy.unshift(newComponent)
      return prevStateCopy
    })
  }, [])

  // Handle Component Name Change
  const onComponentUpdate = (name: string, featureId: string) => {
    const isNew = !components.find((component) => component.featureId === featureId)
    if (isNew) {
      setComponents((prev) => [...prev, { name, featureId }])
    } else {
      setComponents((prev) =>
        prev.map((component) => (component.featureId === featureId ? { ...component, name } : component))
      )
    }
  }

  // Handle Submit
  const onThemeSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    createTheme({
      name: themeName,
      components,
    })
  }
  // Helpers
  const deleteChosenFeature = useCallback((id: string, featureId: string) => {
    setComponents((prev) => prev.filter((component) => component.featureId !== featureId))
    setChosenFeatures((prev) => prev.filter((component) => component.id !== id))
  }, [])

  const clearChosenFeatures = useCallback(() => {
    setComponents([])
    setChosenFeatures([])
  }, [])

  const resetStates = useCallback(() => {
    setThemeName("")
    setComponents([])
    setChosenFeatures([])
  }, [])

  return {
    components,
    themeName,
    chosenFeatures,
    onThemeNameChange,
    onFeatureDragStart,
    onFeatureDrop,
    onComponentUpdate,
    clearChosenFeatures,
    deleteChosenFeature,
    resetStates,
    onThemeSubmit,
  }
}

export default function ThemeFormContextProvider({ children }: { children: React.ReactNode }) {
  return <ThemeFormContext.Provider value={useThemeFormStateManager()}>{children}</ThemeFormContext.Provider>
}
