import fs from 'fs'
import path from 'path'
import { bundleMDX } from 'mdx-bundler'
import { uuid } from './utils'
import { PostType } from 'types'
import { BundleMDX } from 'mdx-bundler/dist/types'

const ROOT = process.cwd()
const POSTS_PATH = path.join(ROOT, 'posts')

export const getAllPostsFileNames = () => {
  return fs.readdirSync(POSTS_PATH)
}

export const getFileContent = (filename: string) => {
  return fs.readFileSync(path.join(POSTS_PATH, filename), 'utf8')
}

// returns compiled mdx: { code, frontmatter, matter }
export const getCompiledMDX = async (fileName: string): Promise<PostType> => {
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
  // const content = fs.readFileSync(path.join(POSTS_PATH, fileName), 'utf8')

  // Add your remark and rehype plugins here
  const remarkPlugins: any = []
  const rehypePlugins: any = []
  try {
    const post = await bundleMDX({
      file: path.join(POSTS_PATH, fileName),
      cwd: POSTS_PATH,
      xdmOptions(options: any) {
        options.remarkPlugins = [
          ...(options.remarkPlugins ?? []),
          ...remarkPlugins,
        ]
        options.rehypePlugins = [
          ...(options.rehypePlugins ?? []),
          ...rehypePlugins,
        ]
        return options
      },
    })
    return {
      ...(post.frontmatter as PostType),
      id: uuid(''),
      slug: fileName.replace(/\.mdx$/, ''),
      code: post.code,
      content: post.matter.content,
    }
  } catch (error: any) {
    throw new Error(error)
  }
}

export const getAllMdxPosts = async (): Promise<PostType[]> => {
  const files = getAllPostsFileNames()
  return await Promise.all(files.map((file) => getCompiledMDX(file)))
}
export const getFeaturedMdxPosts = async (): Promise<PostType[]> => {
  const files = getAllPostsFileNames()
  const posts = []
  for (const file of files) {
    const post = await getCompiledMDX(file)
    if (post.isFeatured) posts.push(post)
  }
  return posts
}
