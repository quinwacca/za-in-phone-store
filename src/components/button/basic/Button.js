import styles from './index.module.css'

const DESIGNS = {
  OUTLINE: styles.buttonOutline,
  SOLID: styles.buttonSolid
}

const ButtonBasicComponent = ({children, design, disabled, onClick}) => {
  return (
    <button className={DESIGNS[design]} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  )
}

ButtonBasicComponent.displayName = 'ButtonBasicComponent'

export default ButtonBasicComponent
