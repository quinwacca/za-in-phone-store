import Link from 'next/link'

import Button from './Button'

import {DESIGN_TYPES, BUTTON_TYPES} from './config.js'

const ButtonBasic = ({
  children,
  design = DESIGN_TYPES.SOLID,
  disabled = false,
  href,
  onClick = () => {},
  type = BUTTON_TYPES.BUTTON
}) => {
  const commonButtonProps = {children, design, disabled}

  if (type === BUTTON_TYPES.LINK && Boolean(href)) {
    return (
      <Link href={href}>
        <Button {...commonButtonProps} />
      </Link>
    )
  }

  if (type === BUTTON_TYPES.BUTTON) {
    return <Button {...commonButtonProps} onClick={onClick} />
  }
}

ButtonBasic.displayName = 'ButtonBasic'

export default ButtonBasic

export {BUTTON_TYPES as buttonBasicTypes, DESIGN_TYPES as buttonBasicDesigns}
