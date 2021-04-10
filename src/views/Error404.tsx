import { Link } from "react-router-dom";
import Container from "../components/Container";
import Section from "../components/Section";

const Error404 = () => {
	return (
		<Container>
			<Section name=" Página no encontrada">
				<img
					className="object-contain my-4"
					src="https://firebasestorage.googleapis.com/v0/b/cotizador-2db51.appspot.com/o/assets%2Ferror404.png?alt=media&token=c69b2922-304e-4930-9324-c8129eecc1e5"
					alt="Error404"
				/>
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
