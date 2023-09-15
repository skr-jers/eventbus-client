import {createMachine} from "xstate";

const foliosMachine = createMachine(
	{
		id: "folios",
		initial: "inactivo",
		states: {
			activo: {
				on: {
					desactivar: "inactivo",
				},
			},
			inactivo: {
				on: {
					activar: "activo",
				},
			},
			error: {},
		},
	},
);

export default foliosMachine