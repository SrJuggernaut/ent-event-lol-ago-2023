'use client'
import EntGamersLogo from '@/components/assets/EntGamersLogo'
import Avatar from '@/components/layout/Avatar'
import Evidence from '@/components/layout/Evidence'
import Menu from '@/components/layout/Menu'
import { css } from '@styled/css'
import { Container } from '@styled/jsx/container'
import NextLink from 'next/link'
import { useCallback, useEffect, useState, type FC } from 'react'

const Header: FC = () => {
  const [scroll, setScroll] = useState(0)
  const handleScroll = useCallback(() => {
    setScroll(window.scrollY)
  }, [])

  useEffect(() => {
    if (window !== undefined) {
      handleScroll()
    }
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [handleScroll])
  return (
    <>
      <header
        className={
          css({
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            height: '60px',
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            transitionDuration: 'normal',
            transitionProperty: 'background-color',
            transitionTimingFunction: 'easeInOut',
            transitionDelay: 'fast',
            zIndex: 1000,
            '&[data-scroll=true]': {
              backgroundColor: 'gray.800'
            }
          })
        }
        data-scroll={scroll > 0}
      >
        <Container
          className={
            css({
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center'
            })
          }
        >
          <div>
            <NextLink href="/">
              <EntGamersLogo height={40} />
            </NextLink>
          </div>
          <div
            className={css({
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 'large'
            })}
          >
            <Evidence />
            <Avatar />
            <Menu />
          </div>
        </Container>
      </header>
      <div
        className={css({
          height: '76px'
        })}
      />
    </>
  )
}

export default Header
