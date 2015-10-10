$(function () {
    screenSetup();
});
var screenWidth = $(window).width();
var screenHeight = $(window).height();
var boardSize = Math.floor(Math.min(screenHeight, screenWidth) / 3);
function screenSetup() {
    $(".gameboard").css({
        "width": boardSize * 2,
        "height": boardSize * 2
    });
}

function resetBall() {
    $(".ball").removeAttr("style");
}

function animBall(dir) {
    $('.ball').stop(true, true);//stops animation in progress
    resetBall();
    var animobject = {};
    switch (dir) {
        case "t":
        {
            animobject = {
                "margin-top": "-=" + boardSize
            };
            break;
        }
        case "r":
        {
            animobject = {
                "margin-left": "+=" + boardSize
            };
            break;
        }
        case "b":
        {
            animobject = {
                "margin-top": "+=" + boardSize
            };
            break;
        }
        case "l":
        {
            animobject = {
                "margin-left": "-=" + boardSize
            };
            break;
        }

    }
    //apparently small animation step might help with mobile performance
    var smallanim = $.extend({}, animobject);
    for (var a in smallanim){
        smallanim[a] = smallanim[a].substring(0, 2) + 1;
    }
    $(".ball").animate(smallanim, 10).animate(animobject, 200).promise().done(function () {
        resetBall();
    });
}
$(window).on("swipeleft", function () {
    animBall("l");
});
$(window).on("swiperight", function () {
    animBall("r");
});
$(window).on("swipedown", function () {
    animBall("b");
});
$(window).on("swipeup", function () {
    animBall("t");
});



$(document).keydown(function (e) {
    switch (e.which) {
        case 37:
            animBall("l");// left
            break;

        case 38:
            animBall("t");// up
            break;

        case 39:
            animBall("r");// right
            break;

        case 40:
            animBall("b");// down
            break;

        default:
            return; // exit this handler for other keys
    }
    e.preventDefault(); // prevent the default action (scroll / move caret)
});

