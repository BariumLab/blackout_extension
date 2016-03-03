function spoilerShield() {
    var hideStrings = GetStringsToHide();

    var textNodes = GetTextNodesFromDocument();
    for (var i = 0; i < textNodes.length; i++) {
        TestAndBlock(textNodes[i], hideStrings);
    }
};

var GetStringsToHide = function () {
    var strings = [];
    strings.push("Dark Souls 3"); // get these from options for addon

    return strings;
}

var GetTextNodesFromDocument = function () {
    var walker = document.createTreeWalker(
        document.body,
        NodeFilter.SHOW_TEXT,
        null,
        false
    );

    var node;
    var textNodes = [];

    while (node = walker.nextNode()) {
        textNodes.push(node.nodeValue);
    }
    return textNodes;
}

function TestAndBlock(textNode, hideStrings) {
    for (var i = 0; i < hideStrings.length; i++) {
        if (textNode.nodeValue.toLowerCase().search(hideStrings[i].toLowerCase()))
            BlockTextNode(textNode);
    }
}

function BlockTextNode(textNode) {
    var parentElement = GetParentElementOf(textNode);
    if (parentElement != null)
        parentElement.Style = " "; // set style here
}

var GetParentElementOf = function(node)
{
    var parent = node.parentElement;
    if (parent == null)
        return null;
    if (parent.nodeName.toLowerCase() == "div" || parent.nodeName.toLowerCase() == "span")
        return parent;
    return GetParentElementOf(parent);
}
// JavaScript source code
