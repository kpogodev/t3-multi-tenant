import Table from "./Table"
import Heading from "components/common/Heading"
import { api } from "utils/api"
import { generateRandomKey } from "utils/generateRandomKey"
import LoadingSkeleton from "./LoadingSkeleton"
import DeleteIcon from "components/icons/DeleteIcon"
import EditIcon from "components/icons/EditIcon"
import { toast } from "react-toastify"

const ThemeList = () => {
  const { data: themes } = api.admin.theme.getThemes.useQuery()
  const { mutate: deleteTheme } = api.admin.theme.deleteTheme.useMutation()

  const clinet = api.useContext()

  const handleDeleteTheme = (e: React.MouseEvent<HTMLButtonElement>) => {
    const id = e.currentTarget.value
    deleteTheme(id, {
      onSuccess: (data) => {
        void clinet.admin.theme.getThemes.invalidate()
        toast.success(`${data.name} deleted successfully`)
      },
    })
  }

  if (!themes) return <LoadingSkeleton />

  return (
    <>
      <Heading text='Theme List' />
      <Table
        list={themes}
        headers={["id", "name"]}
        emptyMessage='No themes found'
        renderHeader={(header) => header}
        renderRow={(item) => Object.values(item).map((value) => value && <td key={generateRandomKey()}>{value}</td>)}
        renderActionBar={(item) => (
          <td className='flex items-center justify-center gap-1'>
            <button className='btn-ghost btn'>
              <EditIcon className='h-4 w-4' />
            </button>
            <button className='btn-ghost btn' value={item.id} onClick={handleDeleteTheme}>
              <DeleteIcon className='h-4 w-4' />
            </button>
          </td>
        )}
      />
    </>
  )
}
export default ThemeList
