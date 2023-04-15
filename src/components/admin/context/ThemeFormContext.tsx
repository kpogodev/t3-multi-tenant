import { createContext, useState, useCallback } from "react"
import { generateRandomKey } from "utils/generateRandomKey"
import { api } from "utils/api"
import { toast } from "react-toastify"
import type { FeatureType } from "@prisma/client"

type UseThemeFormStateManagerResult = ReturnType<typeof useThemeFormStateManager>

export const ThemeFormContext = createContext<UseThemeFormStateManagerResult>({} as UseThemeFormStateManagerResult)

interface IChosenFeature {
  id: string
  name: string
  type: FeatureType
}

const useThemeFormStateManager = () => {
  const [themeName, setThemeName] = useState<string>("")
  const [chosenFeatures, setChosenFeatures] = useState<IChosenFeature[]>([])

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
  const onFeatureDragStart = useCallback(({ e, type }: { e: React.DragEvent<HTMLDivElement>; type: FeatureType }) => {
    e.dataTransfer.setData("type", type)
    e.dataTransfer.setData("id", generateRandomKey())
    e.dataTransfer.setDragImage(e.currentTarget, 0, 0)
  }, [])

  const onFeatureDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    const newFeature = {
      id: generateRandomKey(),
      type: e.dataTransfer.getData("type") as FeatureType,
      name: "",
    }

    setChosenFeatures((prev) => {
      const prevStateCopy = [...prev]
      prevStateCopy.unshift(newFeature)
      return prevStateCopy
    })
  }, [])

  // Handle Feature Name Change
  const onFeatureUpdate = ({ id, name, type }: IChosenFeature) => {
    setChosenFeatures((prev) => {
      const prevStateCopy = [...prev]
      const featureIndex = prevStateCopy.findIndex((feature) => feature.id === id)
      prevStateCopy[featureIndex] = { id, name, type }
      return prevStateCopy
    })
  }

  // Handle Submit
  const onThemeSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const hasUnnamedFeatures = chosenFeatures.some((feature) => !feature.name || feature.name.trim() === "")

    if (hasUnnamedFeatures) {
      toast.error("All features must have a name")
      return
    }

    createTheme({
      name: themeName,
      features: chosenFeatures.map(({ ...rest }) => rest),
    })
  }

  // Helpers
  const deleteChosenFeature = useCallback((id: string) => {
    setChosenFeatures((prev) => prev.filter((feature) => feature.id !== id))
  }, [])

  const clearChosenFeatures = useCallback(() => {
    setChosenFeatures([])
  }, [])

  const resetStates = useCallback(() => {
    setThemeName("")
    setChosenFeatures([])
  }, [])

  return {
    themeName,
    chosenFeatures,
    onThemeNameChange,
    onFeatureDragStart,
    onFeatureDrop,
    onFeatureUpdate,
    clearChosenFeatures,
    deleteChosenFeature,
    resetStates,
    onThemeSubmit,
  }
}

export default function ThemeFormContextProvider({ children }: { children: React.ReactNode }) {
  return <ThemeFormContext.Provider value={useThemeFormStateManager()}>{children}</ThemeFormContext.Provider>
}
