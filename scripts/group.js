//---------------------------------------------------
// Gets the Group ID from user.current
// Runs the other functions to create the page
//----------------------------------------------------
function createPage() {
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
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
            $("#content").fadeIn(200);
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
    .orderBy("name", "desc")
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
        item.className += " reactiveBtn";

        //Assigns the id of the thread to the html ID
        item.id = `${threadID}`;
        item.innerText = threadName;

        //When the user clicks on the button it calls enterThread
        //and enters its html Id as the parameter
        //it also changes the buttons color
        $(item).on('click', () =>{
            $(event.currentTarget).css({
                "background-color": "var(--dark2)",
                "color": "var(--light2)"
            });
        })
        item.setAttribute("onclick", "enterThread(this.id)");
        $("#middleContent").prepend(item);
      });
    });
};


//---------------------------------------------------
// Adds Redirect to creation page on button press
//----------------------------------------------------
function creationPage(){
  document.location.href = "creationPages/threadCreation.html";
}

const create = document.querySelector("#create");
create.addEventListener('click', function(){
  creationPage();
});


//---------------------------------------------------
// When the page starts
// createPage()
//----------------------------------------------------

function start() {
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      console.log("User is signed in, loading Home Page");
      createPage();
    } else {
      console.log("No user signed in, loading login page");
      document.location.href = "index.html"
    }
  })
}

//---------------------------------------------------
// Home Button
//----------------------------------------------------
const home = document.getElementById("home")
home.addEventListener('click', (e) => {
  e.preventDefault();
  document.location.href = "home.html";
});


//---------------------------------------------------
// Back Button, will re-direct to home from group page
//----------------------------------------------------
const backBtn = document.getElementById("back");
backBtn.addEventListener('click', () => {
  document.location.href = "home.html";
})
start();


