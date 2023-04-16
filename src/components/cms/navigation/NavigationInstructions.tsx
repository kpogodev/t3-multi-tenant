const NavigationInstructions = () => {
  return (
    <div className='alert alert-info w-fit shadow-lg'>
      <div>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          className='mb-auto h-6 w-6 flex-shrink-0 stroke-current'
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
            <li className='py-1'>
              <b>Change Page Order</b> - You can easily re-order your pages by simply dragging them into desired place,
              all changes will be saved automatically.
            </li>
            <li className='py-1'>
              <b>Change Subpage Order</b> - You can easily re-order your subpages by firstly expanding the page you want
              to edit, then dragging the subpages into desired place, all changes will be saved automatically.
            </li>
            <li className='py-1'>
              <b>Move subpage to different page</b> - You can easily move your subpages by firstly expanding both pages
              you want to move the subpage from and to, then dragging the subpage into desired place, all changes will
              be saved automatically.
            </li>
            <li className='py-1'>
              <b>Transform page into a subpage</b> - You can easily transform your pages into subpages by dragging &
              dropping them over desired page, all changes will be saved automatically.
              <span className='alert alert-warning mt-2 block text-sm'>
                <b>Keep in mind !!!</b> You will not be able to transform page which has its own subpages, you must
                firstly move them elsewhere, or delete them.
              </span>
            </li>
            <li className='py-1'>
              <b>Transform subpage into a page</b> - You can easily transform your subpages into pages by dragging &
              dropping them into a drop box located at the bottom of the list, all changes will be saved automatically.
            </li>
          </ol>
        </div>
      </div>
    </div>
  )
}
export default NavigationInstructions
