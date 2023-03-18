import { useState, useEffect } from "react"
import { useDebounce } from "use-debounce"
import cn from "classnames"
import { api } from "utils/api"
import { toast } from "react-toastify"
import { slugifyString } from "utils/slugifyString"
import { type } from "os"

const AddDomainForm = ({ isCustomDomain }: { isCustomDomain?: boolean }) => {
  const [domainAvailable, setDomainAvailable] = useState<boolean | undefined>()
  const [domain, setDomain] = useState<string>("")
  const [debouncedDomain] = useDebounce(domain, 1500)
  const [isChecking, setIsChecking] = useState<boolean>(false)

  api.admin.domain.checkDomainAvailability.useQuery(
    { name: isCustomDomain ? debouncedDomain : `${debouncedDomain}.kpwebdev.com` },
    {
      enabled: debouncedDomain.length > 0,
      onSuccess: (data) => {
        setDomainAvailable(data.available)
      },
    }
  )

  const { mutate: addDomain } = api.admin.domain.addDomain.useMutation({
    onSuccess: (data) => {
      setDomain("")
      setDomainAvailable(undefined)
      toast.success(`${data.name} has been successfully added`)
    },
    onError: (error) => {
      if (error.data?.zodErrorMessages) {
        toast.error(`Validation Errors: ${error.data.zodErrorMessages}`)
      } else {
        toast.error(error.data?.code || "Something went wrong")
      }
    },
  })

  useEffect(() => {
    if (debouncedDomain.length === 0) {
      setDomainAvailable(undefined)
    }
    setIsChecking(false)
  }, [debouncedDomain])

  const onDomainTyping = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDomain(e.target.value)
    setIsChecking(true)
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!domainAvailable) return toast.error("Domain is not available")

    console.log(debouncedDomain)

    isCustomDomain && typeof isCustomDomain !== "undefined"
      ? addDomain({ name: debouncedDomain.trim(), isCustom: true })
      : addDomain({ name: slugifyString(debouncedDomain.trim()), isCustom: false })
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
          {!isCustomDomain && <span className='bg-accent'>.kpwebdev.com</span>}
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
