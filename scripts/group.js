//---------------------------------------------------
// Gets the Group ID from user.current
// Runs the other functions to create the page
//----------------------------------------------------
function createPage() {

  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      //console.log("user is signed in");
      db.collection("users").doc(user.uid).collection("current")
        .doc("currentPages")
        .get()
        .then(function (doc) {
          let currentGroupID = doc.data().currentGroup;
          console.log("current group ID: " + currentGroupID);
          addTitle(currentGroupID);
          addDescription(currentGroupID);
          addThreads(currentGroupID);
        }).then(function(){
          setTimeout(function(){
            $("#groupContent").fadeIn(200);
           }, 300);
        });
    } else {
      console.log("no user is signed in");
    }
  })

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
      db.collection("users").doc(user.uid).collection("current")
      .doc("currentPages")
        .update({
          currentThread: `${threadID}`
        }).then(function () {
          document.location.href = "thread.html"
        });
    } else {
      console.log("no user is signed in");
    }
  })
}

//---------------------------------------------------
// Adds the title
//----------------------------------------------------
function addTitle(currentGroupID){
  db.collection("group").doc(currentGroupID)
  .get()
  .then(function (doc){
    
    let name = doc.data().name;
    console.log(`Group Name: ${name}`);

    const title = document.querySelector('h1');
    title.innerText = `${name}`;
  });
}

//---------------------------------------------------
// Adds the description
//----------------------------------------------------
function addDescription(currentGroupID){
  db.collection("group").doc(currentGroupID)
  .get()
  .then(function (doc){
    
    let description = doc.data().description;
    console.log(`Group Description ${description}`);

    const title = document.querySelector('#description');
    title.innerText = `${description}`;
  });
}
//---------------------------------------------------
// Adds the threads
//----------------------------------------------------
function addThreads(currentGroupID) {
  db.collection("group").doc(currentGroupID).collection("thread")
    .get()
    .then((snap) => {
      snap.forEach((doc) => {

        //Gets data
        var threadName = doc.data().name;
        var threadID = doc.id;
        console.log(`ThreadID: ${doc.id}`);
        console.log(`ThreadName: ${threadName}`);
        console.log(" ");

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
        $("#middleContent").prepend(item);
      });
    });
};



//---------------------------------------------------
// When the page starts
// createPage()
//----------------------------------------------------
createPage();