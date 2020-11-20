//---------------------------------------------------
// Gets the thread ID from the database
// Runs addPosts with the thread ID
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
          let currentThreadID = doc.data().currentThread;

          console.log("current group ID: " + currentGroupID);
          console.log("current thread ID: " + currentThreadID);

          addTitle(currentGroupID, currentThreadID);
          addDescription(currentGroupID, currentThreadID);
          addPosts(currentGroupID, currentThreadID);
        }).then(function () {
          setTimeout(function () {
            $("#threadContent").fadeIn(200);
          }, 300);
        });
    } else {
      console.log("no user is signed in");
    }
  })

};

//---------------------------------------------------
// Puts the post that the user selected on the database
// then brings the user to the post page
//----------------------------------------------------
function enterPost(postID) {
  console.log('enterThread()');

  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      //console.log("user is signed in");
      db.collection("users").doc(user.uid).collection("current")
        .doc("currentPages")
        .update({
          currentPost: `${postID}`
        }).then(function () {
          document.location.href = "post.html"
        });
    } else {
      console.log("no user is signed in");
      document.location.href = "login2.html"
    }
  })
}


//---------------------------------------------------
// Adds the title
//----------------------------------------------------
function addTitle(groupIdInput, threadIdInput) {
  db.collection("group").doc(groupIdInput).collection("thread").doc(threadIdInput)
    .get()
    .then(function (doc) {

      let name = doc.data().name;
      console.log(`Thread Name: ${name}`);

      const title = document.querySelector('h1');
      title.innerText = `${name}`;
    });
}

//---------------------------------------------------
// Adds the description
//----------------------------------------------------
function addDescription(groupIdInput, threadIdInput) {
  db.collection("group").doc(groupIdInput).collection("thread").doc(threadIdInput)
    .get()
    .then(function (doc) {

      let description = doc.data().description;
      console.log(`Thread Description ${description}`);

      const title = document.querySelector('#description');
      title.innerText = `${description}`;
    });
}

//---------------------------------------------------
// Gets the post info from the database
// Creates post html and appends to the body
//----------------------------------------------------
function addPosts(groupIdInput, threadIdInput) {
  db.collection("group").doc(groupIdInput).collection("thread").doc(threadIdInput).collection("post")
    .get()
    .then((snap) => {
      snap.forEach((doc) => {
        //Gets data
        var postName = doc.data().name;
        var postID = doc.id;
        console.log(`PostD: ${doc.id}`);
        console.log(`PostName: ${postName}`);

        //Creates a new button element and apppends it to group.html
        item = document.createElement("button");
        item.className = "gridItem";
        item.className += " object";

        //Asigns the id of the thread to the html ID
        item.id = `${postID}`;
        item.innerText = postName;

        //When the user clicks on the button it calls enterThread
        //and enters its html Id as the parameter
        item.setAttribute("onclick", "enterPost(this.id)");
        $("#threadMiddleContent").prepend(item);
      });
    });
};


//---------------------------------------------------
// When the page starts
// getThreads()
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

start();