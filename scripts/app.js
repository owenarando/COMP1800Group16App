//---------------------------------------------------
//Gets the thread info from the database.
//Creates post html and appends to the body.
//----------------------------------------------------
function addThreads() {
  db.collection("group").doc("owentest").collection("thread")
    .get()
    .then((snap) => {
      snap.forEach((doc) => {

        //Gets data
        var threadName = doc.data().name;
        var threadID = doc.id;
        console.log(threadName);
        console.log(doc.id)

        //Creates a new button element and apppends it to group.html
        item = document.createElement("button");
        item.className = "gridItem";
        item.className += " object";
        
        //Asigns the id of the thread to the html ID
        item.id = `${threadID}`;
        item.innerText = threadName;

        //When the user clicks on the button it calls enterThread
        //and enters its html Id as the parameter
        item.setAttribute("onclick", "enterThread(this.id)");
        $("#middleContent").append(item);
      });
    });
};
//---------------------------------------------------
// Gets the thread info from the database
// Creates post html and appends to the body
//----------------------------------------------------
function addThreads() {
  db.collection("group").doc("owentest").collection("thread")
    .get()
    .then((snap) => {
      snap.forEach((doc) => {

        //Gets data
        var threadName = doc.data().name;
        var threadID = doc.id;
        console.log(threadName);
        console.log(doc.id)

        //Creates a new button element and apppends it to group.html
        item = document.createElement("button");
        item.className = "gridItem";
        item.className += " object";
        
        //Asigns the id of the thread to the html ID
        item.id = `${threadID}`;
        item.innerText = threadName;

        //When the user clicks on the button it calls enterThread
        //and enters its html Id as the parameter
        item.setAttribute("onclick", "enterThread(this.id)");
        $("#middleContent").append(item);
      });
    });
};
//---------------------------------------------------
// Puts the thread that the user selected on the database
// then brings the user to the threadpage
//----------------------------------------------------
function enterThread(threadID) {
  console.log('enterThread()');

  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      //console.log("user is signed in");
      db.collection("users").doc(user.uid).collection("current").doc("thread")
        .set({
          currentID: `${threadID}`
        }).then(function () {
          document.location.href = "thread.html"
        });
    } else {
      console.log("no user is signed in");
    }
  })
}


//---------------------------------------------------
// When the page starts
// getThreads()
//----------------------------------------------------
addThreads();