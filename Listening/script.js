
document.addEventListener('contextmenu', function (e) {
  e.preventDefault();
});

//فانکشن highlight

var item_control = 1;
function highlightText() {
  var emptyChecker = window.getSelection().toString().trim();
  var selectedText = window.getSelection();
  if (document.querySelector("#paragraph").getElementsByTagName(selectedText.anchorNode.parentElement.tagName).length > 0) {
    // چک کردن بودن بین دوتا تگ نه مجموع دو تگ مثلا متن بین li یا p
    if (selectedText.anchorNode.parentElement == selectedText.focusNode.parentElement && emptyChecker !== '') {
      // چک کردن بدون br 
      if (Object.values(selectedText.getRangeAt(0).cloneContents().childNodes).every(itemwe => itemwe.nodeName !== "BR")) {

        var marked = document.createElement("mark");
        var sample = selectedText.getRangeAt(0).extractContents();
        marked.appendChild(sample);
        marked.dataset.id = item_control;
        marked.classList.add("highlighted_text");
        item_control = item_control + 1;
        var selection = window.getSelection().getRangeAt(0);
        selection.deleteContents();
        selection.insertNode(marked);
      }
    }
  }
}


function removeHighlightText(sample) {
  let innetText = sample.innerHTML;
  sample.outerHTML = innetText;
}


document.addEventListener("contextmenu", function (event) {
  var selectedText = window.getSelection().toString().trim();
  var container_p = document.querySelector("#buttons>div");
  var highlightOption = document.getElementById("highlightButton");
  var removeHighlightOption = document.getElementById("removeButton");
  var Note_Option = document.getElementById("note_btn");
  var remove_Note_Option = document.getElementById("remove_Note_btn");
  container_p.classList.add("context_menue");
  highlightOption.classList.add("highlighte_btn")
  removeHighlightOption.classList.add("remove_highlighte_btn");
  Note_Option.onclick = function () {
    notedText();
    Note_Option.style.display = "none ";
    remove_Note_Option.style.display = "none ";
    container_p.style.display = "none ";
    highlightOption.style.display = "none ";
    removeHighlightOption.style.display = "none";
  }
  remove_Note_Option.onclick = function () {
    if (window.getSelection().anchorNode.parentElement.closest(".noted")) {
      var datsetgetter = window.getSelection().anchorNode.parentElement.closest(".noted").dataset.id;
      var list_Parent = document.querySelector("mark.Noted_text[data-id='" + datsetgetter + "']").parentNode;
      document.querySelector("mark.Noted_text[data-id='" + datsetgetter + "']").remove();
      let Pure_data = document.querySelector("mark.highlighted_text[data-id='" + datsetgetter + "']").innerHTML;
      document.querySelector("mark.highlighted_text[data-id='" + datsetgetter + "']").outerHTML = Pure_data;
      let data_sample = noted_texts.find(x => x.dataset.id == datsetgetter);
      let index = noted_texts.indexOf(data_sample);
      noted_texts.splice(index, 1)
      list_Parent.remove();
      Note_Option.style.display = "none ";
      remove_Note_Option.style.display = "none ";
      container_p.style.display = "none ";
      highlightOption.style.display = "none ";
      removeHighlightOption.style.display = "none";
    } else {
      var datsetgetter = Object.values(window.getSelection().getRangeAt(0).cloneContents().children).find(x => x.classList.contains("noted")).dataset.id;
      var list_Parent = document.querySelector("mark.Noted_text[data-id='" + datsetgetter + "']").parentNode;
      document.querySelector("mark.Noted_text[data-id='" + datsetgetter + "']").remove();
      let Pure_data = document.querySelector("mark.highlighted_text[data-id='" + datsetgetter + "']").innerHTML;
      document.querySelector("mark.highlighted_text[data-id='" + datsetgetter + "']").outerHTML = Pure_data;
      let data_sample = noted_texts.find(x => x.dataset.id == datsetgetter);
      let index = noted_texts.indexOf(data_sample);
      noted_texts.splice(index, 1)
      list_Parent.remove();
      Note_Option.style.display = "none ";
      remove_Note_Option.style.display = "none ";
      container_p.style.display = "none ";
      highlightOption.style.display = "none ";
      removeHighlightOption.style.display = "none";
    }
  };
  highlightOption.onclick = function () {
    highlightText();
    Note_Option.style.display = "none ";
    remove_Note_Option.style.display = "none ";
    container_p.style.display = "none ";
    highlightOption.style.display = "none ";
    removeHighlightOption.style.display = "none";
  };

  removeHighlightOption.onclick = function () {
    if (event.target.dataset.id) {
      var myitem = document.querySelectorAll(".highlighted_text");
      var selected_Item = event.target.dataset.id;
      myitem.forEach((item_test) => {
        if (item_test.dataset.id == selected_Item) {
          removeHighlightText(item_test);
          if (noted_texts.includes(item_test)) {
            let index = noted_texts.indexOf(item_test);
            noted_texts.splice(index, 1);
            document.querySelector("mark.Noted_text[data-id='" + selected_Item + "']").parentNode.remove();
          }
          Note_Option.style.display = "none ";
          remove_Note_Option.style.display = "none ";
          container_p.style.display = "none ";
          highlightOption.style.display = "none ";
          removeHighlightOption.style.display = "none";
        }
      })
    } else {
      var selected_Item = Object.values(window.getSelection().getRangeAt(0).cloneContents().children).find(x => x.classList.contains("highlighted_text")).dataset.id;
      var myitem = document.querySelectorAll(".highlighted_text");
      myitem.forEach((item_test) => {
        if (item_test.dataset.id == selected_Item) {
          removeHighlightText(item_test);
          if (noted_texts.includes(item_test)) {
            let index = noted_texts.indexOf(item_test);
            noted_texts.splice(index, 1);
            document.querySelector("mark.Noted_text[data-id='" + selected_Item + "']").parentNode.remove();
          }
          Note_Option.style.display = "none ";
          remove_Note_Option.style.display = "none ";
          container_p.style.display = "none ";
          highlightOption.style.display = "none ";
          removeHighlightOption.style.display = "none";
        }
      })
    }
  };


  if (selectedText !== '') {
    if (document.querySelector("#paragraph").getElementsByTagName(window.getSelection().anchorNode.parentElement.tagName).length > 0) {
      if (window.getSelection().anchorNode.parentElement.tagName !== "MARK" && Object.values(window.getSelection().getRangeAt(0).cloneContents().childNodes).some(item => !item?.classList?.contains("highlighted_text")) && Object.values(window.getSelection().getRangeAt(0).cloneContents().childNodes).every(item => !item?.classList?.contains("noted"))) {
        event.preventDefault(); // Prevent the default context menu
        container_p.style = "flex-direction: column;display: flex;";
        container_p.style.top = event.clientY + "px";
        container_p.style.left = event.clientX + "px";
        Note_Option.style.display = "block";
        highlightOption.style.display = "block";
      }
      if (window.getSelection().anchorNode.parentElement.tagName == "MARK" || Object.values(window.getSelection().getRangeAt(0).cloneContents().childNodes).some(item => item?.classList?.contains("highlighted_text"))) {
        if (window.getSelection().anchorNode.parentElement.closest(".noted") || Object.values(window.getSelection().getRangeAt(0).cloneContents().childNodes).some(item => item?.classList?.contains("noted"))) {
          event.preventDefault(); // Prevent the default context menu
          container_p.style = "flex-direction: column;display: flex;";
          container_p.style.top = event.clientY + "px";
          container_p.style.left = event.clientX + "px";
          remove_Note_Option.style.display = "block";
        }
        if (!window.getSelection().anchorNode.parentElement.closest(".noted") && !Object.values(window.getSelection().getRangeAt(0).cloneContents().childNodes).some(item => item?.classList?.contains("noted"))) {
          event.preventDefault(); // Prevent the default context menu
          container_p.style = "flex-direction: column;display: flex;";
          container_p.style.top = event.clientY + "px";
          container_p.style.left = event.clientX + "px";
          removeHighlightOption.style.display = "block";
          highlightOption.style.display = "none ";
          Note_Option.style.display = "none ";
          remove_Note_Option.style.display = "none ";

        }
      }
    }
  } else {
    container_p.style.display = "none ";
    highlightOption.style.display = "none ";
    removeHighlightOption.style.display = "none";
  }
});



// فانکشن Note
var noted_texts = [];
var noted_text_sampleTexts = [];
function notedText() {
  var noteBox = document.querySelector(".noteBox");
  var emptyChecker = window.getSelection().toString().trim();
  var selectedText = window.getSelection();
  if (document.querySelector("#paragraph").getElementsByTagName(selectedText.anchorNode.parentElement.tagName).length > 0) {
    // چک کردن بودن بین دوتا تگ نه مجموع دو تگ مثلا متن بین li یا p
    if (emptyChecker !== '' && selectedText.anchorNode.parentElement == selectedText.focusNode.parentElement) {
      // چک کردن بدون br 
      if (Object.values(selectedText.getRangeAt(0).cloneContents().childNodes).every(itemwe => itemwe.nodeName !== "BR")) {
        var marked_Text = document.createElement("mark");
        var sample = selectedText.getRangeAt(0).cloneContents();
        marked_Text.appendChild(sample);
        marked_Text.dataset.id = item_control;
        marked_Text.classList.add("highlighted_text");
        marked_Text.classList.add("noted")
        var selection = window.getSelection().getRangeAt(0);
        selection.deleteContents();
        selection.insertNode(marked_Text);
        noted_texts.push(marked_Text);
        noteBox.innerHTML = "";
        noteBox.classList.add("active")
        for (let item of noted_texts) {
          var note_cotainer = document.createElement("div");
          var removeBTN = document.createElement("button");
          removeBTN.type = "button";
          removeBTN.innerHTML = "remove Note";
          note_cotainer.classList.add("note_container");
          note_cotainer.classList.add("active");
          let clone = item.cloneNode(true);
          clone.classList.remove("highlighted_text");
          clone.classList.add("Noted_text");
          removeBTN.onclick = function () {
            let datsetgetter = clone.dataset.id;
            let Pure_data = document.querySelector("mark.highlighted_text[data-id='" + datsetgetter + "']").innerHTML;
            document.querySelector("mark.Noted_text[data-id='" + datsetgetter + "']").remove();
            document.querySelector("mark.highlighted_text[data-id='" + datsetgetter + "']").outerHTML = Pure_data;
            let data_sample = noted_texts.find(x => x.dataset.id == datsetgetter);
            let index = noted_texts.indexOf(data_sample);
            noted_texts.splice(index, 1);
            event.target.parentNode.remove();
          }
          note_cotainer.appendChild(clone);
          if(!noted_text_sampleTexts.find(x => x.dataset.id  == item.dataset.id )){            
            let text_Box = document.createElement("textarea");
            text_Box.classList.add("text_note_box");
            text_Box.dataset.id = item_control;
            text_Box.value = "";
            text_Box.placeholder = "pls write youre note here";
            text_Box.onkeydown = function (){
              note_edited = event.target.value;
              datset_getter_Note = event.target.dataset.id;
              let data_sample_note = noted_text_sampleTexts.find(x => x.dataset.id == datset_getter_Note);
              let indexNote = noted_text_sampleTexts.indexOf(data_sample_note);
              noted_text_sampleTexts[indexNote].value = note_edited;
            };
            noted_text_sampleTexts.push(text_Box);
            note_cotainer.appendChild(text_Box);
            note_cotainer.appendChild(removeBTN);
            noteBox.appendChild(note_cotainer);
            item_control = item_control + 1;
  
          }else{
            let text_Box = noted_text_sampleTexts.find(x => x.dataset.id  == item.dataset.id );
            note_cotainer.appendChild(text_Box);
            note_cotainer.appendChild(removeBTN);
            noteBox.appendChild(note_cotainer);
          }
        }
      }
    }
  }
}

function notedshow(){
  document.querySelector(".noteBox_parent").classList.toggle("isShow")
}