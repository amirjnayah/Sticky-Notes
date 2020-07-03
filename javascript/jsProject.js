if ('serviceWorker' in navigator) {
    // register service worker
    navigator.serviceWorker.register('service-worker.js');
  }

let count=Number (window.localStorage.getItem("count"));
if(!count){
    window.localStorage.setItem("count","0");
 //   count=0;
}

function createNote(noteTitle,noteBody){

    
    document.getElementById("no-notes").classList.add("hidden");

    let li=document.createElement("li");
    let a=document.createElement("a");
    let h2=document.createElement("h2");
    let p=document.createElement("p");
    let button=document.createElement("button");
    button.className="delete";
    let xtext=document.createTextNode("X");
    let h2text=document.createTextNode(noteTitle);
    let ptext=document.createTextNode(noteBody);
    h2.appendChild(h2text);
    p.appendChild(ptext);
    button.appendChild(xtext);
    a.appendChild(h2);
    a.appendChild(button);
    a.appendChild(p);
    a.setAttribute("href","#");
    li.appendChild(a);
    document.getElementById("notes").appendChild(li);

}

function createNoteFromInput(e) {
  e.preventDefault();
  let noteTitle= document.getElementById("new-note-title-input").value;
  let noteBody= document.getElementById("new-note-body-input").value;
  document.getElementById("new-note-title-input").value="";
  document.getElementById("new-note-body-input").value="";

  count +=1;
  window.localStorage.setItem("count",count);

  while(window.localStorage.getItem(noteTitle)){
      noteTitle +=" -"
  }

  window.localStorage.setItem(noteTitle,noteBody);

  createNote(noteTitle,noteBody);
}

function removeItem(e){
    
    if(e.target.classList.contains("delete")){
       if (confirm("Are you sure you wanna delete the note ?")){
           let li= e.target.parentElement.parentElement;
           let ul= document.getElementById("notes");
           ul.removeChild(li);
           count -=1;
           window.localStorage.removeItem(e.target.previousElementSibling.innerText);
       }
       window.localStorage.setItem("count",count);
    }
    if(count <1){
        document.getElementById("no-notes").className="";
    }
}

for(let i=0;i<=count;i++){
    let noteTitle=window.localStorage.key(i);
    let noteBody=window.localStorage.getItem(noteTitle);
    if(noteTitle=="count"){
        continue;
    }
    createNote(noteTitle,noteBody);
}

document
  .getElementById("inputForm")
  .addEventListener("submit", createNoteFromInput, false);

  document.getElementById("notes").addEventListener("click",removeItem);