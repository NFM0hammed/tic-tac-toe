// Get info of board and cells
let board = document.querySelectorAll(".board .cell");

// Convet cells to array
let arrayBoard = Array.from(board);

// Length of array
arrayBoardLength = arrayBoard.length;

// Array for selected cell
let selectedCell = [];

for(let i = 0; i < arrayBoardLength; i++) {

    arrayBoard[i].addEventListener("click", (e) => {

        // Add target X to the board
        e.target.textContent = "X";

        // Add class no click after target X added [can't clicking again]
        e.target.classList.add("no-click");

        // Push the value that you selected it into array of selected cell
        selectedCell.push(i);

        // Get the random number between 0, 8
        let rand = radnomNumber(arrayBoardLength);

        // If the length of selected cell array doesn't equal the length of board array, Add O with index is random number
        // If the length of selected cell array equal the length of board array, Means end of the game
        if(selectedCell.length !== arrayBoardLength) {

            // Push the value that you get it from random function into array of selected cell
            arrayBoard[rand].textContent = "O";
    
            // Add class no click after target O added [can't clicking]
            arrayBoard[rand].classList.add("no-click");

        }

        // Call function checkWin
        let win = checkWin(arrayBoard);

        // Means X or O is win
        if(win != "") {
            
            document.querySelector(".result").classList.add("end-game");
            
            document.querySelector(".result span:first-of-type").textContent = `The winner is ${win}`;

            return;

        }

        // Means no one win
        if(selectedCell.length === arrayBoardLength) {

            document.querySelector(".result").classList.add("end-game");
            
            document.querySelector(".result span:first-of-type").textContent = `No win !`;

        }
    });

}

// Function to get a random number
function radnomNumber(arrayBoard) {
    
    // Get random number
    let random = Math.floor(Math.random() * arrayBoard);

    // If the array of selected cell hasn't the same radnom number
    // If the array of selected cell hasn't the same of value that you selected it
    if(!selectedCell.includes(random)) {

        // Push the new rand number to the array of selected cell
        selectedCell.push(random);

        return random;

    } else {

        // If length of the selected cell array is 9, Means don't rand a number the board is full
        if(selectedCell.length < arrayBoard) {
            
            return radnomNumber(arrayBoard);

        }

    }

}

// Check win
function checkWin(arrayBoard) {

    let win = "";

    // Check rows
    for(let i = 0; i < arrayBoard.length - 1; i += 3) {

        // 0 => 1 => 2
        // 3 => 4 => 5
        // 6 => 7 => 8
        if(arrayBoard[i].innerHTML != "") {

            if(arrayBoard[i].innerHTML == arrayBoard[i + 1].innerHTML && arrayBoard[i + 1].innerHTML == arrayBoard[i + 2].innerHTML) {

                win = arrayBoard[i].textContent;
                
                break;
    
            }

        }

    }

    // Check columns
    for(let i = 0; i < 3; i++) {

        // 0 => 3 => 6
        // 1 => 4 => 7
        // 2 => 5 => 8
        if(arrayBoard[i].innerHTML != "") {

            if(arrayBoard[i].innerHTML == arrayBoard[i + 3].innerHTML && arrayBoard[i + 3].innerHTML == arrayBoard[i + 6].innerHTML) {
    
                win = arrayBoard[i].textContent;

                break;
    
            }

        }

    }

    // Check diagonal
    for(let i = 0; i < 3; i += 2) {

        // 0 => 4 => 8
        // 2 => 4 => 6
        if(arrayBoard[i].innerHTML != "") {

            if(arrayBoard[i].innerHTML == arrayBoard[4].innerHTML && arrayBoard[4].innerHTML == arrayBoard[8 - i].innerHTML) {

                win = arrayBoard[i].textContent;
                
                break;
    
            }

        }
        
    }

    return win;

}

// Function to reload page after end game
document.querySelector(".result span:last-of-type").onclick = () => { window.location.reload(); }