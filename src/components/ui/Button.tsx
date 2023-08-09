import { type MergeOmitting } from '@/types/utilities'
import { cx } from '@styled/css'
import { button, type ButtonVariantProps } from '@styled/recipes/button'
import React, { type FC } from 'react'

type ComposedButtonProps = MergeOmitting<React.HTMLAttributes<HTMLButtonElement>, ButtonVariantProps>

export interface ButtonProps extends ComposedButtonProps {}

const Button: FC<ButtonProps> = ({ children, className, ...rest }) => {
  const [buttonRecipeArgs, allOtherButtonProps] = button.splitVariantProps(rest)
  return (
    <button
      className={cx(button(buttonRecipeArgs), className)}
      {...allOtherButtonProps}
    >
      {children}
    </button>
  )
}

export default Button
