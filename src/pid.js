class Controller {
    constructor(options) {
      this.kP = options.kP ?? 1;
      this.kI = options.kI ?? 0;
      this.kD = options.kD ?? 0;
      this.kDt = options.kDt ?? 1;
  
      this.target = 0;
      this.iError = 0;
      this.pError = 0;
    }
  
    setTarget(targetValue) {
      this.target = targetValue;
    }
  
    proportional(currentError) {
      return (this.kP * currentError);
    }
  
    integral(currentError, dt) {
        this.iError = (this.kI * currentError * dt) + this.iError;
  
        return this.iError;
    }
  
    derivative(currentError, dt) {
      const D = this.kD * (currentError - this.pError);
      this.pError = currentError;
  
      return dt == 0 ? D : D / dt;
    }
  
    update(currentValue, dt) {
      const currentError = this.target - currentValue;
      dt *= this.kDt;
  
      const P = this.proportional(currentError);
      const I = this.integral(currentError, dt);
      const D = this.derivative(currentError, dt);
      
      return P + I + D;
    }
  
    reset() {
      this.target = 0;
      this.iError = 0;
      this.pError = 0;
      this.time = 0;
    }
  }