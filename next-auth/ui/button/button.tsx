import type { NextPage } from 'next'
import styles from './button.module.scss'

interface Props {
  type: 'submit' | 'button'
  className?: string
  style?: { [k: string]: any }
  onClick?: () => void
}

export const Button: NextPage<Props> = ({
  children,
  type,
  style,
  onClick = () => {},
  className = '',
}) => {
  return (
    <button
      type={type}
      className={styles.button + ' ' + className}
      style={style}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
