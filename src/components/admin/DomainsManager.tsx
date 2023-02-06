import { useState, useEffect } from "react"
import { useDebounce } from "use-debounce"
import cn from "classnames"
import { api } from "../../utils/api"

const DomainsManager = () => {
  const [domainAvailable, setDomainAvailable] = useState<boolean | undefined>()
  const [domain, setDomain] = useState<string>("")
  const [debouncedDomain] = useDebounce(domain, 1500)
  const [isChecking, setIsChecking] = useState<boolean>(false)

  const addDomain = api.domain.addDomain.useMutation()
  const { data } = api.domain.checkDomainAvailability.useQuery({ name: `${debouncedDomain}.devtestingxyz.store` })

  useEffect(() => {
    if (data) {
      setDomainAvailable(data.available)
    }
    if (debouncedDomain.length === 0) {
      setDomainAvailable(undefined)
    }
    setIsChecking(false)
  }, [debouncedDomain, data])

  const onDomainTyping = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDomain(e.target.value)
    setIsChecking(true)
  }

  return (
    <div className='flex w-full flex-col gap-10'>
      <h2 className='mx-auto text-2xl font-bold'>Domains Manager</h2>
      <div className='flex flex-col items-start gap-3'>
        <h3 className='text-xl font-semibold'>Add Domain</h3>
        <div className='flex items-center gap-5'>
          <div className='form-control'>
            <label className='label'>
              <span className='label-text'>Check availability and add domain</span>
            </label>
            <div className='input-group'>
              <input
                type='text'
                placeholder='example.com'
                className={cn("input-bordered input", {
                  "border-success": domainAvailable,
                  "border-error": domainAvailable === false,
                  "border-info": isChecking,
                })}
                onChange={onDomainTyping}
              />

              <button className='btn btn-secondary' disabled={!domainAvailable || isChecking} onClick={() => addDomain.mutate({name: debouncedDomain})}>
                Add Domain
              </button>
            </div>
            <label className='label'>
              <span className={cn("label-text-alt", {
                "text-success": domainAvailable,
                "text-error": domainAvailable === false,
                "text-info": isChecking,
              })}>
                {isChecking
                  ? "Checking..."
                  : domainAvailable
                  ? "Domain is available"
                  : domainAvailable === false
                  ? "Domain is not available"
                  : ""}
              </span>
            </label>
          </div>
        </div>
      </div>
    </div>
  )
}
export default DomainsManager
