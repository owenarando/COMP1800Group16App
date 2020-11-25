//---------------------------------------------------------------
//This funciton takes user input from the
//creating a thead page and writes the new info into the database.
//---------------------------------------------------------------
function writeToDatabase() {
  firebase.auth().onAuthStateChanged(function (user) {

    //If the user is signed in continue.
    if (user) {
      console.log("User Signed In");

      //Navigating to the users current collections.
      db.collection("users").doc(user.uid).collection("current")
        .doc("currentPages")
        .get()
        .then(function (doc) {

          //Variable that stores the current group ID.
          let currentGroupID = doc.data().currentGroup;
          console.log("current group ID: " + currentGroupID);

          //Variable that stores the user inputed thread title and body
          //from the input field in threadCreation.html.
          let name = document.getElementById("inputTitle").value;
          let description = document.getElementById("inputBody").value;

          //Navigating to the current group and thread colllecion,
          //setting the thread title and description to variables storing user input.
          db.collection("group").doc(currentGroupID).collection("thread")
            .add({
              "name": name,
              "description": description
            });
          console.log("Updated Databse");
        });
    } else {
      console.log("no user is signed in");
    }
  });
}

//---------------------------------------------------------------
//This function adds an event listener on the create button in 
//threadCreation.html. If any of the input fields are blank or 
//less than the specified length an error will appear. If the input
//meets the requirements this function calls the writeToDataBase function
//and writes the user input to the database.
//---------------------------------------------------------------
function createThread() {
  document.getElementById("create").addEventListener("click", function (e) {
    e.preventDefault();

    //Grabbing the input fields.
    let name = document.getElementById("inputTitle");

    //Booleans for the input field checks.
    let titlePass = false;

    //Changes the input background to show invalid input and throws a window error
    //if requirements not met.
    if (name.value === '') {
      name.style.backgroundColor = "var(--error)";
    } else {
      titlePass = true;
      name.style.backgroundColor = "var(--input)"
    }

    //If the requirements are met, calls the writeToDataBase() function
    //then redirects to group page.
    if (titlePass) {
        console.log("Writing to the databse");
      writeToDatabase();
      setTimeout(function () {
      document.location.href = "/COMP1800Group16App/group.html";
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
        document.location.href = "/COMP1800Group16App/group.html";
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
  console.log($);
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
      document.location.href = "/COMP1800Group16App/login2.html"
    }
  })
}


//---------------------------------------------------
// Home Button
//----------------------------------------------------
const home = document.getElementById("home")
home.addEventListener('click', (e) => {
  e.preventDefault();
  document.location.href = "/COMP1800Group16App/home.html";
});


//---------------------------------------------------
// Back Button, will re-direct to group from thread creation page.
//----------------------------------------------------
const backBtn = document.getElementById("back");
backBtn.addEventListener('click', () => {
  document.location.href = "/COMP1800Group16App/group.html";
})

start();
createThread();
cancel();