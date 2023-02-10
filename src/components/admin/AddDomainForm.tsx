import { useState, useEffect } from "react"
import { useDebounce } from "use-debounce"
import cn from "classnames"
import { api } from "../../utils/api"
import { toast } from "react-toastify"

const AddDomainForm = ({ isCustomDomain }: { isCustomDomain?: boolean }) => {
  const [domainAvailable, setDomainAvailable] = useState<boolean | undefined>()
  const [domain, setDomain] = useState<string>("")
  const [debouncedDomain] = useDebounce(domain, 1500)
  const [isChecking, setIsChecking] = useState<boolean>(false)

  const addDomain = api.domain.addDomain.useMutation()
  const { data } = api.domain.checkDomainAvailability.useQuery(
    { name: isCustomDomain ? debouncedDomain : `${debouncedDomain}.devtestingxyz.store` },
    { enabled: debouncedDomain.length > 0 }
  )

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

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (domainAvailable) {
      addDomain.mutate(
        { name: debouncedDomain, isCustom: isCustomDomain ? isCustomDomain : false },
        {
          onSuccess: () => {
            setDomain("")
            setDomainAvailable(undefined)
            toast.success("Domain has been successfully added")
          },
          onError: (error) => {
            if (error.data) {
              toast.error(`Error: ${error.data.code}`)
            }
          },
        }
      )
    }
  }

  return (
    <div className='flex items-center gap-5'>
      <form className='form-control' onSubmit={onSubmit}>
        <label className='label'>
          <span className='label-text'>Check availability and add domain</span>
        </label>
        <div className='input-group'>
          <input
            type='text'
            placeholder={isCustomDomain ? "neatflex.com" : "i-like-pancakes"}
            className={cn("input-bordered input", {
              "border-success": domainAvailable,
              "border-error": domainAvailable === false,
              "border-info": isChecking,
            })}
            value={domain}
            onChange={onDomainTyping}
          />
          {!isCustomDomain && <span className='bg-accent'>.devtestingxyz.store</span>}
          <button type='submit' className='btn-secondary btn' disabled={!domainAvailable || isChecking}>
            Add Domain
          </button>
        </div>
        <label className='label'>
          <span
            className={cn("label-text-alt", {
              "text-success": domainAvailable,
              "text-error": domainAvailable === false,
              "text-info": isChecking,
            })}
          >
            {isChecking
              ? "Checking..."
              : domainAvailable
              ? "Domain is available"
              : domainAvailable === false
              ? "Domain is not available"
              : ""}
          </span>
        </label>
      </form>
    </div>
  )
}
export default AddDomainForm
