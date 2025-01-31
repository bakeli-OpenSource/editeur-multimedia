
class Dessin {
    constructor(canvas) {
        this.draw = false;
        this.prevX = 0;
        this.prevY = 0;
        this.canvas = document.getElementById(canvas); 
        this.ctx = this.canvas.getContext('2d');
        this.ctx.strokeStyle = 'black';
        this.ctx.lineWidth = 2;
  
        this.canvas.addEventListener('mousedown', (e) => {
            this.draw = true;
            this.prevX = this.getMouseX(e);
            this.prevY = this.getMouseY(e);
        });
  
        this.canvas.addEventListener('mousemove', (e) => {
            if (this.draw) {
                const currX = this.getMouseX(e);
                const currY = this.getMouseY(e);
                this.dessine(this.prevX, this.prevY, currX, currY);
                this.prevX = currX;
                this.prevY = currY;
            }
        });
  
        this.canvas.addEventListener('mouseup', () => this.draw = false);
        this.canvas.addEventListener('mouseout', () => this.draw = false);
    }
  
    getMouseX(e) {
        return (e.clientX - this.canvas.offsetLeft) * this.canvas.width / this.canvas.clientWidth;
    }
  
    getMouseY(e) {
        return (e.clientY - this.canvas.offsetTop) * this.canvas.height / this.canvas.clientHeight;
    }
  
    dessine(depX, depY, destX, destY) {
        this.ctx.beginPath();
        this.ctx.moveTo(depX, depY);
        this.ctx.lineTo(destX, destY);
        this.ctx.closePath();
        this.ctx.stroke();
    }
  
    setColor(color) {
        this.ctx.strokeStyle = color;
    }
  
    biggerStroke() {
        this.ctx.lineWidth++;
    }
  
    smallerStroke() {
        this.ctx.lineWidth = Math.max(1, this.ctx.lineWidth - 1); 
    }
  
    erase() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
  }