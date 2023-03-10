import WarningIcon from "components/icons/WarningIcon"
import AddDomainForm from "./AddDomainForm"
import Heading from "components/common/Heading"

const AddDomain = () => {
  return (
    <div className='flex flex-col items-start gap-3'>
      <Heading text='Add Domain' />
      <AddDomainForm />
      <Heading text='Add Custom Domain' />
      <AddDomainForm isCustomDomain />
      <div className='alert alert-warning my-4 max-w-[80ch] shadow-lg'>
        <div>
          <WarningIcon />
          <span>
            Once you have added custom domain, you will need to configure the DNS records of domain with its registrar.
            To do so, please point domain to the nameservers provided below.
          </span>
        </div>
      </div>
      <div className='mockup-code'>
        <pre data-prefix='>'>
          <code>ns1.vercel-dns.com</code>
        </pre>
        <pre data-prefix='>'>
          <code>ns2.vercel-dns.com</code>
        </pre>
      </div>
    </div>
  )
}
export default AddDomain
