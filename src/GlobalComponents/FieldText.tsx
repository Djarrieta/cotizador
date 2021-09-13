const FieldText = (props: {
	label?: string;
	value: string;
	handleFuntion?: (event: React.ChangeEvent<HTMLInputElement>) => void;
	placeholder?: string;
	disabled?: boolean;
	type?: "text" | "password";
	maxLength?:number
}) => {
	const { label, value, handleFuntion, placeholder, disabled, type ,maxLength} = props;
	return (
		<div className="flex flex-col h-10 mb-2">
			{label && value && (
				<label className="text-xs capitalize text-text_light">{label}</label>
			)}
			<input
				className="px-2 border rounded focus:outline-none text-secundary bg-primary-light focus:bg-primary-light"
				type={type || "text"}
				autoFocus
				disabled={disabled || false}
				placeholder={placeholder ? placeholder : label}
				value={value}
				maxLength={maxLength}
				onChange={(event) => {
					handleFuntion(event);
				}}
			/>
		</div>
	);
};
export default FieldText;
