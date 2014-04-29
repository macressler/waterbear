/*
 * SCHEME PLUGIN
 *
 * Support for writing Scheme in Waterbear
 */

(function(wb, Event){
 'use strict';
    //var schemeLibText = document.insertBefore();
    var bscheme = new BiwaScheme.Interpreter(function(e, state) {
        //document.querySelector('.stageframe').contentWindow.document.body.write(e.message);
	document.getElementsByTagName('iframe')[0].document.style.background = '#000000';
        /*Instead of hardcoding these, can store in a different file and programmatically read them in.*/
        BiwaScheme.define_scmfunc('length', 1, 1,
        "(lambda (lst n)\
	(if (equal? lst '())\
		n\
		(length (cdr lst) (+ n 1))\
	))");
        
        BiwaScheme.define_scmfunc('listrevhelper', 1, 1,
        "(lambda (lst acc)\
	(if (equal? () lst)\
		acc\
		(listRevHelper (cdr lst) (cons (car lst) acc)\
		)\
	)\
        )");
        
        BiwaScheme.define_scmfunc('listrev', 1,
            "(lambda (lst)\
                (listRevHelper lst ()))"
        );
        
        /*BiwaScheme.define_scmfunc('lTree', 1,
            "(define (lTree tree)\
                (caddr tree)\
        )");
        
        BiwaScheme.define_scmfunc('rTree', 1,
        "(define (rTree tree)\
	(car tree)\
        )");*/
        
        BiwaScheme.define_scmfunc('data')
    });

    //You could run your SchemeLibrary.lisp file right here and all functions
    //will be accessible
    //Load file into 
    //bscheme.evaluate();
    
    
    wb.runScript = function(script){
        var run = function(){
            wb.script = script;
            var scriptArray = script.split(";;end");
	    console.log("HEY RIGHT HERE!");
            document.querySelector('.stageframe').contentWindow.document.body.innerHTML = "";
            for(var i = 0; i < scriptArray.length; i++) {
                //console.log('THIS IS IMPORTANT:' + scriptArray[i]);
                bscheme.evaluate(scriptArray[i], function(result) {
                    if (result !== undefined && result !== BiwaScheme.undef) {
                        console.log(BiwaScheme.to_write(result));
                        document.querySelector('.stageframe').contentWindow.document.body.innerHTML = '==> ' + result + '<br>';
                    }
                });
            }
        }
        run();
    }

    wb.writeScript = function(elements, view){
        var script = elements.map(function(elem){
            return wb.codeFromBlock(elem);
        }).join('');
        view.innerHTML = '<pre class="language-scheme">' + script + '</pre>';
    };

    wb.wrap = function(script){ //doesn't do anything
        return "";
    }
    
    function runCurrentScripts(force){
        // console.log('runCurrentScripts: %s', runCurrentScripts.caller.name);
        if (!(wb.autorun || force)){
            // false alarm, we were notified of a script change, but user hasn't asked us to restart script
            return;
        }
        document.body.classList.add('running');
        if (!wb.scriptLoaded){
            console.log('not ready to run script yet, waiting');
            Event.on(document.body, 'wb-script-loaded', null, wb.runCurrentScripts);
            return;
        }else{
            console.log('ready to run script, let us proceed to the running of said script');
        }
        var blocks = wb.findAll(document.body, '.workspace .scripts_workspace');
        wb.runScript( wb.prettyScript(blocks) );
    }
    wb.runCurrentScripts = runCurrentScripts;
 
    function clearStage(event){
        wb.iframeReady = false;
        //document.querySelector('.stageframe').contentWindow.document.body.innerHTML = '';
	document.getElementsByTagName('iframe')[0].document.body.innerHTML = '';
    }
    wb.clearStage = clearStage;

    //TODO: add extra block types: In Scheme, everything is a value, and these need to be able to exist on their own
    // expose these globally so the Block/Label methods can find them
     wb.choiceLists = {
        boolean: ['#t', '#f'],
        keys: 'abcdefghijklmnopqrstuvwxyz0123456789*+-./'
            .split('').concat(['up', 'down', 'left', 'right',
            'backspace', 'tab', 'return', 'shift', 'ctrl', 'alt',
            'pause', 'capslock', 'esc', 'space', 'pageup', 'pagedown',
            'end', 'home', 'insert', 'del', 'numlock', 'scroll', 'meta']),
        blocktypes: ['step', 'expression', 'context', 'eventhandler', 'asset'],
        types: ['string', 'number', 'boolean', 'array', 'object', 'function', 'any'],
        rettypes: ['none', 'string', 'number', 'boolean', 'array', 'object', 'function', 'any']
    };
    
     wb.prettyScript = function(elements){
        return elements.map(function(elem){
            return wb.codeFromBlock(elem);
        }).join('');
    };
})(wb, Event);
