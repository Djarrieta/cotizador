import React from "react";
import { Redirect, Route } from "react-router-dom";

const PrivateRoute = (props: {
	condition: boolean;
	path: string;
	redirectTo: string;
	Element: JSX.Element;
}) => {
	const { condition, path, redirectTo, Element } = props;

	return (
		<Route exact path={path}>
			{condition ? Element : <Redirect to={redirectTo} />}
		</Route>
	);
};
export default PrivateRoute;
