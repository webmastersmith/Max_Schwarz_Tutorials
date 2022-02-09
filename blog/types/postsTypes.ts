import { MDXRemoteSerializeResult } from 'next-mdx-remote'

export interface PostTypes {
  date: string
  title: string
  image: string
  excerpt: string
  slug: string
  id: string
  isFeatured?: boolean
  content?: MDXRemoteSerializeResult<Record<string, unknown>>
}

export interface MatterType {
  content: string
  frontMatter: PostTypes
}

export interface MdxPropType {
  mdxSource: MDXRemoteSerializeResult<PostTypes>
}

export interface MdxType {
  compiledSource: string
  scope: PostTypes
}
