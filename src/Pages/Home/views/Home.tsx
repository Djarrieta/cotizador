import { useContext } from "react";
import { Context } from "../../../App/components/ContextProvider";
import DEFAULT_MENU_HOME from "../../../constants/DEFAULT_MENU_HOME";
import Section from "../../../GlobalComponents/Section";
import Card from "../components/Card";

const Home = () => {
	const { currentUser } = useContext(Context);

	const teamId = currentUser?.defaultTeam ?? "";

	return (
		<>
			{DEFAULT_MENU_HOME.map((section) => {
				return (
					<Section name={section.name} key={section.name}>
						<div className="flex flex-wrap justify-start">
							{section.options.map((item) => {
								let to = `/${teamId}${item.to}`;
								let text = item.text;
								if (item.title === "Perfil") {
									to = `/perfil/${currentUser?.uid ?? ""}`;
									text =
										`${currentUser?.name ?? ""}, ${currentUser?.defaultTeam ?? ""}`;
								}

								return (
									<Card
										key={item.title}
										to={to}
										icon={item.icon}
										title={item.title}
										text={text}
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
