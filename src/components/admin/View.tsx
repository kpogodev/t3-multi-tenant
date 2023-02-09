import { useContext } from "react"
import { AdminContext } from "./context/AdminContext"
import DomainList from "./DomainList"
import AddDomain from "./AddDomain"

type ViewType = { [key: string]: JSX.Element }

const View = () => {
  const ctx = useContext(AdminContext)

  const view: ViewType = {
    default: <></>,
    "add-domain": <AddDomain />,
    "domain-list": <DomainList />,
  }

  return (
    <main className="w-full p-10 flex flex-col gap-10">
      {view[ctx.currentView]}
    </main>
  )
}
export default View