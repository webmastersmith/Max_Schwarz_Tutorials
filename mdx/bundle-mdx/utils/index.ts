import fs from 'fs'
import path from 'path'
import { bundleMDX } from 'mdx-bundler'
import imageSize from 'rehype-img-size'

const ROOT = process.cwd()
const POSTS_PATH = path.join(ROOT, 'posts')

export const getFileContent = (filename: string) => {
  return fs.readFileSync(path.join(POSTS_PATH, filename), 'utf8')
}

// returns compiled mdx: { code, frontmatter, matter }
export const getCompiledMDX = async (content: string) => {
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

  // Add your remark and rehype plugins here
  const remarkPlugins: any[] = []
  const rehypePlugins = [[imageSize, { dir: 'public' }]]
  try {
    return await bundleMDX({
      source: content,
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
  } catch (error: any) {
    throw new Error(error)
  }
}
