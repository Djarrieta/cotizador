import { useState } from "react";

const InputSelect = (props: { label: string; options: Array<string> }) => {
	const { label, options } = props;

	return (
		<div className="flex flex-col">
			<label className="text-xs">{label}</label>
			<select
				onChange={(e) => {
					console.log(e.target);
				}}
				className="flex w-full px-2 py-1 mb-2 rounded bg-primary-light focus:outline-none"
			>
				{options.map((opt: string, n: number) => (
					<option value={n}>{opt}</option>
				))}
			</select>
		</div>
	);
};
export default InputSelect;
