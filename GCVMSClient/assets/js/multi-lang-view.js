function LangViews1(){
	
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
		'<table id="runnertb" class="table table-striped">'+
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
		'<table id="runnertb" class="table table-striped">'+
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
	
};