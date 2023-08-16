import { type MergeOmitting } from '@/types/utilities'
import { cx } from '@styled/css'
import { button, type ButtonVariantProps } from '@styled/recipes/button'
import { type FC } from 'react'

export type ButtonProps = MergeOmitting<React.ButtonHTMLAttributes<HTMLButtonElement>, ButtonVariantProps>

const Button: FC<ButtonProps> = ({ children, className, ...rest }) => {
  const [iconButtonRecipeArgs, allOtherIconButtonProps] = button.splitVariantProps(rest)
  return (
    <button
      className={cx(button(iconButtonRecipeArgs), className)}
      {...allOtherIconButtonProps}
    >
      {children}
    </button>
  )
}

export default Button
