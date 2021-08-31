import React from "react";
import { Redirect, Route } from "react-router-dom";

const ConditionalRoute = (props: {
	condition: boolean;
	path: string;
	redirectTo: string;
	Element: () => JSX.Element;
}) => {
	const { condition, path, Element, redirectTo } = props;
  const rendered=Element()
	return (
		<Route exact path={path}>
			{condition ? rendered : <Redirect to={redirectTo} />}
		</Route>
	);
};
export default ConditionalRoute;
