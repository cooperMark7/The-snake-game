// Game Constants & Variables

// Defining the constants which will help run the game 

// we can create variables using let and var 

//this will make the snake static in the beginning of the game 
let inputDir = {x: 0, y: 0}; // js object 
const foodSound = new Audio('music/food.mp3');
const gameOverSound = new Audio('music/gameover.mp3'); 
const moveSound = new Audio('music/move.mp3');
const musicSound = new Audio('music/music2.mp3');
let speed = 15;
let score = 0;
let lastPaintTime = 0;
let snakeArr = [
    {x: 13, y: 15} //location of the head 
];

food = {x: 6, y: 7}; //creating the food (object)

// Game Functions
// Game Functions
// Game Functions
function main(ctime) {

    // this method was used becasuse we are renddering the animation  
// creating the game loop by calling the below fuction in main thus fuction main will call it again and again creating a loop 
    window.requestAnimationFrame(main);

    // console.log(ctime) (ctime=current time)
    
    //to control the fps 
    //dividing by 1000 because its in miliseconds 
    //create an if statement for time such that it will render the game when the condition is false
    if((ctime - lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime = ctime;

    // method that is defined below 
    gameEngine();
}
//a funtion to define what will happen when the snake collide 

function isCollide(snake) {

    // If you bump into yourself

    // this means if the head of the snake is eqaul to any of the element in the snake arr x or y then it would be considered as a colision
    //then it would be considered as a colision
    
    for (let i = 1; i < snakeArr.length; i++) {
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }               
    }
    // If you bump into the wall
    // as my grid is 0 to 18,
    //both x and y should not be smaller than 0 and greater than 18, The OR operator is being used 
    if(snake[0].x >= 18 || snake[0].x <=0 || snake[0].y >= 18 || snake[0].y <=0){
        return true;
    }
        
    return false;
}
//a fuction to define the basic working of the game 

function gameEngine(){

    // Part 1: Updating the snake array & Food

    if(isCollide(snakeArr)){ //if snake collides 
        gameOverSound.play(); //game over sound will play
        musicSound.pause(); //the game music will pause 
        inputDir =  {x: 0, y: 0}; // the input direction will be reset to 0
        //will add a top alert 
        alert("Game Over. Press any key to play again!");
        //snake game reset 
        snakeArr = [{x: 13, y: 15}];
        musicSound.play();
        score = 0; 
    }

    // If you have eaten the food, increment the score and regenerate the food

    // snakeArr[0]=head of the sanke 
    //to define when the snake has eaten the food which will be done by 
    //making the cordinates of the snake head and food coordinates same 
    if(snakeArr[0].y === food.y && snakeArr[0].x ===food.x){
        foodSound.play();
        score += 1;//increment(+1) of the score when food is eaten 
        if(score>hiscoreval){
            hiscoreval = score;
            localStorage.setItem("hiscore", JSON.stringify(hiscoreval));//setting the new value of highscore in the local storage 
            hiscoreBox.innerHTML = "HiScore: " + hiscoreval;//displaying the new vlaue of highscore
        }
        scoreBox.innerHTML = "Score: " + score;

        
        //to add one more piece to the snake body as it eats the food we are using ushift() 

        //.unshift adds element at the starting of the element 

        //a new piece of body will be added in the direction it is moving  
        snakeArr.unshift({x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y});
        
        //defining a and b for the Math.round method so that it can generate a random number
        let a = 2;
        let b = 16;

        
        //to updete the location of the food as the previos food was eaten 

        food = {x: Math.round(a + (b-a)* Math.random()), y: Math.round(a + (b-a)* Math.random())}
    }  //to generate a random location of the food on the grid between 2 and 16 after it has been eaten 

    // Moving the snake

    /*To move the snake we will iterate the whole snake body for 
    that i will create a decrementing for loop in snakArr and will write 
    some logic to shift the element one by one from the end. */
     //snakeArr.length - 1 = last element of the snake 
    for (let i = snakeArr.length - 2; i>=0; i--) { 
        snakeArr[i+1] = {...snakeArr[i]};// equaling the last element to the second last element and so on for all the elements 
    }//... to creat an entirely new object  
    snakeArr[0].x += inputDir.x;//to move the head in a particular direction
    snakeArr[0].y += inputDir.y;

    // Part 2: Display the snake and Food
    // Display the snake
    board.innerHTML = ""; //this will empty the board, so when the game loads the snake will render only once. 

   // putting foreach(for all the objects) loop in the snake array 
   //we are adding the location of these elements in snakeArr (head) as the snake eats the food and increases in size 
    snakeArr.forEach((e, index)=>{
        snakeElement = document.createElement('div'); //creating a new element inside the snakeElement variable 
        
        // adding css in this element using js 

        //Setitng the position of the snake body in the grid 

        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;

        //adding class in this element because we have to add css 
        // and we will put the css styling in the class

        if(index === 0){ 
            snakeElement.classList.add('head');//adding the head to the snakeElemnt if index is zero
        }
        else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });
    // Display the food
    // Adding element  
    foodElement = document.createElement('div');
    //The grid-row-start property defines on which row-line the item will start.
    foodElement.style.gridColumnStart = food.x;
    foodElement.style.gridRowStart = food.y; 
    foodElement.classList.add('food')
    //we will append the foodElemnet variable as a child inside the board
    board.appendChild(foodElement);


}


// Main logic starts here
musicSound.play();
let hiscore = localStorage.getItem("hiscore");
if(hiscore === null){
    hiscoreval = 0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval))//json.stringyfy to set as a string  
}
//when highscore is not 0 then 
else{
    hiscoreval = JSON.parse(hiscore);
    hiscoreBox.innerHTML = "HiScore: " + hiscore;//to set the value of the hight score in the game 
}
//this will call the main fuction and inside the main fuction we have written this function again causeing it to be called again and again, creatig a loop 
//fuction is used to render animation 
window.requestAnimationFrame(main); 
window.addEventListener('keydown', e =>{ //arrow function
    // the function will run as soon as the someone press the keydown 
    //1st argument is the event (keydown here) second arrow fuction (this whole code block)

    inputDir = {x: 0, y: 1} // Start the game
    moveSound.play();

    //to find out which key was pressed 
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp");//To tell the consol that the arrowupkey was pressed 
          
            //changing the input direction with accordance to the key pressed 

            inputDir.x = 0;
            inputDir.y = -1;
            break;

        case "ArrowDown":
            console.log("ArrowDown");//To tell the consol that the arrowDownkey was pressed
            inputDir.x = 0;
            inputDir.y = 1;
            break;

        case "ArrowLeft":
            console.log("ArrowLeft");//To tell the consol that the arrowLeftkey was pressed
            inputDir.x = -1;
            inputDir.y = 0;
            break;

        case "ArrowRight":
            console.log("ArrowRight");//To tell the consol that the arrowRightkey was pressed
            inputDir.x = 1;
            inputDir.y = 0;
            break;
        default:
            break;
    }

});