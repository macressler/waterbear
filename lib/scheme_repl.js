function acceptInput(interpreter, str) {
    //code
}

//Change in scheme/ide.js to rewrite a different text eleemnt, not entire body
function createInputArea(iframe) {
    var node = iframe.document.createElement("input");
    node.type = "submit";
    node.id = "repl_input";
    iframe.document.body.appendChild(node);
    
}