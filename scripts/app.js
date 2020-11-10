
function readQuote(){
    db.collection("quotes").doc("01")
    .onSnapshot(function(snap){
        console.log(snap.data()); //print the document fields of "01" in console
        console.log(snap.data().message); //spelled the same sa the "message" in firestore
        document.getElementById("a").innerText = snap.data().message;
    })
}

readQuote();