$(document).ready(function () {

    function addListener(){
        document.getElementById("submit").addEventListener("click", function (e) {
          // disable default form handling
          e.preventDefault();
      
          var comment = document.getElementById("subject").value;
      
          db.collection("group").doc("/FeQvXsEC226j9IJegGRb")
          .collection("thread").doc("X6qpykDd5DatRAyBUf7P").collection("post").doc("XmW5N4comzoWry3voSEX").collection("comment").add({
            "comment": comment
          });
      
      });
      }
      addListener();
 });