import React from "react";
import { Link } from "react-router-dom";

const Card = (props: {
	to: string;
	icon: JSX.Element;
	title: string;
	text: string;
}): JSX.Element => {
	const { to, icon, text, title } = props;
	return (
		<Link to={to}>
			<div className="flex flex-col items-center justify-center p-2 py-1 m-2 border rounded-lg h-36 w-28">
				<div className="w-16 h-16 ">{icon}</div>
				<span className="text-sm text-realced">{title}</span>
				<p className="text-xs text-center ">{text}</p>
			</div>
		</Link>
	);
};
export default Card;
