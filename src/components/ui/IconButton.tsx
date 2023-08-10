import { type MergeOmitting } from '@/types/utilities'
import { cx } from '@styled/css'
import { iconButton, type IconButtonVariantProps } from '@styled/recipes/icon-button'
import { type ReactNode } from 'react'

function IconButton<T extends keyof JSX.IntrinsicElements> (pros: MergeOmitting<JSX.IntrinsicElements[T], IconButtonVariantProps> & { component?: T }): ReactNode
function IconButton<T extends 'button' | 'a'> ({ children, className, component, ...rest }: MergeOmitting<JSX.IntrinsicElements[T], IconButtonVariantProps> & { component?: T }): ReactNode {
  const [iconButtonRecipeArgs, allOtherIconButtonProps] = iconButton.splitVariantProps(rest)
  const Component = component ?? 'button'
  return (
    <Component
      className={cx(iconButton(iconButtonRecipeArgs), className)}
      {...allOtherIconButtonProps as any}
    >
      {children}
    </Component>
  )
}

export default IconButton
