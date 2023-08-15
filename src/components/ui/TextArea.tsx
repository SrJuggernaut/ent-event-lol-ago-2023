import { type MergeOmitting } from '@/types/utilities'
import { css, cx } from '@styled/css'
import { input, type InputVariantProps } from '@styled/recipes/input'
import { type FC } from 'react'

type ComposedTextareaProps = MergeOmitting<JSX.IntrinsicElements['textarea'], InputVariantProps>

export interface TextareaProps extends ComposedTextareaProps {}

const TextArea: FC<TextareaProps> = ({ children, className, ...rest }) => {
  const [inputRecipeArgs, allOtherTextareaProps] = input.splitVariantProps(rest)
  return (
    <textarea
      className={cx(input(inputRecipeArgs), className, css({
        marginInline: '0',
        '&:disabled': {
          backgroundColor: 'gray.200',
          color: 'gray.400',
          cursor: 'not-allowed',
          opacity: '1',
          resize: 'block',
          '&:hover': {
            backgroundColor: 'gray.200',
            color: 'gray.400',
            cursor: 'not-allowed'
          }
        }
      }))}
      {...allOtherTextareaProps}
    >
      {children}
    </textarea>
  )
}

export default TextArea
