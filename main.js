var $width = $(".squares").width();
var $squares = $(".squares");
$squares.css({
    "height": $width + "px",
}).mouseover(function() {
    $(this).fadeOut(300);
    $(this).fadeIn(300);
});
$(".imagesOne, .imagesTwo, .buttons, #oracle").mouseover(function() {
    $(this).fadeOut(300);
    $(this).fadeIn(300);
    $(this).css("corsor", "pointer"); //not working
});

//Background Music + Toggle button "This logic is awesome!!!!!"
var audio = new Audio("audio/clubbedToDeath.mp3");
// audio.play();
var audioPlaying = true;
var $musicButton = $(".musicButton");
var toggleButton = function() {
    $musicButton.toggle();
    if (audioPlaying === true) {
        audio.pause();
    } else {
        audio.play();
    }
    audioPlaying = !audioPlaying;
};
$musicButton.on("click", toggleButton);

var gameOver = false;

//Select Roles:
var clickedImageOne;
var clickedImageTwo;
var selectRole = function() {

    var SelectEventOne = function() {
        $(this).css({
            "border": "5px solid green",
            "width": "20%"
        });
        $(".imagesOne").off("click");
        // console.log($(this).attr("src"));
        clickedImageOne = $(this).attr("src");
        $(".imagesTwo").each(function() {
            if ($(this).attr("src") === clickedImageOne) {
                $(this).fadeTo(200, 0.5, function() {
                    $(this).unbind("click");
                });
            }
        });
    };
    var SelectEventTwo = function() {
        OracleWin();
        ClickEvent();
        $(this).css({
            "border": "5px solid green",
            "width": "20%"
        });
        $(".imagesTwo").off("click");
        clickedImageTwo = $(this).attr("src");
        $(".imagesOne").each(function() {
            if ($(this).attr("src") === clickedImageTwo) {
                $(this).fadeTo(200, 0.3, function() {
                    $(this).unbind("click");
                });
            }
        });
        $squares.on("click", ClickEvent);

        if (OracleOn === false) {
            $(".recordsAI").fadeTo(500, 0.3);
            $oracle.fadeTo(500, 0.3);
        }

    };
    $(".imagesOne").one("click", SelectEventOne);
    $(".imagesTwo").one("click", SelectEventTwo);

};
selectRole();


//User Input:
var count = 0;
var countForTie = 0;
var tieCount = 0;
var OracleLive = [];

var ClickEvent = function() {
    // console.log("this is " + $(this));
    // console.log("clicked");
    $(this).off("click");
    count++;
    countForTie++;


    if (count % 2 === 0) {
        $(this).css({
            "background": 'url(' + clickedImageTwo + ')',
            "background-size": "cover"
        });
        $("#p1").css("color", "green");
        $("#p2").css("color", "ghostwhite");
        TicTacToe.PlayerTwo.push($(this).html());
        console.log(TicTacToe.PlayerTwo);
    }
    if (count % 2 !== 0) {
        if (OracleOn === false) {
            $(this).css({
                "background": 'url(' + clickedImageOne + ')',
                "background-size": "cover"
            });
            $("#p2").css("color", "green");
            $("#p1").css("color", "ghostwhite");
            TicTacToe.PlayerOne.push($(this).html());
            console.log(TicTacToe.PlayerOne);
        }
    }
    // if(OracleOn === true) {
    //
    //     $(this).css({
    //         "background": 'url(' + clickedImageTwo + ')',
    //         "background-size": "cover"
    //     });
    //     TicTacToe.PlayerTwo.push($(this).html());
    //     console.log(TicTacToe.PlayerTwo);
    //
    //         for (var i = 0; i < TicTacToe.PlayerTwo.length; i++) {
    //             var Index = TicTacToe.All.indexOf(TicTacToe.PlayerTwo[i]);
    //             OracleLive = TicTacToe.All.splice(Index, 1);
    //             TicTacToe.Oracle.push([Math.floor(Math.random()*OracleLive.length)]);
    //         }
    //
    //         OracleInput();
    //         // for (var j = 0; j < TicTacToe.Oracle.length; j++) {
    //         //     $("#" + TicTacToe.Oracle[j]).css({
    //         //         "background": 'url(images/oracle.jpg)',
    //         //         "background-size": "cover"
    //         //     });
    //         // }
    //     }
    TicTacToe.WinTicTacToe();
    OracleWin();
};



// Win TicTacToe
var CountWinOne = 0;
var CountWinTwo = 0;
var CountWinOracle = 0;
var TicTacToe = {

    PlayerOne: [],
    PlayerTwo: [],
    Oracle: [],
    All:['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'],

    // Sorting out Input:
    Input: function() {

    },

    WinOptions: {
        WinOne: ['A', 'B', 'C'],
        WinTwo: ['A', 'D', 'G'],
        WinThree: ['G', 'H', 'I'],
        WinFour: ['C', 'F', 'I'],
        WinFive: ['B', 'E', 'H'],
        WinSix: ['D', 'E', 'F'],
        WinSeven: ['A', 'E', 'I'],
        WinEight: ['C', 'E', 'G']
    },

    WinTicTacToe: function() {

        var WinOptions = this.WinOptions;
        var PlayerOne = this.PlayerOne;
        var PlayerTwo = this.PlayerTwo;
        var Oracle = this.Oracle;

        var $ScoresOne = $("#scoresOne span");
        var $ScoresTwo = $("#scoresTwo span");
        var $ScoresOracle = $("scoresAI");

        var CheckOne = function(element) {
            return PlayerOne.includes(element);
        };
        var CheckTwo = function(element) {
            return PlayerTwo.includes(element);
        };

        var CheckOracle = function(element) {
            return Oracle.includes(element);
        };

        for (var key in WinOptions) {
            if (gameOver === false) {
                var EachWinOptions = WinOptions[key];
                //Player One: Check Win
                if (EachWinOptions.every(CheckOne)) { //check if win or not
                    CountWinOne++;
                    countForTie = 0;
                    console.log(CountWinOne);
                    for (var i = 0; i < EachWinOptions.length; i++) {
                        var currentDivOne = EachWinOptions[i]; // A
                        $("#" + currentDivOne).css({
                            "border": "8px groove #00cd00"
                        });
                        $squares.off("click", ClickEvent);
                    }
                    $ScoresOne.html('' + CountWinOne + '');
                    $newRound.css({
                        "border": "8px groove #00cd00",
                        "opacity": "1"
                    });
                    gameOver = true;
                    //Player Two: Check Win
                } else if (EachWinOptions.every(CheckTwo)) { //check if win or not
                    CountWinTwo++;
                    countForTie = 0;
                    for (var j = 0; j < EachWinOptions.length; j++) {
                        var currentDivTwo = EachWinOptions[j];
                        $("#" + currentDivTwo).css({
                            "border": "8px groove #00cd00"
                        });
                        $squares.off("click", TicTacToe.Input.ClickEvent);
                    }
                    $ScoresTwo.html('' + CountWinTwo + '');
                    $newRound.css({
                        "border": "8px groove #00cd00"
                    });
                    gameOver = true;
                    //Oracle: check win
                }else if (EachWinOptions.every(CheckOracle)) {
                    CountWinOracle++;
                    countForTie = 0;
                    $ScoresOracle.html('' + CountWinOracle + '');
                    $newRound.css({
                        "border": "8px groove #00cd00"
                    });
                    gameOver = true;
                }
            }
        }
        if ((countForTie === 9) && (gameOver === false)) {
            // debugger;
            swal("It's a tie!");
            countForTie = 0;
            tieCount++;
            $("#tieOne span, #tieTwo span #tieAI span").html('' + tieCount + '');
            gameOver = true;
            $newRound.css({
                "border": "8px groove #00cd00"
            });
        }
    }
};
TicTacToe.Input();
// TicTacToe.WinTicTacToe();

//Clear the board:
var $newRound = $("#newRound");
var $newGame = $("#newGame");
var clear = function() {
    console.log("CLEAR");
    $squares.css({
        "background": "",
        "border": ""
    });
    $newRound.css({
        "border": "",
        "opacity": "0.6"
    });
    TicTacToe.PlayerOne = [];
    TicTacToe.PlayerTwo = [];
    countForTie = 0;
    gameOver = false;
    // $squares.unbind("click", TicTacToe.ClickEvent);
    $squares.on("click", ClickEvent);
};
$newRound.on("click", clear);

var refresh = function(){
    location.reload();
};
$newGame.on("click", refresh);



//Test!!!

var Test = function(){

    var TestOne = function(){
        TicTacToe.PlayerOne = ['A','D','F','G','H'];
        for (var i = 0; i < TicTacToe.PlayerOne.length; i++) {
            $("#" + TicTacToe.PlayerOne[i]).css({
                "background-image": "url('images/neo.jpg')",
                "background-size": "cover"
            });
        }
        TicTacToe.PlayerTwo = ['B','E','I','C'];
        for (var j = 0; j < TicTacToe.PlayerTwo.length; j++) {
            $("#" + TicTacToe.PlayerTwo[j]).css({
                "background-image": "url('images/agentSmith.jpg')",
                "background-size": "cover"
            });
        }
        TicTacToe.WinTicTacToe();
    };
    var TestTwo = function(){
        TicTacToe.PlayerOne = ['A','B','D','F','H'];
        for (var k = 0; k < TicTacToe.PlayerOne.length; k++) {
            $("#" + TicTacToe.PlayerOne[k]).css({
                "background-image": "url('images/monica.jpg')",
                "background-size": "cover"
            });
        }
        TicTacToe.PlayerTwo = ['C','E','G','I'];
        for (var l = 0; l < TicTacToe.PlayerTwo.length; l++) {
            $("#" + TicTacToe.PlayerTwo[l]).css({
                "background-image": "url('images/trinity.jpg')",
                "background-size": "cover"
            });
        }
        TicTacToe.WinTicTacToe();
    };
    var TestThree = function(){
        TicTacToe.PlayerOne = ['A','B','E','F','G'];
        for (var m = 0; m < TicTacToe.PlayerOne.length; m++) {
            $("#" + TicTacToe.PlayerOne[m]).css({
                "background-image": "url('images/morpheus.jpg')",
                "background-size": "cover"
            });
        }
        TicTacToe.PlayerTwo = ['C','D','H','I'];
        for (var n = 0; n < TicTacToe.PlayerTwo.length; n++) {
            $("#" + TicTacToe.PlayerTwo[n]).css({
                "background-image": "url('images/trinity.jpg')",
                "background-size": "cover"
            });
        }
        TicTacToe.WinTicTacToe();
        if (gameOver === false) {
            // debugger;
            console.log("true");
            swal("It's a tie!");
            countForTie = 0;
            tieCount++;
            $("#tieOne span, #tieTwo span").html('' + tieCount + '');
            gameOver = true;
            $newRound.css({
                "border": "8px groove #00cd00"
            });
        }
    };
    var TestFour = function(){
        TicTacToe.PlayerOne = ['A','G','D','I','H'];
        for (var o = 0; o < TicTacToe.PlayerOne.length; o++) {
            $("#" + TicTacToe.PlayerOne[o]).css({
                "background-image": "url('images/neo.jpg')",
                "background-size": "cover"
            });
        }
        TicTacToe.PlayerTwo = ['B','C','E','F'];
        for (var p = 0; p < TicTacToe.PlayerTwo.length; p++) {
            $("#" + TicTacToe.PlayerTwo[p]).css({
                "background-image": "url('images/monica.jpg')",
                "background-size": "cover"
            });
        }
        TicTacToe.WinTicTacToe();
    };


    $("#TestOne").on("click", TestOne);
    $("#TestTwo").on("click", TestTwo);
    $("#TestThree").on("click", TestThree);
    $("#TestFour").on("click", TestFour);
};
Test();


//AI
var $oracle = $("#oracle");
var center = ['E'];
var edge = ['B', 'F', 'H', 'D'];
var corner = ['A', 'C', 'I', 'G'];
var OracleOn = false;

var Oracle = function(){
    OracleOn = true;
    $oracle.css("border", "5px green solid");
    $("#playerOne").css("visibility", "hidden");
    $("#p2").html("You");
};

$oracle.on("click", Oracle);

var OracleInput = function(){
    for (var i = 0; i < TicTacToe.Oracle.length; i++) {
        $("#" + TicTacToe.Oracle[i]).css({
            "background": 'url(images/oracle.jpg)',
            "background-size": "cover"
        });
    }
};

var OracleWin = function(){
    // count = 1;

    // TicTacToe.Oracle = ['E'];

    // if (edge.includes(TicTacToe.PlayerTwo[0])) {
    //     if (['B', 'F'].includes(TicTacToe.PlayerTwo[0])) {
    //         TicTacToe.Oracle = ['E', 'G'];
    //         OracleInput();
    //         if (true) {
    //
    //         }
    //     }
    //     if (['D', 'H'].includes(TicTacToe.PlayerTwo[0])) {
    //         TicTacToe.Oracle = ['E', 'C'];
    //         OracleInput();
    //     }
    // }

    TicTacToe.WinTicTacToe();
};
