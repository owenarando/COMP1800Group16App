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

function desktopEffects(){
    $(document).ready(function () {
        $(".reactiveBtn").mousedown(function(){
            $(event.currentTarget).css({
                "background-color": "var(--dark2)",
            });
            $(event.currentTarget).children().css({
                "color": "var(--light2)",
            });
        });
        
        $(".reactiveBtn").mouseup(function(){
            $(event.currentTarget).css({
                "background-color": "var(--light2)",
            });
            $(event.currentTarget).children().css({
                "color": "var(--dark2)",
            });
        });
       
        
    });
}

function mobileEffects(){
    $(document).ready(function () {
        $(".reactiveBtn").on("touchstart", function(e){
            $(event.currentTarget).css({
                "background-color": "var(--dark2)",
            });
            $(event.currentTarget).children().css({
                "color": "var(--light2)",
            });
        });
        
        $(".reactiveBtn").on("touchend", function(e){
            $(event.currentTarget).css({
                "background-color": "var(--light2)",
            });
            $(event.currentTarget).children().css({
                "color": "var(--dark2)",
            });
        });
       
        
    });
}

mobileEffects();
desktopEffects();
settingsEffects();