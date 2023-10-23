class Distance {
    get currentDistance() {
        return Math.sqrt(Math.pow(this.distanceX, 2) + Math.pow(this.distanceY, 2));
    }

    get distanceX() {
        return this.vertex1.x - this.vertex2.x;
    }

    get distanceY() {
        return this.vertex1.y - this.vertex2.y;
    }
    
    constructor(options) {
        this.vertex1 = options.vertex1;
        this.vertex2 = options.vertex2;
        this.distance = options.distance ?? 400;

        this.controller = new Controller({
            kP: 10,
            kI: 8,
            kD: 1,
            kDt: 10,
        });

        this.controller.setTarget(this.distance);
    }

    update(dt) {
        const dd =  this.controller.update(this.currentDistance, dt);

        const dx = ((dd * this.distanceX / this.currentDistance) || 0) / 2;
        const dy = ((dd * this.distanceY / this.currentDistance) || 0) / 2;

        this.vertex1.addTransform(dx, dy);
        this.vertex2.addTransform(-dx, -dy);
    }
}