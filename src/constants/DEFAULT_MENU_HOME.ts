import MenuHomeModel from "../App/models/MenuHomeModel";
import IconTasks from "../GlobalComponents/icons/IconTasks";
import IconItems from "../GlobalComponents/icons/IconItems";
import IconProjects from "../GlobalComponents/icons/IconProjects";
import IconQuotes from "../GlobalComponents/icons/IconQuotes";
import IconReport from "../GlobalComponents/icons/IconReport";
import IconThirdParties from "../GlobalComponents/icons/IconThirdParties";
import IconUser from "../GlobalComponents/icons/IconUser";

const DEFAULT_MENU_HOME: MenuHomeModel[] = [
	{
		name: "General",
		options: [
			{
				to: "/perfil/",
				icon: IconUser(),
				title: "Perfil",
				text: "",
			},
			{
				to: "/tareas",
				icon: IconTasks(),
				title: "Tareas",
				text: "Asignadas a ti o a otros",
			},
			{
				to: "/terceros",
				icon: IconThirdParties(),
				title: "Terceros",
				text: "Clientes, proveedores, contactos",
			},
			{
				to: "/items",
				icon: IconItems(),
				title: "Items",
				text: "Artículos, despieces, servicios",
			},
			{
				to: "/proyectos",
				icon: IconProjects(),
				title: "Proyectos",
				text: "De terceros o propios",
			},
		],
	},
	{
		name: "Comercial",
		options: [
			{
				to: "/actividades",
				icon: IconQuotes(),
				title: "Cotizaciones",
				text: "Realizadas por ti o por otros",
			},
		],
	},
	{
		name: "Informes",
		options: [
			{
				to: "/informes/visitas-por-mes",
				icon: IconReport(),
				title: "Visitas por mes",
				text: "visitas cada comercial por mes",
			},
		],
	},
];

export default DEFAULT_MENU_HOME;
