import { Link } from "react-router-dom";
import Container from "../../../GlobalComponents/Container";
import Section from "../../App/components/Section";
import Error404Image from "../components/Error404Image";

const Error404 = () => {
	return (
		<Container>
			<Section name=" Página no encontrada">
				<div className="flex flex-col items-center justify-center my-5">
					<Error404Image />
					<span className="">
						No encontramos la página que buscas. Verifica la URL.
					</span>
				</div>
			</Section>
			<Section name="Opciones">
				<div className="flex justify-around w-full my-4 text-realced">
					<Link to="/">Ve al Inicio</Link>
					<Link to="/ingreso">Inicia sesión</Link>
					<Link to="/equipos">Mira tus equipos</Link>
				</div>
			</Section>
		</Container>
	);
};
export default Error404;
