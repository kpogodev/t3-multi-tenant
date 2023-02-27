import FolderIcon from "components/icons/FolderIcon"
import WarningIcon from "components/icons/WarningIcon"

const WarningBlock = () => {
  return (
    <div className='alert alert-warning max-w-xl shadow-lg'>
      <div className='flex flex-wrap'>
        <WarningIcon className='h-3 w-3' />
        <p>
          Rememeber that theme name <b>must exactly match</b> its directory name.
        </p>
        <div className='breadcrumbs text-sm'>
          <ul>
            <li>
              <FolderIcon />
              src
            </li>
            <li>
              <FolderIcon />
              pages
            </li>
            <li>
              <FolderIcon />
              site
            </li>
            <li>
              <FolderIcon className='mr-2 h-4 w-4 fill-current stroke-current' />
              your-theme-name
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
export default WarningBlock
