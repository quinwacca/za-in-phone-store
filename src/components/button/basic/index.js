import Link from 'next/link'

import styles from './index.module.css'

const DESIGN_TYPES = {
  OUTLINE: 'OUTLINE',
  SOLID: 'SOLID'
}

const BUTTON_TYPES = {
  LINK: 'LINK',
  BUTTON: 'BUTTON'
}

const DESIGNS = {
  OUTLINE: styles.buttonOutline,
  SOLID: styles.buttonSolid
}

const ButtonBasic = ({
  children,
  design = DESIGN_TYPES.SOLID,
  disabled = false,
  onClick = () => {},
  type = BUTTON_TYPES.BUTTON
}) => {
  if (type === BUTTON_TYPES.LINK) {
    return (
      <Link href="/" className={DESIGNS[design]} disabled={disabled}>
        {children}
      </Link>
    )
  }

  if (type === BUTTON_TYPES.BUTTON) {
    return (
      <button className={DESIGNS[design]} disabled={disabled} onClick={onClick}>
        {children}
      </button>
    )
  }
}

ButtonBasic.displayName = 'ButtonBasic'

export default ButtonBasic

export {BUTTON_TYPES as buttonBasicTypes, DESIGN_TYPES as buttonBasicDesigns}
