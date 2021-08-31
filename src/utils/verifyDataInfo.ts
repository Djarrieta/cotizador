export const verifyDataInfo = (
	verificationData: { condition: boolean; text: string }[],
	successText: string
): { ok: boolean; text: string } => {
	let response = { ok: true, text: successText };
	verificationData.reverse().forEach((item) => {
		if (item.condition) {
			response = { ok: false, text: item.text };
			return;
		}
	});

	return response;
};
