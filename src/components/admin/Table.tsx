import { generateRandomKey } from "../../utils/generateRandomKey"

export default function table<T1, T2>({
  headers,
  list,
  emptyMessage,
  renderActionBar,
  renderHeader,
  renderRow,
}: {
  headers: T1[]
  list: T2[]
  emptyMessage: string
  renderHeader: (header: T1) => React.ReactNode
  renderRow: (item: T2) => React.ReactNode
  renderActionBar?: (item: T2) => React.ReactNode
}) {
  return (
    <table className='table w-full'>
      <thead>
        <tr>
          <th></th>
          {headers.map((header) => (
            <th key={generateRandomKey()}>{renderHeader(header)}</th>
          ))}
          {renderActionBar && <th className='text-center'>Actions</th>}
        </tr>
      </thead>
      <tbody>
        {list?.length ? (
          list.map((item, index) => (
            <tr key={generateRandomKey()}>
              <th>{index + 1}</th>
              {renderRow(item)}
              {renderActionBar && renderActionBar(item)}
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={list?.length}>{emptyMessage}</td>
          </tr>
        )}
      </tbody>
    </table>
  )
}
