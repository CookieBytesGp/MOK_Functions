
document.addEventListener('contextmenu', function (e) {
  e.preventDefault();
});


function light() {
  var root = document.documentElement;
  var style = getComputedStyle(root);

  root.style.setProperty('--backGroundColorWhite', '#000000');
  root.style.setProperty('--color', '#ffff');
  console.log(style);
}






// function light() { var root = document.documentElement;
//    root.style.setProperty('--backgroundColor','black') 
//    console.log(root.style) }









//زمان باقیمانده آزمون

var time = new Date().getTime() + 3602 * 1000;
var x = setInterval(function () {
  var now = new Date().getTime();
  var distance = time - now;
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);
  document.getElementById("timer").innerHTML = hours + " hours " + minutes + " minut remaining ";
  if (distance < 0) {
    clearInterval(x);
    document.getElementById("timer").innerHTML = "Time Out";
  }
  if (hours < 1) {
    document.getElementById("timer").innerHTML = minutes + " minut remaining ";
  }
  if (hours < 1 && minutes < 1) {
    document.querySelector(".header").style.backgroundColor = "rgba(241, 75, 75, 0.407)";
    document.getElementById("timer").innerHTML = seconds + " second remaining ";
  }
}, 1000);

















//فانکشن highlight

var item_control = 1;
function highlightText() {
  var emptyChecker = window.getSelection().toString().trim();
  var selectedText = window.getSelection();
  if(document.querySelector("#paragraph").getElementsByTagName(selectedText.anchorNode.parentElement.tagName).length > 0){
  // چک کردن بودن بین دوتا تگ نه مجموع دو تگ مثلا متن بین li یا p
  if (selectedText.anchorNode.parentElement == selectedText.focusNode.parentElement && emptyChecker !== ''){
  // چک کردن بدون br 
  if(Object.values(selectedText.getRangeAt(0).cloneContents().childNodes).every(itemwe => itemwe.nodeName !== "BR")){
 
    var marked = document.createElement("mark");
    var sample = selectedText.getRangeAt(0).extractContents();
    marked.appendChild(sample);
    marked.dataset.id = item_control;
    marked.classList.add("highlighted_text");
    item_control = item_control + 1;
    var selection = window.getSelection().getRangeAt(0);
    selection.deleteContents();
    selection.insertNode(marked);
  }}}
  
}


function removeHighlightText(sample) {
  let innetText = sample.innerHTML;
  sample.outerHTML = innetText;
  
}


document.addEventListener("contextmenu", function (event) {
  var selectedText = window.getSelection().toString().trim();
  if (selectedText !== ''){
  if(document.querySelector("#paragraph").getElementsByTagName(window.getSelection().anchorNode.parentElement.tagName).length > 0){

    var highlightOption = document.getElementById("highlightButton");
    var removeHighlightOption = document.getElementById("removeButton");
    highlightOption.classList.add("highlighte_btn")
    highlightOption.style.top = event.clientY + "px";
    highlightOption.style.left = event.clientX + "px";
    highlightOption.style.display = "block";
    highlightOption.onclick = function () {
      highlightText();
      highlightOption.style.display = "none ";
      removeHighlightOption.style.display = "none";
    };
  }}
});


document.addEventListener("contextmenu", function (event) {
  var selectedText = window.getSelection().toString().trim();
  if (selectedText !== ''){
  if(document.querySelector("#paragraph").getElementsByTagName(window.getSelection().anchorNode.parentElement.tagName).length > 0){

    event.preventDefault(); // Prevent the default context menu
    var highlightOption = document.getElementById("highlightButton");
    var removeHighlightOption = document.getElementById("removeButton");
    removeHighlightOption.classList.add("remove_highlighte_btn")
    removeHighlightOption.style.top = event.clientY + 30 + "px";
    removeHighlightOption.style.left = event.clientX + "px";
    removeHighlightOption.style.display = "block";
    removeHighlightOption.onclick = function () {
      var myitem = document.querySelectorAll(".highlighted_text");
      var selected_Item = event.target.dataset.id;
      myitem.forEach((item_test) => {
          if(item_test.dataset.id == selected_Item){
            removeHighlightText(item_test);
            if(noted_texts.includes(item_test)){
              let index = noted_texts.indexOf(item_test);
              noted_texts.splice(index , 1);
              document.querySelector("mark.Noted_text[data-id='" + selected_Item+ "']").parentNode.remove();
            }
          }
      })
      removeHighlightOption.style.display = "none";
      highlightOption.style.display = "none";
    };
  }}
});


// فانکشن Note
var noted_texts = [];
function notedText(){
  var noteBox = document.querySelector(".noteBox");

  var emptyChecker = window.getSelection().toString().trim();
 var selectedText = window.getSelection();
 if(document.querySelector("#paragraph").getElementsByTagName(selectedText.anchorNode.parentElement.tagName).length > 0){

  // چک کردن بودن بین دوتا تگ نه مجموع دو تگ مثلا متن بین li یا p
  if ( emptyChecker !== '' && selectedText.anchorNode.parentElement == selectedText.focusNode.parentElement  ){
  // چک کردن بدون br 
  if(Object.values(selectedText.getRangeAt(0).cloneContents().childNodes).every(itemwe => itemwe.nodeName !== "BR")){
 
    var marked_Text = document.createElement("mark");
    var sample = selectedText.getRangeAt(0).cloneContents();
    marked_Text.appendChild(sample);
    marked_Text.dataset.id = item_control;
    marked_Text.classList.add("highlighted_text");
    marked_Text.classList.add("noted")
    item_control = item_control + 1;
    var selection = window.getSelection().getRangeAt(0);
    selection.deleteContents();
    selection.insertNode(marked_Text);
    noted_texts.push(marked_Text);
    noteBox.innerHTML = "";
    noteBox.classList.add("active")
    for(let item of noted_texts){
      var note_cotainer = document.createElement("li");
      var removeBTN = document.createElement("button");
      removeBTN.type =  "button";
      removeBTN.innerHTML = "remove Note";
      note_cotainer.classList.add("note_container");
      note_cotainer.classList.add("active");
      let clone =item.cloneNode(true);
      clone.classList.remove("highlighted_text");
      clone.classList.add("Noted_text");
      removeBTN.onclick = function (){
        let datsetgetter = clone.dataset.id;
        document.querySelector("mark.Noted_text[data-id='" + datsetgetter+ "']").remove();
        let Pure_data = document.querySelector("mark.highlighted_text[data-id='" + datsetgetter+ "']").innerHTML;
        document.querySelector("mark.highlighted_text[data-id='" + datsetgetter+ "']").outerHTML = Pure_data;
        let abbas = noted_texts.find(x => x.dataset.id == datsetgetter);
        let index = noted_texts.indexOf(abbas);
        noted_texts.splice(index , 1)
        removeBTN.parentNode.remove();
      } 
      note_cotainer.appendChild(clone);
      note_cotainer.appendChild(removeBTN)
      noteBox.appendChild(note_cotainer);

    }
  }}}
}























// "فانکشن سوال های جواب داده شده"

var allAnswers = document.querySelectorAll(".answers");
// "اگه به لیست جواب ها نیازه"
// var AnswerArray = [];

function getQuestionValue() {
  for (let i = 0; i < allAnswers.length; i++) {
    var answerBox = allAnswers[i].childNodes;

    for (let x = 0; x < answerBox.length; x++) {
      // Check if the child node is a label
      if (answerBox[x].nodeName === 'LABEL') {
        // Get the value of the input radio inside the label
        var radioValue = answerBox[x].querySelector('input[type=radio]');
        radioValue.onfocus = function () {
          var testNumber = event.target.parentNode.parentNode.parentNode.dataset.number;
          testNumber = Number(testNumber);
          var testNumberBox = document.querySelectorAll(".qstNumberBox");
          if (!testNumberBox[testNumber].classList.contains("pass")) {
            testNumberBox[testNumber].classList.add("pass");

          }
          nextPrev(testNumber);
        }
      }
    }
  }
}

getQuestionValue()

// "فانکشن نشان شده ها"

function setMarked() {
  var markerbtn = document.querySelectorAll(".markerQuestion")
  for (let item of markerbtn) {
    item.onclick = function () {
      var testNumberMark = event.target.parentNode.parentNode.dataset.number;
      testNumberMark = Number(testNumberMark);
      var testNumberMarkBox = document.querySelectorAll(".qstNumber");
      testNumberMarkBox[testNumberMark].classList.toggle("mark");

      event.target.querySelector(".marked").classList.toggle("hidden");
      event.target.querySelector(".unmarked").classList.toggle("hidden");
    }
  }
}
setMarked();


// "فانکشن next prev"

function nextPrev(testNumber) {
  if (testNumber - 1 < 0) {
    document.querySelector(".prev").href = "#question" + (allAnswers.length - 1);

  } else {
    document.querySelector(".prev").href = "#question" + (testNumber - 1);

  }
  if (testNumber + 1 > allAnswers.length - 1) {
    document.querySelector(".next").href = "#question0";

  } else {
    document.querySelector(".next").href = "#question" + (testNumber + 1);

  }

}
var qstshowNext = 1;
var qstshowPrev = allAnswers.length - 1;

function nextPrevClick() {
  if (qstshowNext + 1 > allAnswers.length) {
    document.querySelector(".next").href = "#question0";
    qstshowNext = 0;
    console.log(qstshowNext)
  } else {
    document.querySelector(".next").href = "#question" + qstshowNext;
    qstshowNext = qstshowNext + 1;
    console.log(qstshowNext)
  }
  if (qstshowPrev - 1 < 0) {
    document.querySelector(".prev").href = "#question0";
    qstshowPrev = allAnswers.length - 1;
    console.log(qstshowPrev)
  } else {
    document.querySelector(".prev").href = "#question" + qstshowPrev;
    qstshowPrev = qstshowPrev - 1;
    console.log(qstshowPrev)
  }
  // console.log(allAnswers.length)
}

// "ارتباط شماره ها با next prev"

