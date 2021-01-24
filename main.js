String.prototype.toProperCase = function () {
    return this.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
};
function playRound(playerSelection, computerSelection, score){
    const beats = {"rock": "scissors", "scissors": "paper", "paper": "rock"}
    if (beats[playerSelection] == computerSelection){
        score["player"] += 1
        console.log(String.format("You win! %s beats %s", playerSelection.toProperCase(), computerSelection.toProperCase()))
        return score
    } else if (playerSelection == computerSelection){
        return score
        console.log(String.format("You tie! Both selected %s", playerSelection.toProperCase()))
    } else {
        score["computer"] += 1
        console.log(String.format("You lose! %s beats %s", computerSelection.toProperCase(), playerSelection.toProperCase()))
    }
}

function playerMove(){
    let playerSelection = null;
    while (!["rock", "paper", "scissors"].contains(playerSelection)){
        playerSelection = prompt("Enter your selection (Paper, Scissors, Rock):").toLowerCase();
    }
}

function computerMove(){
    return ["rock", "paper", "scissors"][Math.floor(Math.random() * 3)]
}

function game(){
    const score = {"player": 0, "computer": 0}
    for (let i = 0; i < 5; i++) {
        score = playRound(playerMove(), computerMove(), score)            
    }


}
