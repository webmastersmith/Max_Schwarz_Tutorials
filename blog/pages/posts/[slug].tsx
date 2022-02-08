import type { NextPage, GetStaticProps, GetStaticPaths } from 'next'
import { PostDetail } from 'components'
import { getAllFileNames, getPostData } from 'utils'
import { PostTypes } from 'types'
import { ParsedUrlQuery } from 'querystring'
import { useRouter } from 'next/router'

interface Props {
  post: PostTypes
}

const PostPage: NextPage<Props> = ({ post }) => {
  if (!post?.date) return <p>No Detail Page found.</p>
  const imagePath = `/images/posts/${post.slug}/${post.image}`
  return (
    <PostDetail
      title={post.title}
      image={imagePath}
      content={post.content as string}
    />
  )
}

export default PostPage

interface PropsType extends ParsedUrlQuery {
  slug: string
}
export const getStaticProps: GetStaticProps = async (context) => {
  const { slug } = context.params as PropsType
  const post = getPostData(`${slug}.md`)
  return {
    props: {
      post,
    },
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const files = getAllFileNames()
  const paths = files.map((slug: string) => {
    return {
      params: { slug }, //this is dynamic page name with array of possible page names.
    }
  })
  return {
    paths,
    fallback: false, //show 404 page
  }
}
