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
          let currentPostID = doc.data().currentPost;
          console.log("current group ID: " + currentGroupID);
          console.log("current thread ID: " + currentThreadID);
          console.log("current post ID: " + currentPostID);

          addTitle(currentGroupID, currentThreadID, currentPostID);
          addBody(currentGroupID, currentThreadID, currentPostID);
          addLikes(currentGroupID, currentThreadID, currentPostID);
          addComments(currentGroupID, currentThreadID, currentPostID);
        }).then(function () {
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
// Adds the title
//----------------------------------------------------
function addTitle(groupIdInput, threadIdInput, postIdInput) {
  db.collection("group").doc(groupIdInput).collection("thread").doc(threadIdInput)
    .collection("post").doc(postIdInput)
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
function addBody(groupIdInput, threadIdInput, postIdInput) {
  db.collection("group").doc(groupIdInput).collection("thread").doc(threadIdInput)
    .collection("post").doc(postIdInput)
    .get()
    .then(function (doc) {

      let body = doc.data().body;
      console.log(`Post Body ${body}`);

      const postBody = document.querySelector('#postBody');
      postBody.innerText = `${body}`;
    });
}

//---------------------------------------------------
// Adds the title
//----------------------------------------------------
function addLikes(groupIdInput, threadIdInput, postIdInput) {
  db.collection("group").doc(groupIdInput).collection("thread").doc(threadIdInput)
    .collection("post").doc(postIdInput)
    .get()
    .then(function (doc) {

      let likes = doc.data().likes;
      console.log(`likes: ${likes}`);
      if (likes < 0) {
      db.collection("group").doc(groupIdInput).collection("thread").doc(threadIdInput)
      .collection("post").doc(postIdInput)
      .update({
        likes: 0
      });
      }
      const postLikes = document.querySelector('#likes');
      postLikes.innerText = `${likes}`;
    });
}


//---------------------------------------------------
// Gets the post info from the database
// Creates post html and appends to the body
//----------------------------------------------------
function addComments(groupIdInput, threadIdInput, postIdInput) {
  db.collection("group").doc(groupIdInput).collection("thread").doc(threadIdInput)
    .collection("post").doc(postIdInput).collection("comment")
    .get()
    .then((snap) => {
      snap.forEach((doc) => {
        //Gets data
        var commentBody = doc.data().body;
        console.log(`Comment Body: ${commentBody}`);

        //Creates a new button element and apppends it to group.html
        commentContainer = document.createElement("div");
        commentContainer.className = "object";
        commentContainer.className += " commentContain";
        commentContainer.className += " centerFlex";

        comment = document.createElement("p");
        comment.className = "comment";
        comment.innerText = `${commentBody}`

        commentContainer.appendChild(comment);

        console.log(commentContainer);
        $("#comments").append(commentContainer);
      });
    });
};

//---------------------------------------------------
// Adds Redirect to creation page on button press
//----------------------------------------------------
function creationPage() {
  document.location.href = "/COMP1800Group16App/creationPages/commentCreation.html";
}

const create = document.querySelector("#comment");
create.addEventListener('click', function () {
  creationPage();
});

//---------------------------------------------------
// Adds to favorites when item is favorited
//----------------------------------------------------
function favorite() {
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {

      //Reads from the database to find out what the current pages are
      db.collection("users").doc(user.uid).collection("current")
        .doc("currentPages")
        .get()
        .then(function (doc) {
          let currentPostID = doc.data().currentPost;
          let currentGroupID = doc.data().currentGroup;
          let currentThreadID = doc.data().currentThread;


          //Checks if the item is already in the favorites
          db.collection("users").doc(user.uid).collection("favorites")
            .doc(`${currentPostID}`)
            .get()
            .then(function (doc) {
              //If it exists, then delete it.
              if (doc.exists) {

                db.collection("users").doc(user.uid).collection("favorites")
                  .doc(`${currentPostID}`).delete()
                console.log(" The favorite is removed.");

                //If it does not, then add it.
              } else {

                db.collection("users").doc(user.uid).collection("favorites")
                  .doc(`${currentPostID}`)
                  .set({
                    postID: `${currentPostID}`,
                    threadID: `${currentThreadID}`,
                    groupID: `${currentGroupID}`
                  });
                console.log(" The favorite is added.");
              }
            })
        });
    } else {
      console.log("no user is signed in");
    }
  });
}

const favoriteButton = document.querySelector("#favorite");
favoriteButton.addEventListener('click', function () {
  favorite();
});


//---------------------------------------------------
// Adds a like to the post when the user likes it 
//----------------------------------------------------
function likePost() {
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      db.collection("users").doc(user.uid).collection("current")
        .doc("currentPages")
        .get()
        .then(function (doc) {
          let currentPostID = doc.data().currentPost;
          let currentGroupID = doc.data().currentGroup;
          let currentThreadID = doc.data().currentThread;

          db.collection("users").doc(user.uid).collection("liked")
            .doc(`${currentPostID}`)
            .get()
            .then(function (doc) {
              if (doc.exists) {
                console.log("like exists");
                db.collection("users").doc(user.uid).collection("liked")
                  .doc(`${currentPostID}`).delete()
                  .then(function () {
                    db.collection("group").doc(`${currentGroupID}`).collection("thread")
                      .doc(`${currentThreadID}`).collection("post").doc(`${currentPostID}`)
                      .update({
                        likes: firebase.firestore.FieldValue.increment(-1)
                      })
                      console.log("like removed");
                  })
              } else {
                console.log("like does not exist");
                db.collection("users").doc(user.uid).collection("liked")
                  .doc(`${currentPostID}`)
                  .set({
                    liked: true
                  }).then(function () {
                    db.collection("group").doc(`${currentGroupID}`).collection("thread")
                      .doc(`${currentThreadID}`).collection("post").doc(`${currentPostID}`)
                      .update({
                        likes: firebase.firestore.FieldValue.increment(1)
                      })
                      console.log("like added");
                  });
              }
            });
            setTimeout(function(){
              addLikes(currentGroupID, currentThreadID, currentPostID);
             }, 700);
        });
    } else {

    }
  })
}


const like = document.querySelector("#like");
like.addEventListener('click', function () {
  likePost();
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