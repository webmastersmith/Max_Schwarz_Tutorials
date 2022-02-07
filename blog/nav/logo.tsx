import type { NextPage } from 'next'
import styles from './logo.module.scss'

//interface Props {
//data: string
//}

//export const Logo: NextPage<Props> = ({data}): JSX.Element => {
export const Logo: NextPage = (): JSX.Element => {
  return <div className={styles.logo}>Bryon&apos;s Next Blog</div>
}
