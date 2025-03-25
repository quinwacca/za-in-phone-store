import styles from './index.module.css'

const ButtonBasic = ({children, disabled, onClick = () => {}}) => {
  return (
    <button className={styles.button} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  )
}

ButtonBasic.displayName = 'ButtonBasic'

export default ButtonBasic
