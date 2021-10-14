const TableRow = (props: { children; keyValue: string }) => {
	const { children, keyValue} = props;
	return (
		<tr
			key={keyValue}
			className="flex justify-between w-full h-16 border-b border-text_light"
		>
			{children}
		</tr>
	);
};
export default TableRow;
