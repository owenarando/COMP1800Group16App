//Id at the end is a thread id
db.collection("group").doc("Banana").collection("thread").doc("Yf1phTVHSWGIkAPScCau")
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



  

