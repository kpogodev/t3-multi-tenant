import { api } from "../../utils/api"

const DomainsList = () => {
  const { data: domains } = api.domain.getDomains.useQuery()
  return (
    <div className='w-full overflow-x-auto'>
      <table className='table w-full'>
        <thead>
          <tr>
            <th></th>
            <th>ID</th>
            <th>Name</th>
            <th>Apex Name</th>
            <th>Verified</th>
          </tr>
        </thead>
        <tbody>
          {domains?.length ? domains.map((domain, index)=> (
          <tr key={domain.id}>
            <th>{index + 1}</th>
            <td>{domain.id}</td>
            <td>{domain.name}</td>
            <td>{domain.apexName}</td>
            <td>{domain.verified ? "Yes" : "No"}</td>
          </tr>
          )) : (
            <tr>
              <td colSpan={5}>No domains found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
export default DomainsList
