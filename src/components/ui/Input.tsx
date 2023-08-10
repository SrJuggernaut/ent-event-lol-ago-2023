import { type MergeOmitting } from '@/types/utilities'
import { css, cx } from '@styled/css'
import { input, type InputVariantProps } from '@styled/recipes/input'
import { type FC } from 'react'

type ComposedInputProps = MergeOmitting<JSX.IntrinsicElements['input'], InputVariantProps>

export interface InputProps extends ComposedInputProps {}

const Input: FC<InputProps> = ({ children, className, ...rest }) => {
  const [inputRecipeArgs, allOtherInputProps] = input.splitVariantProps(rest)
  return (
    <input
      className={cx(input(inputRecipeArgs), className, css({ marginInline: '0' }))}
      {...allOtherInputProps}
    >
      {children}
    </input>
  )
}

export default Input
