//---------------------------------------------------
// Gets the current users groups, threads and posts to display.
//----------------------------------------------------
function createPage() {
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      //console.log("user is signed in");
      //Navigating to the current users collections.
      db.collection("users").doc(user.uid).collection("current")
        .doc("currentPages")
        .get()
        .then(function (doc) {

          //Storing the users groups, threads, posts in variables.
          let currentGroupID = doc.data().currentGroup;
          let currentThreadID = doc.data().currentThread;
          let currentPostID = doc.data().currentPost;
          console.log("current group ID: " + currentGroupID);
          console.log("current thread ID: " + currentThreadID);
          console.log("current post ID: " + currentPostID);
          
          //Calling the add fuctions to display trhe correct groups, threads, posts.
          addTitle(currentGroupID, currentThreadID, currentPostID);
          addBody(currentGroupID, currentThreadID, currentPostID);
          addLikes(currentGroupID, currentThreadID, currentPostID);
          addComments(currentGroupID, currentThreadID, currentPostID);
        }).then(function(){

          //Setting a timeout to allow everything to load in at the same time.
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
// Adds the title to the post.
// Accepts the groupID and threadID and postID as paramenters.
//----------------------------------------------------
function addTitle(groupIdInput, threadIdInput, postIdInput){

  //Navigating to the post inside of a certain group and thread.
  db.collection("group").doc(groupIdInput).collection("thread").doc(threadIdInput)
  .collection("post").doc(postIdInput)
  .get()
  .then(function (doc){
    
    //Storing the name of the post in a variable.
    let name = doc.data().name;
    console.log(`Thread Name: ${name}`);

    //Sets the text of the post the to name variable.
    const title = document.querySelector('h1');
    title.innerText = `${name}`;
  });
}

//---------------------------------------------------
// Adds the body to the post.
// Accepts the groupID, threadID and postID as parameters.
//----------------------------------------------------
function addBody(groupIdInput, threadIdInput, postIdInput){

  //Navigating to the post inside of a certain group and thread.
  db.collection("group").doc(groupIdInput).collection("thread").doc(threadIdInput)
  .collection("post").doc(postIdInput)
  .get()
  .then(function (doc){
    
    //Storing the body of the post in a variable.
    let body = doc.data().body;
    console.log(`Post Body ${body}`);

    //Sets the text of the body of a post to the body variable.
    const postBody = document.querySelector('#postBody');
    postBody.innerText = `${body}`;
  });
}

//---------------------------------------------------
// Adds likes to the post.
// Accepts the groupID, threadID and postID as parameters.
//----------------------------------------------------
function addLikes(groupIdInput, threadIdInput, postIdInput){

  //Navigating to the post inside of a certain group and thread.
  db.collection("group").doc(groupIdInput).collection("thread").doc(threadIdInput)
  .collection("post").doc(postIdInput)
  .get()
  .then(function (doc){
    
    //Storing the likes in a variable.
    let likes = doc.data().likes;
    console.log(`likes: ${likes}`);

    //Sets the amount of likes to the likes variable.
    const postLikes = document.querySelector('#likes');
    postLikes.innerText = `${likes}`;
  });
}


//---------------------------------------------------
// Adds comments from the database for a certain post.
// Creates comment html and appends to the body.
// Accepts groudID, threadID and postID as parameters.
//----------------------------------------------------
function addComments(groupIdInput, threadIdInput, postIdInput) {

  //Navigating to the comments for a certain post.
  db.collection("group").doc(groupIdInput).collection("thread").doc(threadIdInput)
  .collection("post").doc(postIdInput).collection("comment")
    .get()
    .then((snap) => {
      snap.forEach((doc) => {
        
        //Stores the comment in a variable.
        var commentBody = doc.data().body;
        console.log(`Comment Body: ${commentBody}`);

        //Creates a new div for a comment.
        commentContainer = document.createElement("div");
        commentContainer.className = "object";
        commentContainer.className += " commentContain";
        commentContainer.className += " centerFlex";
        
        //Creates a p that will hold the comment.
        comment = document.createElement("p");
        comment.className = "comment";
        comment.innerText = `${commentBody}`

        //Appends the comment to the div that will hold the comment.
        commentContainer.appendChild(comment);

        //Appends the whole comment to the comments section n post.html.
        console.log(commentContainer);
        $("#comments").append(commentContainer);
      });
    });
};

//---------------------------------------------------
// Adds Redirect to comment creation page.
//----------------------------------------------------
function creationPage(){
  document.location.href = "/COMP1800Group16App/creationPages/commentCreation.html";
}

//Variable that stores the comment button.
const create = document.querySelector("#comment");

//EventListener that redirects user to comment creation when comment
//button is clicked.
create.addEventListener('click', function(){
  creationPage();
});

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