const TableItem = (props: { children }) => {
	const { children } = props;
	return (
		<tr className="w-full border-b border-text_light">
			<td className="flex items-center justify-between w-full my-1">{children}</td>
		</tr>
	);
};
export default TableItem;
