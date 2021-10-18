import React, { createElement } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Error404 from "../../Error404/views/Error404";
import useRoutes from "../hooks/useRoutes";

const Routes = () => {
	const { routes } = useRoutes();
	return (
		<Switch>
			{routes.map((route) => {
				return (
					<Route
						key={route.path}
						exact
						path={route.path}
						render={(routeProps) =>
							route.condition ? (
								createElement(route.component, routeProps)
							) : (
								<Redirect to={route.redirect} />
							)
						}
					/>
				);
			})}
			<Route component={Error404} />
		</Switch>
	);
};
export default Routes;
