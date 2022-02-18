import type { NextPage, GetStaticProps, GetStaticPaths } from 'next'
import { PostDetail } from 'components'
import { getAllFileNames, getPost } from 'utils'
import { PostType } from 'types'
import { ParsedUrlQuery } from 'querystring'
import React from 'react'

const PostPage: NextPage<PostType> = ({ post }) => {
  return <PostDetail post={post} />
}
export default PostPage

interface PropsType extends ParsedUrlQuery {
  slug: string
}
export const getStaticProps: GetStaticProps = async (context) => {
  const { slug } = context.params as PropsType
  const post = await getPost(slug)
  return {
    props: {
      post,
    },
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllFileNames().map((slug: string) => ({
    params: { slug },
  }))

  return {
    paths,
    fallback: false, //show 404 page
  }
}
