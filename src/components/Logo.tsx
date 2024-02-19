'use client'

import Link from 'next/link'
import styled from '@emotion/styled'
import OctopusIcon from '@/components/icons/OctopusIcon'

const LogoBox = styled.span`
  font-weight: bold;
  font-size: 18px;
  display: inline-flex;
  align-items: center;
  height: 30px;
  line-height: 20px;
  padding: 10px;

  > svg {
    transition: 200ms ease;
  }

  &:hover > svg {
    transform: rotate(20deg);
  }
`

const Logo = () => {
  return (
    <Link href="/">
      <LogoBox>
        <OctopusIcon />
        <span className="ml-3 font-bold font-heading  text-gray-800">
          Oct Blog
        </span>
      </LogoBox>
    </Link>
  )
}

export default Logo
