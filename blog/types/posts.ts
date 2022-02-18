export interface Post {
  date: string
  title: string
  image: string
  excerpt: string
  isFeatured: boolean
  slug: string
  id: string
  compiledSource: string
  content?: string
}

export interface PostType {
  post: Post
}

export interface PostsType {
  posts: Post[]
}

export interface MsgType {
  title: string
  msg: string | unknown
  status: 'pending' | 'error' | 'success' | null
}
