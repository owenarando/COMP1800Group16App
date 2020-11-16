// Operation page for linking other html pages  


// Create doc(Group).


// function setGroup() {
//     var groupRef = db.collection("group");

//     groupRef.doc("Blueberry").set({
//         // stats underneath doc
//         name: "Blueberry",
//         description: "stupid group apple",
//         member: 20,
//     })

//     groupRef.doc('Monkey').set({
//         // stats underneath doc
//         name: "Monkey",
//         member: 100,
//     })

//     groupRef.doc('Orange').set({
//         // stats underneath doc
//         name: "Orange",
//         member: 20,
//     })

//     groupRef.doc('Lemon').set({
//         // stats underneath doc
//         name: "Lemon",
//         member: 25,
//     })

//     groupRef.doc('Pineaplle').set({
//         // stats underneath doc
//         name: "Pineapple",
//         member: 5,
//     })

//     groupRef.doc('Brain').set({
//         // stats underneath doc
//         name: "Brain",
//         member: 0,
//     })

//     groupRef.doc('Watermelon').set({
//         // stats underneath doc
//         name: "Watermelon",
//         member: 200,
//     })
// }
// setGroup();

// Update 
// var ref = db.collection('group').doc('Apple');
// ref.update({
//     description: "stupid group apple",
//     memberNumber: 10,
//     memberKilled: 55
// }).then(() => {
//     console.log('update data successful')
// });



// Read group names in console.
var readGroupName = db.collection('group');

readGroupName.get().then(querySnapshot => {
    querySnapshot.forEach(doc => {
        console.log(doc.id, doc.data());
    });
});

//Sort group
// function sortGroup() {
//     var ref = db.collection('group');
//     ref.orderBy('name', 'desc').limit(3).get().then(querySnapshot => {
//         querySnapshot.forEach(doc => {
//             console.log(doc.id, doc.data());
//         });
//     });

// db.collection('group').orderBy('id', 'desc').limit(9).then(querySnapshot => {
//     querySnapshot.forEach(doc => {
//         console.log(doc.id, doc.data());
//     })
// })
// }



// Read the collection, and display
// ** change a better way to display group name.
function getGroups() {
    db.collection("group").get().then(function (snap) {
        snap.forEach(function (doc) {
            var n = doc.data().name;
            console.log(n);
            var groupID = doc.id;
            console.log(groupID);
            document.getElementById(groupID).innerText = n;
        })
    })
}
getGroups();

// Go to page Create Group
function createGroup() {
    onclick = location.href = 'creationPages/groupCreation.html'
}

// Click group button to enter selected group
// ** Need to work on differenet group page
// ** Link to selected page
function groupEnter() {
    onclick = location.href = 'group.html';

}