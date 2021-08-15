import Section from "../../../GlobalComponents/Section";

import Card from "../components/Card";
import defaultMenuHome from "../../../constants/defaultMenuHome";

import IconUser from "../../../GlobalComponents/icons/IconUser";
import IconNotifications from "../../../GlobalComponents/icons/IconNotifications";
import { Context } from "../../../App/components/ContextProvider";
import { useContext } from "react";

const Home = () => {
	const { currentUser } = useContext(Context);

	return (
		<>
			{currentUser && (
				<Section name="Usuario">
					<div className="flex flex-wrap justify-start">
						<Card
							to={`/perfil/${currentUser.uid}`}
							icon={IconUser()}
							title="Perfil"
							text={currentUser.name}
						/>
						<Card
							to={`/actividades`}
							icon={IconNotifications()}
							title="Notificaciones"
							text="5 sin leer"
						/>
					</div>
				</Section>
			)}
			{defaultMenuHome.map((section) => {
				return (
					<Section name={section.name} key={section.name}>
						<div className="flex flex-wrap justify-start">
							{section.options.map((item) => {
								return (
									<Card
										key={item.title}
										to={item.to}
										icon={item.icon}
										title={item.title}
										text={item.text}
									/>
								);
							})}
						</div>
					</Section>
				);
			})}
		</>
	);
};
export default Home;
