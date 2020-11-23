//---------------------------------------------------
// Takes in the ID of a post. That same ID is also 
// then brings the user to the threadpage
//----------------------------------------------------
<<<<<<< HEAD
function enterFavorite(postIdInput) {
    //Checks if the user is signed in 
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            //Reads from the us
            db.collection("users").doc(user.uid).collection("favorites").doc(`${postIdInput}`)
                .get()
                .then((doc) => {
                    let favoritePostID = doc.data().postID;
                    let favoriteThreadID = doc.data().threadID;
                    let favoriteGroupID = doc.data().groupID;

                    db.collection("users").doc(user.uid).collection("current")
                        .doc("currentPages")
                        .update({
                            currentGroup: `${favoriteGroupID}`,
                            currentThread: `${favoriteThreadID}`,
                            currentPost: `${favoritePostID}`
                        }).then(function () {
                            document.location.href = "post.html"
                        });
                });
        } else {
            console.log("no user is signed in");
        }
    });
}

//---------------------------------------------------
// UPDATES .update() what group the user is currently in
// Then loads group.htmL
//----------------------------------------------------
=======
>>>>>>> bbd6a90dba2a13e9d3414e3d18d7eb94a9cd3818
function enterGroup(groupID) {
    //Checks if the user us logged in 
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            //Updates what group the user us currently in 
            db.collection("users").doc(user.uid).collection("current")
                .doc("currentPages")
                .update({
                    currentGroup: `${groupID}`
                }).then(function () {
                    //Loadds group.html
                    document.location.href = "group.html"
                });
        } else {
            //If there is no user logged in, bring them to the login
            console.log("no user is signed in");
            document.location.href = "login2.html"
        }
    });
}

//---------------------------------------------------
// Creates Buttons For Each Group the user is part of 
// READS from the database with .get()
//----------------------------------------------------
function addGroups() {
    //Reads The Groups from the database
    db.collection("group")
        .get()
        .then((snap) => {
            snap.forEach((doc) => {
                //Takes the ID of the group document and the name field
                var groupName = doc.data().name;
                var groupID = doc.id;
                console.log(`GroupID: ${doc.id}`);
                console.log(`GroupName: ${groupName}`);

                //Creates a new button element, and asigns it the appropriate classes
                item = document.createElement("button");
                item.className = "group";
                item.className += " object";

                //Asigns assigns the ID of the button to the ID of the group document
                //Makes the text of the button, the name of the group
                item.id = `${groupID}`;
                item.innerText = groupName;

                //When the user clicks on the button it calls enterGroup()
                //and enters its HTML ID attribute as the parameter
                item.setAttribute("onclick", "enterGroup(this.id)");
                $("#groups").prepend(item);
            });
        });
}

//---------------------------------------------------
// Creates Buttons For Each Favorite the usr has
// READS from the database with .get()
//----------------------------------------------------
function addFavorites() {
    //Checks if the user is logged in
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            //Gets favorite post location
            db.collection("users").doc(user.uid).collection("favorites")
                .get()
                .then((snap) => {
                    snap.forEach((doc) => {
                        //Gets the full location of the favorite post
                        let groupID = doc.data().groupID;
                        let threadID = doc.data().threadID;
                        let postID = doc.data().postID;

                        //Finds post, retrieves it's field information
                        db.collection("group").doc(groupID).collection("thread").doc(threadID)
                            .collection("post").doc(postID)
                            .get()
                            .then((doc) => {
                                //gets post name
                                let postName = doc.data().name;

                                //Creates a new button element, and asigns it the appropriate classes
                                item = document.createElement("button");
                                item.className = "favoriteItem";
                                item.className += " object";

                                //Asigns assigns the ID of the button to the ID of the favorite post document
                                //Makes the text of the button, the name of the favorite post
                                item.id = `${postID}`;
                                item.innerText = `${postName}`;

                                //When the user clicks on the button it calls enterFavorite()
                                //and enters its HTML ID attribute as the parameter
                                item.setAttribute("onclick", "enterFavorite(this.id)");
                                $("#favorite").prepend(item);
                            });
                    });
                });
        } else {
            //If the user is not signed in, bring them to the login
            console.log("no user is signed in");
            document.location.href = "login2.html"
        }
    })
}



function createPage() {
    addGroups();
    addFavorites();
    $("#content").fadeIn(300);
};


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