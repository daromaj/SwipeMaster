$(function () {
    screenSetup();
});
var ballSize = 40;
var screenWidth = $(window).width();
var screenHeight = $(window).height();
var boardSize = Math.floor(Math.min(screenHeight, screenWidth) / 3);
var borderWidth = 30;
var colors = ["rgb(234, 6, 0)", "rgb(54, 18, 161)", "rgb(255, 213, 0)", "rgb(0, 199, 13)"];
var blockEvents = false;
function screenSetup() {
    $(".gameboard").css({
        "width": boardSize * 2,
        "height": boardSize * 2
    });
    $(".gameboard.rotatable").css({
        "border-top-color": colors[0],
        "border-right-color": colors[1],
        "border-bottom-color": colors[2],
        "border-left-color": colors[3]
    });
    $(".gameboard.no-border").css({
        "margin-top": ((boardSize + borderWidth) * -2)
    });
    setBallColor();
}

function setBallColor() {
    var i = (Math.floor(Math.random() * 4));
    $(".ball").css({
        "background-color": colors[i]
    });
}

function rotateBoard() {
    var angle;
    do {
        angle = (Math.floor(Math.random() * 4) - 2);
    } while (angle === 0);
    shiftColors(angle);
    $(".gameboard.rotatable").animateRotate(90 * angle, 300, "linear");
}

function shiftColors(value) {
    if (value > 0) {
        for (var i = 0; i < value; i++) {
            var c = colors.pop();
            colors.unshift(c);
        }
    } else {
        for (var i = value; i < 0; i++) {
            var c = colors.shift();
            colors.push(c);
        }
    }
}

function resetBall() {
    var c = $(".ball").css("background-color");
    $(".ball").removeAttr("style");
    $(".ball").css({
        "background-color": c
    });
}

function animBall(dir) {
    blockEvents = true;
    $('.ball').stop(true, true);//stops animation in progress
    resetBall();
    var animobject = {};
    var prop = 4;
    var stretch = Math.floor(ballSize / prop);
    var distance = Math.floor(boardSize / 2) - stretch;
    var duration = 200;
    var lastStep = 3;
    var ballColor = $(".ball").css("background-color");
    switch (dir) {
        case "l":
        {
            if(ballColor !== colors[3]){
                lastStep = 2;
            }
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
                }, {
                    "height": "+=" + (stretch),
                    "width": "-=" + (stretch),
                    "margin-left": "-=" + (stretch * 3),
                    "margin-top": "-=" + Math.floor(stretch / 2)
                }];
            break;
        }
        case "t":
        {
            if(ballColor !== colors[0]){
                lastStep = 2;
            }            
            animobject = [{
                    "margin-top": "-=" + distance,
                    "height": "+=" + stretch,
                    "width": "-=" + stretch
                }, {
                    "margin-top": "-=" + distance
                }, {
                    "height": "-=" + (stretch * 3),
                    "width": "+=" + (stretch * 3)
                }, {
                    "margin-top": "-=" + (stretch * 3),
                    "height": "-=" + (stretch),
                    "width": "+=" + (stretch)
                }];
            break;
        }
        case "r":
        {
            if(ballColor !== colors[1]){
                lastStep = 2;
            }              
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
                }, {
                    "margin-left": "+=" + (stretch * 3),
                    "height": "+=" + (stretch),
                    "width": "-=" + (stretch),
                    "margin-top": "-=" + Math.floor(stretch / 2)
                }];
            break;
        }
        case "b":
        {
            if(ballColor !== colors[2]){
                lastStep = 2;
            }                   
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
                },{
                    "margin-top": "+=" + (stretch * 3),
                    "height": "-=" + (stretch),
                    "width": "+=" + (stretch)
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
            .animate(animobject[lastStep], Math.floor((stretch * 8) * duration / (distance * 2)), "linear")
            .promise().done(function () {
        resetBall();
        setBallColor();
        rotateBoard();
        blockEvents = false;
    });
}
$(window).on("swipeleft", function () {
    if (blockEvents)
        return;
    animBall("l");
});
$(window).on("swiperight", function () {
    if (blockEvents)
        return;
    animBall("r");
});
$(window).on("swipedown", function () {
    if (blockEvents)
        return;
    animBall("b");
});
$(window).on("swipeup", function () {
    if (blockEvents)
        return;
    animBall("t");
});



$(document).keydown(function (e) {
    if (blockEvents)
        return;
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

