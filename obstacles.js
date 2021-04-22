const obstaclesArray = [];

class Obstacle{
    constructor(){
        this.top = (Math.random() * canvas.height/3) +20; //Height of top rectangle
        this.bottom = (Math.random() * canvas.height/3) + 20;
        this.x = canvas.width;
        if(window.innerWidth > 1400 ){
            this.width = 100;
        }else{
            this.width = 50;
        }
        this.color = 'hsla(' + hue + ',100%, 30%,1)';
        this.counted = false;

    }

    draw(){
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, 0, this.width, this.top);
        ctx.fillRect(this.x, canvas.height - this.bottom, this.width, this.bottom);
        
    }

    update(){
        this.x -= gameSpeed;
        if(!this.counted && this.x < bird.x){
            score++; 
            this.counted = true;
        }
        this.draw();
    }
}

function handleObstacles(){
    let obstacleWidth = new Obstacle;
    if(frame % (obstacleWidth.width * 2)  === 0){
        obstaclesArray.unshift(new Obstacle);
    }
    for(let i = 0; i < obstaclesArray.length; i++){
        obstaclesArray[i].update();
    }
    if(obstaclesArray.length > 20){
        obstaclesArray.pop(obstaclesArray[0])
    }
}