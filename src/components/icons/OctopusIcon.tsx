import React from "react";
import { FaOctopusDeploy } from "react-icons/fa";

interface OctopusIconProps extends React.SVGProps<SVGSVGElement> {}

const OctpusIcon: React.FC<OctopusIconProps> = (props) => {
	return <FaOctopusDeploy {...props} />;
};

export default OctpusIcon;
