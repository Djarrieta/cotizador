const TableItem = (props: { children }) => {
	const { children } = props;
	return (
		<tr className="border-b border-text_light">
			<td className="flex items-center justify-between w-full h-10 my-1">{children}</td>
		</tr>
	);
};
export default TableItem;
