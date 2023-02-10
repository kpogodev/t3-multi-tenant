import Table from "./Table"
import { api } from "../../utils/api"
import { generateRandomKey } from "../../utils/generateRandomKey"

const SiteList = () => {
  const { data: sites } = api.site.getSites.useQuery()

  if (!sites) return <div>Loading...</div>

  return (
    <div>
      <Table
        list={sites}
        headers={["id", "name", "theme_id", "domain_id"]}
        emptyMessage='No sites found'
        renderHeader={(header) => header}
        renderRow={(item) => Object.values(item).map((value) => <td key={generateRandomKey()}>{value}</td>)}
      />
    </div>
  )
}
export default SiteList
