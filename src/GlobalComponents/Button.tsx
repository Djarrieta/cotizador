const Button = (props: {
	name: string;
	handleFunction: () => void;
	secondary?: boolean;
}) => {
	const { name, handleFunction, secondary } = props;
	return (
		<button
			className={`w-full py-1  rounded-lg focus:outline-none  text-realced  ${
				secondary ? "text-left" : "border-2 border-realced hover:bg-realced hover:text-white "
			}`}
			onClick={handleFunction}
		>
			{name}
		</button>
	);
};
export default Button;
