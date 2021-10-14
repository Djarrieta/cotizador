const CustomTable = (props: {
	tableData: { data: JSX.Element[]; key: string }[];
}) => {
	const { tableData } = props;
	return (
		<table className="w-full p-4 mt-4">
			<tbody>
				{tableData.map((row) => {
					return (
						<tr
							key={row.key}
							className="flex justify-between w-full h-16 border-b border-text_light"
						>
							{row.data.map((item, index) => (
								<td
									key={`${row.key}-${index}`}
									className="flex flex-col items-center justify-center w-full my-1"
								>
									{item}
								</td>
							))}
						</tr>
					);
				})}
			</tbody>
		</table>
	);
};
export default CustomTable;
