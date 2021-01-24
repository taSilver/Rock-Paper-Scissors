String.prototype.toProperCase = function () {
    return this.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
};

function playRound(p1Choice, p2Choice, score, round){
    const beats = {"rock": "scissors", "scissors": "paper", "paper": "rock"}
    [p1, p2] = Object.keys(score)
    if (p1Choice == p2Choice){
        console.log(`${p1} and ${p2} tie round ${round}! Both selected ${p1Choice.toProperCase()}`)
    } else {
        if (beats[p1Choice] == p2Choice){
            score[p1] += 1
            console.log(`${p1} won round ${round} against ${p2}! ${p1Choice.toProperCase()} beats ${p2Choice.toProperCase()}`)
        } else {
            score[p2] += 1
            console.log(`${p2} won round ${round} against ${p1}! ${p2Choice.toProperCase()} beats ${p1Choice.toProperCase()}`)
        }
        
    }
    return score
}

function playerMove(){
    let playerSelection = null;
    while (!["rock", "paper", "scissors"].includes(playerSelection)){
        playerSelection = prompt("Enter your selection (Paper, Scissors, Rock):").toLowerCase();
    }
    return playerSelection;
}

function computerMove(){
    return ["rock", "paper", "scissors"][Math.floor(Math.random() * 3)]
}

function game(players, rounds){
    [p1, p2] = Object.keys(players)
    let score = {[p1]: 0, [p2]: 0}
    for (let i = 1; i <= rounds; i++) {
        score = playRound(players[p1](), players[p2](), score, i)            
    }
    if(score[p1] == score[p2]){
        console.log("It was a draw at ${} points each!", score[p1])
    } else {
        let winner = score[p1] > score[p2] ? p1 : p2
        console.log(`${winner} wins! They got ${score[winner]} points`)
    }
}

function playerGame(){
    p1 = prompt("Enter your name: ").toProperCase();
    p2 = `Computer#${Math.floor(Math.random() * 10000)}`
    rounds = 5
    players = {[p1]: playerMove, [p2]: computerMove}
    game(players, rounds)
}
