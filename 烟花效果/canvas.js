window.onload = function () {
	function Firework() {
		this.colors = ['red', 'blue', 'green', 'yellow', 'pink', 'tan', 'purple', 'orange', 'gold', 'gray', 'white'];
	}

	// 创建画布
	Firework.prototype.createCanvas = function () {
		var
			oCanvas = document.createElement('canvas');
		document.body.appendChild(oCanvas);

		// 获取浏览器窗口的宽高，并赋予canvas
		var
			iClientW = document.documentElement.clientWidth,
			iClientH= document.documentElement.clientHeight;

		oCanvas.width = iClientW;
		oCanvas.height = iClientH;

		oCanvas.style.background = '#000';

		this.cxt = oCanvas.getContext('2d');
		this.iClientW = iClientW;
		this.iClientH = iClientH;
	}

	// 绘画一个小球
	Firework.prototype.drawBall = function () {
		var
			oBall = {
				iX: this.iClientW / 2, // 水平坐标
				iY: this.iClientH - 20, // 垂直坐标
				iSpeedX: Math.pow(-1, Math.ceil(Math.random()*1000)) * (Math.ceil(Math.random() * 6)), // 水平方向的速度
				iSpeedY: 45, // 垂直方向的速度
				color: this.colors[Math.floor(Math.random() * this.colors.length)], // 小球颜色
			};

		if(!this.balls) {
			this.balls = [];
		}
		this.balls.push(oBall);
	}

	// 动起来
	Firework.prototype.moveBall = function () {
		var oThis = this;

		oThis.cxt.clearRect(0, 0, this.iClientW, this.iClientH);

		oThis.balls.forEach(function (v, k) {
			// 绘画小球当前位置
			oThis.cxt.beginPath();
			oThis.cxt.fillStyle = v.color;
			oThis.cxt.arc(v.iX, v.iY, 5, 0, 2 * Math.PI);
			oThis.cxt.fill();
			oThis.cxt.closePath();

			// 更新位置
			oThis.balls[k].iX = v.iX - v.iSpeedX;
			oThis.balls[k].iY = v.iY - v.iSpeedY;

			oThis.balls[k].iSpeedY = v.iSpeedY - 2;

			// 清除离开视野的小球
			if(v.iY > oThis.iClientH) {
				console.log(oThis.iClientH);
				oThis.balls.splice(k, 1);
			}
		});
	}


	var oFirework = new Firework();

	oFirework.createCanvas();

	setInterval(function () {
		oFirework.drawBall();
		oFirework.moveBall();
	},50);
}