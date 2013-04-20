(function($){

function clearScripts(event, force){
    if (force || confirm('Throw out the current script?')){
        $('.workspace > .scripts_workspace').remove();
        createWorkspace('Workspace');
		$('.workspace > .scripts_text_view').empty();
    }
}
$('.clearScripts').click(clearScripts);
$('.editScript').click(function(){
	document.body.className = 'editor';
	wb.buildDelayedMenus();
	wb.loadCurrentScripts(wb.queryParams);
});

$('.goto_stage').click(function(){
	document.body.className = 'result';
});

// Load and Save Section


function saveCurrentScripts(){
    showWorkspace();
    $('#block_menu')[0].scrollIntoView();
    localStorage.__current_scripts = wb.Block.serialize();
}
$(window).unload(saveCurrentScripts);

function scriptsToString(title, description){
    if (!title){ title = ''; }
    if (!description){ description = ''; }
    return JSON.stringify({
        title: title,
        description: description,
        date: Date.now(),
        scripts: wb.Block.scriptsToObject('.scripts_workspace')
    });
}


function createDownloadUrl(evt){
    var URL = window.webkitURL || window.URL;
    var file = new Blob([scriptsToString()], {type: 'application/json'});
    var reader = new FileReader();
    var a = document.createElement('a');
    reader.onloadend = function(){
        a.href = reader.result;
        a.download = 'script.json';
        a.target = '_blank';
        document.body.appendChild(a);
        a.click();
    };
    reader.readAsDataURL(file);
    evt.preventDefault();
}

function comingSoon(evt){
    alert('Restore will be working again soon. You can drag saved json files to the script workspace now.');
}

$('.save_scripts').on('click', createDownloadUrl);
$('.restore_scripts').on('click', comingSoon);

function loadScriptsFromObject(fileObject){
    // console.info('file format version: %s', fileObject.waterbearVersion);
    // console.info('restoring to workspace %s', fileObject.workspace);
    // FIXME: Make sure we have the appropriate plugins loaded
	if (!fileObject) return createWorkspace();
    var blocks = fileObject.blocks.map(function(spec){
        return wb.Block(spec);
    });
    if (!blocks.length){
        return createWorkspace();
    }
    if (blocks.length > 1){
        console.log('not really expecting multiple blocks here right now');
    }
    blocks.forEach(function(block){
        var view = block.view()[0]; // FIXME: strip jquery wrapper
        wireUpWorkspace(view);
        block.script = '[[1]]';
        // wb.addToScriptEvent(workspace, view);
    });
    wb.loaded = true;
}

function loadScriptsFromGist(gist){
	var keys = Object.keys(gist.data.files);
	var file;
	keys.forEach(function(key){
		if (/.*\.json/.test(key)){
			// it's a json file
			file = gist.data.files[key].content;
		}
	});
	if (!file){
		console.log('no json file found in gist: %o', gist);
		return;
	}
	loadScriptsFromObject(JSON.parse(file).scripts);
	$(document.body).trigger('scriptloaded');
}

function runScriptFromGist(gist){
	console.log('running script from gist');
	var keys = Object.keys(gist.data.files);
	var file;
	keys.forEach(function(key){
		if (/.*\.js$/.test(key)){
			// it's a javascript file
			console.log('found javascript file: %s', key);
			file = gist.data.files[key].content;
		}
	});
	if (!file){
		console.log('no javascript file found in gist: %o', gist);
		return;
	}
	wb.runScript(file);
}


wb.loaded = false;
wb.loadCurrentScripts = function(queryParsed){
    if (wb.loaded) return;
    console.log('loading current scripts');
	if (queryParsed.gist){
		$.ajax({
			url: 'https://api.github.com/gists/' + queryParsed.gist,
			type: 'GET',
			dataType: 'jsonp',
			success: loadScriptsFromGist
		});
	}else if (localStorage.__current_scripts){
        var fileObject = JSON.parse(localStorage.__current_scripts);
        if (fileObject){
            loadScriptsFromObject(fileObject);
        }
    }
};

wb.runCurrentScripts = function(queryParsed){
	if (queryParsed.gist){
		$.ajax({
			url: 'https://api.github.com/gists/' + queryParsed.gist,
			type: 'GET',
			dataType: 'jsonp',
			success: runScriptFromGist
		});
	}else if (localStorage.__current_scripts_js){
		var fileObject = localStorage.__current_scripts_js;
		if (fileObject){
			wb.runScript(fileObject);
		}
	}
}


// Allow saved scripts to be dropped in
function createWorkspace(name){
    var id = uuid();
    var workspace = wb.Block({
        group: 'scripts_workspace',
        id: id,
        scriptid: id,
        blocktype: 'context',
        label: name,
        script: '[[1]]',
        isTemplateBlock: false,
        help: 'Drag your script blocks here'
    }).view()[0];
    wireUpWorkspace(workspace);
}

function wireUpWorkspace(workspace){
    workspace.addEventListener('drop', getFiles, false);
    workspace.addEventListener('dragover', function(evt){evt.preventDefault();}, false);
    document.querySelector('.workspace').appendChild(workspace);
    workspace.querySelector('.contained').appendChild(wb.elem('div', {'class': 'dropCursor'}));
    wb.initializeDragHandlers();
    wb.Block.initializeSocketUpdates();
    wb.Block.initializeDisclosures();
}

function handleDragover(evt){
    // Stop Firefox from grabbing the file prematurely
    evt.stopPropagation();
    evt.preventDefault();
    evt.dataTransfer.dropEffect = 'copy';
}

function getFiles(evt){
    evt.stopPropagation();
    evt.preventDefault();
    var files = evt.dataTransfer.files;
    if ( files.length > 0 ){
        // we only support dropping one file for now
        var file = files[0];
        if ( file.type.indexOf( 'json' ) === -1 ) { return; }
        var reader = new FileReader();
        reader.readAsText( file );
        reader.onload = function (evt){
            clearScripts(null, true);
            var saved = JSON.parse(evt.target.result);
            loadScriptsFromObject(saved.scripts);
        };
    }
}



})(jQuery);
