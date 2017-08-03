(function(window) {
    "use strict";

    function fw() {};
    fw.prototype = {
        autoHeight: function() {
            //页面高度适配
            $(window).on("load resize", function() {
                $("#center").css("height", ($(this).height() - 1) + "px");
                var h = $(".tab-bottom").width();
                $("#mytabs_parent").css("width", h - 200 + "px");

            })
        },
        //初始化菜单
        initMenu: function(id, jsonData) {
            var treeElement = new Array();
            treeElement.push("<ul class='menu-tree' id='main_menu'>");
            treeElement.push('<li style="padding:14px;"><i class="glyphicon glyphicon-th small"></i> 菜单栏</li>');
            recursion(jsonData, treeElement);
            treeElement.push('</ul>');
            // console.log(treeElement.toString().replace(/\,/g, ''));
            $("#" + id).html(treeElement.toString().replace(/\,/g, ''));

            //递归菜单树
            function recursion(json, treeElement) {
                $.each(json, function(key, value) {
                    //对象里面还有对象
                    //在IE中无法识别toString.call,需要在前面加Object.prototype
                    if (Object.prototype.toString.call(value) === '[object Object]') {
                        treeElement.push('<li><a href="#"><i class="glyphicon glyphicon-menu-hamburger small"></i> ' + key + ' <i class="glyphicon glyphicon-chevron-left pull-right small"></i></a><ul>');

                        recursion(value, treeElement);
                        treeElement.push('</ul></li>');
                    } else {
                        treeElement.push('<li><a href="' + value + '"><i class="glyphicon glyphicon-menu-hamburger small"></i> ' + key + '</a></li>')
                    }

                })
            }
        },
        //追加tab类容方法
        appendTabContent: function(clickObj) {
            var clickText = clickObj[0].innerText;
            var clickHref = clickObj[0].href;

            console.log($("#myTabs", window.parent.document));

            //截取html页面名称用于id标识
            var htmlNameExt = clickHref.split('/').pop();
            var htmlName = htmlNameExt.slice(0, htmlNameExt.indexOf('.'));
            //追加tab移除当前选中的li样式
            $("#myTabs>li", window.parent.document).removeClass('active');

            $("#myTabs li a", window.parent.document).attr("aria-expanded", "false");

            //tab页选中样式移除
            $("#myTabContent div", window.parent.document).removeClass("active in");

            //判断页面是否存在tab标签，存在跳转到指定tab页，不在重复生成 
            if (liIsExist(htmlName)) {
                $("#" + htmlName + "-tab", window.parent.document).attr("aria-expanded", "true").parent().addClass("active");
                $("#" + htmlName, window.parent.document).addClass("active in");
                return false;
            };

            //追加tab选项卡 
            var tabElement = '<li role="presentation" class="active"><a href="#' + htmlName + '" id="' + htmlName + '-tab" role="tab" data-toggle="tab" aria-controls="' + htmlName + '" aria-expanded="true">';
            tabElement += clickText + '</a> <i class="glyphicon glyphicon-remove small" data-tab-id="' + htmlName + '-tab" data-iframe-id="' + htmlName + '"></i></li>';
            $("#myTabs", window.parent.document).append(tabElement);


            //追加iframe 
            var iframeElement = '<div role="tabpanel" class="tab-pane fade active in" id="' + htmlName + '" aria-labelledby="' + htmlName + '-tab">';
            iframeElement += '<iframe id="' + htmlName + '" src="' + clickHref + '" style="width:100%;height:100%;" frameborder="0"></iframe></div>';
            $("#myTabContent", window.parent.document).append(iframeElement);

            //检测tab是否已经存在的li
            function liIsExist(htmlName) {
                var count = 0;
                var id = $('#myTabs a', window.parent.document);
                $.each(id, function(key, value) {
                    if (value.id === htmlName + "-tab") {
                        count++;
                    }
                });
                return count;
            };

        },
        //追加tab页
        appendTab: function() {
            var that = this;
            $("#nav_main_menu").on("click", "a", function(e) {
                e.preventDefault();
                //获取点击a标签href
                var clickHref = $(this)[0].href;

                //菜单栏滚动条
                if (($("#center").height() - 100) <= $("#nav_main_menu").height()) {
                    $(".main #header nav#nav_main_menu").attr('style', 'height:' + ($("#center").height()) + "px !important;overflow: auto !important;")
                }

                if (clickHref.indexOf('#') === -1) {
                    //不存在#加页面tab
                    //当屏幕宽度小于765的时候，点击弹出的菜单选项后隐藏菜单
                    $("#nav_main_menu").removeClass("in");
                    //调用tab追加方法
                    that.appendTabContent($(this));

                } else {

                    if (($(this).parent().parent()[0].id) == "main_menu") {
                        //收起打开的菜单
                        $("#nav_main_menu ul").removeClass("in");
                        //菜单右侧icon图标转换
                        $("#nav_main_menu li a i:nth-child(2)").removeClass("glyphicon-chevron-down").addClass("glyphicon-chevron-left");
                    }

                    var iElement = $(this).children("i").eq(1);

                    if (iElement.hasClass('glyphicon-chevron-left')) {

                        iElement.removeClass("glyphicon-chevron-left").addClass("glyphicon-chevron-down");
                    } else {

                        iElement.removeClass("glyphicon-chevron-down").addClass("glyphicon-chevron-left");
                    }

                }
            });

        },

        //删除tab
        deleteTab: function() {
            $("#myTabs").on("click", "i", function() {
                var tabId = this.dataset['tabId'];
                var iframeId = this.dataset['iframeId'];

                var activeClass = $("#" + tabId).parent().attr("class");
                //删除最后一个tab，选中主页tab
                if (activeClass != "" && (activeClass.indexOf("active") !== -1)) {
                    $("#" + tabId).parent().prev().addClass("active");
                    $("#" + iframeId).prev().addClass("active in");
                }
                //移除元素
                $("#" + tabId).parent().remove();
                $("#" + iframeId).remove();
            });
        },

        //关闭其他tab或关闭所有tab
        closeTabAllOrOther: function() {
            $("#close_tab_ul").on("click", "li", function(e) {

                var clickType = this.dataset["type"];
                //关闭全部
                if (clickType === "all") {
                    // myTabContent myTabs
                    $("#myTabs li").each(function(key, value) {
                        if ($(value).children()[0].id !== "home-tab") {
                            $(value).remove();
                        }
                    });

                    $("#myTabContent div").each(function(key, value) {

                        if ($(value)[0].id !== "home") {
                            $(value).remove();
                        }
                    });

                    $("#myTabs li").addClass("active");
                    $("#myTabContent div").addClass("active in");
                } else {
                    //关闭其他

                    $("#myTabs li").each(function(key, value) {
                        if ($(value).children()[0].id !== "home-tab" && !$(value).hasClass("active")) {
                            $(value).remove();
                        }
                    });

                    $("#myTabContent div").each(function(key, value) {
                        if ($(value)[0].id !== "home" && !$(value).hasClass("active")) {
                            $(value).remove();
                        }
                    });
                }
                console.log($(this).parent().parent());
                $(this).parent().parent().css("overflow", "hidden");
            });
        }
    }
    window.fw = new fw();


})(window);