import DragAndDropIcon from "components/icons/DragAndDropIcon"
import { useContext } from "react"
import { ThemeFormContext } from "../context/ThemeFormContext"
import ChosenFeature from "./ChosenFeature"

const ChosenFeatureList = () => {
  const ctx = useContext(ThemeFormContext)
  return (
    <div className='flex w-full max-w-xl flex-col gap-2'>
      <p>
        Drag all editable features used in your theme.
        <br />
        <b className='italic'>
          You must provide name and confirm by clicking on &apos;tick&apos; button. Morover names should be unique in
          order to easily distinguish similar features in CMS.
        </b>
      </p>
      <div
        className='relative z-0 flex max-h-[500px] min-h-[300px] w-full flex-col items-stretch gap-3 overflow-auto rounded-md border-2 border-dashed p-4'
        onDrop={(e) => ctx.onFeatureDrop(e)}
        onDragOver={(e) => e.preventDefault()}
      >
        {ctx.chosenFeatures.map((feature) => (
          <ChosenFeature
            key={feature.id}
            id={feature.id}
            badge={feature.name}
            featureId={feature.featureId}
            featureType={feature.featureType}
          />
        ))}
        <DragAndDropIcon className='absolute top-1/2 left-1/2 -z-10 h-40 w-40 -translate-x-1/2 -translate-y-1/2 opacity-10' />
      </div>
    </div>
  )
}
export default ChosenFeatureList
