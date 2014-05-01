function acceptInput(interpreter, str) {
    //code
}

//Register interpreter.evaluate as submit listener
//Change in scheme/ide.js to rewrite a different text eleemnt, not entire body
function createInputArea(iframe) {
    var node = iframe.document.createElement("input");
    node.type = "submit";
    node.id = "repl_input";
    iframe.document.body.appendChild(node);
}

function createDisplayArea(frame) {
    var display = iframe.document.createElement("div");
    display.id = "display";
}

function initializeIframe(frame) {
    createInputArea(frame);
    createDisplayArea(frame);
}