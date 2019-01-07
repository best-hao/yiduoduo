var AddressId = "",Mobile="",Consignee="",
			Address="",IsDefault=1,Province="",City="",
			County="",Town="",Address = "";


			$(function() {
				$("#Consignee_Map").val("");
			});
			//  编辑地址
			function Editsa(_this) {
				var dom = $($(_this).parents(".list_item"));
				Province = dom.attr("data-province");
				City = dom.attr("data-City");
				County = dom.attr("data-County");
				Town = dom.attr("data-Town");
				AddressId = dom.attr("data-AddressId");
				Mobile = $(dom.find(".phone")).text().trim();
				Address = $(dom.find(".list_body")).text().trim();
				Consignee = $(dom.find(".name")).text().trim();
				$("#S_Address3").attr("data-Province",Province);
				$("#S_Address3").attr("data-City",City);
				$("#S_Address3").attr("data-County",County);
				$("#S_Address3").attr("data-Town",Town);
				if($($(dom).find(".checked_img")).hasClass("checked_img1")) {
					// 默认				
					IsDefault = 1;
					$("#morenMap").attr("checked","checked");
				} else {
					// 不是默认		
					IsDefault= 0;				
					$("#morenMap").removeAttr("checked","checked")	;							
				}
				$("#Consignee_Name").val(Consignee);
				$("#Consignee_Phone").val(Mobile);
				$("#Consignee_Map").val(Address.split("__")[1]);
				BSheng(Province, City, County, Town);
				$("#select_add").show();			
			}

			//  筛选省
			function BSheng(Province, City, County, Town) {
				//	dialog.loading.open('加载中');	
			
				for(var i = 0; i < $("#Province_chioce a").length; i++) {
					var dom = $($("#Province_chioce a")[i]);
					if(Province == $(dom).attr("data-Province")) {
						$("#Province_chioce a").removeClass("crt");
						$($(".cityselect-nav a")[0]).text(dom.text());
						dom.addClass("crt");
						// 筛选市
						$.get('/m/order/GetCityList', {
							'Province': Province
						}, function(data) {
							var datas = JSON.parse(data);
							var dete = datas.Data;
							var html1 = "";
							for(var i = 0; i < dete.length; i++) {
								html1 += '<a class="" href="javascript:;" data-City="' + dete[i].RegionId + '"><span>';
								html1 += dete[i].RegionName + '</span></a>';
							}
							$($("#City_chioce").find("a")).remove();
							$("#City_chioce").append(html1);
							BShi(City, County, Town);
						}, 'JSON');

					} else {

					};
				};

			};
			//  筛选市
			function BShi(City, County, Town) {

				for(var i = 0; i < $("#City_chioce a").length; i++) {
					var dom = $($("#City_chioce a")[i]);
					if(City == $(dom).attr("data-City")) {
						$("#City_chioce a").removeClass("crt");
						$($(".cityselect-nav a")[1]).text(dom.text());
						dom.addClass("crt");
						// 筛选市
						$.get('/m/order/GetCountyList', {
							'City': City
						}, function(data) {
						var datas = JSON.parse(data);
							var dete = datas.Data;
							var html1 = "";
							for(var i = 0; i < dete.length; i++) {
								html1 += '<a class="" href="javascript:;" data-County="' + dete[i].RegionId + '"><span>';
								html1 += dete[i].RegionName + '</span></a>';
							}
							$($("#County_chioce").find("a")).remove();
							$("#County_chioce").append(html1);
							$("#S_City_Show").removeClass('cityselect-prev');
							$("#S_City_Show").addClass('cityselect-next');
							BQu(County, Town);
						}, 'JSON');

					} else {

					};
				};
			};

			//  筛选区
			function BQu(County, Town) {
		

				for(var i = 0; i < $("#County_chioce a").length; i++) {
					var dom = $($("#County_chioce a")[i]);
					if(County == $(dom).attr("data-County")) {
						$("#County_chioce a").removeClass("crt");
						$($(".cityselect-nav a")[2]).text(dom.text());
						dom.addClass("crt");
						// 筛选市
						$.get('/m/order/GetTownList', {
							'County': County
						}, function(data) {
							
						var datas = JSON.parse(data);
					
							var dete = datas.Data;
							var html1 = "";
							for(var i = 0; i < dete.length; i++) {
								html1 += '<a class="" href="javascript:;" data-Town="' + dete[i].RegionId + '"><span>';
								html1 += dete[i].RegionName + '</span></a>';
							}
							$($("#Town_chioce").find("a")).remove();
							$("#Town_chioce").append(html1);
							$("#S_City_Show").removeClass('cityselect-next');
							$("#S_City_Show").addClass('cityselect-end');
							BTown(Town);
						}, 'JSON');

					} else {

					};
				};
			};

			//  筛选镇
			function BTown(Town) {
		
				for(var i = 0; i < $("#Town_chioce a").length; i++) {
					var dom = $($("#Town_chioce a")[i]);
					if(Town == $(dom).attr("data-Town")) {
						$("#Town_chioce a").removeClass("crt");
						$($(".cityselect-nav a")[3]).text(dom.text());
						dom.addClass("crt");
						$(".cityselect-nav a").removeClass("crt");
						$($(".cityselect-nav a")[3]).addClass("crt");
						//	 dialog.loading.close()
					
						$("#S_Address3").val($($(".cityselect-nav a")[0]).text() + "-" + $($(".cityselect-nav a")[1]).text() + "-" + $($(".cityselect-nav a")[2]).text() + "-" + $($(".cityselect-nav a")[3]).text());

						return true;
					} else {

					};
				};
			};

			// 删除地址
			function IsRemove(_this) {
				var AddressId = $($(_this).parents(".list_item")).attr("data-AddressId");
				 $.confirm("您确定要删除吗?", "确认删除?", function() {
					//  删除地址						
						$.post('/m/order/AddressDelete', {
							'AddressId': AddressId
						}, function(data) {
							getAddress();
						}, 'JSON');
				 });
			};
			// 默认地址
			function Isdefault(_this) {
				var dom = $($(_this).parents(".list_item"));
				AddressId = dom.attr("data-AddressId");
				Mobile = $(dom.find(".phone")).text().trim();
				Address = $(dom.find(".list_body")).text().trim();
				Consignee = $(dom.find(".name")).text().trim();
				Province = dom.attr("data-province");
				City = dom.attr("data-City");
				County = dom.attr("data-County");
				Town = dom.attr("data-Town");

				if($($(_this).find(".checked_img")).hasClass("checked_img1")) {
					// 取消默认
					$($(_this).find(".checked_img")).removeClass("checked_img1");
					$($(_this).find(".checked_img")).attr("src", "/Images/checkbox1.png");
					IsDefault = 0;
				} else {
					// 设为默认地址
					$(".checked_img").attr("src", "/Images/checkbox1.png");
					$(".checked_img").removeClass("checked_img1");
					$($(_this).find(".checked_img")).addClass("checked_img1");
					$($(_this).find(".checked_img")).attr("src", "/Images/checked1.png");		
					IsDefault= 1;												
				}
				SaveMap(AddressId,Mobile,Address,Consignee,IsDefault,Province,City,County,Town);
			};
			// 添加地址
			$("#addRess").on("click", function() {
				    AddressId = "";
					$("#select_add").show();
			});
			//  手机号验证
			function isPoneAvailable(phone) {
				var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
				if(!myreg.test(phone)) {
					return false;
				} else {
					return true;
				};
			};
			// 保存地址ajax 
			function SaveMap(AddressId,Mobile,Address,Consignee,IsDefault,Province,City,County,Town){
									$.post('/m/order/AddressSave', {
												AddressId: AddressId,
												Mobile: Mobile,
												Address: Address,
												Consignee: Consignee,
												IsDefault: IsDefault,
												Province: $("#S_Address3").attr("data-Province"),
												City: $("#S_Address3").attr("data-City"),
												County: $("#S_Address3").attr("data-County"),
												Town: $("#S_Address3").attr("data-Town"),
											}, function(datas) {
												getAddress();

											}, 'JSON');	
			};


			//  保存地址
			$(".hideBtn").on("click", function() {
			Mobile=$("#Consignee_Phone").val();Consignee= $("#Consignee_Name").val();
			Address="";IsDefault=1;Province= $("#S_Address3").attr("data-Province");City=$("#S_Address3").attr("data-City");
			County=$("#S_Address3").attr("data-County");Town=$("#S_Address3").attr("data-Town");
			Address = $("#S_Address3").val() + "__" + $("#Consignee_Map").val();
			if($("#morenMap").prop("checked")){
				IsDefault = 1
			}else{
				IsDefault = 0; 
			};
			if(isPoneAvailable(Mobile)){
				//  验证
				if(Province != "" || Province != undefined || City!= "" || City != undefined || County != "" || County!= undefined || Town!="" || Town != undefined ){
						if(Consignee != "" || Consignee != undefined){
								if($("#S_Address3").val() != ""){
										if($("#Consignee_Map").val() != ""){
											SaveMap(AddressId,Mobile,Address,Consignee,IsDefault,Province,City,County,Town);
											$("#select_add input").val("");
											$("#select_add").hide();
										
										}else{
											$.toast("请输入详细地址");	
										}
								}else{
										$.toast("请选择省市区");	
								}


						}else{
							$.toast("姓名不能为空");
						}
				}else{
					$.toast("请选择省市区");
				}
			}else{
				$.toast("手机号有误");
			};


				



			});
			//  隐藏保存地址 
			$("body").on("click", ".m-navbar", function() {
			
				$("#select_add").hide();
			});
			// 获取地址
			$(document).ready(function() {

				getAddress();

			});
			function getAddress(){
				$.showLoading();
				$.get('/m/order/address', {}, function(data) {
				
					var datas = JSON.parse(data);
				
						var dete = datas.Data;
						var html ="";
							for(var i =0; i <dete.length; i++){
								html += '<li class="list_item" data-AddressId="'+dete[i].AddressId+'" data-City="'+dete[i].City+'" data-County="';
								html += dete[i].County+'" data-Province="'+dete[i].Province+'" data-Town="'+dete[i].Town;
								html += '" data-UserId="'+dete[i].UserId+'"';
								html +=  '><div class="list_head"><p class="Myhome">';
								html += '<span class="name">' + dete[i].Consignee + '</span><span class="phone">';
								html += dete[i].Mobile+'</span></p></div><div class="list_body"><p>'+ dete[i].Address;
								html +='</p></div><div class="list_down"><span class="Isdefault" onclick="Isdefault(this)">默认地址';
								if(dete[i].IsDefault == 1){
								html += '<img src="/Images/checked1.png" class="checked_img checked_img1">';
								}else{
								html += '<img src="/Images/checkbox1.png" class="checked_img">';		
								}
								html += '</span><div class="editsa"><span class="Iselit" onclick="Editsa(this)">';
								html += '<i class="iconfont">&#xe639;</i>编辑</span><span class="IsRemove" onclick="IsRemove(this)">';
								html += '<span class="Iselit"><i class="iconfont">&#xe78d;</i>删除</span></div></div></li>';
							};	
							$($(".list_con").find("li")).remove();
							$(".list_con").append(html);
							$.hideLoading();
																				
				}, 'JSON');
			};
		
		<!--//  省市区四联动-->
	
			//   这里是佘坤改的城市4联动
		
			$("#S_Address3").on('click', function(event) {

				
				var html = '<div class="mask-black"></div>';
				$('body').append(html);
				$("#S_Address3").blur();
				$("#Show_City_Four").removeClass("brouce-out");
				$("#Show_City_Four").addClass("brouce-in");

			});
			$("body").on("click", ".mask-black", function() {

				$(this).remove();
				$("#Show_City_Four").removeClass("brouce-in");
				$("#Show_City_Four").addClass("brouce-out");

			});
			//  选择省   加载市区
			$("#Province_chioce").on("click", "a", function() {	
				var dom = $(this).parents("#Province_chioce");
				$($(dom).find("a")).removeClass('crt');
				$(this).addClass('crt');
				Province = $(this).attr("data-province");
				$($(".cityselect-nav").find("a")).removeClass('crt');
				$($($(".cityselect-nav").find("a"))[0]).addClass('crt');
				$($($(".cityselect-nav").find("a"))[0]).text($($(this).find('span')).text().trim());
				$.get('/Order/GetCityList', {
					'Province': Province
				}, function(data) {
				
					var datas = JSON.parse(data);
					var dete = datas.Data;
					var html1 = "";
					for(var i = 0; i < dete.length; i++) {
						html1 += '<a class="" href="javascript:;" data-City="' + dete[i].RegionId + '"><span>';
						html1 += dete[i].RegionName + '</span></a>';
					};
					$($("#City_chioce").find("a")).remove();
					$("#City_chioce").append(html1);
				}, 'JSON');
			});
			//  选择市  加载区
			$("#City_chioce").on('click', 'a', function() {
				var dom = $(this).parents("#City_chioce");
				$($(dom).find("a")).removeClass('crt');
				$(this).addClass('crt');
				$($(".cityselect-nav").find("a")).removeClass('crt');
				$($($(".cityselect-nav").find("a"))[1]).addClass('crt');
				$($($(".cityselect-nav").find("a"))[1]).text($($(this).find('span')).text().trim());
				City = $(this).attr("data-City");
			
				$.get('/Order/GetCountyList', {
					'City': City
				}, function(data) {
					var datas = JSON.parse(data);
					var dete = datas.Data;
					var html1 = "";
					for(var i = 0; i < dete.length; i++) {
						html1 += '<a class="" href="javascript:;" data-County="' + dete[i].RegionId + '"><span>';
						html1 += dete[i].RegionName + '</span></a>';
					};
					$($("#County_chioce").find("a")).remove();
					$("#County_chioce").append(html1);
					$("#S_City_Show").removeClass('cityselect-prev');
					$("#S_City_Show").addClass('cityselect-next');
				}, 'JSON');
			});
			//  选择区  加载城镇
			$("#County_chioce").on('click', 'a', function() {
				var dom = $(this).parents("#County_chioce");
				$($(dom).find("a")).removeClass('crt');
				$(this).addClass('crt');
				County = $(this).attr("data-County");
			
				$($(".cityselect-nav").find("a")).removeClass('crt');
				$($($(".cityselect-nav").find("a"))[2]).addClass('crt');
				$($($(".cityselect-nav").find("a"))[2]).text($($(this).find('span')).text().trim());
				$.get('/Order/GetTownList', {
					'County': County
				}, function(data) {
					var datas = JSON.parse(data);
					var dete = datas.Data;
					var html1 = "";
					for(var i = 0; i < dete.length; i++) {
						html1 += '<a class="" href="javascript:;" data-Town="' + dete[i].RegionId + '"><span>';
						html1 += dete[i].RegionName + '</span></a>';
					}
					$($("#Town_chioce").find("a")).remove();
					$("#Town_chioce").append(html1);
					$("#S_City_Show").removeClass('cityselect-next');
					$("#S_City_Show").addClass('cityselect-end');
				}, 'JSON');
			});
			//  选择镇 
			$("#Town_chioce").on('click', 'a', function() {
				var dom = $(this).parents("#Town_chioce");
				$($(dom).find("a")).removeClass('crt');
				$(this).addClass('crt');
				Town = $(this).attr("data-Town");
				$($(".cityselect-nav").find("a")).removeClass('crt');
				$($($(".cityselect-nav").find("a"))[3]).addClass('crt');
				$($($(".cityselect-nav").find("a"))[3]).text($($(this).find('span')).text().trim());
				$("#Show_City_Four").removeClass("brouce-in");
				$("#Show_City_Four").removeClass("brouce-out");
				$(".mask-black").remove();
				$("#S_Address3").val($($(".cityselect-nav a")[0]).text() + '-' + $($(".cityselect-nav a")[1]).text() + '-' + $($(".cityselect-nav a")[2]).text() + '-' + $($(".cityselect-nav a")[3]).text());
				$("#S_Address3").attr("data-Province",Province);$("#S_Address3").attr("data-City",City);
				$("#S_Address3").attr("data-County",County);
				$("#S_Address3").attr("data-Town",Town);
			});
			// 头部
			$(".cityselect-nav").on('click', 'a', function() {
				$(".cityselect-nav a").removeClass('crt');
				$(this).addClass("crt");
				if($(this).index() == 0) {
					$("#S_City_Show").removeClass('cityselect-next');
					$("#S_City_Show").removeClass('cityselect-end');
					$("#S_City_Show").addClass('cityselect-prev');

				}
				if($(this).index() == 1) {
					$("#S_City_Show").removeClass('cityselect-next');
					$("#S_City_Show").removeClass('cityselect-end');
					$("#S_City_Show").addClass('cityselect-prev');
				}
				if($(this).index() == 2) {

					$("#S_City_Show").removeClass('cityselect-end');
					$("#S_City_Show").removeClass('cityselect-prev');
					$("#S_City_Show").addClass('cityselect-next');
				}
				if($(this).index() == 3) {
					$("#S_City_Show").removeClass('cityselect-next');

					$("#S_City_Show").removeClass('cityselect-prev');
					$("#S_City_Show").addClass('cityselect-end');
				}

			});
		

		
			// 百度地图API功能
			var cityNames = "";
			var map = new BMap.Map("allmap");
			var point = new BMap.Point(116.331398, 39.897445);
			map.centerAndZoom(point, 12);

			function myFun(result) {
				var cityName = result.name;
				map.setCenter(cityName);
				//   这里是当前的城市
				cityNames = cityName;
				getCity(cityNames);
				//	alert("当前定位城市:"+cityName);
			}
			var myCity = new BMap.LocalCity();
			myCity.get(myFun);

			function getCity(cityNames) {
				// 百度地图API功能

				var map = new BMap.Map("l-map");
				console.log(cityNames);
				map.centerAndZoom(cityNames, 12);
			}

			// 初始化地图,设置城市和地图级别。
			function G(id) {
				return document.getElementById(id);
			};
			var ac = new BMap.Autocomplete( //建立一个自动完成的对象
				{
					"input": "Consignee_Map",
					"location": map
				});

			ac.addEventListener("onhighlight", function(e) { //鼠标放在下拉列表上的事件
				var str = "";
				var _value = e.fromitem.value;
				var value = "";
				if(e.fromitem.index > -1) {
					value = _value.province + _value.city + _value.district + _value.street + _value.business;
				};
				str = "FromItem<br />index = " + e.fromitem.index + "<br />value = " + value;

				value = "";
				if(e.toitem.index > -1) {
					_value = e.toitem.value;
					value = _value.province + _value.city + _value.district + _value.street + _value.business;
				};
				str += "<br />ToItem<br />index = " + e.toitem.index + "<br />value = " + value;
				//				G("searchResultPanel").innerHTML = str;
			});

			var myValue;
			ac.addEventListener("onconfirm", function(e) { //鼠标点击下拉列表后的事件
				var _value = e.item.value;
				myValue = _value.province + _value.city + _value.district + _value.street + _value.business;
				//				G("searchResultPanel").innerHTML = "onconfirm<br />index = " + e.item.index + "<br />myValue = " + myValue;
				console.log(myValue); // 这里是地图点击后的获取的汗汉字坐标信息

				setPlace();
			});

			function setPlace() {
				map.clearOverlays(); //清除地图上所有覆盖物
				function myFun() {
					var pp = local.getResults().getPoi(0).point; //获取第一个智能搜索的结果
					map.centerAndZoom(pp, 18);
					map.addOverlay(new BMap.Marker(pp)); //添加标注
				}
				var local = new BMap.LocalSearch(map, { //智能搜索
					onSearchComplete: myFun
				});
				local.search(myValue);
			};