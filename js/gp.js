/* 
* @Author: gp
* @Date:   2016-03-14 09:44:33
* @Last Modified by:   Marte
* @Last Modified time: 2016-05-04 09:38:01
*/

$(function() {

    // 首页全部分类
    !
    function() {
        function HMenu(cateList, cateCon, onCla) {
            this.$a = $(cateList);
            this.$b = this.$a.children();
            this.$c = $(cateCon);
            this.$s = onCla;
            this.init();
        }
        HMenu.prototype = {
            constructor:HMenu,
            init: function() {
                var me = this;
                me.$b.each(function(index) {
                    $(this).mouseenter(function() {
                        $(this).siblings("." + me.$s).removeClass(me.$s);
                        me.$c.show();
                        $(this).addClass(me.$s);
                        me.$c.children(":eq(" + index + ")").show().siblings().hide();
                    });
                });
                me.$a.parent().mouseleave(function() {
                    me.$a.children("." + me.$s).removeClass(me.$s);
                    me.$c.hide();

                });

            }

        };
        window.HMenu = HMenu;
    } ();
    var homeMenu = new HMenu('.J-category-list', '.J-category-con', 'tabFocus');
    // 首页全部分类 end
        // 二级页全部分类
    !
    function() {
        function HMenu(cateList, cateCon,subBtn, onCla) {

            this.$a = $(cateList);
            this.$b = this.$a.children();
            this.$c = $(cateCon);
            this.$d = $(subBtn);
            this.$s = onCla;
            this.init();
        }
        HMenu.prototype = {
            constructor:HMenu,
            init: function() {
                var me = this;
               me.$d.mouseover(function(){
                    // alert(); //
                     me.$a.slideDown(100);  
                }

                    );
                me.$b.each(function(index) {
                    $(this).mouseenter(function() {
                        $(this).siblings("." + me.$s).removeClass(me.$s);
                        me.$c.show();
                        $(this).addClass(me.$s);
                        me.$c.children(":eq(" + index + ")").show().siblings().hide();
                    });
                });
                me.$d.parent().mouseleave(function() {
                    me.$a.children("." + me.$s).removeClass(me.$s);
                   me.$a.hide();me.$c.hide();

                });

            }

        };
        window.HMenu = HMenu;
    } ();
    var homeMenu = new HMenu('.J-subcate-list', '.J-subcate-con', '#sub-cate-btn','tabFocus');
    // 二级页全部分类 end
    // 基因知识幻灯
    !
    function() {
        function HSlide(banners_id, focus_id) {
            this.$ctn = $('#' + banners_id);
            this.$focus = $('#' + focus_id);
            this.$adLis = null;
            this.$btns = null;
            this.switchSpeed = 3; //自动播放间隔(s)
            this.defOpacity = 1;
            this.crtIndex = 0;
            this.adLength = 0;
            this.timerSwitch = null;
            this.init();
        };
        HSlide.prototype = {
           constructor:HSlide,
            fnNextIndex: function() {
                return (this.crtIndex >= this.adLength - 1) ? 0 : this.crtIndex + 1;
            },
            //动画切换
            fnSwitch: function(toIndex) {
                //alert(toIndex);  1
                if (this.crtIndex == toIndex) {
                    return;
                }
                this.$adLis.css('zIndex', 0);
                //alert(this.$adLis);
                this.$adLis.filter(':eq(' + this.crtIndex + ')').css('zIndex', 2);
                this.$adLis.filter(':eq(' + toIndex + ')').css('zIndex', 1);
                this.$btns.removeClass('on');
                this.$btns.filter(':eq(' + toIndex + ')').addClass('on');
                var me = this;

                $(this.$adLis[this.crtIndex]).stop().animate({
                    opacity: 0
                },
                300,
                function() {
                    me.crtIndex = toIndex;
                    $(this).css({
                        opacity: me.defOpacity,
                        zIndex: 0
                    });
                });
            },
            fnAutoPlay: function() {
                this.fnSwitch(this.fnNextIndex());
                this.fnPlay();

            },
            fnPlay: function() {
                var me = this;
                me.timerSwitch = window.setTimeout(function() {
                    me.fnAutoPlay();
                },
                me.switchSpeed * 1000);
            },

            fnStopPlay: function() {
                window.clearTimeout(this.timerSwitch);
                //this.timerSwitch = null;
            },

            init: function() {
                this.$adLis = this.$ctn.children();
                this.$btns = this.$focus.children();
                this.adLength = this.$adLis.length;

                var me = this;
                //点击切换
                this.$focus.on('mouseover click', 'a',
                function(e) {
                    e.preventDefault();

                    var index = $(this).index();
                    me.fnSwitch(index);
                });
                this.$adLis.filter(':eq(' + this.crtIndex + ')').css('zIndex', 2);
                this.fnPlay();

                //hover时暂停动画
                this.$ctn.hover(function() {
                    me.fnStopPlay();
                },
                function() {
                    me.fnPlay();
                });
                this.$focus.hover(function() {
                    me.fnStopPlay();
                },
                function() {
                    me.fnPlay();
                });

            }
        };
        var geneSilde = new HSlide('_banners', '_focus');
        var homeSilde = new HSlide('home_banners', 'home_focus');

    } ();
    // 基因知识幻灯  end  

    // 返回顶部
    function BackTop() {
        this.init();
    }
    BackTop.prototype = {
        //constructor: BackTop;
        init: function() {
            this._initBackTop();
        },
        _initBackTop: function() {
            var $backTop = this.$backTop = $('<div class="cbbfixed">' + '<a class="gotop cbbtn">' + '<span class="up-icon"></span>' + '</a>' + '</div>');
            $('body').append($backTop);

            $backTop.click(function() {
                $("html, body").animate({
                    scrollTop: 0
                },
                520);
            });

            var timmer = null;
            $(window).bind("scroll",
            function() {
                var d = $(document).scrollTop();

                0 < d ? $backTop.css("bottom", "100px") : $backTop.css("bottom", "-90px");
                clearTimeout(timmer);

            });
        }

    }
    var BackTop = new BackTop();

});