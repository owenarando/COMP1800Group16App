function writeToDatabse() {
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      console.log("User Signed In");
      db.collection("users").doc(user.uid).collection("current")
        .doc("currentPages")
        .get()
        .then(function (doc) {

          let currentGroupID = doc.data().currentGroup;
          console.log("current group ID: " + currentGroupID);
          let currentThreadID = doc.data().currentThread;
          console.log("current thread ID: " + currentThreadID);
          
          let name = document.getElementById("inputTitle").value;
          let body = document.getElementById("inputBody").value;

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

function createThread() {
  document.getElementById("create").addEventListener("click", function (e) {
    e.preventDefault();
    let name = document.getElementById("inputTitle");
    let body = document.getElementById("inputBody");
    let titlePass = false;
    let bodyPass = false;

    if (name.value === '') {
      window.alert("Title cannot be empty");
      name.style.backgroundColor = "var(--error)";
    } else {
      titlePass = true;
      name.style.backgroundColor = "var(--input)"
    }

    if (body.value === '' || body.value.length < 20) {
      window.alert("body must be atleast 20 characters");
      body.style.backgroundColor = "var(--error)";
    } else {
      bodyPass = true;
      body.style.backgroundColor = "var(--input)"
    }

    if (titlePass && bodyPass) {
      writeToDatabse();
      
      setTimeout(function () {
        document.location.href = "/COMP1800Group16App/thread.html";
      }, 1000);
    }

  });

  document.getElementById("cancel").addEventListener("click", function (e) {
    e.preventDefault();
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        console.log("CancelButton Added");
        document.location.href = "/COMP1800Group16App/thread.html";
      } else {
        console.log("no user is signed in");
      }
    });

  });
}




//---------------------------------------------------
// When the page starts
// createPage()
//----------------------------------------------------

function createPage() {
  console.log($);
  $("#content").fadeIn(400);
}

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

start();
createThread();