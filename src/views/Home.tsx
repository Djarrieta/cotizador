import { Link } from "react-router-dom";
import Container from "../components/Container";
import Section from "../components/Section";

const Home = (props: any) => {
	const { currentUser } = props;
	return (
		<Container>
			<Section name="Opciones">
				<div className="flex justify-around w-full my-4 text-realced">
					{currentUser && <Link to={"/perfil/" + currentUser.uid}>Perfil</Link>}
					{currentUser && <Link to={"/equipos/"}>Equipos</Link>}
					<Link to="/ingreso">Inicia sesión</Link>
					<Link to="/adsfasdfadf">Error</Link>
				</div>
			</Section>
		</Container>
	);
};
export default Home;
