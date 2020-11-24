//---------------------------------------------------
// Gets the thread ID from the database
// Runs addPosts with the thread ID
//----------------------------------------------------
function createPage() {
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      //console.log("user is signed in");
      //Navigating to current users collections
      db.collection("users").doc(user.uid).collection("current")
        .doc("currentPages")
        .get()
        .then(function (doc) {

          //Stores the cuurent groupID and threadID is variables
          let currentGroupID = doc.data().currentGroup;
          let currentThreadID = doc.data().currentThread;
          console.log("current group ID: " + currentGroupID);
          console.log("current thread ID: " + currentThreadID);

          //Using the add functions
          addTitle(currentGroupID, currentThreadID);
          addDescription(currentGroupID, currentThreadID);
          addPosts(currentGroupID, currentThreadID);
        }).then(function () {
          //Creates a delay so the content is all dispolayed at once
          setTimeout(function () {
            $("#content").fadeIn(200);
          }, 300);
        });
    } else {
      console.log("no user is signed in");
    }
  })
};

//---------------------------------------------------
// Brings the user to the thread they clicked on.
// Accepts the postID as a paramter.
//----------------------------------------------------
function enterPost(postID) {
  console.log('enterThread()');
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {

      //console.log("user is signed in");
      //Navigating the the current users collections.
      db.collection("users").doc(user.uid).collection("current")
        .doc("currentPages")

        //Sets the current post to the post id from the database.
        .update({
          currentPost: `${postID}`
        }).then(function () {
          document.location.href = "post.html"
        });
    } else {
      console.log("no user is signed in");
      document.location.href = "login2.html"
    }
  });
};

//---------------------------------------------------
// Adds the title to the thread.
// Accepts the groupID and threadID as paramenters.
//----------------------------------------------------
function addTitle(groupIdInput, threadIdInput) {

  //Navigating to the group and thread.
  db.collection("group").doc(groupIdInput).collection("thread").doc(threadIdInput)
    .get()
    .then(function (doc) {

      //Storing the name of the thread in a variable.
      let name = doc.data().name;
      console.log(`Thread Name: ${name}`);

      //Sets the text of the thread title to the name variable.
      const title = document.querySelector('h1');
      title.innerText = `${name}`;
    });
};

//---------------------------------------------------
// Adds the description to the thread.
// Accepts the groupID and threadID  as paramenters.
//----------------------------------------------------
function addDescription(groupIdInput, threadIdInput) {

  //Navigating to the group and thread.
  db.collection("group").doc(groupIdInput).collection("thread").doc(threadIdInput)
    .get()
    .then(function (doc) {

      //Storing the description of the thread in a variable.
      let description = doc.data().description;
      console.log(`Thread Description ${description}`);

      //Sets the text of the html description to the description variable.
      const title = document.querySelector('#description');
      title.innerText = `${description}`;
    });
}

//---------------------------------------------------
// Gets the post info from the database.
// Creates post html and appends to the body.
// Accepts groudID and threadID as parameters.
//----------------------------------------------------
function addPosts(groupIdInput, threadIdInput) {

  ////Navigating to the post.
  db.collection("group").doc(groupIdInput).collection("thread").doc(threadIdInput).collection("post")
    .orderBy("name", "desc")
    .get()
    .then((snap) => {
      snap.forEach((doc) => {

        //Grabs each posts name and ID from the database and stores them in variables.
        var postName = doc.data().name;
        var postID = doc.id;
        console.log(`PostD: ${doc.id}`);
        console.log(`PostName: ${postName}`);

        //Creates a new button element(posts) and apppends it to group.html
        //Classes given are to add the right css.
        item = document.createElement("button");
        item.className = "gridItem";
        item.className += " object";

        //Assigns the id of the thread to the html ID and adds the post name to the text.
        item.id = `${postID}`;
        item.innerText = postName;

        //Gives the buttons added a click event, when clicked it 
        //calls the enterPost() method that uses the current postID as 
        //a parameter.
        item.setAttribute("onclick", "enterPost(this.id)");
        $("#middleContent").prepend(item);
      });
    });
};


//---------------------------------------------------
// Adds Redirect to creation page on button press
//----------------------------------------------------
function creationPage() {
  document.location.href = "/COMP1800Group16App/creationPages/postCreation.html";
}

//Variable that stores the create button, id of  "create".
const create = document.querySelector("#create");

//Event listenter for the create button, on click 
//calls the creationPage function.
create.addEventListener('click', function () {
  creationPage();
});

//---------------------------------------------------
// If user is logged in, create the page. 
// If not, take them to login 
//----------------------------------------------------
function start() {
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      console.log("User is signed in, loading Home Page");
      createPage();
    } else {
      console.log("No user signed in, loading login page");
      document.location.href = "login2.html"
    }
  })
}

//---------------------------------------------------
// Back Button, will re-direct to group from thread page
//----------------------------------------------------
const backBtn = document.getElementById("back");
backBtn.addEventListener('click', () => {
  document.location.href = "group.html";
})

start();