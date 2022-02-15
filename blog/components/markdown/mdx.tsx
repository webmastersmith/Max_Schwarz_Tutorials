import type { NextPage } from 'next'
import { useMemo } from 'react'
import { getMDXComponent } from 'mdx-bundler/client'
import { PostType } from 'types'
import { getImage, getPre } from 'components/markdown'
import Image from 'next/image'
import { Youtube } from 'components'

interface Props {
  post: PostType
}

export const MdxImage: NextPage<Props> = ({ post }) => {
  const { code } = post

  const components = {
    p: getImage(post),
    pre: getPre(post),
    Image,
    Youtube,
  }
  const Component = useMemo(() => getMDXComponent(code), [code])
  return <Component components={components} />
}

// export const MdxImage = memo(_MdxImage)
