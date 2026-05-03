"use client";

import Link from "next/link";
import styled from "@emotion/styled";
import OctopusIcon from "@/components/icons/OctopusIcon";

const LogoBox = styled.span`
  font-weight: bold;
  font-size: 18px;
  display: inline-flex;
  align-items: center;
  height: 30px;
  line-height: 20px;

  > svg {
    transition: 200ms ease;
  }

  &:hover > svg {
    transform: rotate(20deg);
  }
`;

const Logo = () => {
	return (
		<Link href="/" aria-label="octo ホーム">
			<LogoBox>
				<OctopusIcon />
				<span className="ml-3 font-bold font-heading text-slate-900">octo</span>
			</LogoBox>
		</Link>
	);
};

export default Logo;
