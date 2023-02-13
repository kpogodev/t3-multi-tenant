import Table from "./Table"
import Heading from "./Heading"
import { api } from "../../utils/api"
import { generateRandomKey } from "../../utils/generateRandomKey"
import LoadingSkeleton from "./LoadingSkeleton"
import DeleteIcon from "../icons/DeleteIcon"
import EditIcon from "../icons/EditIcon"
import { toast } from "react-toastify"

const SiteList = () => {
  const { data: sites } = api.site.getSites.useQuery()
  const { mutate: deleteSite } = api.site.deleteSite.useMutation()

  const clinet = api.useContext()

  const handleDeleteSite = (e: React.MouseEvent<HTMLButtonElement>) => {
    const id = e.currentTarget.value
    deleteSite(id, {
      onSuccess: (data) => {
        void clinet.site.getSites.invalidate()
        toast.success(`${data.name} deleted successfully`)
      },
    })
  }

  if (!sites) return <LoadingSkeleton />

  return (
    <>
      <Heading text='Site List' />
      <Table
        list={sites}
        headers={["id", "name", "theme_id", "domain_id"]}
        emptyMessage='No sites found'
        renderHeader={(header) => header}
        renderRow={(item) => Object.values(item).map((value) => <td key={generateRandomKey()}>{value}</td>)}
        renderActionBar={(item) => (
          <td className='flex items-center justify-center gap-1'>
            <button className='btn-ghost btn'>
              <EditIcon className='h-4 w-4' />
            </button>
            <button className='btn-ghost btn' value={item.id} onClick={handleDeleteSite}>
              <DeleteIcon className='h-4 w-4' />
            </button>
          </td>
        )}
      />
    </>
  )
}
export default SiteList
