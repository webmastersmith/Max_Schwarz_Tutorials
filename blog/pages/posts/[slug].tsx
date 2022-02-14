import type { NextPage, GetStaticProps, GetStaticPaths } from 'next'
import { PostDetail } from 'components'
import { getAllPostsFileNames, getCompiledMDX } from 'utils'
import { PostType } from 'types'
import { ParsedUrlQuery } from 'querystring'
import React from 'react'

interface Props {
  post: PostType
}

const PostPage: NextPage<Props> = ({ post }) => {
  if (!post?.date) return <p>No Detail Page found.</p>
  const imagePath = `/images/posts/${post.slug}/${post.image}`
  return <PostDetail post={post} />
}
export default PostPage

interface PropsType extends ParsedUrlQuery {
  slug: string
}
export const getStaticProps: GetStaticProps = async (context) => {
  const { slug } = context.params as PropsType
  const post = await getCompiledMDX(slug)
  return {
    props: {
      post,
    },
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllPostsFileNames().map((slug: string) => ({
    params: { slug },
  }))

  return {
    paths,
    fallback: false, //show 404 page
  }
}
