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
// Gets the post info from the database
// Creates post html and appends to the body
//----------------------------------------------------
function setPosts() {

  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      //console.log("user is signed in");
      db.collection("users").doc(user.uid).collection("current")
        .doc("thread")
        .get()
        .then(function (doc) {
          let currentThreadID = doc.data().currentID;
          console.log("current thread ID: " + currentThreadID);
          getPosts(currentThreadID);
        })
    } else {
      console.log("no user is signed in");
    }
  })

};

//---------------------------------------------------
// Gets the post info from the database
// Creates post html and appends to the body
//----------------------------------------------------
function getPosts(thredIdInput) {
  db.collection("group").doc("owentest").collection("thread").doc(thredIdInput).collection("post")
    .get()
    .then((snap) => {
      snap.forEach((doc) => {
        //Gets data
        var postName = doc.data().name;
        var postID = doc.id;
        console.log(postName);
        console.log(doc.id)

        //Creates a new button element and apppends it to group.html
        item = document.createElement("button");
        item.className = "gridItem";
        item.className += " object";
        item.id = `${postID}`;
        item.innerText = postName;
        item.setAttribute("onclick", "enterThread(this.id)");
        $("#threadMiddleContent").append(item);
      });
    });
};


//---------------------------------------------------
// Gets the thread info from the database
// Creates thread html and appends to the body
//----------------------------------------------------
function getThreads() {
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
        item.id = `${threadID}`;
        item.innerText = threadName;
        item.setAttribute("onclick", "enterThread(this.id)");
        $("#middleContent").append(item);
      });
    });
};



//---------------------------------------------------
//Checks which page is currently loaded
//----------------------------------------------------
var whatPage = document.body.children[0].id;
console.log(whatPage);
if (whatPage == "groupContent") {
  getThreads();
}

if (whatPage == "threadContent") {
  setPosts();
}