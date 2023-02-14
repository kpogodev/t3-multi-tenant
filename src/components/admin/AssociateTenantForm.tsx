import { useState } from "react"
import { toast } from "react-toastify"
import Select, { type SingleValue } from "react-select"
import { reactSelectStyles } from "../../utils/reactSelectStyles"
import { api } from "../../utils/api"

const AssociateTenantForm = () => {
  const [siteId, setSiteId] = useState<string>("")
  const [tenantId, setTenantId] = useState<string>("")
  const { data: potentialTenants } = api.user.getPotentialTenants.useQuery()
  const { data: unassociatedSites } = api.site.getUnassociatedSites.useQuery()
  const { mutate: associateTenant } = api.site.addTenant.useMutation()

  const handleSiteChange = (option: SingleValue<{ label: string; value: string }>) => {
    if (!option) return
    setSiteId(option.value)
  }

  const handleTenantChange = (option: SingleValue<{ label: string; value: string }>) => {
    if (!option) return
    setTenantId(option.value)
  }

  const onAssociateTenant = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!siteId.length) {
      return toast.error("Please select a site")
    }

    if (!tenantId.length) {
      return toast.error("Please select a tenant")
    }

    associateTenant(
      {
        siteId: siteId,
        userId: tenantId,
      },
      {
        onSuccess: () => {
          toast.success("Site associated successfully")
        },
        onError: () => {
          toast.error("Error associating site")
        },
      }
    )
  }

  return (
    <form className='flex max-w-xs flex-col gap-3' onSubmit={onAssociateTenant}>
      <div className='form-control w-full max-w-xs'>
        <label className='label'>
          <span className='label-text'>Choose Site</span>
        </label>
        <Select
          styles={reactSelectStyles}
          options={unassociatedSites?.map((site) => ({ label: site.name, value: site.id }))}
          onChange={(selected) => void handleSiteChange(selected)}
        />
      </div>
      <div className='form-control w-full max-w-xs'>
        <label className='label'>
          <span className='label-text'>Choose User</span>
        </label>
        <Select
          styles={reactSelectStyles}
          options={potentialTenants?.map((tenant) => ({ label: tenant.name ?? tenant.id, value: tenant.id }))}
          onChange={(selected) => void handleTenantChange(selected)}
        ></Select>
      </div>
      <button className='btn-primary btn mt-10' type='submit'>
        Associate Tenant
      </button>
    </form>
  )
}
export default AssociateTenantForm
