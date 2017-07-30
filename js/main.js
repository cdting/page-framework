(function(window) {

    "use strict";
    //页面高度适配
    $(window).on("load resize", function() {
        $("#center").css("height", ($(this).height() - 1) + "px");
    })


    //点击菜单追加tab页
    $("#nav_main_menu").on("click", "a", function(e) {
        e.preventDefault();
        var clickHref = $(this)[0].href;
        var clickText = $(this)[0].innerText;

        //截取html页面名称用于id标识
        var htmlNameExt = clickHref.split('/').pop();
        var htmlName = htmlNameExt.slice(0, htmlNameExt.indexOf('.'));

        if (clickHref.indexOf('#') === -1) {
            //不存在#加页面tab

            //移除选中的li
            $("#myTabs>li").removeClass('active');

            $("#myTabs li a").attr("aria-expanded", "false");

            //tab页选中样式移除
            $("#myTabContent div").removeClass("active in");

            //判断页面是否存在tab标签，存在跳转到指定tab页，不在重复生成 
            if (liIsExist(htmlName)) {
                $("#" + htmlName + "-tab").attr("aria-expanded", "true").parent().addClass("active");
                $("#" + htmlName).addClass("active in");
                return false;
            };

            //追加tab选项卡 
            var tabElement = '<li role="presentation" class="active"><a href="#' + htmlName + '" id="' + htmlName + '-tab" role="tab" data-toggle="tab" aria-controls="' + htmlName + '" aria-expanded="true">';
            tabElement += clickText + '</a> <i class="glyphicon glyphicon-remove small" data-tab-id="' + htmlName + '-tab" data-iframe-id="' + htmlName + '"></i></li>';
            $("#myTabs").append(tabElement);


            //追加iframe 
            var iframeElement = '<div role="tabpanel" class="tab-pane fade active in" id="' + htmlName + '" aria-labelledby="' + htmlName + '-tab">';
            iframeElement += '<iframe src="' + clickHref + '" style="width:100%;height:100%;" frameborder="0"></iframe></div>';
            $("#myTabContent").append(iframeElement);

        }
    });

    //检测tab是否已经存在的li
    function liIsExist(htmlName) {
        var count = 0;
        var id = $('#myTabs a');
        $.each(id, function(key, value) {
            if (value.id === htmlName + "-tab") {
                count++;
            }
        });
        return count;
    };


    //删除tab页
    $("#myTabs").on("click", "i", function() {
        var tabId = this.dataset['tabId'];
        var iframeId = this.dataset['iframeId'];


        var activeClass = $("#" + tabId).parent().attr("class");
        //删除最后一个tab，选中主页tab
        if (activeClass != "" && (activeClass.indexOf("active") !== -1)) {
            $("#" + tabId).parent().prev().addClass("active");
        }
        //移除元素
        $("#" + tabId).parent().remove();
        $("#" + iframeId).remove();
    });


    function fw() {};
    fw.prototype = {
        //初始化菜单
        initMenu: function(jsonData) {
            var treeElement = new Array();
            treeElement.push("<ul class='menu-tree' id='main_menu'>");
            treeElement.push('<li style="padding:14px;"><i class="glyphicon glyphicon-th small"></i> 菜单栏</li>');
            recursion(jsonData, treeElement);
            treeElement.push('</ul>');
            // console.log(treeElement.toString().replace(/\,/g, ''));
            $("#nav_main_menu").html(treeElement.toString().replace(/\,/g, ''));

            //递归菜单树
            function recursion(json, treeElement) {
                $.each(json, function(key, value) {
                    //对象里面还有对象
                    if (toString.call(value) === '[object Object]') {
                        treeElement.push('<li class="abc"><a href="#"><i class="glyphicon glyphicon-menu-hamburger small"></i> ' + key + ' <i class="glyphicon glyphicon-chevron-left pull-right small"></i></a><ul>');

                        recursion(value, treeElement);
                        treeElement.push('</ul></li>');
                    } else {
                        treeElement.push('<li class="abc"><a href="' + value + '"><i class="glyphicon glyphicon-menu-hamburger small"></i> ' + key + '</a></li>')
                    }

                })
            }

        }


    }








    window.fw = new fw();



})(window);