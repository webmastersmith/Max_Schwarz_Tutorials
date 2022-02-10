import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { uuid, tempPosts } from './utils'
import { PostTypes, MatterType } from 'types'

const postDirectory = path.join(process.cwd(), 'posts')

export const getPostData = (fileName: string): MatterType => {
  const slug = fileName.replace(/\.mdx/, '')
  const source = fs.readFileSync(
    path.join(postDirectory, `${slug}.mdx`),
    'utf-8'
  )

  // data is metadata (frontMatter), content is anything below metadata as template string.
  const { content, data } = matter(source)
  const newData = {
    ...(data as PostTypes),
    slug,
    id: uuid(''),
  }

  // const postData: PostTypes = {
  //   // ...(frontmatter as PostTypes),
  //   date: '12-03-02',
  //   title: 'test title',
  //   image: '',
  //   excerpt: 'test excerpt',
  //   isFeatured: false,
  //   slug,
  //   content: 'test',
  //   id: uuid(''),
  // }

  // const postData: PostTypes = {
  //   ...(data as PostTypes),
  //   slug,
  //   content,
  //   id: uuid(''),
  // }

  return { content, frontMatter: newData }
}

export const getAllFileNames = (): string[] => {
  return fs
    .readdirSync(postDirectory)
    .filter((file) => /\.mdx$/.test(file))
    .map((file) => file.replace(/\.mdx$/, ''))
}

export const getAllPosts = (featured: boolean = false): MatterType[] => {
  // read post directory, filter non-mdx files
  const files = fs
    .readdirSync(postDirectory)
    .filter((fileName) => /\.mdx$/.test(fileName))

  // scrape info from mdx pages
  const matterData: MatterType[] = files.map((file) => getPostData(file))

  let finalMatterData = matterData
  // if true filter for isFeatured.
  if (featured) {
    finalMatterData = matterData.filter(
      (matterObj: MatterType) => matterObj.frontMatter.isFeatured
    )
  }

  // small to big
  finalMatterData.sort((objA: MatterType, objB: MatterType) => {
    const a = objA.frontMatter.date
    const b = objB.frontMatter.date
    return a < b ? -1 : b < a ? 1 : 0
  })
  return finalMatterData
}

// export const getFeaturedPost = async (): Promise<PostTypes[]> => {
//   const allPosts = await getAllPosts()
//   const filteredPosts = allPosts.filter((post) => post.isFeatured)
//   // return filteredPosts
//   return tempPosts()
// }
