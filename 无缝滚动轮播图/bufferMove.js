/**
	* 缓冲运动框架
	* obj 要运动的对象
	* oTarget(对象) 包含运动的属性和属性运动完以后的终点值
	* fn 回调函数
*/
function bufferMove(obj, oTarget, fn) {
	// 清除老的定时器
	clearInterval(obj.iTimer);
	// 开启新的定时器
	obj.iTimer = setInterval(function () {
		// 假设所有的属性都已运动完毕
		var bBtn = true;
		//遍历oTarget对象
		for(var sAttr in oTarget) {
			// 获取当前值
			if(sAttr === 'opacity'){
				var iCur = parseInt(getStyle(obj, sAttr) * 100);
			} else {
				var iCur = parseInt(getStyle(obj, sAttr));
			}

			// 计算速度
			var iSpeed = (oTarget[sAttr] - iCur) / 8;
			iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);

			// 计算某个单位时间间隔后的位置
			var iPos = iCur + iSpeed;

			// 修改obj的style属性
			if(sAttr === 'opacity') {
				obj.style.opacity = iPos/100;
				obj.style.filter  = 'alpha(opacity=' + iPos +')';
			} else {
				obj.style[sAttr] = iPos + 'px';
			}

			// 判断属性是否真的已经运动完毕
			if(iPos !== oTarget[sAttr]) {
				bBtn = false;
			}
		}

		// 如果bBtn为true，说明所有的属性均已运动完毕
		if(bBtn) {
			// 清除定时器
			clearInterval(obj.iTimer);
			if(fn) {
				fn.call(obj);
			}
		}
	}, 40);
}

/**
	* 获取属性值
	* obj 获取属性值的对象
	* sAttr 获取值的属性名
*/
function getStyle(obj, sAttr) {
	if(obj.currentStyle) { // 兼容低版本的IE
		return obj.currentStyle[sAttr];
	} else { // 兼容非IE
		return getComputedStyle(obj, null)[sAttr];
	}
}