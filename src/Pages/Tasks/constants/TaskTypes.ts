export const TaskTypes = [
	["Ventas", ["Cotizacion", "Visita", "Llamada", "Correo"]],
	["Logística", ["Despacho", "Devolución"]],
	["Técnica", ["Despiece", "Cálculo"]],
	["Financiera", ["Crédito", "Compra"]],
	["Otra", ["Otra"]],
];

export const TaskTypeObj = {
	ventas: {
		name: "Ventas",
		values: ["Cotizacion", "Visita", "Llamada", "Correo"],
	},
	logistica: { name: "Logística", values: ["Despacho", "Devolución"] },
	tectica:{name:"Técnica", values:["Despiece", "Cálculo"]},
	financiera:{name:"Financiera",values: ["Crédito", "Compra"]},
	otra:{name:"Otra", values:["Otra"]}
};
