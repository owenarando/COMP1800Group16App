/*------ Grabs a single thread ------*/

//Id at the end is a thread id
/*db.collection("group").doc("Banana").collection("thread").doc("Yf1phTVHSWGIkAPScCau")
  .onSnapshot(function (c) {
    console.log("current data: ", c.data());
    
    //This grabs the thread name
    var tName = c.data().name;

    //Creating a new element with js and appending it
    item = document.createElement("button");
    item.setAttribute("id", "gridItem");
    item.innerText = tName;
    $("#middleContent").append(item);

  });
*/
/***Stores the current threadID***/
let currentThreadID;

/***Writes what the current thread is to the database, then loads the post page*/
function enterThread(threadID) {
  console.log('enterThread()');

  currentThreadID = threadID;

  /**Writes What the current thread is */
  db.collection("currentPage").doc("thread").set({
    currentID: `${currentThreadID}`
  }).then(function () {
    document.location.href = "thread.html"
  });
  /*
  console.log('Reading From Database')
  db.collection("currentPage").doc("thread")
  .get()
  .then((snap) => {
    currentThreadID = snap.data().id;
  })
  console.log("Type of currentThreadID: " + typeof currentThreadID);
  console.log("currentThreadID: " + currentThreadID)
  */



}

/*
function currentThread(threadID){
  
  db.collection("currentPage").doc("thread")
    .get()
    .then((snap) => {
      currentThreadID = doc.data().id;
    })
}
*/

/***Gets the posts from the database, creates the objects, puts them on the page.***/
function setPosts() {

  db.collection("currentPage")
    .doc("thread")
    .get()
    .then(function (doc) {
      currentThreadID = doc.data().currentID;
      console.log("current thread ID: " + currentThreadID);
      getPosts(currentThreadID);
    })
};

function getPosts(thredIdInput) {
  db.collection("group").doc("owentest").collection("thread").doc(thredIdInput).collection("post")
    .get()
    .then((snap) => {
      snap.forEach((doc) => {

        //.name is the field in a thread, in the firebase database
        //This gets the name of the threads
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
        /*
        item.addEventListener("click", function (){
          //enterThread();
        });
       */
        $("#threadMiddleContent").append(item);
      });
    });
}
/*
db.collection("group").doc("owentest").collection("thread").doc(currentThreadID).collection("post")
  .get()
  .then((snap) => {
    snap.forEach((doc) => {

      //.name is the field in a thread, in the firebase database
      //This gets the name of the threads
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
      item.setAttribute("onclick","enterThread(this.id)");
      /*
      item.addEventListener("click", function (){
        //enterThread();
      });
     
      $("#threadMiddleContent").append(item); 
    });
  });
  */




/*---Grabs all the threads in a group and displays them on group.html---*/
function getThreads() {
  db.collection("group").doc("owentest").collection("thread")
    .get()
    .then((snap) => {
      snap.forEach((doc) => {

        //.name is the field in a thread, in the firebase database
        //This gets the name of the threads
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
        /*item.addEventListener("click", function (){
          enterThread();
        });*/
        $("#middleContent").append(item);
      });
    });
};



/***Checks what the page is by checking the id of the the content div***/
var whatPage = document.body.children[0].id;
console.log(whatPage)
if (whatPage == "groupContent") {
  getThreads();
}

if (whatPage == "threadContent") {
  setPosts();
}
/*
function check() {

  db.collection("currentPage")
    .doc("thread")
    .get()
    .then(function (doc) {
      currentThreadID = doc.data().currentID;
      console.log("current thread ID: " + currentThreadID);
    })

}
check();
*/