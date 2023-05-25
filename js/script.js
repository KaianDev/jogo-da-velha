/* Inital Data
------------------------------- */
let playing = false;
let player = '';
let warning = '';
let square = {
    a1:'',a2:'',a3:'',
    b1:'',b2:'',b3:'',
    c1:'',c2:'',c3:''
};

/* Functions
------------------------------- */
function reset () {
    warning = '';
    let random = Math.floor(Math.random() * 2);
    player = (random === 0) ? 'x' : 'o';
    playing = true;

    for(let i in square) {
        square[i] = '';
    }

    renderInfo();
    renderSquare();
}

function renderInfo() {
    document.querySelector('.vez').innerHTML = player;
    document.querySelector('.resultado').innerHTML = warning;
}

function renderSquare() {
    for(let i in square){
        let item = document.querySelector(`div[data-item=${i}]`);
        item.innerHTML = square[i];
    }
    checkGame();
}

function clickItem(event) {
    let item = event.target.getAttribute('data-item');
    if(square[item] == '' && playing){
        square[item] = player;
        renderSquare();
        togglePlayer();
    }
}

function togglePlayer() {
    player = (player === 'x') ? 'o' : 'x';
    renderInfo();
}

function checkGame() {
    if(playerWinner('x')){
        warning = '"X" venceu!';
        playing = false;
    } else if(playerWinner('o')){
        warning = '"O" venceu!';
        playing = false;
    } else if (isFull()){
        warning = 'Empatou!';
        playing = false;
    }
}


function playerWinner(player) {
    let pos = [
        'a1,a2,a3',
        'b1,b2,b3',
        'c1,c2,c3',

        'a1,b1,c1',
        'a2,b2,c2',
        'a3,b3,c3',

        'a1,b2,c3',
        'a3,b2,c1'
    ];

    for(let i in pos) {
        let posArray = pos[i].split(',');

        let hasWon = posArray.every(option => square[option] == player);
        if(hasWon){
            return true;
        }
    }
    return false;    
}

function isFull() {
    for(let i in square){
        if(square[i] == ''){
            return false;
        }
    }
    return true;
}

/* Events
------------------------------- */
document.querySelector('.reset').addEventListener('click',reset);
document.querySelectorAll('.item').forEach(item => {
    item.addEventListener('click',clickItem)
})
reset();