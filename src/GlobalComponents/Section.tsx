import Button from "./Button";

const Section = (props: {
	children?: JSX.Element;
	name: string;
	button?: boolean;
	handleFunction?: ()=>void;
	buttonName?:string
}) => {
	const { children, name, handleFunction, buttonName } = props;

	return (
		<section className="w-full max-w-4xl px-4 mx-auto rounded-lg bg-bgd_light">
			<div className="flex justify-between w-full border-b border-text_light">
				<h2 className="pb-1 pl-4 text-2xl text-text_light">{name}</h2>
				{buttonName && (
					<div className="w-16 py-1">
						<Button name={buttonName ?? "Nuevo"}  handleFunction={handleFunction} secondary={true}/>
					</div>
				)}
			</div>
			<div className="px-1 py-4">
				{children}
			</div>
		</section>
	);
};
export default Section;
