
function addGroupNames() {

    db.collection("group")

      .get("GroupTest")
      .then(function (snap) {

          snap.forEach(function (doc) {

            var n = doc.data().name;
            console.log(n);

            
          })
      })
}
  
//addGroupNames();