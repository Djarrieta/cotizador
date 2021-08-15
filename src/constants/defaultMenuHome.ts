import IconActivities from "../GlobalComponents/icons/IconActivities";
import IconThirdParties from "../GlobalComponents/icons/IconThirdParties";
import IconItems from "../GlobalComponents/icons/IconItems";
import IconProjects from "../GlobalComponents/icons/IconProjects";
import IconQuotes from "../GlobalComponents/icons/IconQuotes";
import IconReport from "../GlobalComponents/icons/IconReport";

import MenuHomeModel from "../App/models/MenuHomeModel";


const defaultMenuHome: MenuHomeModel[] = [
	{
		name: "General",
		options: [
			{
				to: "/actividades",
				icon: IconActivities(),
				title: "Actividades",
				text: "Asignadas a ti o a otros",
			},
			{
				to: "/terceros",
				icon: IconThirdParties(),
				title: "Terceros",
				text: "Prospectos, clientes, proveedores, contactos",
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

export default defaultMenuHome;
