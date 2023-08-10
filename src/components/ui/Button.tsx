import { type MergeOmitting } from '@/types/utilities'
import { cx } from '@styled/css'
import { button, type ButtonVariantProps } from '@styled/recipes/button'
import { type ReactNode } from 'react'

function Button<T extends keyof JSX.IntrinsicElements> (pros: MergeOmitting<JSX.IntrinsicElements[T], ButtonVariantProps> & { component?: T }): ReactNode
function Button<T extends 'button' | 'a'> ({ children, className, component, ...rest }: MergeOmitting<JSX.IntrinsicElements[T], ButtonVariantProps> & { component?: T }): ReactNode {
  const [iconButtonRecipeArgs, allOtherIconButtonProps] = button.splitVariantProps(rest)
  const Component = component ?? 'button'
  return (
    <Component
      className={cx(button(iconButtonRecipeArgs), className)}
      {...allOtherIconButtonProps as any}
    >
      {children}
    </Component>
  )
}

export default Button
