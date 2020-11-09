function readQuote(){
  db.collection("quotes").doc("01")
  .onSnapshot(function(snap){
    console.log(snap.data()); //print out the document fields of "01"
    console.log(snap.data().message); //spelled Exactly as the firestore console
    document.getElementById("abc")
    document.getElementById("abc").innerText = snap.data().message;
  })
}

readQuote();