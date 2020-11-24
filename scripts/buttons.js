//---------------------------------------------------
// JQuery for cog, logout, confirm logout buttons and menus.
//----------------------------------------------------
$(document).ready(function () {
  //Displays settings when cog is clicked
  $("#settings").hide();
  $("#gearContain").on("click", () => {
    $("#settings").toggle();
    //If the gear is clicked again to hide the settings and the confirm 
    //logout section is displayed, it will also be hidden again.
    if ($("#confirmLog") != $("confirmLog").hide())  {
      $("#confirmLog").hide();
    }
  });

  //Displays logout confirmation when logout button is clicked
  $("#confirmLog").hide();
  $("#logout").on("click", () => {
    $("#confirmLog").toggle();
  })

  //Hides the confirmation logout when no is clicked
  $("#no").on("click", () => {
    $("#confirmLog").hide();
  })
});


//---------------------------------------------------
// Log user out
//----------------------------------------------------
const auth = firebase.auth();
const yes = document.querySelector('#yes');

//Event listener on the Yes button in the confirmation logout,
//when pressed the user will be loggerd out
yes.addEventListener('click', (e) => {
  e.preventDefault();
  auth.signOut().then(() => {
    console.log("User signed out");
    document.location.href = "login2.html";
  });
});

//---------------------------------------------------
// Home Button
//----------------------------------------------------
const home = document.getElementById("home")
home.addEventListener('click', (e) => {
  e.preventDefault();
  document.location.href = "/COMP1800Group16App/home.html";
})