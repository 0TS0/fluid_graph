class Vec2 {
    constructor(x, y) {
        this.x = x ?? 0;
        this.y = y ?? 0;
    }

    set(x, y) {
        this.x = x ?? this.x;
        this.y = y ?? this.y;
    }

    add(x, y) {
        this.x += x ?? 0;
        this.y += y ?? 0;
    }

    reset() {
        this.x = 0;
        this.y = 0;
    }
}