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

function handleSubmit(event){
    alert('handling event');
    /*bscheme.evaluate(event.data, function(result) {
         if (result !== undefined && result !== BiwaScheme.undef) {
                        document.querySelector(".stage").innerHTML = '<br>' + ' ==> ' + result + '</br>';
                    }
    });*/
}

function handleScript(event){
    bscheme.evaluate(event.data, function(result) {
         if (result !== undefined && result !== BiwaScheme.undef) {
                        document.querySelector(".stage").innerHTML = '<br>' + ' ==> ' + result + '</br>';
                    }
    });
}

window.addEventListener('message', handleScript, false);
//window.addEventListener('submit', handleSubmit, false);

function DetectEnterPressed(e) {
    var characterCode
    if(e && e.which){ // NN4 specific code
        e = e
        characterCode = e.which
    }
    else {
        e = event
    characterCode = e.keyCode // IE specific code
    }
    if (characterCode == 13) return true // Enter key is 13
    else return false
}





//add event listener for submit events

function createInputArea() {
    var node = document.createElement("input");
    node.type = "text";
    node.id = "repl_input";
    node.onkeypress = handleSubmit;
    document.body.appendChild(node);
    console.log(document);
}

createInputArea();