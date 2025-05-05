import { Robots } from "next/dist/lib/metadata/types/metadata-types"

export const SEO: {
  title: string,
  description: string,
  url: string,
  type: 'website' | 'article' | 'book' | 'profile',
  robots: string | null | Robots

} = {
  title: 'TT Job Board',
  description: 'Trinidad and Tobago Job Board',
  url: 'https://ttjobboard.netlify.app/',
  type: 'website',
  robots: 'index, follow',
}

