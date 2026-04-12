export type Job = {
  title: string
  company: string
  companyId: string
  url: string
  location?: string
  description: string
  createdAt: string
  logoUrl?: string
  company_data: Company
}

export type Company = {
  id: string
  title: string
  logoUrl?: string
}

export type ApiResponse = {
  data: Job[]
  meta: {
    currentPage?: number
    totalPages?: number
    totalItems?: number
  }
}

export type SearchOptions = {
  title?: string
  company?: string
  location?: string
}
