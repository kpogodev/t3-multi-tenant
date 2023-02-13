import Table from "./Table"
import Heading from "./Heading"
import { api } from "../../utils/api"
import { generateRandomKey } from "../../utils/generateRandomKey"
import LoadingSkeleton from "./LoadingSkeleton"

const ThemeList = () => {
  const { data: themes } = api.theme.getThemes.useQuery()

  if (!themes) return <LoadingSkeleton />

  return (
    <>
      <Heading text='Theme List' />
      <Table
        list={themes}
        headers={["id", "name"]}
        emptyMessage='No themes found'
        renderHeader={(header) => header}
        renderRow={(item) => Object.values(item).map((value) => <td key={generateRandomKey()}>{value}</td>)}
      />
    </>
  )
}
export default ThemeList
