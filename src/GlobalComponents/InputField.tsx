const InputField = (props: {
	label?: string;
	field: string;
	type: string;
	val: any;
	handleFuntion: any;
	placeholder?: string;
	disabled?: boolean;
}) => {
	const {
		label,
		field,
		type,
		val,
		handleFuntion,
		placeholder,
		disabled,
	} = props;
	return (
		<div className="flex flex-col">
			<label className="text-xs capitalize">{label}</label>
			<input
				className="px-2 mb-2 rounded focus:outline-none text-secundary bg-primary-light focus:bg-primary-light"
				name={field}
				type={type}
				autoFocus
				disabled={disabled && true}
				placeholder={placeholder ? placeholder : label}
				value={val.target && val.target.value}
				onChange={(e) => {
					handleFuntion(e);
				}}
			/>
		</div>
	);
};
export default InputField;
