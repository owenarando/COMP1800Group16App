function addListener() {

  //Waits for the submit button to be pressed
  document.getElementById("object").addEventListener("submit", function (e) {
    e.preventDefault();

    //Making references to the html elements from threadCreation.html
    var title = document.getElementById("inputTitle").value;
    var body = document.getElementById("inputBody").value;

    //Navigating to the thread in database
    db.collection("group").doc("FeQvXsEC226j9IJegGRb").collection("thread")
      .add({
        "title": title,
        "description": body
      })
  })
}

addListener();

