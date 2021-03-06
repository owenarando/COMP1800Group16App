//---------------------------------------------------
// **** READING DATA ****
//
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

                    //Calling the add fuctions to display the correct groups, threads, posts.
                    addTitle(currentGroupID, currentThreadID, currentPostID);
                    addBody(currentGroupID, currentThreadID, currentPostID);
                    addLikes(currentGroupID, currentThreadID, currentPostID);
                    addComments(currentGroupID, currentThreadID, currentPostID);
                }).then(function () {

                    //Setting a timeout to allow everything to load in at the same time.
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
// **** READING DATA ****
//
// Adds the title to the post.
// Accepts the groupID and threadID and postID as paramenters.
//----------------------------------------------------
function addTitle(groupIdInput, threadIdInput, postIdInput) {

    //Navigating to the post inside of a certain group and thread.
    db.collection("group").doc(groupIdInput).collection("thread").doc(threadIdInput)
        .collection("post").doc(postIdInput)
        .get()
        .then(function (doc) {

            //Storing the name of the post in a variable.
            let name = doc.data().name;
            console.log(`Thread Name: ${name}`);

            //Sets the text of the post the to name variable.
            const title = document.querySelector('#titleText');
            title.innerText = `${name}`;
        });
}

//---------------------------------------------------
// **** READING DATA ****
//
// Adds the body to the post.
// Accepts the groupID, threadID and postID as parameters.
//----------------------------------------------------
function addBody(groupIdInput, threadIdInput, postIdInput) {

    //Navigating to the post inside of a certain group and thread.
    db.collection("group").doc(groupIdInput).collection("thread").doc(threadIdInput)
        .collection("post").doc(postIdInput)
        .get()
        .then(function (doc) {

            //Storing the body of the post in a variable.
            let body = doc.data().body;
            console.log(`Post Body ${body}`);

            //Sets the text of the body of a post to the body variable.
            const postBody = document.querySelector('#postBody');
            postBody.innerText = `${body}`;

        });
}

//---------------------------------------------------
// **** READING DATA ****
//
// Adds likes to the post.
// Accepts the groupID, threadID and postID as parameters.
//----------------------------------------------------
function addLikes(groupIdInput, threadIdInput, postIdInput) {

    //Navigating to the post inside of a certain group and thread.
    db.collection("group").doc(groupIdInput).collection("thread").doc(threadIdInput)
        .collection("post").doc(postIdInput)
        .get()
        .then(function (doc) {

            //Storing the likes in a variable.
            let likes = doc.data().likes;
            console.log(`likes: ${likes}`);

            //Sets the amount of likes to the likes variable.
            const postLikes = document.querySelector('#likes');
            postLikes.innerText = `${likes}`;
        });
}


//---------------------------------------------------
// **** READING AND ORDERING DATA ****
//
// Adds comments from the database for a certain post.
// Creates comment html and appends to the body.
// Accepts groudID, threadID and postID as parameters.
//----------------------------------------------------
function addComments(groupIdInput, threadIdInput, postIdInput) {

    //Navigating to the comments for a certain post.
    db.collection("group").doc(groupIdInput).collection("thread").doc(threadIdInput)
        .collection("post").doc(postIdInput).collection("comment").orderBy("time")
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

                //Creates a <p> that will hold the comment.
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
function creationPage() {
    document.location.href = "creationPages/commentCreation.html";
}

//Variable that stores the comment button.
const create = document.querySelector("#comment");

//EventListener that redirects user to comment creation when comment
//button is clicked.
create.addEventListener('click', function () {
    creationPage();
});

//---------------------------------------------------
// **** READING, WRITING, AND DELETING DATA ****
//
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
// **** READING, WRTIING AND DELETING DATA ****
//
// Adds a like to the post when the user likes it 
//----------------------------------------------------
function likePost() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {

            //Gets the users current pages
            db.collection("users").doc(user.uid).collection("current")
                .doc("currentPages")
                .get()
                .then(function (doc) {
                    let currentPostID = doc.data().currentPost;
                    let currentGroupID = doc.data().currentGroup;
                    let currentThreadID = doc.data().currentThread;

                    //Checks iof the user has liked the post or not
                    db.collection("users").doc(user.uid).collection("liked")
                        .doc(`${currentPostID}`)
                        .get()
                        .then(function (doc) {
                            //If it does, decrememnt the like and remove it
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
                                //If it doesnt, add the like and icrement the post likes
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
                    setTimeout(function () {
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
// **** READING DATA ****
//
// Intitialzue the like button, wheter the user has liked the post or not
//----------------------------------------------------
/* Check if user "liked" the post, "likeButton" syle change base on T/F */
function likeButton() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            db.collection("users").doc(user.uid).collection("current")
                .doc("currentPages")
                .get()
                .then(function (doc) {
                    let currentPostID = doc.data().currentPost;
                    db.collection("users").doc(user.uid).collection("liked")
                        .doc(`${currentPostID}`)
                        .get()
                        .then(function (doc) {
                            if (doc.exists) {
                                var likeButton = document.getElementById("like");
                                $(likeButton).children("i").css({
                                    "color": "#FFF5D0"
                                });
                                $(likeButton).css({
                                    "background-color": "#0F222D"
                                });
                            } else {
                                var likeButton = document.getElementById("like");
                                $(likeButton).children("i").css({
                                    "color": "#0F222D"
                                });
                                $(likeButton).css({
                                    "background-color": "#FFF5D0"
                                });
                            }
                        });

                });
        } else {}
    })
}
likeButton();

//---------------------------------------------------
// **** READING DATA ****
//
// Toggles the like button
//----------------------------------------------------
function likeToggle() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            
            //Reads from the database to check what the users current pages are.
            db.collection("users").doc(user.uid).collection("current")
                .doc("currentPages")
                .get()
                .then(function (doc) {

                    //Gets the ID of he current post and checks if the user liked it or not
                    let currentPostID = doc.data().currentPost;
                    db.collection("users").doc(user.uid).collection("liked")
                        .doc(`${currentPostID}`)
                        .get()
                        .then(function (doc) {

                            //changes the styling of the button depending on whether the user
                            //liked the post
                            if (doc.exists) {
                                var likeButton = document.getElementById("like");
                                $(likeButton).children("i").css({
                                    "color": "#0F222D"
                                });
                                $(likeButton).css({
                                    "background-color": "#FFF5D0"
                                });
                            } else {
                                var likeButton = document.getElementById("like");
                                $(likeButton).children("i").css({
                                    "color": "#FFF5D0"
                                });
                                $(likeButton).css({
                                    "background-color": "#0F222D"
                                });
                            }
                        });
                });
        } else {}
    });
}

//---------------------------------------------------
// **** READING DATA ****
//
// Initializes the favorite button
//----------------------------------------------------
function favoriteBtn() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            //Reads from the database to find out what the current pages are
            db.collection("users").doc(user.uid).collection("current")
                .doc("currentPages")
                .get()
                .then(function (doc) {
                    let currentPostID = doc.data().currentPost;

                    //Checks if the item is already in the favorites
                    db.collection("users").doc(user.uid).collection("favorites")
                        .doc(`${currentPostID}`)
                        .get()
                        .then(function (doc) {

                            //changes the styling based on if the item is already favorited
                            if (doc.exists) {
                                var fav = document.getElementById("favorite");
                                $(fav).children("i").css({
                                    "color": "#FFF5D0"
                                });
                                $(fav).css({
                                    "background-color": "#0F222D"
                                });
                            } else {
                                var fav = document.getElementById("favorite");
                                $(fav).children("i").css({
                                    "color": "#0F222D"
                                });
                                $(fav).css({
                                    "background-color": "#FFF5D0"
                                });
                            }
                        })
                });
        } else {}
    });
}
favoriteBtn();

//---------------------------------------------------
// **** READING DATA ****
//
// Toggles the favorite button
//----------------------------------------------------
function favouriteToggle() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            //Reads from the database to find out what the current pages are
            db.collection("users").doc(user.uid).collection("current")
                .doc("currentPages")
                .get()
                .then(function (doc) {
                    let currentPostID = doc.data().currentPost;
                    //Checks if the item is already in the favorites
                    db.collection("users").doc(user.uid).collection("favorites")
                        .doc(`${currentPostID}`)
                        .get()
                        .then(function (doc) {
                            if (doc.exists) {
                                var fav = document.getElementById("favorite");
                                $(fav).children("i").css({
                                    "color": "#0F222D"
                                });
                                $(fav).css({
                                    "background-color": "#FFF5D0"
                                });
                            } else {
                                var fav = document.getElementById("favorite");
                                $(fav).children("i").css({
                                    "color": "#FFF5D0"
                                });
                                $(fav).css({
                                    "background-color": "#0F222D"
                                });
                            }
                        })
                });
        } else {}
    });
}


//---------------------------------------------------
// **** READING DATA ****
//
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
// Back Button, will re-direct to threads from posts page
//----------------------------------------------------
const backBtn = document.getElementById("back");
backBtn.addEventListener('click', () => {
    document.location.href = "thread.html";
})

start();