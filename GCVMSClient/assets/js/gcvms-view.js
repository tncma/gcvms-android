function dailyJSON(){
	var json = {};
	json.empid = $("#emp").val();
	json.routeId = $("#route").val();
	json.vehicleId = $("#veh").val();
	return json;
}

function loginJSON(){
	var json = {};
	json.uname = $("#uname").val();
	json.pwd = $("#pwd").val();
	json.muni = $("#muni").val();
	return json;
}
var view = new GcvmsView();
var client = new GcvmsClient();
$(document).ready(function(){
	view.loginView();

});

function dologin(){
	client.login();
	view.dailyTripView();
}

function dosave(){
	client.save(dailyJSON());
	client.getall();
}


function GcvmsView(){
	this.uname;
	this.pwd;
	this.muni;
	this.login_dom = '<div id="loginform">'+
	'<label>Username</label><input type="text" id="uname"/>'+
	'<label>Password</label><input type="password" id="pwd">'+
	'<label>Municipality</label><input type="text" id="muni">'+
	'</div>'+
	'<div id="logindiv">'+
	'<a id="loginbt" onclick="dologin()" class="btn"><i class=""></i>Login</a>'+
	'</div>';
	
	this.loginView = function(){
		$('#page').append(this.login_dom);
	};
	
	
	this.daily_dom = '<div id="dailyform">'+
	'<label>Employee Id</label><input type="text" id="emp"/>'+
	'<label>Route Id</label><input type="text" id="route">'+
	'<label>Vehicle Registration Number</label><input type="text" id="veh">'+
	'</div>'+
	'<div id="btdiv">'+
	'<a id="savebt" onclick="dosave()" class="btn"><i class=""></i>Save</a>'+
	'</div>';
	
	this.dailyTripView = function(){
		this.pwd = $("#pwd").val();
		this.uname = $("#uname").val();
		this.muni =  $("#muni").val();
	console.log(this.pwd + this.uname +this.muni);
		$('#page').remove();
		$('#page2').append(this.daily_dom);
		
	};
};