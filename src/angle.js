class Angle {
    get currentAngle() {
        return Math.atan2(this.dy, this.dx) / Math.PI * 180;
    }

    get dx() {
        return this.vertex1.x - this.vertex2.x;
    }

    get dy() {
        return this.vertex1.y - this.vertex2.y;
    }

    
    constructor(options) {
        this.vertex1 = options.vertex1;
        this.vertex2 = options.vertex2;
        this.angle = options.angle ?? 135;

        this.controller = new Controller({
            kP: 4,
            // kI: 0.05,
            kD: 1,
            kDt: 0.01,
        });

        this.controller.setTarget(this.angle);
    }

    update(dt) {
        const dd =  this.controller.update(this.currentAngle, dt);
        
        const dx = dd * -Math.sin(-this.currentAngle / 180 * Math.PI);
        const dy = dd * -Math.cos(this.currentAngle / 180 * Math.PI);

        this.vertex1.addTransform(-dx, -dy);
        this.vertex2.addTransform(dx, dy);
    }
}