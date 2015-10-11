$(function () {
    screenSetup();
});
var ballSize = 40;
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
    var prop = 4;
    var stretch = Math.floor(ballSize / prop);
    var distance = Math.floor(boardSize / 2) - stretch;
    var duration = 200;
    switch (dir) {
        case "l":
        {
            animobject = [{
                    "margin-left": "-=" + distance,
                    "height": "-=" + stretch,
                    "width": "+=" + stretch,
                    "margin-top": "+=" + Math.floor(stretch / 2)
                }, {
                    "margin-left": "-=" + distance
                }, {
                    "height": "+=" + (stretch * 3),
                    "width": "-=" + (stretch * 3),
                    "margin-top": "-=" + stretch
                }];
            break;
        }
        case "t":
        {
            animobject = [{
                    "margin-top": "-=" + distance,
                    "height": "+=" + stretch,
                    "width": "-=" + stretch
                }, {
                    "margin-top": "-=" + distance
                }, {
                    "height": "-=" + (stretch * 3),
                    "width": "+=" + (stretch * 3)
                }];
            break;
        }
        case "r":
        {
            animobject = [{
                    "margin-left": "+=" + distance,
                    "height": "-=" + stretch,
                    "width": "+=" + stretch,
                    "margin-top": "+=" + Math.floor(stretch / 2)
                }, {
                    "margin-left": "+=" + distance
                }, {
                    "margin-left": "+=" + (stretch * 2),
                    "height": "+=" + (stretch * 3),
                    "width": "-=" + (stretch * 3),
                    "margin-top": "-=" + stretch
                }];
            break;
        }
        case "b":
        {
            animobject = [{
                    "margin-top": "+=" + distance,
                    "height": "+=" + stretch,
                    "width": "-=" + stretch
                }, {
                    "margin-top": "+=" + distance
                }, {
                    "margin-top": "+=" + (stretch * 2),
                    "height": "-=" + (stretch * 3),
                    "width": "+=" + (stretch * 3)
                }];
            break;
        }
    }
    //apparently small animation step might help with mobile performance
//    var smallanim = $.extend({}, animobject[1]);
//    for (var a in smallanim) {
//        smallanim[a] = smallanim[a].substring(0, 2) + 1;
//    }
    $(".ball")
            .animate(animobject[0], Math.floor(distance * duration / (distance * 2)), "linear")
            .animate(animobject[1], Math.floor((distance - (stretch * 2)) * duration / (distance * 2)), "linear")
            .animate(animobject[2], Math.floor((stretch * 8) * duration / (distance * 2)), "linear")
            .promise().done(function () {
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

