//Register interpreter.evaluate as submit listener
//Change in scheme/ide.js to rewrite a different text element, not entire body
var bscheme = new BiwaScheme.Interpreter(function(e, state) {
        //document.querySelector('.stageframe').contentWindow.document.body.write(e.message);
	
	/*Run function to create text input to the repl*/
        /*Instead of hardcoding these, can store in a different file and programmatically read them in.*/
        /*BiwaScheme.define_scmfunc('length', 1, 1,
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
        )");*/
        
        /*BiwaScheme.define_scmfunc('listrev', 1,
            "(lambda (lst)\
                (listRevHelper lst ()))"
        );*/
        
        /*BiwaScheme.define_scmfunc('lTree', 1,
            "(define (lTree tree)\
                (caddr tree)\
        )");
        
        BiwaScheme.define_scmfunc('rTree', 1,
        "(define (rTree tree)\
	(car tree)\
        )");*/
	
	/*bscheme.evaluate(
	    "(define (lTree tree)\
                (caddr tree)\
        )"
			 );*/
    });

function onSubmit(event){
    bscheme.evaluate(event.data);
}

function handleScript(event){
    console.log(event);
    bscheme.evaluate(event.data, function(result) {
         if (result !== undefined && result !== BiwaScheme.undef) {
                        //console.log(BiwaScheme.to_write(result));
			//getDisplay(document.querySelector('.stageframe')).innerHTML = '<br>' + ' ==> ' + result + '</br>';
                        document.getElementById("display").innerHTML = '<br>' + ' ==> ' + result + '</br>';
                    }
    });
}

window.addEventListener('message', handleScript, false);

//add event listener for submit events

function createInputArea() {
    var node = document.createElement("input");
    node.type = "text";
    node.id = "repl_input";
    document.body.appendChild(node);
    console.log(document);
}

createInputArea();

function createDisplayArea() {
    var display = document.createElement("div");
    display.id = "display";
    document.body.appendChild(display);
}

createDisplayArea();

function initializeIframe() {
    createInputArea(frame);
    createDisplayArea(frame);
}
