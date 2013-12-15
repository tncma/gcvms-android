function MultiLangRestClient1(){
	this.cqweb="http://localhost:8080/CQWeb/rest/multilang";
	this.getkeys="/getkeys";
	
	this.getlang= "/firstLanguage";
	
	this.fetchLanguage = function (){
		var req = this.cqweb + this.getlang ;
		$.getJSON( req, function( data ) {
			console.log( " Language : " + JSON.stringify(data));

			//console.log( "Language Id: " + data.id);
//			console.log( "Language Name: " + data.name);
			$("#langKeyUI").val(data.projectNatureKey);
//			console.log( "Project Nature Key: " + data.projectNatureKey);
			var extString = new Array();
			$.each(data.extensions,function(i,v){
//				console.log( "id: " + v.id );
//				console.log( "ext name: " + v.extensionName );
				extString[i] = v.extensionName;
			});
			$("#langExtUI").val(String(extString));
			
			$.each(data.runnerProps,function(i,v){
//				console.log( "id: " + v.id );
				var row='<tr><td class="span3">'+v.propName+'</td><td class="span9">'+v.propValue+'</td></tr>';
				$('#runnertb').append(row);	
//				console.log( "propName: " +v.propName);
//				console.log( "propValue: " + v.propValue );
			});
		});
	};
	
	this.fetchlangById="/getLanguage/id/";
	this.fetchLanguageById = function (id){
		var req = this.cqweb + this.fetchLangById +id;
		$.getJSON( req, function( data ) {
			console.log( " Language : " + JSON.stringify(data));

			//console.log( "Language Id: " + data.id);
//			console.log( "Language Name: " + data.name);
			$("#langKeyUI").val(data.projectNatureKey);
//			console.log( "Project Nature Key: " + data.projectNatureKey);
			var extString = new Array();
			$.each(data.extensions,function(i,v){
//				console.log( "id: " + v.id );
//				console.log( "ext name: " + v.extensionName );
				extString[i] = v.extensionName;
			});
			$("#langExtUI").val(String(extString));
			
			$.each(data.runnerProps,function(i,v){
//				console.log( "id: " + v.id );
				var row='<tr><td class="span3">'+v.propName+'</td><td class="span9">'+v.propValue+'</td></tr>';
				$('#runnertb').append(row);	
//				console.log( "propName: " +v.propName);
//				console.log( "propValue: " + v.propValue );
			});
		});
	};

	this.deltlang = "/deleteLanguage/"; 
	this.deleteLanguage = function(id){
		var req = this.cqweb + this.deltlang + id;
		$.getJSON( req, function( data ) {
			console.log( "status : " + data);
			
		});
	};
	
	this.create = "/create";
	this.createLanguage = function(data){
		var req = this.cqweb + this.create;
		
//		$.post(req,JSON.stringify(data),function(response){
//			console.log(JSON.stringify(response));
//		});
		
		$.ajax({
	        type: 'POST',
	        contentType: 'application/json',
	        url: req,
	        dataType: "json",
	        data: JSON.stringify(data),
	        success: function(data, textStatus, jqXHR){
	            console.log(data);
	            
	        },
	        error: function(jqXHR, textStatus, errorThrown){
	            console.log('error: ' + textStatus);
	        }
	    });
		
	};
	

	
	this.updateLanguage = function(){
		
	};
	
	
	this.allLangNames = function() {
		var allLang = "/getAllLanguage";
		var req = this.cqweb + allLang;
		$.getJSON( req, function( data ) {
			console.log(JSON.stringify(data));
			var select = '<select name="langNames" id="langSelectUI"></select>';
			$('#langNametb').append(select);
//			var mul = new MultiLangRestClient();
//			$("select").bind("change", mul.changeLanguage());
			
			$.each(data,function(i,v){
				var names = '<option value="'+v.id+'">'+v.name+'</option>';
				$('#langSelectUI').append(names);
			});

			$("#langSelectUI").click(function(){
				console.log($("#langSelectUI").val());
			});
		});
		
	};
	
this.changeLanguage = function(){
	console.log();
	this.fetchLanguageById($(event).val());
	this.allLangNames();
};
	
	
	
}