function readQuote() {
    db.collection("quotes").doc("01")
        .onSnapshot(function (snap) {
            console.log(snap.data()); //print the document fields of "01" in console
            console.log(snap.data().message); //spelled the same sa the "message" in firestore
            document.getElementById("a").innerText = snap.data().message;
        })
}

readQuote();

//add a new document in collection "cities"
db.collection("cities").doc("LA").set({
        name: "Los Angeles",
        state: "CA",
        country: "USA"
    })
    .then(function () {
        console.log("Document successfully written!");
    })
    .catch(function (error) {
        console.error("Error writing document: ", error)
    })

//Read and display a city. If know ID
function getCity() {
    db.collection("cities").doc("DC").get().then(function (doc) {
        if (doc.exists) {
            console.log("Document data:", doc.data());
            console.log(doc.data().name);
            document.getElementById("abc").innerText = doc.data().name;
        }
    })
}

//Read the collection, and display
function getCities(){
    db.collection("realcities").get().then(function(snap){
        snap.forEach(function(doc){
            var n = doc.data().name;
            console.log(n);
            var cityid = doc.id;
            console.log(cityid);
            document.getElementById(cityid).innerText=n;
        })
    })
}

//Write a collection, read and display
function addCities() {
    var citiesRef = db.collection("realcities");
    citiesRef.doc("SF").set({
        name: "San Francisco",
        state: "CA",
        country: "USA",
        capital: false,
        population: 860000,
        regions: ["west_coast", "norcal"]});
    citiesRef.doc("LA").set({
        name: "Los Angeles",
        state: "CA",
        country: "USA",
        capital: false,
        population: 3900000,
        regions: ["west_coast", "socal"]});
    citiesRef.doc("DC").set({
        name: "Washington, D.C.",
        state: null,
        country: "USA",
        capital: true,
        population: 68000,
        regions: ["east_coast"]});
    citiesRef.doc("TOK").set({
        name: "Tokyo",
        state: null,
        country: "Japan",
        capital: true,
        population: 9000000,
        regions: ["kanto", "honshu"]});
    citiesRef.doc("BJ").set({
        name: "Beijing", state: null, 
        country: "China",
        capital: true, population:21500000,
        regions: ["jingjinji", "nohebei"]});
}
