import ContentLayout from '../../components/admin/ContentLayout'
import DomainsManager from '../../components/admin/DomainsManager'
import Header from '../../components/admin/Header'
import Sidebar from '../../components/admin/Sidebar'

const Admin = () => {
  return (
    <div className='grid grid-cols-w-sidebar w-full'>
      <Sidebar />
      <main className="w-full min-h-screen flex flex-col justify-start" data-theme='fantasy'>
        <Header />
        <ContentLayout>
          <DomainsManager />
        </ContentLayout>
      </main>
    </div>
  )
}
export default Admin