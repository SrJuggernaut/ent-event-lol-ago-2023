import { type MergeOmitting } from '@/types/utilities'
import { cx } from '@styled/css'
import { input, type InputVariantProps } from '@styled/recipes/input'
import { type FC } from 'react'

type ComposedInputProps = MergeOmitting<JSX.IntrinsicElements['input'], InputVariantProps>

export interface InputProps extends ComposedInputProps {}

const Input: FC<InputProps> = ({ children, className, ...rest }) => {
  const [inputRecipeArgs, allOtherInputProps] = input.splitVariantProps(rest)
  return (
    <input
      className={cx(input(inputRecipeArgs), className)}
      {...allOtherInputProps}
    >
      {children}
    </input>
  )
}

export default Input
