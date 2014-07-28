(function(wb){
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
    }

    /**
     * Deselects all selected blocks.
     */
    function deselectAll() {
        while (selected.length > 0) {
            selected.pop().classList.remove("selected");
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
