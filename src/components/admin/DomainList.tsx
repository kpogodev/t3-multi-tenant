import { api } from "../../utils/api"
import Heading from "./Heading"
import { generateRandomKey } from "../../utils/generateRandomKey"
import Table from "./Table"
import DeleteIcon from "../icons/DeleteIcon"
import EditIcon from "../icons/EditIcon"
import { toast } from "react-toastify"
import LoadingSkeleton from "./LoadingSkeleton"

const DomainList = () => {
  const { data: domains } = api.domain.getDomains.useQuery()
  const { mutate: deleteDomain } = api.domain.deleteDomain.useMutation()

  const clinet = api.useContext()

  const handleDeleteDomain = (e: React.MouseEvent<HTMLButtonElement>) => {
    const id = e.currentTarget.value
    deleteDomain(id, {
      onSuccess: (data) => {
        void clinet.domain.getDomains.invalidate()
        toast.success(`${data.name} deleted successfully`)
      },
    })
  }

  if (!domains) return <LoadingSkeleton />

  return (
    <>
      <Heading text='Domain List' />
      <div className='w-full overflow-x-auto'>
        <Table
          list={domains}
          headers={["id", "name", "apexName", "verified"]}
          emptyMessage='No domains found'
          renderHeader={(header) => header}
          renderRow={(item) =>
            Object.values(item).map(
              (value) =>
                value && (
                  <td key={generateRandomKey()}>
                    {typeof value === "boolean" ? (value === true ? "Yes" : "No") : value}
                  </td>
                )
            )
          }
          renderActionBar={(item) => (
            <td className='flex items-center justify-center gap-1'>
              <button className='btn-ghost btn'>
                <EditIcon className='h-4 w-4' />
              </button>
              <button className='btn-ghost btn' value={item.id} onClick={handleDeleteDomain}>
                <DeleteIcon className='h-4 w-4' />
              </button>
            </td>
          )}
        />
      </div>
    </>
  )
}
export default DomainList
