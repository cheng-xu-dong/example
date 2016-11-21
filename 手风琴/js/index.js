window.onload = function () {
	var
		oBox = $('box'),
		aBoxLi = byTagName(oBox, 'li');

	for(var i=0; i < aBoxLi.length; i++) {
		// 初始化布局
		if( i === 0) {
			aBoxLi[i].style.left = 0;
		} else {
			aBoxLi[i].style.left = 500 + i * 100  + 'px';
		}

		// 添加mouseenter事件
		aBoxLi[i].index = i;
		aBoxLi[i].onmouseenter = function () {
			for(var j =0; j < aBoxLi.length; j++) {
				if(j <= this.index) {
					bufferMove(aBoxLi[j], {left: j * 100});
				} else {
					bufferMove(aBoxLi[j], {left: 500 + j * 100});
				}
			}	
		}
	}
	function $(id) {
		return document.getElementById(id);
	}
	function byTagName(obj, sTagName) {
		return obj.getElementsByTagName(sTagName);
	}
}