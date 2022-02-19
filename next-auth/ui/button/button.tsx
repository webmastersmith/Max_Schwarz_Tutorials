import type { NextPage } from 'next'
import styles from './button.module.scss'

interface Props {
  style?: { [k: string]: any }
  rest?: any
}

export const Button: NextPage<Props> = ({ children, style, ...rest }) => {
  return (
    <button
      className={styles.button}
      style={{
        ...style,
      }}
      {...rest}
    >
      {children}
    </button>
  )
}
