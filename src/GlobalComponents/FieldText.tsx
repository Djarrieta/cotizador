const FieldText = (props: {
	label?: string;
	value: string;
	onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
	onEnter?: () => void;
	placeholder?: string;
	disabled?: boolean;
	type?: "text" | "password";
	maxlength?: number;
}) => {
	const {
		label,
		value,
		onChange,
		onEnter,
		placeholder,
		disabled,
		type,
		maxlength,
	} = props;
	return (
		<div className="flex flex-col mb-2">
			{label && (
				<label className="text-xs capitalize text-text_light">{label}</label>
			)}
			<input
				className="px-2 rounded focus:outline-none text-secundary bg-primary-light focus:bg-primary-light"
				type={type || "text"}
				maxLength={maxlength || 500000}
				autoFocus
				disabled={disabled || false}
				placeholder={placeholder ? placeholder : label}
				value={value}
				onChange={(event) => {
					onChange(event);
				}}
				onKeyPress={(event: React.KeyboardEvent<HTMLDivElement>) =>
					event.code === "Enter" && onEnter && onEnter()
				}
			/>
		</div>
	);
};
export default FieldText;
