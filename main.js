
let mode;

let result = document.getElementById("result");
let greeting = document.getElementById("greeting");
let board = document.getElementById("board");

let scoreBoard = document.getElementById("score");
let mainColor = document.getElementById("mainColor");

let colors = ["#2559AF", "#C8B85E", "#9027F8", "#3AD2C2", "#33831F", "#95C0C4", "#CA524E",
    "#A29834", "#2E972D", "#B44C2C", "#CAC213", "#B6A237", "#81495F", "#69698F", "#F79C94", "#AA73F1",
    "#A164AC", "#FE09F6", "#0151FC", "#97F4F9", "#52D592", "#FA7F60", "#93CDF0", "#4C7E36", "#7D314C"];
let boxes;

function startGame(mode) {
    var game = document.getElementById("game");
    let time = 60;
    let score = 0;

    game.style.display = "flex";
    greeting.style.display = "none";
    document.getElementById("difficulty").innerHTML = mode+"X"+mode;
    generateBoard(mode);

    boxes.forEach(element => {
        element.addEventListener("click", () => {
            if (element.style.backgroundColor == mainColor.style.backgroundColor) {
                score++;
                scoreBoard.innerHTML = score;
                importColors();
            }
            else {
                element.style.opacity = 0;
            }
        });
    
    });

    var timer = setInterval(() => {
        time--;
        document.getElementById("time").innerHTML = time;
        if (time == 0) {
            clearInterval(timer);
            game.style.display = "none";
            result.style.display = "flex";
            document.getElementById("lastScore").innerHTML = score;
        };
    }, 1000);
}

function shuffleColorList() {
    for (var i = colors.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = colors[i];
        colors[i] = colors[j];
        colors[j] = temp;
    }
}

function importColors() {
    shuffleColorList();
    let temp=[];
    for (let i = 0; i < boxes.length; i++) {
        boxes[i].style.backgroundColor = colors[i];
        temp[i]=colors[i];
        boxes[i].style.opacity = 1;
    }
    
    let random = Math.floor(Math.random() * temp.length);
    mainColor.style.backgroundColor = temp[random];
}

function tryAgain() {
    result.style.display = "none";
    greeting.style.display = "flex";
    score = 0;
    scoreBoard.innerHTML = score;
    board.innerHTML = "";
};

function generateBoard(count) {
    for (let i = 0; i < count; i++) {
        let row = document.createElement("div");
        row.className = "row";
        for (let j = 1; j <= count; j++) {
            let box = document.createElement("div");
            box.className = "box";
            row.appendChild(box);
        }
        board.appendChild(row);
    }
    boxes = document.querySelectorAll(".box");
    importColors();
}