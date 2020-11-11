function addListener(){
  document.getElementById("create").addEventListener("click", function (e) {
    // disable default form handling
    e.preventDefault();

    var title = document.getElementById("inputTitle").value;
    var links = document.getElementById("inputLinks").value;
    var body= document.getElementById("inputBody").value;
    
    db.collection("group").doc("FeQvXsEC226j9IJegGRb")
    .collection("thread").doc("X6qpykDd5DatRAyBUf7P").collection("post").add({
      "title": title,
      "links": links,
      "body": body
    });
    
});
}

addListener();