let inputDir={x:0,y:0};
const foodSound=new Audio('food.mp3');
const gameover=new Audio('out.wav');
const move=new Audio('move.wav');
const musicSound=new Audio('bg.wav');
let speed=12;
let lastPaintTime=0;
let snakeArr=[
    {x:13,y:15}
]
score=0;
food={x:6,y:7}
function main(ctime) {
    window.requestAnimationFrame(main);
    if ((ctime-lastPaintTime)/1000<1/speed) {
        return;
        
    }
    lastPaintTime=ctime;
    gameEngine()
}
musicSound.play();

let hiscore=localStorage.getItem("hiscore");
if (hiscore===null) {
    hiscoreval=0;
    localStorage.setItem("hiscore",JSON.stringify(hiscoreval))
}
else{
    hiscoreval=JSON.parse(hiscore);
    hiscoreBox.innerHTML="HiScore: "+ hiscore;
}


function isCollide(snake) {
    for (let i = 1; i < snakeArr.length; i++) {
        if (snake[i].x===snake[0].x && snake[i].y===snake[0].y) {
            return true
        }
    }
    if (snake[0].x>=18 || snake[0].x<=0 || snake[0].y>=18 || snake[0].y<=0) {
        return true
    }
    return false;
    
}
function gameEngine() {
    if (isCollide(snakeArr)) {
        gameover.play();
        musicSound.pause();
        inputDir={x:0,y:0};
        score=0;
        scoreBox.innerHTML="Score: " + score;
        alert("Game over ! press any key to play again ")
        snakeArr=[{x:13,y:15}];
        musicSound.play();
    }
    //if you've eaten the food , increment the score and  regenerate the food
    if (snakeArr[0].y===food.y && snakeArr[0].x===food.x) {
        score+=1;
        if (score>hiscoreval) {
            hiscoreval=score;
            localStorage.setItem("hiscore",JSON.stringify(hiscoreval));
            hiscoreBox.innerHTML="HiScore: "+hiscoreval
            
        }
        scoreBox.innerHTML="Score: " + score;
        foodSound.play();
        snakeArr.unshift({x:snakeArr[0].x+inputDir.x , y:snakeArr[0].y+inputDir.y})
        let a=2;
        let b=16;
        food={x:Math.round(a+(b-a)*Math.random()),y:Math.round(a+(b-a )*Math.random())}
    }

    for (let i = snakeArr.length-2; i>=0; i--) {
        snakeArr[i+1]={...snakeArr[i]};
        
    }
    snakeArr[0].x+=inputDir.x;
    snakeArr[0].y+=inputDir.y;





    board.innerHTML=""
    snakeArr.forEach((e,index)=>{
        snakeElement=document.createElement('div');
        snakeElement.style.gridRowStart=e.y;
        snakeElement.style.gridColumnStart=e.x;
        if (index === 0) {
            snakeElement.classList.add('head')
        }
        else{
            snakeElement.classList.add('snake')
        }
        board.appendChild(snakeElement)

    })

    foodElement=document.createElement('div');
    foodElement.style.gridRowStart=food.y;
    foodElement.style.gridColumnStart=food.x;
    foodElement.classList.add('food')
    board.appendChild(foodElement)


    
}











window.requestAnimationFrame(main);
window.addEventListener('keydown', e=>{
    inputDir={x:0,y:1}
    move.play();
    switch(e.key){
        case "ArrowUp":
            console.log("arrowUp")
            inputDir.x=0
            inputDir.y=-1
            break;
        case "ArrowDown":
            inputDir.x=0
            inputDir.y=1
            console.log("arrordown")
            break;
        case "ArrowLeft":
            inputDir.x=-1
            inputDir.y=0
            console.log("arrowleft")
            break;
        case "ArrowRight":
            inputDir.x=1
            inputDir.y=0
            console.log("arrowright")
            break;
        default:
            break;

    }

})

