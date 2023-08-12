import { css, cx } from '@styled/css'
import { type FC, type ReactNode } from 'react'

export interface TooltipProps {
  children: React.ReactNode
  content: ReactNode
  position?: 'top' | 'bottom' | 'left' | 'right'
}

const Tooltip: FC<TooltipProps> = ({ children, content, position }) => {
  return (
    <div
      className={css({
        position: 'static',
        display: 'inline-block',
        zIndex: 1,
        '&:hover': {
          '& > span.tooltip-text': {
            visibility: 'visible'
          }
        }
      })}
    >
      {children}
      <span
        data-tooltip-position={position}
        className={cx(css({
          visibility: 'hidden',
          position: 'absolute',
          zIndex: 1,
          backgroundColor: 'surface',
          borderRadius: 'small',
          padding: 'small',
          fontSize: 'caption',
          fontWeight: 'bold',
          color: 'text',
          whiteSpace: 'nowrap',
          transition: 'visibility 0s linear 0.2s, opacity 0.2s linear, transform 0.2s linear, border-color 0.2s linear',
          borderColor: 'border',
          borderWidth: '1px',
          borderStyle: 'solid',
          '&[data-tooltip-position="top"]': {
            bottom: '100%',
            left: '50%',
            transform: 'translateX(-50%)'
          },
          '&[data-tooltip-position="bottom"]': {
            top: '100%',
            left: '50%',
            transform: 'translateX(-50%)'
          },
          '&[data-tooltip-position="left"]': {
            top: '50%',
            right: '100%',
            transform: 'translateY(-50%)'
          },
          '&[data-tooltip-position="right"]': {
            top: '50%',
            left: '100%',
            transform: 'translateY(-50%)'
          }
        }), 'tooltip-text')}
      >
        {content}
      </span>
    </div>
  )
}

export default Tooltip
