const FieldText = (props: {
	label?: string;
	value: string;
	handleFuntion?: (event: React.ChangeEvent<HTMLInputElement>) => void;
	placeholder?: string;
	disabled?: boolean;
	type?: "text" | "password";
}) => {
	const { label, value, handleFuntion, placeholder, disabled, type } = props;
	return (
		<div className="flex flex-col mb-2">
			{label && (
				<label className="text-xs capitalize text-text_light">{label}</label>
			)}
			<input
				className="px-2 rounded focus:outline-none text-secundary bg-primary-light focus:bg-primary-light"
				type={type || "text"}
				autoFocus
				disabled={disabled || false}
				placeholder={placeholder ? placeholder : label}
				value={value}
				onChange={(event) => {
					handleFuntion(event);
				}}
			/>
		</div>
	);
};
export default FieldText;
