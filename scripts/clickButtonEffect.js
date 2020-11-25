//---------------------------------------------------
// To indicate whent the settings button has been clicked
//----------------------------------------------------
function settingsEffects(){
    $(document).ready(function () {
        let gearClicked = false;
        // Apply effct when mouse hover.
        $("#gearContain").on('click', () =>{
            if (gearClicked == false){
                $("#gearContain").css({
                    "background-color": "var(--dark2)",
                });
              
                gearClicked = true;
            } else {
                $("#gearContain").css({
                "background-color": "var(--red)",
                });
                gearClicked = false;
            }
        });
    });
}

function navBarEffects(){
    $(document).ready(function () {
        $(".reactiveBtn").on('click', () =>{
            $(event.currentTarget).css({
                "background-color": "var(--dark2)",
            });
            $(event.currentTarget).children().css({
                "color": "var(--light2)",
            });
        });

       
        
    });
}

navBarEffects();
settingsEffects();