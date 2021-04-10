const Loader = () => {
	return (
		<div className="fixed top-0 bottom-0 left-0 right-0 z-50 flex flex-col items-center justify-center w-full h-screen overflow-hidden opacity-75 bg-primary-dark">
			<div className="w-12 h-12 mb-4 ease-linear border-4 border-t-4 rounded-full border-realced animate-spin">
				<div className="w-1/2 -m-2 h-1/2 bg-primary-dark"></div>
			</div>
			<h2 className="text-xl font-semibold text-center text-white">
				Cargando...
			</h2>
			<p className="w-1/3 text-center text-white">
				Esto tomará unos segundos. Por favo no cierres la página.
			</p>
		</div>
	);
};
export default Loader;
