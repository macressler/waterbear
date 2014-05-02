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
    var display = document.createElement("div");
    display.id = "display";
    document.body.appendChild(display);
}

createDisplayArea();

function initializeIframe() {
    createInputArea(frame);
    createDisplayArea(frame);
}

function name(args) {
    //code
}