import { Link } from "react-router-dom";
import IconMenu from "../../GlobalComponents/icons/IconMenu";

const HomeButton = () => {
	return (
		<button className="fixed bottom-0 right-0 h-16 p-2 m-4 rounded-full shadow text-realced bg-bgd_dark">
			<Link to="/">
				<IconMenu />
			</Link>
		</button>
	);
};
export default HomeButton;
