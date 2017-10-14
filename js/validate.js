window.onload = function(){
	function $(id){
		return document.getElementById(id);
	}
	//获取提示框元素
	function getByClass(parent, className){
		var all = parent.getElementsByTagName('*'),
			reg = new RegExp("(^|\\s+)" + className + "(\\s+|$)");

		for(var i = 0, len = all.length; i < len; i++){
			if(reg.test(all[i].className)){
				return all[i];
			}
		}
	}

	//验证输入内容
	function test(str, reg){
		return reg.test(str);
	}
	//添加提示
	function addWarn(elem, str){
		var warn = getByClass(elem.parentNode, "note");
		warn.innerHTML = str;
	}

	var form = $("form"),
		username = 	$("username"),
		password = $("password"),
		passwordConfirm = $("passwordConfirm"),
		email = $("email"),
		tel = $("tel"),
		btn = $("btn");

	var regArr = {
		usernameReg : /^[A-Za-z0-9]{6,16}$/,
		passwordReg : /^[\w]{6,16}$/,
		emailReg : /^[A-Za-z0-9]+([-_.][A-Za-z0-9]+)*@[A-Za-z0-9]+\.[A-Za-z0-9]{2,5}/,
		telReg : /^1[34578][0-9]{9}$/
	}
	
	var blurEvent = {
		username: function(){
			var reg = regArr[this.name + "Reg"],
				val = this.value;

			if(val.length === 0){
				addWarn(this, "用户名不能为空");
				return false;
			}
			if(!test(val, reg)){
				addWarn(this, "请输入正确格式的用户名");
				return false;
			}else{
				addWarn(this, "");
				return true;
			}
		},
		password: function(){
			var reg = regArr[this.name + "Reg"],
				val = this.value;

			if(val.length === 0){
				addWarn(this, "密码不能为空");
				return false;
			}
			if(!test(val, reg)){
				addWarn(this, "请输入正确格式的密码");
				return false;
			}else{
				addWarn(this, "");
				return true;
			}
		},
		passwordConfirm: function(){
			var oriVal = password.value,
				val = this.value;

			if(val.length === 0 || val !== oriVal){
				addWarn(this, "两次密码不同");
				return false;
			}else{
				addWarn(this, "");
				return true;
			}			
		},
		email: function(){
			var reg = regArr[this.name + "Reg"],
				val = this.value;

			if(val.length === 0){
				addWarn(this, "邮箱不能为空");
				return false;
			}
			if(!test(val, reg)){
				addWarn(this, "请输入正确格式的邮箱");
				return false;
			}else{
				addWarn(this, "");
				return true;
			}
		},
		tel: function(){
			var reg = regArr[this.name + "Reg"],
				val = this.value;

			if(val.length === 0){
				addWarn(this, "手机号不能为空");
				return false;
			}
			if(!test(val, reg)){
				addWarn(this, "请输入正确格式的手机号");
				return false;
			}else{
				addWarn(this, "");
				return true;
			}
		}
	}
	
	var input = form.getElementsByTagName("input");

	function initial(){
		for(var i = 0, len = input.length; i < len; i++){
			if(input[i].type !== 'text') return;
			input[i].addEventListener("blur", function(){
				blurEvent[this.name].call(this);
			}, false);
		}
	}
	//初始化，绑定blur事件
	initial();

	btn.addEventListener("click", function(){
		var res = [];

		for(var i = 0, len = input.length; i < len; i++){
			var elem = input[i];
			if(!blurEvent[elem.name].call(elem)){
				return;
			}
		}
		
	}, false);








}