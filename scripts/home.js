//---------------------------------------------------
// Puts the thread that the user selected on the database
// then brings the user to the threadpage
//----------------------------------------------------

function enterGroup(groupID) {
  console.log('enterGroup()');

  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      //console.log("user is signed in");
      db.collection("users").doc(user.uid).collection("current")
        .doc("currentPages")
        .update({
          currentGroup: `${groupID}`
        }).then(function () {
          document.location.href = "group.html"
        });
    } else {
      console.log("no user is signed in");
    }
  });
}

function createPage() {
  db.collection("group")
    .get()
    .then((snap) => {
      snap.forEach((doc) => {

        //Gets data
        var groupName = doc.data().name;
        var groupID = doc.id;
        console.log(`GroupID: ${doc.id}`);
        console.log(`GroupName: ${groupName}`);


        //Creates a new button element and apppends it to group.html
        item = document.createElement("button");
        item.className = "group";
        item.className += " object";

        //Asigns the id of the thread to the html ID
        item.id = `${groupID}`;
        item.innerText = groupName;

        //When the user clicks on the button it calls enterThread
        //and enters its html Id as the parameter
        item.setAttribute("onclick", "enterGroup(this.id)");
        $("#groups").prepend(item);
      });
    }).then(() => {
      setTimeout(function () {
        $("#content").fadeIn(300);
      }, 300);
    });
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