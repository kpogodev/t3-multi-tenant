import Table from "./Table"
import Heading from "./Heading"
import { api } from "../../utils/api"
import { generateRandomKey } from "../../utils/generateRandomKey"
import LoadingSkeleton from "./LoadingSkeleton"

const SiteList = () => {
  const { data: sites } = api.site.getSites.useQuery()

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
      />
    </>
  )
}
export default SiteList
