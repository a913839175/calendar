;(function($, window, document, undefined) {
    var pluginName = "rili",
        defaults = {
           	id:'',
	 		myDate:new Date(),
			nian:'',
			//月份减1
			yue:'',
			ri:'',
			week:new Array("日", "一", "二", "三", "四", "五", "六"),
			onyue:'',
			dataform:'YY-MM-DD',
        };

    function Rili(element, options) {
        this.element = element;
        this.settings = $.extend({}, defaults, options);
        this._name = pluginName;
        this.init();
    }
    Rili.prototype = {
        init: function() {
    		var _this= this.settings;
    		var that = this;
			that.InitializationmDate();
 			that.InitializationmHtml();
 			that.year();
 			that.month();
 			that.days();
 			that.BindEvent();	
        },
        //年月日数据初始化(默认用今天)
 		InitializationmDate:function(){
 			var _this= this.settings;
    		var that = this;
 			_this.nian = _this.myDate.getFullYear();
			_this.yue =  _this.myDate.getMonth();
			_this.onyue = _this.myDate.getMonth();
			_this.ri = _this.myDate.getDate();	
		},
		//把日历的模型初始化
		InitializationmHtml:function(){
			var _this= this.settings;
    		var that = this;
			var html = "";
			html ='<div class="select-date" style="display: block;">'
			+'<div class="select-date-header"><ul class="heade-ul">'
			+'<li class="header-item header-item-one"><select name="" class="yearList"></select></li>'
			+'<li class="header-item header-item-two" onselectstart="return false">'
			+'<select name="" class="monthList"></select></li>'
			+'<li class="header-item header-item-three" onselectstart="return false"><span class="reback">回到今天</span></li></ul></div>'
			+'<div class="select-date-body">'
			+'<ul class="week-list"><li>日</li><li>一</li><li>二</li><li>三</li><li>四</li><li>五</li><li>六</li></ul>'
			+'<ul class="day-tabel"></ul></div></div>';
			$(_this.id).append(html)	
		},
		//把从1990年开始的年份到今年再加10的年份遍历出来
		year:function(){
			var _this= this.settings;
    		var that = this;
			var html=""
			var endYear = _this.nian + 10;// 获取当前年份
			for (var i = 1990; i <= endYear; i++) {
				if(i == _this.nian){
					html +='<option selected value='+ i +'>'+ i +'年</option>'
				}else{
					html +='<option value='+ i +'>'+ i +'年</option>'
				}
			}
			$(_this.id + ' .yearList').append(html)
		}, 
		//12个月初始化,是为了默认选中这个月
		month:function(){
			var _this= this.settings;
    		var that = this;
			var html=""
			for (var i = 1; i <= 12; i++) {
				if(i == _this.yue + 1){
					html +='<option selected value='+ i +'>'+ i +'月</option>'
				}else{
					html +='<option value='+ i +'>'+ i +'月</option>'
				}
			}
			$(_this.id + ' .monthList').append(html)
		},
 		days:function(){
 			var _this= this.settings;
    		var that = this;
 			var xingqi = "";
 			var tianshu="";
 			var left="";
 			var _yue = _this.yue +1;
 			//上一个月需要补的天数
 			var prevhtml="";
 			//下一个月需要补的天数
 			var nexthtml = "";
 			//一个月中有多少天
			var data = that.mGetDate(_this.nian,_yue)
			for (var i = 1; i <= data; i++){
				if(i === 1){
					//统计上个月的总天数
					var prevdate = that.mGetDate(_this.nian,_this.yue); 
 					//需要补的天数日子
 					var filldate = prevdate - new Date(_this.nian,_this.yue,i).getDay();
 					for(j = filldate;j < prevdate;j++){
 						prevhtml+='<li class="tabel-li preDays" onclick="event.stopPropagation();">'+ j +'</li>';
 					}
				}
				if(i === data){
					//统计下个月的总天数
					var prevdate = 6 - new Date(_this.nian,_this.yue,i).getDay();
 					for(x = 1;x <= prevdate;x++){
 						nexthtml+='<li class="tabel-li nextDay"  onclick="event.stopPropagation();">'+ x +'</li>';
 					}
				}
 				if(parseInt(new Date(_this.nian,_this.yue,i).getDay()) == 0 || parseInt(new Date(_this.nian,_this.yue,i).getDay()) == 6){
 					tianshu+='<li class="tabel-li weekColor">'+ i +'</li>';
 				}else{
 					tianshu+='<li class="tabel-li">'+ i +'</li>';
 				}
 			}
 			tianshu = prevhtml.concat(tianshu,nexthtml)

 			$(_this.id + ' .day-tabel').html(tianshu)
 			//今天的样式和每月1日的样式
 			if(_this.onyue == _this.yue){
 				for(i = 1;i<= $(_this.id + ' .day-tabel li').length;i++){
 					if(i == _this.ri){
 						$(_this.id).find('.day-tabel li').eq(i - 1).addClass('active');
 					}
 				}
 			}else{
				for(i = 1;i<= $(_this.id + ' .day-tabel li').length;i++){
					if($(_this.id + ' .day-tabel li').eq(i).html() == 1){
						$(_this.id).find('.day-tabel li').eq(i).addClass('active');
						break;
					}
				}		
 			}
 		},
 		//每个月份的天数
 		mGetDate:function(year, month){
 			var d = new Date(year, month, 0);
	    	return d.getDate();
 		},
 		//月份不足两位补0
 		Appendzero:function(obj){
	        if(obj<10){
	        	return "0" +""+ obj
	        }else{
	        	return obj
	        }
    	},
    	today:function(dataform,$this){
    		var _this= this.settings;
 			var that = this;
 			console.log(_this);
 			var myDate1 = new Date()
 			var hh = myDate1.getHours();
			var mm = myDate1.getMinutes();
			var ss = myDate1.getSeconds(); 
    		var today = dataform.replace("YY", _this.nian).replace("MM", that.Appendzero(_this.yue + 1)).replace("DD",that.Appendzero($this.html())).replace("hh", that.Appendzero(hh)).replace("mm", that.Appendzero(mm)).replace("ss", that.Appendzero(ss))
    		$(_this.value).val(today)
    		// console.log(today)
    	},
 		BindEvent:function(){
 			var _this= this.settings;
 			var that = this;
 			$(_this.id).on('click','.day-tabel li',function(){
 				that.today(_this.dataform,$(this))
 				$(this).addClass('active').siblings().removeClass('active');
 			})
 			$(_this.id).on('change','.yearList',function(){
 				_this.nian = parseInt($(this).val());
 				that.days();
 			})
 			$(_this.id).on('change','.monthList',function(){
 				_this.yue = parseInt($(this).val()) - 1;
 				that.days();
 			})
 			$(_this.id).on('click','.reback',function(){
 				var nowDate = new Date();
 				_this.nian = nowDate.getFullYear();
				_this.yue = nowDate.getMonth();
				_this.onyue = nowDate.getMonth();
				_this.ri = nowDate.getDate();
				that.days();
				// that.today();
 			})
 		}
    };
    $.fn[pluginName] = function(options) {
        this.each(function() {
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName, new Rili(this, options));
            }
        });
        return this;
    };

})(jQuery, window, document);


