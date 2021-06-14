const MemberLine = (props: any) => {
	const {
		handleTrash,
		handleConfirm,
		handleInputChange,
		handleRoleChange,
		inputValue,
		roleValue,
	} = props;
	const roles: string[] = ["Admin", "Basic"];
	return (
		<div className="flex items-center justify-between w-full py-2 mx-2 border-b border-primary-light">
			<div className="flex flex-col mb-2">
				<label className="text-xs capitalize">Correo</label>
				<input
					type="text"
					className="px-2 rounded focus:outline-none text-secundary bg-primary-light focus:bg-primary-light"
					value={inputValue}
					onChange={handleInputChange}
				/>
			</div>
			<select
				className="h-6 rounded focus:outline-none text-secundary bg-primary-light focus:bg-primary-light"
				onChange={handleRoleChange}
				value={roleValue}
			>
				{roles.map((role) => {
					return (
						<option value={role} key={role}>
							{role}
						</option>
					);
				})}
			</select>
			<div className="flex">
				{/* TrashCan */}
				<svg
					onClick={() => {
						handleTrash();
					}}
					xmlns="http://www.w3.org/2000/svg"
					className="w-6 h-6 mx-2 cursor-pointer text-error"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
					/>
				</svg>
				{/* Confirm */}
				<svg
					onClick={() => {
						handleConfirm();
					}}
					xmlns="http://www.w3.org/2000/svg"
					className="w-6 h-6 mx-2 cursor-pointer text-realced"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M5 13l4 4L19 7"
					/>
				</svg>
			</div>
		</div>
	);
};

export default MemberLine;
