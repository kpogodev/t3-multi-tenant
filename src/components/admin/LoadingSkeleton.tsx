const LoadingSkeleton = () => {
  return (
    <div className='w-100 flex flex-col gap-3'>
      <div className='h-12 w-40 animate-pulse rounded-md bg-base-200'>&nbsp;</div>
      <div className='h-12 max-w-xs animate-pulse rounded-md bg-base-200 opacity-95'>&nbsp;</div>
      <div className='h-12 max-w-md animate-pulse rounded-md bg-base-200 opacity-90'>&nbsp;</div>
      <div className='h-12 max-w-xl animate-pulse rounded-md bg-base-200 opacity-80'>&nbsp;</div>
      <div className='h-12 max-w-md animate-pulse rounded-md bg-base-200 opacity-70'>&nbsp;</div>
      <div className='h-12 max-w-xs animate-pulse rounded-md bg-base-200 opacity-60'>&nbsp;</div>
      <div className='h-12 max-w-xl animate-pulse rounded-md bg-base-200 opacity-50'>&nbsp;</div>
      <div className='h-12 max-w-xs animate-pulse rounded-md bg-base-200 opacity-40'>&nbsp;</div>
      <div className='h-12 max-w-xs animate-pulse rounded-md bg-base-200 opacity-30'>&nbsp;</div>
      <div className='h-12 max-w-md animate-pulse rounded-md bg-base-200 opacity-20'>&nbsp;</div>
      <div className='h-12 max-w-xs animate-pulse rounded-md bg-base-200 opacity-10'>&nbsp;</div>
    </div>
  )
}
export default LoadingSkeleton
