import Button from "./Button";

const Section = (props: {
	children?: JSX.Element;
	name: string;
	button?: boolean;
	handleFunction?: ()=>void;
}) => {
	const { children, name, button, handleFunction } = props;

	return (
		<section className="w-full max-w-4xl px-4 mx-auto bg-bgd_light">
			<div className="flex justify-between w-full border-b border-text_light">
				<h2 className="pl-4 text-lg text-text_light">{name}</h2>
				{button && (
					<div className="w-16 py-1">
						<Button name="+" handleFunction={handleFunction}></Button>
					</div>
				)}
			</div>
			<div className="px-1">
				{children}
			</div>
		</section>
	);
};
export default Section;
