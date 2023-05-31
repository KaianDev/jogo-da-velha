//Initial Data
let o = `<i class="fa-regular fa-circle fa-lg text-danger"></i>`;
let x = `<i class="fa-regular fa-x fa-lg text-secondary"></i>`;

let square = {
    a1:'',a2:'',a3:'',
    b1:'',b2:'',b3:'',
    c1:'',c2:'',c3:'',
}

let player = '';
let playing = false;
let warning = '';


//Functions 
function reset() {
    
    warning = '';
    playing = true;
    let random = Math.floor(Math.random() * 2);
    player = (random === 0) ? x : o ;
    
    for(let i in square) {
        square[i] = '';
    }

    renderInfo();
    renderSquare();
}

function renderInfo() {
    document.querySelector('#jogador').innerHTML = player;
    document.querySelector('#resultado').innerHTML = warning;
}

function renderSquare() {
    for(let i in square) {
        let item = document.querySelector(`div[data-item=${i}]`);
        item.innerHTML = square[i];
    }

    checkGame();
    
}

function playClick (event) {
    let item = event.target.getAttribute('data-item');

    if(square[item] === '' & playing) {
        square[item] = player;
        
        renderSquare();
        togglePlayer();
    }

}


function togglePlayer() {
    player = (player === x) ? o : x;
    renderInfo();
}

function checkGame() {
    if(winnerIs(x)){
        warning = `O jogador ${x} venceu`;
        playing = false;
    } else if(winnerIs(o)){
        warning = `O jogador ${o} venceu`;
        playing = false;
    } else if (isFull()) {
        warning = 'O jogo Empatou!'
        playing = false;
    }
}

function winnerIs(player) {
    let pos = [
        'a1,a2,a3',
        'b1,b2,b3',
        'c1,c2,c3',

        'a1,b1,c1',
        'a2,b2,c2',
        'a3,b3,c3',

        'a1,b2,c3',
        'a3,b2,c1'
    ]


    for(let i in pos) {

        let posArray = pos[i].split(',');

        let hasWon = posArray.every((option) => square[option] == player);

        if(hasWon) {
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

//Events
document.querySelector('#reset').addEventListener('click',reset);
document.querySelectorAll('.area-click').forEach((area) => {
    area.addEventListener('click', playClick)
});

reset();

