import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { uuid } from './utils'
import { PostTypes } from 'types'

const postDirectory = path.join(process.cwd(), 'posts')

export const getPostData = (fileName: string): PostTypes => {
  const fileContent = fs.readFileSync(
    path.join(postDirectory, fileName),
    'utf-8'
  )
  // data is metadata, content is anything below metadata as template string.
  const { data, content } = matter(fileContent)

  const slug = fileName.replace(/\.md/, '')
  const postData: PostTypes = {
    ...(data as PostTypes),
    slug,
    content,
    id: uuid(''),
  }
  return postData
}

export const getAllFileNames = (): string[] => {
  return fs.readdirSync(postDirectory)
  // .map((file) => file.replace(/(\.md|\.mdx)$/, ''))
}

export const getAllPosts = (): PostTypes[] => {
  const files = fs.readdirSync(postDirectory)
  const allPosts: PostTypes[] = files.map((file) => getPostData(file))

  // small to big
  allPosts.sort((objA: PostTypes, objB: PostTypes) => {
    const a = objA.date
    const b = objB.date
    return a < b ? -1 : b < a ? 1 : 0
  })
  return allPosts
}

export const getFeaturedPost = (): PostTypes[] => {
  const allPosts = getAllPosts()
  const filteredPosts = allPosts.filter((post) => post.isFeatured)
  return filteredPosts
}
