var btn = document.querySelector('.submit');
var btnQuz = document.querySelector('.submitQuz');
var ques = document.querySelector('.qustField');
var ans = document.querySelector('.ansField');
// let quesText = "",
// ansText = "";

// console.log(btn, ques, ans);

var inputValue = document.getElementsByClassName('putNumber')
console.log(inputValue[0]);


btn.addEventListener('click', () =>{
var numberQues = inputValue[0].value;

async function getAPI(){
    let response = await fetch(`https://opentdb.com/api.php?amount=${numberQues}`);
    let finalArray = await response.json();
    // console.log(finalArray);
    var arryFinal = finalArray.results;
    return arryFinal;
}

const finalData = getAPI();

finalData.then(function(response){

//console.log(response)

response.forEach(mainData);
// var mainDiv = document.querySelector('.mainClass');
// console.log(mainDiv);

function mainData(item, index){
    let ques = item.question;
    let incAns = item.incorrect_answers;
    const corAns = item.correct_answer;
console.log(ques, incAns, corAns);


var quesField = document.querySelector('.qustField');
var ansField = document.querySelector('.ansField');

console.log(quesField, ansField);
var quesEle = document.createElement("p");

var ansEle = document.createElement("input");
//console.log(quesEle);
console.log(ansEle);

ansEle.setAttribute("type", "radio");

ansField.append(ansEle);

var ansLable = document.createElement("label");

ansEle.append(ansLable);

var quesEleData = document.createTextNode(`(${index+1}) ${ques}`);

var ansEleData = document.createTextNode(`${incAns}`);



// console.log(quesEleData);
quesEle.append(quesEleData);

ansLable.append(ansEleData)

quesField.append(quesEle);



}

})







})


