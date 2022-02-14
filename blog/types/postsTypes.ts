import { getCompiledMDX } from 'utils'
export interface PostType {
  date: string
  title: string
  image: string
  excerpt: string
  isFeatured: boolean
  slug: string
  id: string
  code: string
  content: string
}

export interface PostsType {
  posts: PostType[]
}
