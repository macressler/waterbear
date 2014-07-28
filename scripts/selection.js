(function(wb){
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
    }

    /**
     * Delete all selected blocks from the script.
     */
    function deleteAll() {
    }

    /**
     * Clones all selected blocks and returns a new div element containing
     * the cloned blocks.
     */
    function clone() {
    }

    /**
     * Returns an array of selected blocks.
     */
    function get() {
    }

    /**
     * Returns a selected block that will be executed first regardless of
     * the selecting order.
     */
    function getFirst() {
    }

    /**
     * Returns the first selected block.
     */
    function getFirstSelected() {
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
