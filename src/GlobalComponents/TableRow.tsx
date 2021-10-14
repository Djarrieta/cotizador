const TableRow = (props: { children; key: string }) => {
	const { children, key } = props;
	return (
		<tr
			key={key}
			className="flex justify-between w-full h-16 border-b border-text_light"
		>
			{children}
		</tr>
	);
};
export default TableRow;
