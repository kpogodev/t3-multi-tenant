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
  featureType: string
}

interface IComponent {
  tempId: string
  name: string
  featureId: string
  featureType: string
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
      toast.error(err.message)
    },
  })

  //Theme Name Input
  const onThemeNameChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setThemeName(e.target.value)
  }, [])

  //Features Drag and Drop
  const onFeatureDragStart = useCallback(
    ({
      e,
      featureId,
      featureName,
      featureType,
    }: {
      e: React.DragEvent<HTMLDivElement>
      featureId: string
      featureName: string
      featureType: string
    }) => {
      e.dataTransfer.setData("featureName", featureName)
      e.dataTransfer.setData("featureId", featureId)
      e.dataTransfer.setData("featureType", featureType)
      e.dataTransfer.setData("id", generateRandomKey())
      e.dataTransfer.setDragImage(e.currentTarget, 0, 0)
    },
    []
  )

  const onFeatureDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    const newComponent = {
      id: e.dataTransfer.getData("id"),
      name: e.dataTransfer.getData("featureName"),
      featureId: e.dataTransfer.getData("featureId"),
      featureType: e.dataTransfer.getData("featureType"),
    }

    setChosenFeatures((prev) => {
      const prevStateCopy = [...prev]
      prevStateCopy.unshift(newComponent)
      return prevStateCopy
    })
  }, [])

  // Handle Component Name Change
  const onComponentUpdate = ({ name, featureId, featureType, tempId }: IComponent) => {
    const isNew = !components.find((component) => component.tempId === tempId)
    if (isNew) {
      setComponents((prev) => [...prev, { name, featureId, featureType, tempId }])
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
      components: components.map((component) => ({
        // to ignore tempId
        name: component.name,
        featureId: component.featureId,
        featureType: component.featureType,
      })),
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
