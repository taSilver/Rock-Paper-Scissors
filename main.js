String.prototype.toProperCase = function () {
    return this.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
};

function playRound(p1Choice, p2Choice, score, round){
    const beats = {"rock": "scissors", "scissors": "paper", "paper": "rock"}
    
    let str
    [p1, p2] = Object.keys(score)
    if (p1Choice == p2Choice){
        str = `${p1} and ${p2} tie round ${round}! Both selected ${p1Choice.toProperCase()}`
    } else {
        if (beats[p1Choice] == p2Choice){
            score[p1] += 1
            str = `${p1} won round ${round} against ${p2}! ${p1Choice.toProperCase()} beats ${p2Choice.toProperCase()}`
        } else {
            score[p2] += 1
            str = `${p2} won round ${round} against ${p1}! ${p2Choice.toProperCase()} beats ${p1Choice.toProperCase()}`
        }
        
    }
    return [score, str]
}

function playerRound(p1Choice){
    let p2Choice = computerMove()
    $(".p1Choice").attr("src", `img/hand-${p1Choice}-grey.svg`)
    $(".p2Choice").attr("src", `img/hand-${p2Choice}-grey.svg`)
    let [new_score, str] = playRound(p1Choice, p2Choice, score, round)
    checkRound(new_score, '<span style="color:gold">' + str + '</span>')
}

function computerMove(){
    return ["rock", "paper", "scissors"][Math.floor(Math.random() * 3)]
}

function checkRound(score, stringRes){  
    logResult(stringRes)
    updateText()
    if(score[p1] == scoreLimit || score[p2] == scoreLimit){
        if(score[p1] == score[p2]){
            $("#result").text(`Game Result: It was a draw at ${score[p1]} point(s) each!`)
        } else {
            let winner = score[p1] > score[p2] ? p1 : p2
            $("#result").text(`Game Result: ${winner} wins! They scored ${score[winner]} point(s)`)
        }
        disableItems()   
    }
    round++
}

function playerGame(){
    p1 = $("#p1").val()
    if (p1 == ""){
        p1 = "No name"
    }
    p2 = computerName()
    $("#p2").val(p2)
    enableItems()
    scoreLimit = 5
    round = 1
    score = {[p1]: 0, [p2]: 0}
    updateText()
}

function updateText() {
    $("#p1Score").text(score[p1])   
    $("#p2Score").text(score[p2])
    $("#round").text(round)
}

function enableItems() {
    const btnList = ["rock", "paper", "scissors"]
    btnList.forEach(btn => {
        $("#"+btn).attr("disabled", false)
    });
    $("#p1").attr("readonly", true)
    $("#startBtn").text("Restart")
    $("#startBtn").attr("class", "btn btn-outline-danger")
}

function disableItems() {
    const btnList = ["rock", "paper", "scissors"]
    btnList.forEach(btn => {
        $("#"+btn).attr("disabled", true)
    });
    $("#p1").attr("readonly", false)
    $("#startBtn").text("Start")
    $("#startBtn").attr("class", "btn btn-outline-success")
}

function genDummyGame() {
    let randPlayers = {[computerName()]: 0, [computerName()]: 0}
    let randRound = Math.floor(Math.random() * 100)
    logResult(playRound(computerMove(), computerMove(), randPlayers, randRound)[1])
}

function logResult(string) {
    $("#otherGames").prepend(`<p>${string}</p>`)
    if ($("#otherGames p").length > 25){
        $("#otherGames p").last().remove();
    }
}

function computerName() {
    return `Computer#${Math.floor(Math.random() * 10000)}`
}

(async function loop() {
    const rand = Math.round(Math.random() * (3000 - 500)) + 500;
    setTimeout(() => {
        genDummyGame();
        loop();
    }, rand);
})()

function setChoice(opt) {
    choice = opt
}

window.onload = () => {
    disableItems()
}
