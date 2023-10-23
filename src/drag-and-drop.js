class DragAndDrop {
    constructor(options) {
        this.target = options.target;
        this.target.addEventListener('mousedown', this.onDown.bind(this));
        this.container = options.container

        this.cursorOffset = { x: 0, y: 0, };
        this.containerOffset = { x: 0, y: 0, };
        this._setContainerOffset();
    }

    onMove(e) {
        this.target.transform(e.x - this.cursorOffset.x - this.containerOffset.x, e.y - this.cursorOffset.y - this.containerOffset.y);
    }
    
    onDown(e) {
        this.onMoveListener =  this.onMove.bind(this);
        this.onUpListener =  this.onUp.bind(this);
        this.target.drag();
        
        this._setCursorOffset(e);
        this._setContainerOffset();
        document.addEventListener('mousemove', this.onMoveListener);
        document.addEventListener('mouseup', this.onUpListener);
    }
    
    onUp(e) {
        this.target.drop();
        document.removeEventListener('mousemove', this.onMoveListener);
        document.removeEventListener('mouseup', this.onUpListener);
    }

    _setCursorOffset(e) {
        const rect = this.target.getBoundingClientRect();
        
        this.cursorOffset.x = e.x - rect.x;
        this.cursorOffset.y = e.y - rect.y;
    }

    _setContainerOffset() {
        const rect = this.container.getBoundingClientRect();
        
        this.containerOffset.x = rect.x;
        this.containerOffset.y = rect.y;
    }
}