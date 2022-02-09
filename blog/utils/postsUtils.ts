import fs from 'fs'
import path from 'path'
// import matter from 'gray-matter'
import { uuid } from './utils'
import { PostTypes } from 'types'
import { bundleMDX } from 'mdx-bundler'

// needed for bundleMDX
if (process.platform === 'win32') {
  process.env.ESBUILD_BINARY_PATH = path.join(
    process.cwd(),
    'node_modules',
    'esbuild',
    'esbuild.exe'
  )
} else {
  process.env.ESBUILD_BINARY_PATH = path.join(
    process.cwd(),
    'node_modules',
    'esbuild',
    'bin',
    'esbuild'
  )
}

const postDirectory = path.join(process.cwd(), 'posts')

export const getPostData = async (fileName: string): Promise<PostTypes> => {
  const slug = fileName.replace(/\.mdx/, '')
  const source = fs.readFileSync(
    path.join(postDirectory, `${slug}.mdx`),
    'utf-8'
  )
  // data is metadata, content is anything below metadata as template string.
  // const { data, content } = matter(fileContent)
  const { code, frontmatter } = await bundleMDX({ source, cwd: postDirectory })

  const postData: PostTypes = {
    ...(frontmatter as PostTypes),
    slug,
    content: code,
    id: uuid(''),
  }

  // const postData: PostTypes = {
  //   ...(data as PostTypes),
  //   slug,
  //   content,
  //   id: uuid(''),
  // }
  return postData
}

export const getAllFileNames = (): string[] => {
  return fs.readdirSync(postDirectory).map((file) => file.replace(/\.mdx$/, ''))
}

export const getAllPosts = async (): Promise<PostTypes[]> => {
  const files = fs.readdirSync(postDirectory)
  const allPosts: PostTypes[] = await Promise.all(
    files.map(async (file) => await getPostData(file))
  )

  // small to big
  allPosts.sort((objA: PostTypes, objB: PostTypes) => {
    const a = objA.date
    const b = objB.date
    return a < b ? -1 : b < a ? 1 : 0
  })
  return allPosts
}

export const getFeaturedPost = async (): Promise<PostTypes[]> => {
  const allPosts = await getAllPosts()
  const filteredPosts = allPosts.filter((post) => post.isFeatured)
  return filteredPosts
}
