document.addEventListener("DOMContentLoaded", function (){

    var playButton = document.getElementById("play");
    var pauseButton = document.getElementById("pause");
    var timer;

    var newGame;

    var widthInput = document.getElementById("width");
    var heightInput = document.getElementById("height");
    var createBoardButton = document.getElementById("createBoard");
    var givenWidth = parseInt(widthInput.value);
    var givenHeight = parseInt(heightInput.value);

    function GameOfLife(boardWidth, boardHeight) {
        this.width = boardWidth;
        this.height = boardHeight;
        this.board = document.getElementById("board");
        this.cells = [];
    }

    GameOfLife.prototype.createBoard = function(){
        this.board.style.width = (this.width * 10).toString() + "px";
        this.board.style.height = (this.height * 10).toString() + "px";
        var cell = this.width * this.height;
        for(var i = 0; i < cell; i++){
            var newDiv = document.createElement("div");
            this.board.appendChild(newDiv);
            this.cells.push(newDiv);
        }
        for(var j = 0; j < this.cells.length; j++){
            this.cells[j].addEventListener("mouseover", function(event) {
                if(event.buttons === 1) {
                    this.classList.toggle("live");
                }
            });
            this.cells[j].addEventListener("click", function(){
                this.classList.toggle("live");
            });
        }
    };

    GameOfLife.prototype.getCell = function (x, y) {
        if(x >= 0 && y >= 0) {
            var index = x + y * this.width;
            return this.cells[index];
        }
        return undefined;
    };

    GameOfLife.prototype.setCellState = function(x, y, state){
        this.getCell(x, y).classList.toggle(state);
    };

    GameOfLife.prototype.firstGlider = function (){
        this.setCellState(0, 0, "live");
        this.setCellState(2, 0, "live");
        this.setCellState(1, 1, "live");
        this.setCellState(2, 1, "live");
        this.setCellState(1, 2, "live");
    };


    GameOfLife.prototype.computeCellNextState = function(x, y){
        var aliveNeighbours = 0;

        var allNeighbours =[this.getCell(x-1, y-1), this.getCell(x, y-1),
            this.getCell(x+1, y), this.getCell(x-1, y), this.getCell(x+1, y-1),
            this.getCell(x-1, y+1), this.getCell(x, y+1), this.getCell(x+1, y+1)];

        for(var i = 0; i < allNeighbours.length; i++){
            if(allNeighbours[i] !== undefined && allNeighbours[i].className === "live"){
                aliveNeighbours++;
            }
        }
        if(aliveNeighbours < 2 || aliveNeighbours > 3){
            return 0;
        }
        if((aliveNeighbours >= 2 && aliveNeighbours <=3) && this.getCell(x, y).className === "live"){
            return 1;
        }
        if(this.getCell(x, y).className !== "live" && aliveNeighbours === 3){
            return 1;
        }
        return 0;
    };

    GameOfLife.prototype.printNextGeneration = function(){
        var nextGenerationArray = [];
        for(var j = 0; j < this.height; j++){
            for(var i = 0; i < this.width; i++){
                nextGenerationArray.push(this.computeCellNextState(i, j));
            }
        }
        for(var i = 0; i < nextGenerationArray.length; i++){
            if(nextGenerationArray[i] === 1){
                this.cells[i].classList.add("live");
            }
            else {
                this.cells[i].classList.remove("live");
            }
        }
    };

    playButton.addEventListener("click", function(){
        if(!timer) {
            timer = setInterval(function () {
                newGame.printNextGeneration();
            }, 100);
        }
    });

    pauseButton.addEventListener("click", function(){
        clearInterval(timer);
        timer = undefined;
    });

    widthInput.addEventListener("change", function(){
        givenWidth = this.value;
    });
    heightInput.addEventListener("change", function(){
        givenHeight = this.value;
    });

    createBoardButton.addEventListener("click", function(){
        if(!newGame){
            newGame = new GameOfLife(givenWidth, givenHeight);
            newGame.createBoard();
            newGame.firstGlider();
        }
    });


});