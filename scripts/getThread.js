/*------ Grabs a single thread ------*/

//Id at the end is a thread id
/*db.collection("group").doc("Banana").collection("thread").doc("Yf1phTVHSWGIkAPScCau")
  .onSnapshot(function (c) {
    console.log("current data: ", c.data());
    
    //This grabs the thread name
    var tName = c.data().name;

    //Creating a new element with js and appending it
    item = document.createElement("button");
    item.setAttribute("id", "gridItem");
    item.innerText = tName;
    $("#middleContent").append(item);

  });
*/


/*---Grabs all the threads in a group and displays them on group.html---*/
function getThreads() {
  db.collection("group").doc("Banana").collection("thread")
    .get()
    .then((snap) => {
      snap.forEach((doc) => {

        //.name is the field in a thread, in the firebase database
        //This gets the name of the threads
        var threads = doc.data().name;
        console.log(threads);
        console.log(doc.id)

        //Creates a new button element and apppends it to group.html
        item = document.createElement("button");
        item.setAttribute("id", "gridItem");
        item.setAttribute("class", "object");
        item.innerText = threads;
        $("#middleContent").append(item);
      });
    });
};

getThreads();






  

