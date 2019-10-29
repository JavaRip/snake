const speed = 100;

let moveMade = false;
const fieldSize = 10;
const grassChar = ".", snakeChar = "S", foodChar = "F";
const grassCol = "black", snakeCol = "lime", foodCol = "red";
let field = initiateField(fieldSize);
let snake = ["02", "03", "04", "14"];
let xDir = 1, yDir = 0; //1 = up, -1 = down // 1 = left, -1 = right
let snakeLength = 4;
let score = 0;
let dead = false;
let frame = 0;

//prepare canvas
let canvas = document.querySelector("canvas");
let pixelSize = 15;
canvas.width = pixelSize * fieldSize;
canvas.height = pixelSize * fieldSize;
let c = canvas.getContext("2d");

//document.write("hello from snake");
setInterval(doNextFrame, speed);

function doNextFrame() {
    frame++;
    if (checkDead() === false) {
        moveMade = false;
        getInput();
        console.log("xdir: " + xDir +"  ydir: "+ yDir);
        moveSnake();
        genField();
        placeFood();
        dispField();
        document.querySelector("#score").textContent = snake.length;
        if (checkDead() === true) { //dead if any 2 values of the snake are the same
            console.log("u ded");
        }
    }
}

function placeFood() {
    let foodx, foody = 0;
    let noFood = true;
    for (let i = 0; i < field.length; i++) {
        if (field[i].includes(foodChar) === true) {
            noFood = false;
        }
    }
    if (noFood === true) {
        do {
            foodx = Math.round(Math.random() * fieldSize - 1); 
            foody = Math.round(Math.random() * fieldSize - 1); 
        } while (field[foodx][foody] !== grassChar)
        field[foodx][foody] = foodChar;
    }
}

function checkDead () {
    for (let i = 0; i < snake.length; i++) {
        for (let j = 0; j < snake.length; j++) {
            if (snake[i] === snake[j] && i !== j) {
                return true;
            }
        }
    }
    return false;
}

function getInput() {
    onkeydown = function (event) {
        if (moveMade === false) {
            switch (event.keyCode) {
                case 37:
                if (xDir !== 1) {
                    xDir = -1;
                    yDir = 0;
                }
                break;
                case 38:
                if (yDir !== 1) {
                    xDir = 0;
                    yDir = -1;
                }       
                break;
                case 39:
                if (xDir !== - 1) {
                    xDir = 1;
                    yDir = 0;
                }
                break;
                case 40:
                if (yDir !== -1) {
                    xDir = 0;
                    yDir = 1;
                }
                break;
            }
        }
        moveMade = true;
        
    };
}

function moveSnake() {
    let headxy = snake[snake.length - 1];
    let heady = Number(headxy[1]), headx = Number(headxy[0]);
    if (headx + xDir < fieldSize && headx + xDir >= 0) {
        headx += xDir;
    } else if (headx + xDir < 0) {
        headx = fieldSize - 1;
    } else if (headx + xDir >= fieldSize) {
        headx = 0;
    }
    if (heady + yDir < fieldSize && heady + yDir >= 0) {
        heady += yDir;
    } else if (heady + yDir < 0) {
        heady = fieldSize - 1;
    } else if (heady + yDir >= fieldSize) {
        heady = 0
    }
    if (field[headx][heady] === foodChar) {
        snakeLength += 1;
    }
    headxy = headx.toString() + heady.toString();
    console.log("headxy: " + headxy +" heady: "+heady+" headx: "+headx);
    snake.push(headxy);
    if (snake.length > snakeLength) {
        snake.shift();
    } 
}

function initiateField() {
    let field = [];
    for (let i = 0; i < fieldSize; i++) {
        field[i] = [];
    }
    return field;
}

function genField () {
    for (let celly = 0; celly < fieldSize; celly++) {
        for (let cellx = 0; cellx < fieldSize; cellx++) {
            if (snake.includes((cellx.toString() + celly.toString()))) {
                field[cellx][celly] = snakeChar; 
            } else {
                if (field[cellx][celly] !== foodChar) {
                    field[cellx][celly] = grassChar; 
                }
            }
        }
    }
}

function dispField() {
    //canvas
    
    //draw canvas  
    for (let celly = 0; celly < fieldSize; celly++) {
        for (let cellx = 0; cellx < fieldSize; cellx++) {
            if (field[cellx][celly] === snakeChar) {
                c.fillStyle = snakeCol;
            } else if (field[cellx][celly] === foodChar) {
                c.fillStyle = foodCol; 
            } else if (field[cellx][celly] === grassChar) {
                c.fillStyle = grassCol;
            }
            c.fillRect(cellx * pixelSize, celly * pixelSize, pixelSize, pixelSize); 
        }
    }
    //console (done seperately to canvas for readability, not efficiency lmao)
    let fieldStr = "";
    for (let celly = 0; celly < fieldSize; celly++) {
        for (let cellx = 0; cellx < fieldSize; cellx++) {
            fieldStr += field[cellx][celly];
        }
        fieldStr += "\n";
    }
    console.clear();
    console.log(fieldStr);
}