//---------------------------------------------------
// Apply hover effect on <button> 
//----------------------------------------------------
$(document).ready(function () {
    // Apply effct when mouse hover.
    $("button").hover(function () {
            $(this).css({
                "background-color": "#0F222D",
                "transition": "all 0.3s ease-in-out",
                "-moz-transition": "all 0.3s ease-in-out",
                "-webkit-transition": "all 0.3s ease-in-out"
            });
            $(this).children("i").css({
                "color": "#FFF5D0"
            });
        },
        function () {
            $(this).css({
                "background-color": "#FFF5D0"
            });
            $(this).children("i").css({
                "color": "#0F222D"
            });
        }
    );
});

