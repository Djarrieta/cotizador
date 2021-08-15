const Container = (props: { children: JSX.Element}) => {
	const { children } = props;
	return (
		<div className="container flex flex-col items-center w-full mx-auto ">
			{children}
		</div>
	);
};
export default Container;
