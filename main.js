const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth ;
if(window.innerHeight < canvas.width * 2 / 3){
    canvas.height = window.innerHeight }
    else {canvas.height = canvas.width * 2 / 3}; 

let spacePressed = false;
let angle = 0;
let hue = 0;
let frame = 0;
let score = 0;
let gameSpeed = 4;
const birdSprite = new Image();
birdSprite.src = 'bird.png';

const gradient = ctx.createLinearGradient(0, 0, 0, 70);
gradient.addColorStop('0.4' , '#fff');
gradient.addColorStop('0.5' , '#a65');
gradient.addColorStop('0.55' , '#a12');
gradient.addColorStop('0.6' , '#a12');
gradient.addColorStop('0.9' , '#fff');


const background = new Image();
background.src = 'bg.png';
const BG = {
    x1: 0, // horisontal position for first bg
    x2: canvas.width, //horisontal position for second bg
    y : 0,
    width: canvas.width,
    height: canvas.height,
}

function handleBackground(){
    if(BG.x1 <= -BG.width +gameSpeed) BG.x1 = BG.width;
    else BG.x1 -= gameSpeed;
    if(BG.x2 <= -BG.width +gameSpeed) BG.x2 = BG.width;
    else BG.x2 -= gameSpeed;
    ctx.drawImage(background, BG.x1, BG.y, BG.width, BG.height);
    ctx.drawImage(background, BG.x2, BG.y, BG.width, BG.height);
}


function animate(){
    ctx.clearRect(0,0, canvas.width, canvas.height);
    //ctx.fillRect(10, canvas.height - 90, 50, 50);
    handleBackground();
    handleObstacles();
    bird.update();
    bird.draw();
    ctx.fillStyle = 'red';
    ctx.font = '90px Georgia';
    ctx.strokeText(score, canvas.width - 100, 80);
    ctx.fillText(score, canvas.width - 100, 80);
    handleCollisions();
    if(handleCollisions()) return true; 
    handleParticles();
    requestAnimationFrame(animate);
    angle += 0.12;
    hue ++;
    frame ++;
}

animate();

window.addEventListener('keydown' , e => {
   // if (e.code === 'Space') 
   spacePressed = true;
});

window.addEventListener('keyup' , e => {
    //if (e.code === 'Space') 
    spacePressed = false;
    bird.frameX = 0;
})

const bang = new Image();
bang.src = 'bang.png';
function handleCollisions(){
    for ( let i = 0; i < obstaclesArray.length; i++){
        if(bird.x < obstaclesArray[i].x + obstaclesArray[i].width &&
            bird.x + bird.width > obstaclesArray[i].x &&
            ((bird.y < 0 + obstaclesArray[i].top && bird.y + bird.height > 0) ||
            (bird.y > canvas.height - obstaclesArray[i].bottom &&
                bird.y + bird.height < canvas.height))){
                //Collision Detected
                ctx.drawImage(bang, bird.x + 5 , bird.y + 5 , 70, 70);
                ctx.font = '25px Georgia';
                ctx.fillStyle = 'black';
                ctx.fillText('Game Over, your score is: ' + score, canvas.width / 3, canvas.height / 2 - 10);
                return true;
            }
    }
}
