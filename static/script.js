const questions = [

{
question:"Which gas do plants absorb from the atmosphere?",
options:["Oxygen","Carbon Dioxide","Nitrogen","Hydrogen"],
answer:"Carbon Dioxide"
},

{
question:"Which energy source is renewable?",
options:["Coal","Solar","Diesel","Petrol"],
answer:"Solar"
},

{
question:"Which bin is commonly used for paper waste?",
options:["Blue","Red","Black","Yellow"],
answer:"Blue"
},

{
question:"What helps reduce air pollution?",
options:["Planting Trees","Burning Plastic","Cutting Forests","Waste Dumping"],
answer:"Planting Trees"
},

{
question:"Which is eco-friendly transport?",
options:["Cycle","Truck","Bike Race","Jet"],
answer:"Cycle"
},

{
question:"What should we save to protect nature?",
options:["Water","Plastic Waste","Smoke","Pollution"],
answer:"Water"
},

{
question:"Earth Day is celebrated on?",
options:["April 22","January 1","August 15","June 5"],
answer:"April 22"
},

{
question:"Which gas causes global warming?",
options:["CO2","Oxygen","Nitrogen","Helium"],
answer:"CO2"
}

];

let currentQuestion = 0;
let score = 0;
let lives = 3;
let xp = 0;
let coins = 0;
let streak = 0;
let level = 1;

let timer;
let timeLeft = 30;

loadQuestion();

function startTimer(){

clearInterval(timer);

timeLeft = 30;

document.getElementById("timer").innerText = timeLeft;

timer = setInterval(()=>{

timeLeft--;

document.getElementById("timer").innerText = timeLeft;

if(timeLeft <= 0){

clearInterval(timer);

lives--;

updateStats();

showAchievement("⏰ Time Up! -1 Life");

if(lives <= 0){

showResult();
return;

}

nextQuestion();

}

},1000);

}

function loadQuestion(){

if(currentQuestion >= questions.length){

showResult();
return;

}

startTimer();

let q = questions[currentQuestion];

document.getElementById("question").innerText =
q.question;

let answersDiv =
document.getElementById("answers");

answersDiv.innerHTML = "";

q.options.forEach(option=>{

let btn =
document.createElement("button");

btn.classList.add("answer-btn");

btn.innerText = option;

btn.onclick = ()=>checkAnswer(option);

answersDiv.appendChild(btn);

});

updateProgress();

}

function checkAnswer(selected){

clearInterval(timer);

let correct =
questions[currentQuestion].answer;

if(selected === correct){

score += 10;
xp += 25;
coins += 5;
streak++;

showAchievement("✅ Correct Answer!");

if(streak === 3){

score += 20;
coins += 10;

showAchievement("🔥 Streak Bonus +20");

streak = 0;

}

}
else{

lives--;
streak = 0;

showAchievement("❌ Wrong Answer");

}

updateStats();

}

function updateStats(){

document.getElementById("score").innerText =
score;

document.getElementById("lives").innerText =
lives;

document.getElementById("coins").innerText =
coins;

document.getElementById("streak").innerText =
streak;

level = Math.floor(xp / 100) + 1;

document.getElementById("level").innerText =
level;

document.getElementById("xp-text").innerText =
xp + " / 100 XP";

let xpPercent = xp % 100;

document.getElementById("xp-fill").style.width =
xpPercent + "%";

updateTree();
updateBadge();

if(lives <= 0){

showResult();

}

}

function updateTree(){

let tree =
document.getElementById("tree");

if(score >= 80){

tree.innerText = "🌲";

}
else if(score >= 50){

tree.innerText = "🌳";

}
else if(score >= 20){

tree.innerText = "🌿";

}
else{

tree.innerText = "🌱";

}

}

function updateBadge(){

let badge =
document.getElementById("badge");

if(score >= 80){

badge.innerText =
"👑 Eco Legend";

}
else if(score >= 50){

badge.innerText =
"🏆 Earth Hero";

}
else if(score >= 20){

badge.innerText =
"🌳 Nature Guardian";

}
else{

badge.innerText =
"🌱 Beginner Explorer";

}

}

function updateProgress(){

let progress =
((currentQuestion + 1) /
questions.length) * 100;

document.getElementById("progress-fill")
.style.width = progress + "%";

}

function nextQuestion(){

currentQuestion++;

loadQuestion();

}

function showAchievement(text){

let achievement =
document.getElementById("achievement");

achievement.innerText = text;

achievement.style.display = "block";

setTimeout(()=>{

achievement.style.display = "none";

},2000);

}

function showResult(){

clearInterval(timer);

document.querySelector(".quiz-container")
.innerHTML = `

<h1>🎉 Quiz Completed</h1>

<br>

<h2>⭐ Score: ${score}</h2>

<h2>⚡ XP: ${xp}</h2>

<h2>🪙 Coins: ${coins}</h2>

<h2>🏆 Level: ${level}</h2>

<h2>❤️ Lives Left: ${lives}</h2>

<br>

<h2>${getFinalBadge()}</h2>

<br>

<button class="start-btn"
onclick="location.reload()">

🔄 Play Again

</button>

`;

}

function getFinalBadge(){

if(score >= 80){

return "👑 Eco Legend";

}

if(score >= 50){

return "🏆 Earth Hero";

}

if(score >= 20){

return "🌳 Nature Guardian";

}

return "🌱 Beginner Explorer";

}
