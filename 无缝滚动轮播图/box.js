/**
 * Created by Administrator on 2016/9/5.
 */
window.onload = function () {
    var
        oBox		= $('box'),
        oImageList  = $('image-list'),
        aImageListLi = byTagName(oImageList, 'li'),
        oBtnList 	= $('btn-list'),
        iLiWidth	= aImageListLi[0].offsetWidth,	// 每个li的宽度
        aBtnListA 	= byTagName(oBtnList, 'a'),
        oDirctionBtn = $('direction-btn'),
        oLeftBtn	 = $('left-btn'),
        oRightBtn	 = $('right-btn'),
        iIndex		 = 1,
        bBtn		 = true, // 默认是可以点击
        iTimer       = null;

    // 复制第四个Li放到第一个位置上面
    oImageList.innerHTML = aImageListLi[4].outerHTML + oImageList.innerHTML + aImageListLi[0].outerHTML;

    // 更新left值
    setStyle(oImageList, {left: - iLiWidth + 'px'});

    // 改变ul的宽度
    setStyle(oImageList, {width: aImageListLi.length * iLiWidth + 'px'})
    for(var i = 0 ; i < aBtnListA.length ; i++){
        aBtnListA[i].index = i;
        aBtnListA[i].onclick = function () {
            bBtn = true;
            iIndex = this.index + 1;
            bufferMove(oImageList, {left: -iIndex * iLiWidth});
            for(var j =0; j < aBtnListA.length; j++) {
                aBtnListA[j].className = "";
            }
            aBtnListA[iIndex - 1].className = "active";
        }
    }

    oBox.onmouseenter = function () {
        setStyle(oDirctionBtn, {display: 'block'});
        clearInterval(iTimer);
    }
    oBox.onmouseleave = function () {
        setStyle(oDirctionBtn, {display: 'none'});
        iTimer = setInterval(function () {
            iIndex++;
            bufferMove(oImageList, {left: - iIndex * iLiWidth}, function () {
                bBtn = true;
                if(iIndex == 1) {
                    setStyle(oImageList, {left: - iLiWidth + "px"});
                }
            });

            for(var j =0; j < aBtnListA.length; j++) {
                aBtnListA[j].className = '';
            }
            if(iIndex == aImageListLi.length - 1) {
                iIndex = 1;
            }
            aBtnListA[iIndex - 1].className = "active";
        }, 3000);
    }

    // 给left添加click事件
    oLeftBtn.onclick = function () {
        if(bBtn) {
            bBtn = false;
            iIndex--;
            bufferMove(oImageList, {left: - iIndex * iLiWidth}, function () {
                bBtn = true;
                if(iIndex == aImageListLi.length - 2) {
                    setStyle(oImageList, {left: -(aImageListLi.length - 2) * iLiWidth + "px"});
                }
            });

            for(var j =0; j < aBtnListA.length; j++) {
                aBtnListA[j].className = '';
            }
            if(iIndex == 0) {
                iIndex = aImageListLi.length - 2;
            }
            aBtnListA[iIndex - 1].className = "active";
        }
    }

    // 给right添加click事件
    oRightBtn.onclick = function () {
        if(bBtn) {
            bBtn = false;
            iIndex++;
            bufferMove(oImageList, {left: - iIndex * iLiWidth}, function () {
                bBtn = true;
                if(iIndex == 1) {
                    setStyle(oImageList, {left: - iLiWidth + "px"});
                }
            });

            for(var j =0; j < aBtnListA.length; j++) {
                aBtnListA[j].className = '';
            }
            if(iIndex == aImageListLi.length - 1) {
                iIndex = 1;
            }
            aBtnListA[iIndex - 1].className = "active";
        }
    }


    // 自动往右跑
    iTimer = setInterval(function () {
        iIndex++;
        bufferMove(oImageList, {left: - iIndex * iLiWidth}, function () {
            bBtn = true;
            if(iIndex == 1) {
                setStyle(oImageList, {left: - iLiWidth + "px"});
            }
        });

        for(var j =0; j < aBtnListA.length; j++) {
            aBtnListA[j].className = '';
        }
        if(iIndex == aImageListLi.length - 1) {
            iIndex = 1;
        }
        aBtnListA[iIndex - 1].className = "active";
    }, 3000);












































    // 通过ID获取DOM对象
    function $(id) {
        return document.getElementById(id);
    }

    // 通过标签名称获取DOM节点列表
    function byTagName(obj, sTagName) {
        return obj.getElementsByTagName(sTagName);
    }

    // 设置DOM节点的style属性
    function setStyle(obj, oTarget) {
        for(var sAttr in oTarget) {
            obj.style[sAttr] = oTarget[sAttr];
        }
    }
}