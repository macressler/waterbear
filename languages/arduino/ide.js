/*
 *    ARDUINO PLUGIN
 *
 *    Support for writing Arduino using Waterbear
 *
 */
(function(wb,Event){
    // Add some utilities
    'use strict';


    /* Wrap a script for execution in an iframe */
    // Maybe this should all be moved to runtime?
    wb.wrap = function(script){
        return script;
    };

    // Where is this used? What is it for?
    function assetUrls(){
        return '[' + wb.findAll(document.body, '.workspace .block-menu .asset').map(function(asset){
            // tricky and a bit hacky, since asset URLs aren't defined on asset blocks
            var source = document.getElementById(asset.dataset.localSource);
            return wb.getSocketValue(wb.block.sockets(source)[0]);
        }).join(',') + ']';
    }

    // Try to run the current script.
    // Bail if there is no view to run it in (either preview pane or running full size)
    // Bail if it is already running and hasn't changed
    // Bail if
    function runCurrentScripts(force){
        force = force === true; // ignore stray values like event objects
        
        var blocks = wb.findAll(document.body, '.scripts_workspace');

        for (var i=0; i < blocks.length; i++){
            if (!wb.block.validate(blocks[i])){
                console.warn('Not running script because of invalid block(s)');
                return;
            }
        }

        document.body.classList.add('running');
        if (wb.getState('scriptReady') && wb.getState('stageReady')){
            console.log('ready to run script, let us proceed to the running of said script');
        }else{
            console.log('not ready to run script yet, waiting: scriptReady: %s, stageReady: %s', wb.getState('scriptReady'), wb.getState('stageReady'));
            return;
        }
        // update size of frame
        wb.setState('isRunning', true);
        wb.setState('scriptModified', false);
        wb.runScript( wb.prettyScript(blocks) );
    }
    wb.runCurrentScripts = runCurrentScripts;

    wb.runScript = function(script){
        // console.log('script: %s', script);
        var run = function(){
            wb.script = script;
        };
        /*if (wb.getState('stageReady')){
            // console.log('sending run to the iframe');
            wb.setState('stageReady', false);
            run();
        }else{
            // console.log('waiting for the stage to be ready before we run');
            wb.iframewaiting = run;
        }*/
    };

    function clearStage(event){
    }
    
    wb.clearStage = clearStage;
    Event.on('.clear-stage', 'click', null, clearStage);
    Event.on('.edit-script', 'click', null, clearStage);



    wb.prettyScript = function(elements){
        return js_beautify(elements.map(function(elem){
            return wb.block.code(elem);
        }).join(''));
    };

    wb.writeScript = function(elements, view){
        var code = elements.map(function(elem){
            return wb.block.code(elem);
        }).join('\n');
        view.innerHTML = '<pre class="language-arduino">' + code + '</pre>';
    };

    // End UI section

    // expose these globally so the Block/Label methods can find them
    wb.choiceLists = {
        boolean: ['true', 'false'],
        highlow: ['HIGH', 'LOW'],
        inoutput: ['INPUT', 'OUTPUT'],
        onoff: ['ON', 'OFF'],
        logic: ['true', 'false'],
        digitalpins: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,'A0','A1','A2','A3','A4','A5'],
        analoginpins: ['A0','A1','A2','A3','A4','A5'],
        pwmpins: [3, 5, 6, 9, 10, 11],
        baud:[9600, 300, 1200, 2400, 4800, 14400, 19200, 28800, 38400, 57600, 115200],
        analogrefs:['DEFAULT', 'INTERNAL', 'INTERNAL1V1', 'INTERNAL2V56', 'EXTERNAL']
    };

    // Hints for building blocks
    //
    //
    // Expression blocks can nest, so don't end their scripts with semi-colons (i.e., if there is a "type" specified).
    //
    //

    // Temporarily disable these until I can get time to implement them properly
    // wb.menu('Recent Blocks', []);
    // wb.menu('Favourite Blocks', []);



    Event.on('.socket input', 'click', null, function(event){
        event.target.focus();
        event.target.select();
    });

})(wb, Event);

