function GcvmsClient(){
	this.gcvms="http://10.11.96.250:8080/gcvms/rest/daily";
	this.getall="/getallvehicle";
	
	this.getall = function(){
		var req= this.gcvms + this.getall;
		$.getJSON( req, function( data ) {
		console.log(JSON.stringify(data));
		});		
	};

	this.loginurl="/login";
	this.login = function(){
		var req= this.gcvms + this.loginurl;
		$.getJSON( req, function( data ) {
		console.log(JSON.stringify(data));
		});		
	};

	this.create = "/create";
	
	this.save = function(data){
		var req = this.gcvms + this.create;
//		$.getJSON( req, function( data ) {
//		console.log(JSON.stringify(data));
//		});		
		
		$.ajax({
	        type: 'POST',
	        contentType: 'application/json',
	        url: req,
	        dataType: "json",
	        data: JSON.stringify(data),
	        success: function(data, textStatus, jqXHR){
	            console.log(data);
	           alert('Saved Successfully!!'); 
	        },
	        error: function(jqXHR, textStatus, errorThrown){
	            alert('Saved Successfully!!'); 
	  	   // 	console.log('error: ' + textStatus);
	        }
	
		});
		
	};
}