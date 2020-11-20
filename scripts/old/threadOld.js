// Operation page for linking other html pages  


// Create doc(Thread).

var Ref = db.collection("group").doc("Apple").collection("Thread1").doc("COMP1800").collection("post");

function setThread() {
    var threadRef = db.collection("group").doc("Apple").collection("Thread1").doc("COMP1800").collection("post");

    threadRef.doc("FirebaseTurtorial-Post").set({
        // stats underneath doc
        postTitle: "FirebaseTurtorial",
        postBody: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent facilisis, lectus vitae efficitur accumsan, mauris quam egestas elit, id dapibus nisi justo nec erat. Integer pretium semper viverra. Vivamus placerat rutrum mi, vel vulputate lacus sagittis ut. Morbi diam enim, fermentum et sodales a, consectetur sit amet mauris. Ut laoreet vulputate metus, molestie finibus sapien aliquet sit amet. Aliquam rutrum lorem accumsan, euismod risus sed, consequat metus. Sed vitae ipsum rhoncus neque tempor luctus et ut tortor. Aliquam mollis ullamcorper ligula, et hendrerit dolor cursus sit amet. Nullam sit amet sagittis justo, at ultricies ligula. Pellentesque sed nisl dapibus, laoreet ex at, pellentesque magna. Aenean sit amet laoreet purus. Mauris auctor massa quis sem bibendum aliquam. Curabitur eget mollis lacus. Cras et consectetur nunc. Curabitur vel elit at urna congue fermentum eget in massa. Nunc accumsan at leo eget ullamcorper. Donec malesuada elementum turpis ac sodales. Curabitur ut interdum elit. Vivamus dapibus blandit vulputate. Fusce viverra ultrices molestie. Aenean porttitor, leo non blandit consectetur, risus risus auctor elit, et finibus lorem turpis in quam. Etiam imperdiet turpis rhoncus, feugiat diam ac, consequat neque. Donec neque est, scelerisque ut commodo id, tincidunt sit amet quam. Nunc eget varius quam. Curabitur nec.",
    })

    threadRef.doc('FirebaseAdvance-post').set({
        // stats underneath doc
        postTitle: "FirebaseAdvance",
        postBody: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent facilisis, lectus vitae efficitur accumsan, mauris quam egestas elit, id dapibus nisi justo nec erat. Integer pretium semper viverra. Vivamus placerat rutrum mi, vel vulputate lacus sagittis ut. Morbi diam enim, fermentum et sodales a, consectetur sit amet mauris. Ut laoreet vulputate metus, molestie finibus sapien aliquet sit amet. Aliquam rutrum lorem accumsan, euismod risus sed, consequat metus. Sed vitae ipsum rhoncus neque tempor luctus et ut tortor. Aliquam mollis ullamcorper ligula, et hendrerit dolor cursus sit amet. Nullam sit amet sagittis justo, at ultricies ligula. Pellentesque sed nisl dapibus, laoreet ex at, pellentesque magna. Aenean sit amet laoreet purus. Mauris auctor massa quis sem bibendum aliquam. Curabitur eget mollis lacus. Cras et consectetur nunc. Curabitur vel elit at urna congue fermentum eget in massa. Nunc accumsan at leo eget ullamcorper. Donec malesuada elementum turpis ac sodales. Curabitur ut interdum elit. Vivamus dapibus blandit vulputate. Fusce viverra ultrices molestie. Aenean porttitor, leo non blandit consectetur, risus risus auctor elit, et finibus lorem turpis in quam. Etiam imperdiet turpis rhoncus, feugiat diam ac, consequat neque. Donec neque est, scelerisque ut commodo id, tincidunt sit amet quam. Nunc eget varius quam. Curabitur nec.",
    })

    threadRef.doc('JUJUWatermelon-post').set({
        // stats underneath doc
        postTitle: "JUJUWatermelon",
        postBody: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent facilisis, lectus vitae efficitur accumsan, mauris quam egestas elit, id dapibus nisi justo nec erat. Integer pretium semper viverra. Vivamus placerat rutrum mi, vel vulputate lacus sagittis ut. Morbi diam enim, fermentum et sodales a, consectetur sit amet mauris. Ut laoreet vulputate metus, molestie finibus sapien aliquet sit amet. Aliquam rutrum lorem accumsan, euismod risus sed, consequat metus. Sed vitae ipsum rhoncus neque tempor luctus et ut tortor. Aliquam mollis ullamcorper ligula, et hendrerit dolor cursus sit amet. Nullam sit amet sagittis justo, at ultricies ligula. Pellentesque sed nisl dapibus, laoreet ex at, pellentesque magna. Aenean sit amet laoreet purus. Mauris auctor massa quis sem bibendum aliquam. Curabitur eget mollis lacus. Cras et consectetur nunc. Curabitur vel elit at urna congue fermentum eget in massa. Nunc accumsan at leo eget ullamcorper. Donec malesuada elementum turpis ac sodales. Curabitur ut interdum elit. Vivamus dapibus blandit vulputate. Fusce viverra ultrices molestie. Aenean porttitor, leo non blandit consectetur, risus risus auctor elit, et finibus lorem turpis in quam. Etiam imperdiet turpis rhoncus, feugiat diam ac, consequat neque. Donec neque est, scelerisque ut commodo id, tincidunt sit amet quam. Nunc eget varius quam. Curabitur nec.",
    })

    threadRef.doc('NoMoreProject-post').set({
        // stats underneath doc
        postTitle: "NoMoreProject",
        postBody: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent facilisis, lectus vitae efficitur accumsan, mauris quam egestas elit, id dapibus nisi justo nec erat. Integer pretium semper viverra. Vivamus placerat rutrum mi, vel vulputate lacus sagittis ut. Morbi diam enim, fermentum et sodales a, consectetur sit amet mauris. Ut laoreet vulputate metus, molestie finibus sapien aliquet sit amet. Aliquam rutrum lorem accumsan, euismod risus sed, consequat metus. Sed vitae ipsum rhoncus neque tempor luctus et ut tortor. Aliquam mollis ullamcorper ligula, et hendrerit dolor cursus sit amet. Nullam sit amet sagittis justo, at ultricies ligula. Pellentesque sed nisl dapibus, laoreet ex at, pellentesque magna. Aenean sit amet laoreet purus. Mauris auctor massa quis sem bibendum aliquam. Curabitur eget mollis lacus. Cras et consectetur nunc. Curabitur vel elit at urna congue fermentum eget in massa. Nunc accumsan at leo eget ullamcorper. Donec malesuada elementum turpis ac sodales. Curabitur ut interdum elit. Vivamus dapibus blandit vulputate. Fusce viverra ultrices molestie. Aenean porttitor, leo non blandit consectetur, risus risus auctor elit, et finibus lorem turpis in quam. Etiam imperdiet turpis rhoncus, feugiat diam ac, consequat neque. Donec neque est, scelerisque ut commodo id, tincidunt sit amet quam. Nunc eget varius quam. Curabitur nec.",
    })
}
// setThread();

// Update 
// var ref = db.collection('group').doc('Apple');
// ref.update({
//     description: "stupid group apple",
//     memberNumber: 10,
//     memberKilled: 55
// }).then(() => {
//     console.log('update data successful')
// });



// Read Thread names in console.
var readGroupName = Ref;

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



// Read the collection, and display Post Title
// ** change a better way to display.
function getPostTitle() {
    Ref.get().then(function (snap) {
        snap.forEach(function (doc) {
            var title = doc.data().postTitle;
            console.log(title);

            document.getElementById(title).innerText = title;
        })
    })
}
getPostTitle();


// Read the collection
// display Thread Title && description
function getThreadTitle() {
    var threadTitleRef = db.collection("group").doc("Apple").collection("Thread1").doc("COMP1800");

    threadTitleRef.get().then(doc => {
        console.log(doc.data());
        console.log(doc.data().title);

        var threadTitle = doc.data().title;
        document.getElementById("titleName").innerText = threadTitle;

        var threadDescription = doc.data().description;
        document.getElementById("description").innerText = threadDescription;
      });
}
getThreadTitle();

// Go to page of selected Post
function postEnter() {
    onclick = location.href = 'post.html';
}

// Directe user to create a post
function createPost() {
    onclick = location.href = 'creationPages/postCreation.html';

}