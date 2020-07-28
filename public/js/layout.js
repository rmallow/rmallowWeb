//table layout

const layout = [
	{
		key: [1,1],
		show: true,
		inner: [
			"<i>just keep scrolling</i>"
		],
		extraClasses: [
			"textTitle",

			"sortaVerticallyCentered"
		],
		css :{
		}
	},
	{
		key: [0,2],
		show: true,
		inner: [
			"<i class=\"fas fa-chevron-right\"></i>"
		],
		extraClasses: [
			"textTitle",
			"noBackground",
			"arrow",
			"sortaVerticallyCentered"
		],
		css :{
		}
	},
	{
		key: [1,3],
		show: true,
		inner: [
			"<i class=\"fas fa-chevron-right\"></i>"
		],
		extraClasses: [
			"textTitle",
			"noBackground",
			"arrow",
			"sortaVerticallyCentered"
		],
		css :{
		}
	},
	{
		key: [2,2],
		show: true,
		inner: [
			"<i class=\"fas fa-chevron-right\"></i>"
		],
		extraClasses: [
			"textTitle",
			"noBackground",
			"arrow",
			"sortaVerticallyCentered"
		],
		css :{
		}
	},
	{
		key: [0,6],
		show: true,
		inner: [
			"<i>t a k e</i>"
		],
		extraClasses: [
			"textTitle",
			"sortaVerticallyCentered"
		],
		css :{
		}
	},
	{
		key: [1,7],
		show: true,
		inner: [
			"<i>a</i>"
		],
		extraClasses: [
			"textTitle",
			"sortaVerticallyCentered"
		],
		css :{
		}
	},
	{
		key: [2,8],
		show: true,
		inner: [
			"<i>j o u r n e y</i>"
		],
		extraClasses: [
			"textTitle",
			"sortaVerticallyCentered"
		],
		css :{
			'background-color':'black',
			'color':'red'
		}
	},
	{
		key: [1,10],
		show: true,
		inner: [
			"<img src = \"https://i.imgur.com/CI9vQb8.gif\">"
		],
		extraClasses: [
			"funImg",
			"sortaVerticallyCentered"
		],
		css :{
			'background-color':'#ffec99'
		}
	},{
		key: [0,13],
		show: true,
		inner: [
			"<i>s i t</i>"
		],
		extraClasses: [
			"textTitle",
			"sortaVerticallyCentered"
		],
		css :{
			'background-color':'#a1ffbf'
		}
	},{
		key: [0,14],
		show: true,
		inner: [
			"<i>b a c k</i>"
		],
		extraClasses: [
			"textTitle",
			"sortaVerticallyCentered"
		],
		css :{
			'background-color':'#ff40e5',
			'color':'#f2f2f2'
		}
	},{
		key: [1,16],
		show: true,
		inner: [
			"<i>j u s t</i>"
		],
		extraClasses: [
			"textTitle",
			"sortaVerticallyCentered",
			"fadeIn",
			"effects",
			"halfWindow"
		],
		css :{
			'background-color':'#ff9ca2',
			'color':'black'
		}
	},{
		key: [1,17],
		show: true,
		inner: [
			"<i>r e l a x</i>"
		],
		extraClasses: [
			"textTitle",
			"sortaVerticallyCentered",
			"fadeIn",
			"effects",
			"halfWindow"
		],
		css :{
			'background-color':'#99fff0'
		}
	}]

var tableLayout = [];

function setupLayout(rows, numCells) {
	tableLayout = [...Array(rows)].map(x=>Array(numCells).fill(0));
	for (let y = 0; y < layout.length; y++) {
		let key = layout[y].key;
		if(key[0] < tableLayout.length && key[1] < tableLayout[key[0]].length) {
			tableLayout[key[0]][key[1]] = layout[y];
		}
	}
	Object.freeze(tableLayout);
}

function checkLayout(i,x) {
	show = false;
	inner = [];
	extraClasses = [];
	css = {};
	if(i < tableLayout.length && x < tableLayout[i].length) {
		if(tableLayout[i][x] != 0) {
			let holder = tableLayout[i][x]
			show = holder.show || false;
			inner = holder.inner || [];
			extraClasses = holder.extraClasses || [];
			css = holder.css || {};
		}
	}
	return [show, inner, extraClasses, css]
}

