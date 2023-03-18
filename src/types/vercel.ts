export interface VercelAddDomainResponse {
  name: string
  apexName: string
  projectId: string
  redirect?: string | null
  redirectStatusCode?: (307 | 301 | 302 | 308) | null
  gitBranch?: string | null
  updatedAt?: number
  createdAt?: number
  verified: boolean
  verification?: {
    type: string
    domain: string
    value: string
    reason: string
  }[]
}

export interface VercelDeleteDomainResponse {
  [key: string]: unknown
}