const FieldSelect = (props: {
	label?: string;
	options: Array<string>;
	selectedValue:string;
	handleChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}) => {
	const { label, options, handleChange , selectedValue} = props;

	return (
		<div className="flex flex-col">
			{label && <label className="text-xs capitalize text-text_light">{label}</label>}
			<select
				onChange={(event) => handleChange(event)}
				className="flex w-full px-2 py-1 mb-2 rounded bg-primary-light focus:outline-none"
				value={selectedValue}
			>
				{options.map((option: string) => (
					<option value={option}>{option}</option>
				))}
			</select>
		</div>
	);
};
export default FieldSelect;
