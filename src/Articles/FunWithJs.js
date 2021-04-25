import './FunWithJs.css';
import React from 'react';

var config = {
    bubbleSize: 3,
    bubbleSpeed: 0.5,
    bubbleNumber: 500,
    bubbleNumber_mobile: 150,
    strokeDistance: 100,
    globalSpeed: 0,
    bubbleColor: '#08F',
    initialBubbleColor: '#08F',
    doConnect: true
};

function mobileAndTabletCheck () {
    let check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw(n|u)|c55\/|capi|ccwa|cdm|cell|chtm|cldc|cmd|co(mp|nd)|craw|da(it|ll|ng)|dbte|dcs|devi|dica|dmob|do(c|p)o|ds(12|d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(|_)|g1 u|g560|gene|gf5|gmo|go(\.w|od)|gr(ad|un)|haie|hcit|hd(m|p|t)|hei|hi(pt|ta)|hp( i|ip)|hsc|ht(c(| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i(20|go|ma)|i230|iac( ||\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|[a-w])|libw|lynx|m1w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|mcr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|([1-8]|c))|phil|pire|pl(ay|uc)|pn2|po(ck|rt|se)|prox|psio|ptg|qaa|qc(07|12|21|32|60|[2-7]|i)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h|oo|p)|sdk\/|se(c(|0|1)|47|mc|nd|ri)|sgh|shar|sie(|m)|sk0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h|v|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl|tdg|tel(i|m)|tim|tmo|to(pl|sh)|ts(70|m|m3|m5)|tx9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas|your|zeto|zte/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
    return check;
};

function hexToDec(hexString){
    return parseInt(hexString, 16);
  }
  
  class Color {
      constructor(r, g, b, a) {
          this.r = r;
          this.g = g;
          this.b = b;
          this.a = a;
          
          return this;
      }
      
      static fromHex(str) {
          str = str.replace('#', '');
          var r = 0;
          var g = 0;
          var b = 0;
          var a = 1;
          if (str.length === 3 || str.length === 4) {
              r = hexToDec(str.substring(0,1) + str.substring(0,1));
              g = hexToDec(str.substring(1,2) + str.substring(1,2));
              b = hexToDec(str.substring(2,3) + str.substring(2,3));
              if (str.length === 4) {
                  a = hexToDec(str.substring(3,4) + str.substring(3,4)) / 255;
              }
          } else if(str.length === 6 || str.length === 8) {
              r = hexToDec(str.substring(0,2));
              g = hexToDec(str.substring(2,4));
              b = hexToDec(str.substring(4,6));
              if (str.length === 8) {
                  a = hexToDec(str.substring(6,8)) / 255;
              }
          }
          
          return new Color(r,g,b,a);
      }
      
      toString(){
          return 'rgba('+this.r+','+this.g+','+this.b+','+(this.a)+')';
      }
      
      setR(r) {this.r = r;}
      setG(g) {this.g = g;}
      setB(b) {this.b = b;}
      setA(a) {this.a = a;}
  }

class Bubble {
    constructor(canvas) {
        this.canvas = canvas;
        this.outOfBounds = false;
        
        this._v = config.bubbleSpeed;
        this.x = Math.round(Math.random() * this.canvas.width);
        this.y = Math.round(Math.random() * this.canvas.height);
        this.vx = (Math.random() * this._v) - this._v/2;
        this.vy = (Math.random() * this._v) - this._v/2;
        
        this.color = Color.fromHex(config.bubbleColor);
        
        this.alpha = 0;
        
        this.size = config.bubbleSize;
    }
    
    move() {
        this.alpha = Math.min(1, this.alpha + 0.01);
        this.x += this.vx * (1+config.globalSpeed);
        this.y += this.vy * (1+config.globalSpeed);
        
        if (this.x < -100 || this.x > this.canvas.width + 100
            || this.y < -100 || this.y > this.canvas.height + 100
        ) {
            this.outOfBounds = true;
        }
    }
    
    draw(ctx) {
        try {
            this.move();
            ctx.beginPath();
            ctx.globalCompositeOperation = 'screen';
            ctx.fillStyle = 'rgba('+this.color.r+','+this.color.g+','+this.color.b+','+this.alpha+')';
            ctx.arc((this.x),(this.y),this.size,0,Math.PI*2);
            ctx.fill();
            ctx.closePath();
        } catch(err) {
            console.log(err);
        }
    }
}

class FunWithJs extends React.Component {
    
    componentDidMount() {
        this.canvas = document.querySelector('#cels');
        this.ctx = this.canvas.getContext('2d');
        
        this.height = this.canvas.offsetHeight;
        this.width = this.canvas.offsetWidth;
        
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        
        this.bubbles = [];
		this.strokeDistance = config.strokeDistance;
        this.nbBubbles = mobileAndTabletCheck() ? config.bubbleNumber_mobile : config.bubbleNumber;
		
		this.init();
    }

    disableAnimation() {
        cancelAnimationFrame(this._animationFrame);
    }

    init() {
        var body = document.querySelector('body');
		body.addEventListener("mousemove", this.handleMouseMove.bind(this));
        body.addEventListener("touchmove", this.handleTouchMove.bind(this));
        
        window.addEventListener("resize", this.handleResize.bind(this));
        
        this.calculateHeight();
        window.addEventListener('resize', this.calculateHeight.bind(this));

        requestAnimationFrame(()=>this.main());
	}

    handleResize(e) {
        this.height = this.canvas.offsetHeight;
        this.width = this.canvas.offsetWidth;
        
        this.canvas.width = this.width;
        this.canvas.height = this.height;
    }
    
    handleTouchMove(e) {
        if (!this.previousTouch) {
            this.previousTouch = e.touches[0];
            return;
        }
        
        var event = {
            x: e.touches[0].clientX,
            y: e.touches[0].clientY,
            move_x: this.previousTouch.clientX > e.touches[0].clientX ? -2 : 2,
            move_y: this.previousTouch.clientY > e.touches[0].clientY ? -2 : 2
        };
        
        this.replaceBubbles(event);
        
        this.previousTouch = e.touches[0];
    }
    
    handleMouseMove(e) {
        try {
            var event = {
                x: e.x,
                y: e.y,
                move_x: e.movementX,
                move_y: e.movementY
            };
            this.replaceBubbles(event);
        } catch(err) {
            console.log(err);
        }
        //this.calculateGlobalSpeed(e);
    }
    
    replaceBubbles(e) {
        for(var bubble of this.bubbles) {
            if (Math.sqrt(Math.pow(Math.abs(bubble.x - e.x),2) + Math.pow(Math.abs(bubble.y - e.y),2)) < 100) {
                bubble.color.r = Math.max(0, bubble.color.r - 5);
                bubble.color.g = Math.min(200, bubble.color.g + 5);
                bubble.color.b = Math.max(0, bubble.color.b - 5);
                
                bubble.size += 0.2;
                
                //bubble.color = Color.fromHex("#0CF");
                
                bubble.vx += e.move_x/100;
                bubble.vy += e.move_y/100;
                
            }
        }
    }
    
    calculateGlobalSpeed(e) {
        config.globalSpeed = Math.min(10, config.globalSpeed*1.05);
    }
    
    connect(b1, b2) {
        if (!config.doConnect) {return ;}
        
        var ctx = this.ctx;
        var d = Math.round(Math.sqrt(Math.pow(b1.x-b2.x,2) + Math.pow(b1.y-b2.y,2)));
        var alpha = ((this.strokeDistance - d) / this.strokeDistance) * b1.alpha * b2.alpha;
        ctx.beginPath();
        //ctx.globalCompositeOperation = 'screen';
        ctx.strokeStyle = 'rgba('+b1.color.r+','+b1.color.g+','+b1.color.b+','+alpha+')';
        ctx.moveTo(b1.x,b1.y);
        ctx.lineTo(b2.x, b2.y);
        ctx.stroke();
        ctx.closePath();
    }

    main() {
        try {
            this.clear();
            
            this.bubbles = this.bubbles.filter(x=>x.outOfBounds === false);
            
            while(this.bubbles.length < this.nbBubbles) {
                this.bubbles.push(new Bubble(this.canvas));
            }
            
            var testConnexion = [];
            for(let bubble of this.bubbles) {
                bubble.draw(this.ctx);
                testConnexion.push(bubble);
            }
            
            var connexions = [];
            var connected = [];
            while(testConnexion.length > 0) {
                let bubble = testConnexion.pop();
                connected = testConnexion.filter(b => Math.sqrt(Math.pow(b.x-bubble.x,2) + Math.pow(b.y-bubble.y,2)) < this.strokeDistance);
                for(var conn of connected) {
                    connexions.push([bubble, conn]);
                }
            }
            
            for(var connexion of connexions) {
                this.connect(connexion[0],connexion[1]);
            }
            
            config.globalSpeed = Math.max(config.bubbleSpeed, config.globalSpeed*0.99);
            
            this._animationFrame = requestAnimationFrame(()=>this.main());
        } catch(Err) {
            cancelAnimationFrame(this._animationFrame);
            console.log(Err);
        }
    }

    clear() {
        this.ctx.clearRect(0, 0, this.width, this.height);
    }
    
    calculateHeight() {
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', vh+'px');
    }

    render() {
        return (<canvas id="cels"></canvas>);
    }
}

export default FunWithJs;