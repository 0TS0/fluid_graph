class Bounding {
    get x() {
        return this.position.x;
    }

    get y() {
        return this.position.y;
    }
    
    constructor(options) {
        this.position = new Vec2(options?.position?.x, options?.position?.y);
        this.velocity = new Vec2();
        this._lock = false;
    }

    update(dt) {
        if(this._lock) return;

        this.position.add(this.velocity.x * dt, this.velocity.y * dt);
        this.velocity.reset();
    }

    setPosition(x, y) {
        this.position.set(x, y);
    }

    addVelocity(x, y) {
        this.velocity.add(x, y);
    }

    lock() {
        this._lock = true;
    }

    unLock() {
        this._lock = false;
        this.velocity.reset();
    }
}


class MNode {
    get x() {
        return this.bounding.x;
    }

    get y() {
        return this.bounding.y;
    }

    addVelocity(x, y) {
        this.bounding.addVelocity(x, y);
    }
    
    constructor(options) {
        this.target = options.target;
        
        this.bounding = new Bounding({
            position: {
                x: random(400, 1600),
                y: random(200, 800),
            }
        });

        this.dad = new DragAndDrop({
            target: this,
            container: options.container,
        });
    }

    getBoundingClientRect() {
        return this.target.getBoundingClientRect();
    }

    addEventListener(event, callback) {
        this.target.addEventListener(event, callback);
    }

    transform(x, y) {
        this.bounding.setPosition(x, y);
    }
    
    drag() {
        this.bounding.lock();
    }

    drop() {
        this.bounding.unLock();
    }
    
    update(dt) {
        this.bounding.update(dt);
        this.target.style['transform'] = `translate(${this.x}px, ${this.y}px)`;
    }

    addTransform(x, y) {
        this.bounding.addVelocity(x, y);
    }
}


const targets = [...document.querySelectorAll('div')];
const container = document.querySelector('body');

const nodes = targets.map((e) => new MNode({target: e, container: container }));
const distances = [];
const angles = [];

for (let index = 0; index < nodes.length; index++) {
    const distance = new Distance({
        vertex1: nodes[index],
        vertex2: nodes[(index < nodes.length - 1) ? index + 1: 0],
    });
    const angle = new Angle({
        vertex1: nodes[index],
        vertex2: nodes[(index < nodes.length - 1) ? index + 1: 0],
    });

    distances.push(distance);
    angles.push(angle);
}


let pTime = 0;
requestAnimationFrame(update);

function update(time) {
    const dt = (time - pTime) / 1000;
    pTime = time;
    

    distances.forEach((d) => d.update(dt));
    // angles.forEach((d) => d.update(dt));
    nodes.forEach((b) => b.update(dt));
    requestAnimationFrame(update);
}


function random(min, max) {
    return min + Math.random() * (max - min);
}