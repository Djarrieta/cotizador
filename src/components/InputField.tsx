const InputField = (props: any) => {
	const { label, type, val, handleFuntion, placeholder } = props;
	return (
		<div className="flex flex-col">
			<label className="text-xs">{label}</label>
			<input
				className="px-2 mb-2 rounded focus:outline-none text-primary"
				type={type}
				autoFocus
				placeholder={placeholder ? placeholder : label}
				value={val}
				onChange={(e) => {
					handleFuntion(e.target.value);
				}}
			/>
		</div>
	);
};
export default InputField;
