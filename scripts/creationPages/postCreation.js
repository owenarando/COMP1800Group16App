//---------------------------------------------------------------
// **** READING AND WRITING DATA ****
//
//This funciton takes user input from the
//creating a post page and writes the new info into the database.
//---------------------------------------------------------------
function writeToDatabse() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            console.log("User Signed In");

            //Navigating to the users current collections.
            db.collection("users").doc(user.uid).collection("current")
                .doc("currentPages")
                .get()
                .then(function (doc) {

                    //Variables that store the current group and thread IDs.
                    let currentGroupID = doc.data().currentGroup;
                    console.log("current group ID: " + currentGroupID);
                    let currentThreadID = doc.data().currentThread;
                    console.log("current thread ID: " + currentThreadID);

                    //Variable that stores the user inputed post title and body
                    //from the input field in tpostCreation.html.
                    let name = document.getElementById("inputTitle").value.toUpperCase();
                    let body = document.getElementById("inputBody").value;

                    //Navigating to the current group, thread and post collection,
                    //setting the post title and body to variables storing user input.
                    db.collection("group").doc(currentGroupID).collection("thread")
                        .doc(currentThreadID).collection("post")
                        .add({
                            "name": name,
                            "body": body,
                            "likes": 0
                        });
                    console.log("Updated Databse");
                });
        } else {
            console.log("no user is signed in");
        }
    });
}

//---------------------------------------------------------------
// **** USES THE writeToDataBase() function TO WRITE DATA ****
//
//This function adds an event listener on the create button in 
//postCreation.html. If any of the input fields are blank or 
//less than the specified length an error will appear. If the input
//meets the requirements this function calls the writeToDataBase function
//and writes the user input to the database.
//---------------------------------------------------------------
function createPost() {
    document.getElementById("create").addEventListener("click", function (e) {
        e.preventDefault();

        //Grabbing the input fields.
        let name = document.getElementById("inputTitle");
        let body = document.getElementById("inputBody");
       
        //Booleans for the input field checks.
        let titlePass = false;
        let bodyPass = false;

        //Changes the input background to show invalid input and throws a window error
        //if requirements not met.
        if (name.value === '') {
            name.style.backgroundColor = "var(--error)";
        } else {
            titlePass = true;
            name.style.backgroundColor = "var(--input)"
        }

        if (body.value === '') {
            body.style.backgroundColor = "var(--error)";
        } else {
            bodyPass = true;
            body.style.backgroundColor = "var(--input)"
        }

    
        //If the requirements are met, calls the writeToDataBase() function
        //then redirects to group page.
        if (titlePass && bodyPass) {
            writeToDatabse();
            setTimeout(function () {
                document.location.href = "../thread.html";
            }, 1000);
        }
    });
};

//---------------------------------------------------------------
//This function adds an event listener on the cancel button.
//If the cancel button is pressed the inputed information is removed 
//and the user is sent back to the group page.
//---------------------------------------------------------------
function cancel() {
    document.getElementById("cancel").addEventListener("click", function (e) {
        e.preventDefault();
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                console.log("CancelButton Added");
                document.location.href = "../thread.html";
            } else {
                console.log("no user is signed in");
            }
        });
    });
};

//---------------------------------------------------
// When the page starts
// createPage()
//----------------------------------------------------
function createPage() {
    $("#content").fadeIn(400);
}

//---------------------------------------------------------------
//This function checks if a user is logged in when going to the 
//create page, if no user is logged in they get re-directed
//to the login page.
//---------------------------------------------------------------
function start() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            console.log("User is signed in, loading creation Page");
            createPage();
        } else {
            console.log("No user signed in, loading login page");
            document.location.href = "../index.html"
        }
    })
}


//---------------------------------------------------
// Home Button
//----------------------------------------------------
const home = document.getElementById("home")
home.addEventListener('click', (e) => {
  e.preventDefault();
  document.location.href = "../home.html";
});

//---------------------------------------------------
// Back Button, will re-direct to thread from post creation page.
//----------------------------------------------------
const backBtn = document.getElementById("back");
backBtn.addEventListener('click', () => {
  document.location.href = "../thread.html";
})

start();
createPost();
cancel();