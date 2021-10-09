module.exports = {
	purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {
			colors: {
				bgd_primary:"#FAFAFA",
				bgd_light:"#FFFFFF",
				bgd_dark:"#000000",

				text_primary:"#262626",
				text_light:"#b0aeae",
				text_dark:"#231F20",

				realced: "#3EC6FF",

				error: "#F02849",
				info: "#E57E1F",
				success: "#31A24C",

				color_tag_0:"#FA997F",
				color_tag_1:"#ED78FA",
				color_tag_2:"#87ABD6",
				color_tag_3:"#92EB9F",
				color_tag_4:"#FCE15B",
				
			},
		},
	},
	variants: {
		extend: {},
	},
	plugins: [],
};
