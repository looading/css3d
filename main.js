var funcList = [];
var requestAnimationFrame = 
	window.requestAnimationFrame ||
	window.mozRequestAnimationFrame || 
	window.webkitRequestAnimationFrame || 
	window.msRequestAnimationFrame || 
	window.oRequestAnimationFrame ||
	function(callback) {
	   setTimeout(callback, 1000 / 60);
	};
var angle = ['0deg', '0deg', '0deg'];

// 3d transform
function transform (element, value, key) {
	key = key || "Transform";
	["Moz", "O", "Ms", "webkit", ""].forEach(function(prefix) {
		element.style[prefix + key]= value;	
	});	
	
	return element;
}
// 获取dom距离
function $(ele) {
	return document.querySelector(ele);
}
// 获取鼠标方向，移动距离
function getDirection(o, x, y) {
	var str = '';
	if( o.x < x ) {
		str += 'R';
	}
	if(o.x > x ) {
		str += 'L';
	}
	if( o.x == x || o.y == y) {
		str += '';
	}
	if( o.y < y ) {
		str += 'D';
	}
	if( o.y > y ) {
		str += 'U';
	}

	var dis = Math.sqrt(Math.pow( o.x - x, 2) + Math.pow( o.y - y, 2));



	return {
		direct: str,
		dis: dis,
		abs: {
			x: parseInt(Math.abs(o.x - x), 10),
			y: parseInt(Math.abs(o.y - y), 10)
		}
	}
}

// 盒子旋转(跟随鼠标)
function letsgo(msg, wrap) {
		switch(msg.direct) {
			case 'R': 
				angle[1] = parseInt(angle[1], 10) + msg.abs.x + 'deg';
				break;
			case 'L': 
				angle[1] = parseInt(angle[1], 10) - msg.abs.x + 'deg';
				break;
			case 'RU': 
				angle[1] = parseInt(angle[1], 10) + msg.abs.x + 'deg';
				angle[0] = parseInt(angle[0], 10) + msg.abs.y + 'deg';
				break;
			case 'RD': 
				angle[1] = parseInt(angle[1], 10) + msg.abs.x + 'deg';
				angle[0] = parseInt(angle[0], 10) - msg.abs.y + 'deg';
				break;
			case 'LU': 
				angle[1] = parseInt(angle[1], 10) - msg.abs.x + 'deg';
				angle[0] = parseInt(angle[0], 10) + msg.abs.y + 'deg';
				break;
			case 'LD': 
				angle[1] = parseInt(angle[1], 10) - msg.abs.x + 'deg';
				angle[0] = parseInt(angle[0], 10) - msg.abs.y + 'deg';
				break;
			case 'U': 
				angle[0] = parseInt(angle[0], 10) + msg.abs.y + 'deg';
				break;
			case 'D': 
				angle[0] = parseInt(angle[0], 10) - msg.abs.y + 'deg';
				break;
			default: 

				break;
		}
		var transformString = 'rotateX(' + angle[0] + ') ' + 'rotateY(' + angle[1] + ') ' + 'rotateZ(' + angle[2] + ')';
		transform(wrap, transformString);
}


// 第一区块 旋转木马
funcList.push(function(i) {
	var container = ['.container', i+1].join('_');
	var box_1 = $(container + ' .box_1');
	var box_2 = $(container + ' .box_2');
	var box_3 = $(container + ' .box_3');
	var box = [ box_1, box_2, box_3  ];
	var boxlist = $('.boxlist');

	var timer;
	var list = [0, 120, 240]
	function go() {
			list = list.map(function(val, index) { 

				var ls = transform(box[index], "translateZ(50px) " + "rotateY(" + val + "deg)");
				return ++val;
			});
			requestAnimationFrame(go);
		}
	requestAnimationFrame(go);
});


// 第二区块 正立方体
funcList.push(function(i) {
	var container = ['.container', i+1].join('_');
	var boxList = $(container + ' .box');
	var wrap = $(container + ' .wrap');
	
	var mouse = {
		x: null,
		y: null
	}

	window.ev = [];
	function handleMove(e) {
		var curX = e.x;
		var curY = e.y;
		if(mouse.x && mouse.y) {
			var res = getDirection(mouse, curX, curY)
			ev.push(res);
			letsgo(res, wrap)
		} 
		mouse.x = curX;
		mouse.y = curY;
	}

	$(container + ' .boxlist').addEventListener('mousemove', handleMove);

})



funcList.map(function(val, index) {
	val(index);
})