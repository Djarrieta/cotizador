import { useContext } from "react";
import { Link } from "react-router-dom";
import Container from "../../../GlobalComponents/Container";
import { Context } from "../../App/components/ContextProvider";
import Section from "../../App/components/Section";

const Home = () => {
	const { currentUser } = useContext(Context);
	return (
		<Container>
			<Section name="Opciones">
				<div className="flex justify-around w-full my-4 text-realced ">
					{currentUser && <Link to={"/perfil/" + currentUser.uid}>Perfil</Link>}
					{currentUser && <Link to={"/equipos/"}>Equipos</Link>}
					<Link to="/ingresar">Inicia sesión</Link>
					<Link to="/adsfasdfadf">Error</Link>
				</div>
			</Section>
		</Container>
	);
};
export default Home;
