function acceptInput(interpreter, str) {
    //code
}

//Register interpreter.evaluate as submit listener
//Change in scheme/ide.js to rewrite a different text eleemnt, not entire body
function createInputArea() {
    var node = document.createElement("input");
    node.type = "text";
    node.id = "repl_input";
    document.body.appendChild(node);
    console.log(document);
}

createInputArea();

function createDisplayArea() {
    var display = iframe.document.createElement("div");
    display.id = "display";
    
}

function initializeIframe(frame) {
    createInputArea(frame);
    createDisplayArea(frame);
}

function name(args) {
    //code
}