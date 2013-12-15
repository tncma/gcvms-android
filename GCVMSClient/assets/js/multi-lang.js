function getJSON(){
	var jsonlang = {};
	jsonlang.name = $("#langNameTextUI").val();
	jsonlang.projectNatureKey = $("#langKeyUI").val();
	
	var extemp =  $("#langExtUI").val();
	var arr = extemp.split(",");
	jsonlang.extensions =[];
	
	$.each(arr,function(i,v){
		var obj = {};
		obj.extensionName = v;
		jsonlang.extensions.push(obj);
	});
	
	jsonlang.runnerProps = [];
	
	$("tr.prop").each(function() {
		  $this = $(this);
		  var obj = {};
		  obj.propName = $this.find("td.propName").html();
		  obj.propValue =$this.find("td.propValue").html();
		  jsonlang.runnerProps.push(obj);
	});
	return jsonlang;
}

function dosave(){
	console.log(JSON.stringify(getJSON()));
	var client = new MultiLangRestClient();
	client.createLanguage(getJSON());
}

function docreate(){
	var client = new MultiLangRestClient();
	client.createView();

	addRunnersListener();
	$("input").prop("disabled", false);
}

function dodelete(){
	var client = new MultiLangRestClient();
	var id = $('#langSelectUI').val();
	client.deleteLanguage(id);
	
}

function doshow(){
//	 console.log($("select").val()); 
	 var id = $('#langSelectUI').val();
	 console.log("select:"+id);
	 dosearch(id);
}

function dosearch(id){
	
	var client = new MultiLangRestClient();
	client.showView();
	client.fetchLanguageById(id);
	client.allLangNames();

	addRunnersListener();
	$("input").prop("disabled", true);
	$('#langSelectUI').val(id);
	$('#langSelectUI option[value="'+id+'"]').attr('selected', true);
	
//	$("input").blur(function(){
//		  alert("This input field has lost its focus.");
//		});
	
}
function dofetch(){
	
	var client = new MultiLangRestClient();
	client.showView();
	client.firstLanguage();
	client.allLangNames();

	addRunnersListener();
	$("input").prop("disabled", true);
	
//	$("input").blur(function(){
//		  alert("This input field has lost its focus.");
//		});
	
}

function addRunnersListener(){
	$("#addtorunnerbt").click(function(){
		var row='<tr class="prop"><td class="span3 propName">'+$("#adddiv_propName").val()+'</td><td class="span9 propValue">'+$("#adddiv_propValue").val()+'</td></tr>';
		$('#runnertb').append(row);	
		$("#adddiv_propName").val("");
		$("#adddiv_propValue").val("");
	});
}

$(document).ready(function(){
	dofetch();
});



function MultiLangRestClient(){
	this.cqweb="http://localhost:8080/CQWeb/rest/multilang";
	this.getkeys="/getkeys";
	
	this.firstlang= "/firstLanguage";
	
	this.firstLanguage = function (){
		var req = this.cqweb + this.firstlang ;
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
	
	this.fetchLanguageById = function (id){
		var fetchlangById="/getLanguage/id/";
		
		var req = this.cqweb + fetchlangById +id;
		$.getJSON( req, function( data ) {
			console.log( " Language by Id : " + JSON.stringify(data));
			$("#langKeyUI").val(data.projectNatureKey);
			var extString = new Array();
			$.each(data.extensions,function(i,v){
				extString[i] = v.extensionName;
			});
			$("#langExtUI").val(String(extString));
			
			$.each(data.runnerProps,function(i,v){
				var row='<tr><td class="span3">'+v.propName+'</td><td class="span9">'+v.propValue+'</td></tr>';
				$('#runnertb').append(row);	
			});
		});
	};

	this.deltlang = "/deleteLanguage/"; 
	this.deleteLanguage = function(id){
		var req = this.cqweb + this.deltlang + id;
		$.getJSON( req, function( data ) {
			console.log( "status : " + data);
			$('#in-msg').text("Delete Status:"+data);
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
		var select = '<select name="langNames" id="langSelectUI"></select>';

		$.getJSON( req, function( data ) {
			console.log(JSON.stringify(data));
			$('#langNametb').append(select);
			
			$.each(data,function(i,v){
				var names = '<option value="'+v.id+'">'+v.name+'</option>';
				$('#langSelectUI').append(names);
			});

//			$('#langSelectUI').change(function(){
//				var id = $('#langSelectUI').val();
//				console.log("Value:"+$('#langSelectUI').val());
//				dofetch(id);
//			});
		});
		
	};
	
changeLanguage = function(){
	console.log("Value:"+$("#langSelectUI").val());
	//this.fetchLanguageById($("#langSelectUI").val());
	//this.allLangNames();
};


this.createView = function(){
	var langform_dom = '<div id="textdiv">'+
	'<label>Language Name</label><input type="text" id="langNameTextUI"/>'+
	'<label>Eclipse Project Nature Key</label><input type="text" id="langKeyUI">'+
	'<label>Extensions</label><input type="text" id="langExtUI">'+
	'</div>'+
	'<div id="tablediv">'+
	'<div id="adddiv">'+
	'<a id="addtorunnerbt" class="btn"><i class="icon icon-plus"></i>Add</a>'+
		'<label>Property Name</label><input type="text" id="adddiv_propName">'+
		'<label>Property Value</label><input type="text" id="adddiv_propValue">'+
	'</div>'+
	'<table id="runnertb" class="table table-bordered table-hover">'+
		'<thead>'+
			'<tr>'+
				'<th>Property Name</th>'+
				'<th>Property Value</th>'+
			'</tr>'+
		'</thead>'+
	'</table>'+
	'</div>';
	$('#textdiv').remove();
	$('#tablediv').remove();
	$('#langform').append(langform_dom);
	
};

this.showView = function(){
	var langform_dom = '<div id="textdiv">'+
	'<label>Language Name</label><table id="langNametb"></table>'+
	'<label>Eclipse Project Nature Key</label><input type="text" id="langKeyUI">'+
	'<label>Extensions</label><input type="text" id="langExtUI">'+
	'</div>'+
	'<div id="tablediv">'+
	'<div id="adddiv">'+
	'</div>'+
	'<table id="runnertb" class="table table-bordered table-hover">'+
		'<thead>'+
			'<tr>'+
				'<th>Property Name</th>'+
				'<th>Property Value</th>'+
			'</tr>'+
		'</thead>'+
	'</table>'+
	'</div>';
	$('#textdiv').remove();
	$('#tablediv').remove();
	$('#langform').append(langform_dom);
	
};

}
