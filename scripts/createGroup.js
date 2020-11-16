// JS for groupCreation.html
// 1) create, cancel buttons
// 2) submit group: name, description; under collection of group

function create() {

    // Check, title and description must be filled.
    // ** Change directory to firebase after finishe testing
    // ** limit length
    if ((document.getElementById("inputTitle").value != null) &&
        (inputBody = document.getElementById("inputBody").value)) {

        var inputTitle = document.getElementById("inputTitle").value;
        var inputLinks = document.getElementById("inputLinks").value;
        var inputBody = document.getElementById("inputBody").value;

        var groupRef = db.collection("testCreatingGroup");
        groupRef.doc(inputTitle).set({
            // stats underneath doc
            name: inputTitle,
            description: inputBody,
            member: 1,
        })

        onclick = alert("Group Created!");
    }


}

function cancel() {
    onclick = location.href = 'group.html';
}