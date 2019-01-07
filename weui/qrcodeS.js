
$(document).ready(function() {
	initCode();
	initImage();
})

function initCode() {
	$($("#qrCode").find("img")).remove();
	new QRCode(document.getElementById("qrCode"), Uid);

}

function initImage() {
	$("#imgcode").barcode(Uid, "code128", {
		output: 'css', //渲染方式 css/bmp/svg/canvas
		//bgColor: '#ff0000', //条码背景颜色
		color: '#000000', //条码颜色
		barWidth: 2, //单条条码宽度
		barHeight: 100, //单体条码高度
		// moduleSize: 5,   //条码大小
		// posX: 10,        //条码坐标X
		// posY: 5,         //条码坐标Y
		addQuietZone: false //是否添加空白区（内边距）
	});
}
//  倒计时
var time = 120;

var ints = setInterval("ClearTime()", 1000);

function ClearTime() {
	if(time == 1) {
		$(".time").text("已过期,点击刷新")
		$(".timesss").text("")
		clearInterval(ints)
		time = 3;

	} else {
		time--;
		$(".time").text(time)
		$(".timesss").text("秒后过期")
	}
}
//	clearInterval(ints)

$(".back").click(function() {
	history.back();
})

$(".footer").on("click", function() {

	if($($(this).find(".time")).text() == "已过期,点击刷新") {
		initCode();
		initImage();
		console.log("开始刷新")
		time = 120;
		ints = setInterval("ClearTime()", 1000);
	} else {

	}
})