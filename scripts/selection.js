(function(wb) {
    var selected = [];
    var ascending = false;

    /**
     * Selects one particular block or a range of blocks.
     *
     * If it is a single selection, then the target block will be selected.
     * If it is a multiple selection, then a block will be selected if and only
     * if it is in the script workspace and:
     *   1. no block has been selected, or
     *   2. it is in the same scope as other selected blocks, or
     *   3. it is between the first selected block and the target block.
     */
    function select(target, multiselect) {
        // Handle single selection
        if (!multiselect) {
            // Select the block if it is not selected
            // Ignore the selection if it is already selected
            if (selected.indexOf(target) == -1) {
                deselectAllBlocks();
                target.classList.add('selected');
                selected.push(target);
            }

            Event.trigger(target, 'wb-select');

            return;
        }

        // Disable multiselect for blocks outside of the workspace
        if (wb.closest(target, '.scripts_workspace') === null) { return; }

        // Disable multiselect for blocks in the block menu
        if (wb.matches(target.parentElement, '.block-menu')) { return; }

        // Handle multiple selection
        var nodes = wb.makeArray(selected[0].parentNode.children);
        var firstIndex = nodes.indexOf(selected[0]);
        var targetIndex = nodes.indexOf(target);

        // Only select blocks if target block is on the same level
        if (targetIndex > -1) {
            deselectAllBlocks();

            var step;

            if (firstIndex < targetIndex) {
                ascending = true;
                step = 1;
            } else {
                ascending = false;
                step = -1;
            }

            for (var i = firstIndex; i != targetIndex + step; i += step) {
                nodes[i].classList.add('selected');
                selected.push(nodes[i]);
                Event.trigger(nodes[i], 'wb-select');
            }
        }
    }

    /**
     * Deselects all selected blocks.
     */
    function deselectAll() {
        while (selected.length > 0) {
            var node = selected.pop();
            node.classList.remove('selected');
            Event.trigger(node, 'wb-deselect');
        }
    }

    /**
     * Delete all selected blocks from the script.
     */
    function deleteAll() {
        for (var i = 0; i < selected.length; i++) {
            selected[i].classList.remove('selected');
            Event.trigger(selected[i], 'wb-remove');
            Event.trigger(selected[i], 'wb-delete');
            selected[i].parentElement.removeChild(selected[i]);
        }

        selected.length = 0;
    }

    /**
     * Clones all selected blocks and returns a new div element containing
     * the cloned blocks.
     */
    function clone() {
        var div = wb.elem('div');

        for (var i = 0; i < selected.length; i++) {
            var index = ascending ? i : selected.length - 1 - i;
            var clonedBlock = wb.block.clone(selected[index]);
            Event.trigger(selected[index], 'wb-clone');
            div.appendChild(clonedBlock);
        }

        return div;
    }

    /**
     * Returns an array of selected blocks.
     */
    function get() {
        return selected;
    }

    /**
     * Returns a selected block that will be executed first regardless of
     * the selecting order.
     */
    function getFirst() {
        return ascending ? selected[0] : selected[selected.length - 1];
    }

    /**
     * Returns the first selected block.
     */
    function getFirstSelected() {
        return selected[0];
    }

    wb.selection = {
        select: select,
        deselectAll: deselectAll,
        deleteAll: deleteAll,
        clone: clone,
        get: get,
        getFirst: getFirst,
        getFirstSelected: getFirstSelected
    }
})(wb);
