const TableData = (props: { children }) => {
	const { children } = props;
	return (
		<td className="flex flex-col items-center justify-center w-full my-1">
			{children}
		</td>
	);
};
export default TableData;
