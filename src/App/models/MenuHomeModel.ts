export default interface MenuHomeModel  {
	name: string;
	options: {
		to: string;
		icon: JSX.Element;
		title: string;
		text: string;
	}[];
}