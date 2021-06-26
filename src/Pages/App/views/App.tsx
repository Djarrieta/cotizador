import { BrowserRouter } from "react-router-dom";
import ContextProvider from "../components/ContextProvider";
import Alert from "../components/Alert";
import Loading from "../components/Loading";
import Navbar from "../components/Navbar";
import Routes from "../components/Routes";

function App() {
	return (
		<ContextProvider>
			<BrowserRouter>
				<div className="flex flex-col h-screen overflow-x-hidden overflow-y-scroll text-secundary bg-primary-dark">
					<Navbar />
					<Routes />
					<Alert/>
					<Loading/>
				</div>
			</BrowserRouter>
		</ContextProvider>
	);
}

export default App;
