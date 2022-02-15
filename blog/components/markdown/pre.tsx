import { PostType } from 'types'
//import styles from './getPre.module.scss'

export const getPre = (post: PostType) => {
  const Pre = (node: any) => {
    console.log('Pre node', node)
    return <pre {...node} />
  }
  return Pre
}
