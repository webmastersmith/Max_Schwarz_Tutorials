import type { NextPage } from 'next'
import { useMemo } from 'react'
import { getMDXComponent } from 'mdx-bundler/client'
import { PostType } from 'types'
import { getImage, getPre } from 'components/markdown'

interface Props {
  post: PostType
}

export const MdxImage: NextPage<Props> = ({ post }) => {
  const { code } = post

  const components = {
    p: getImage(post),
    pre: getPre(post),
  }
  const Component = useMemo(() => getMDXComponent(code), [code])
  return <Component components={components} />
}

// export const MdxImage = memo(_MdxImage)
