const Table = (props: { children }) => {
	const { children } = props;

	return (
		<table className="w-full p-4 mt-4">
			<tbody>{children}</tbody>
		</table>
	);
};
export default Table;
