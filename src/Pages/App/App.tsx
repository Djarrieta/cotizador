import { BrowserRouter } from "react-router-dom";

import {Alert} from "./components/Alert";
import Loading from "./components/Loading";
import Routes from "./components/Routes";
import HomeButton from "./components/HomeButton";
import ContextProvider from "../../GlobalComponents/ContextProvider";

function App() {
	return (
		<ContextProvider>
			<BrowserRouter>
				<div className="flex flex-col min-h-screen pt-4 pb-16 overflow-x-hidden overflow-y-scroll text-secundary bg-bgd_primary text-text_primary">
					<Routes />
					<Alert />
					<Loading />
					<HomeButton />
				</div>
			</BrowserRouter>
		</ContextProvider>
	);
}

export default App;
