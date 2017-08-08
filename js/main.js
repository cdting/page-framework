(function(window) {
    "use strict";

    function fw() {};
    fw.prototype = {
        // // 绑定事件
        // bindEvent: function(parentEle, bindEle, eventType, fn) {

        //     $(parentEle).on(eventType, bindEle, fn);
        // },
        //点击tab关闭按钮，显示或关闭弹框
        tabCloseBottomPopDownOrUp: function() {
            $("#close_tab").on("click", "a", function(event) {
                var of = $(this).parent().css("overflow");
                if (of === "hidden") {
                    $(this).parent().css("overflow", "visible");
                } else {
                    $(this).parent().css("overflow", "hidden");
                }
            })
        },
        //激活层级菜单
        metisMenu: function() {
            $('#nav_main_menu').metisMenu();
        },
        autoHeight: function() {
            var that = this;
            //页面高度适配

            $(window).on("load resize", function() {
                $("#center").css("height", ($(this).height() - 1) + "px");
                var h = $(".tab-bottom").width();

                //初始化tab宽度
                var w = $("body").width();
                // console.log(w);
                if (w > 768) {
                    $("#mytabs_parent").css("width", h - 200 + "px");
                } else {
                    $("#mytabs_parent").css("width", w - 100 + "px");
                    //一处
                }
                that.getTabWidth();
            })
        },
        //初始化菜单
        initMenu: function(id, jsonData) {
            var treeElement = new Array();
            treeElement.push("<ul class='menu-tree' id='main_menu'>");
            treeElement.push('<li style="padding:14px;"><i class="glyphicon glyphicon-th small"></i> 菜单栏 <i id="close_menu" class="close-menu glyphicon glyphicon-backward small pull-right"></i></li>');
            recursion(jsonData, treeElement);
            treeElement.push('</ul>');
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
                this.tabAutoSlide();
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

            //实时设置tab宽度
            this.getTabWidth();

            //tab自动滑动效果
            this.tabAutoSlide();

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
        tabAutoSlide: function() {
            setTimeout(function() {
                var tabOffsetLeft = $("#myTabs li.active", window.parent.document).get(0).offsetLeft;
                var myTabsWidth = $("#myTabs", window.parent.document).width();
                var myTabsParent = $("#mytabs_parent", window.parent.document).width();

                if (myTabsWidth > myTabsParent) {

                    var value = -(tabOffsetLeft - (myTabsParent / 2 - 50));
                    if (value < 0) {
                        $("#myTabs", window.parent.document).css("left", value);
                    } else {
                        $("#myTabs", window.parent.document).css("left", 0);
                    }
                } else {
                    $("#myTabs", window.parent.document).css("left", 0);
                }
            }, 50);

        },
        //实时设置tab宽度
        getTabWidth: function() {
            var tabWidthCount = 0;
            // var count = 0;
            $("#myTabs li", window.parent.document).each(function(key, value) {
                tabWidthCount += $(value).width();
                // count++;
            });

            $("#myTabs", window.parent.document).css("width", tabWidthCount + 30);
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
            var that = this;
            $("#myTabs").on("click", "i", function(e) {
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

                //实时设置tab宽度
                that.getTabWidth();
            });
        },

        //关闭其他tab或关闭所有tab
        closeTabAllOrOther: function() {
            var that = this;

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
                $(this).parent().parent().css("overflow", "hidden");


                //实时设置tab宽度
                that.getTabWidth();
                //关闭所有或其它tab时还原首页位置
                $("#myTabs").css("left", 0);
            });
        },
        //tab标签滑动效果
        tabSlide: function() {
            var that = this;
            $("#tab_bottom").on("click", "i", function(e) {
                e.preventDefault();
                var $offsetLeft = $("#myTabs").get(0).offsetLeft;
                var $offsetRight = $("#myTabs").width();
                var $mytabsParent = $("#mytabs_parent").width();

                var $offsetLeft = $("#myTabs").scroll().get(0).offsetLeft;

                var clickType = this.dataset["type"];
                if (clickType === "left") {
                    if ($offsetRight < $mytabsParent || -$offsetLeft >= $offsetRight / 2) {
                        return;
                    }
                    $(this).next().children().css("left", $offsetLeft -= 50);
                } else {
                    if ($offsetLeft >= 0) {
                        $(this).prev().children().css("left", 0);
                        return;
                    }
                    $(this).prev().children().css("left", $offsetLeft += 50);
                }
            });
        },
        //显示或隐藏菜单栏
        showOrHideMenu: function() {

            $("#close_menu").on("click", function() {
                $(".center-right").css({
                    "padding-left": "35px"
                })
                var iElement = '<i id="show_menu" class="glyphicon glyphicon-forward small show-menu"></i>';
                $("#menu_bgc").css("width", "30px");
                $("#menu_bgc").append(iElement);

                $(".center-left").attr("style", "display:none !important");

            });

            $("#menu_bgc").on("click", "#show_menu", function() {
                $(".center-right").css({
                    "padding-left": "260px"
                })

                $("#menu_bgc").css("width", "250px");


                $(".center-left").attr("style", "");
                $(this).remove();
            })
        },
        //点击tab的li剧中显示
        clickTabLiCenter: function() {
            var that = this;
            $("#myTabs").on("click", "li", function() {
                that.tabAutoSlide();
            })
        }
    }
    window.fw = new fw();


})(window);