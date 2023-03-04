interface AvailableSpaceProps {
  currentSize: number
  maxSize: number
}

const AvailableSpace = ({ currentSize, maxSize }: AvailableSpaceProps) => {
  const percentage = (currentSize / maxSize) * 100

  return (
    <div className='flex w-full items-center gap-2 border-t-2 border-base-300 pt-4'>
      <span className='whitespace-nowrap text-sm font-bold leading-none'>Available Space:</span>
      <progress className='progress progress-primary flex-grow' value={100 - percentage} max='100'></progress>
      <span className='whitespace-nowrap text-sm font-bold leading-none'>{100 - +percentage.toFixed(2)}%</span>
    </div>
  )
}
export default AvailableSpace
