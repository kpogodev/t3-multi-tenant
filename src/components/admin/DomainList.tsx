import { api } from "../../utils/api"
import Heading from "./Heading"
import { generateRandomKey } from "../../utils/generateRandomKey"
import Table from "./Table"

const DomainList = () => {
  const { data: domains } = api.domain.getDomains.useQuery()

  if (!domains) return <div>Loading...</div>

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
            Object.values(item).map((value) => (
              <td key={generateRandomKey()}>{typeof value === "boolean" ? (value === true ? "Yes" : "No") : value}</td>
            ))
          }
        />
      </div>
    </>
  )
}
export default DomainList
