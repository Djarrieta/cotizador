const Button = (props: { name: string; handleFunction: any }) => {
	const { name, handleFunction } = props;
	return (
		<button
			className="w-full py-2 border rounded-lg focus:outline-none border-realced text-realced hover:bg-primary-light hover:text-secundary-light"
			onClick={handleFunction}
		>
			{name}
		</button>
	);
};
export default Button;
