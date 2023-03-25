const NavigationInstructions = () => {
  return (
    <div className='alert alert-info w-fit shadow-lg'>
      <div>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          className='h-6 w-6 flex-shrink-0 stroke-current mb-auto'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
          ></path>
        </svg>
        <div className='flex max-w-[80ch] flex-col gap-2'>
          <p className='text-lg font-extrabold'>What can I edit?</p>
          <ol className='list-inside list-decimal'>
            <li className='py-1 font-medium'>
              <b>Change Page Order</b> - You can easily re-order your pages by simply dragging them into desired place,
              all changes will be saved automatically.
            </li>
            <li className='py-1 font-medium'>
              <b>Change Subpage Order</b> - You can easily re-order your subpages by firstly expanding the page you want
              to edit, then dragging the subpages into desired place, all changes will be saved automatically.
            </li>
            <li className='py-1 font-medium'>
              <b>Move subpage to different page</b> - You can easily move your subpages by firstly expanding both pages
              you want to move the subpage from and to, then dragging the subpage into desired place, all changes will
              be saved automatically.
            </li>
          </ol>
        </div>
      </div>
    </div>
  )
}
export default NavigationInstructions
