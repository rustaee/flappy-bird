class Bird{
    constructor(){
        this.x = 150;
        this.y = 200;
        this.vy = 0; //the speed of falling
        this.originalWidth = 718;
        this.originalHeight = 612;
        if(window.innerWidth > 1400 ){
            this.width = this.originalWidth / 10;
        this.height = this.originalHeight / 10;
        }
        else{
            this.width = this.originalWidth / 18;
        this.height = this.originalHeight / 18;
        }
        this.weight = 0.5;
        this.frameX = 0; //To make flappy effect on bird 
    }

    update(){
        let curve = Math.sin(angle) * 20; //to repeatedly move up and down in its place at the bottom
        if(this.y > canvas.height - (this.height * 3) + curve ){ //*3 to have a bit space from bottom
            this.y = canvas.height - (this.height * 3) + curve;
            this.vy = 0;
        }
        else{
            this.vy += this.weight; 
            //this.y *= 0.9; // to add some floppy movement feel
            this.y += this.vy;
        }
        if( this.y < 0 +this.height ){
            this.y = 0 + this.height;
            this.vy = 0;
        }
        if( spacePressed &&this.y > this.height * 3 ) this.flap();    
    }

    draw(){
        ctx.drawImage(birdSprite, this.frameX * this.originalWidth, 0, this.originalWidth, this.originalHeight, this.x -20, this.y -12 , this.width * 1.7, this.height * 1.7);
    }

    flap(){
        this.vy -= 1.5;
        if (this.frameX >= 3 ) this.frameX = 0;
        else if(frame % 5  === 0) this.frameX ++;
    }
}

const bird = new Bird();