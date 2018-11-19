var w;
var columns;
var rows;
var board;
var squares;
var next;
var attackLevel = 1.0;
var releaseLevel = 0;
var block = false;
var attackTime = 0.01
var decayTime = 0.2;
var susPercent = 0.2;
var releaseTime = 0.6;

var env, triOsc;
env = new p5.Env();
env.setADSR(attackTime, decayTime, susPercent, releaseTime);
env.setRange(attackLevel, releaseLevel);

triOsc = new p5.Oscillator('triangle');
triOsc.amp(env);
triOsc.start();
var enabled = []
var previousMillis = 0;
var collisionsLookup = {
    "c1": { 'x': 0, 'y': 0, 'active': false }
}
var slider;
var previousSliderValue = 0;
var w =22;
var collision2Active = false;
function setup() {
    createCanvas(2000, 400);


    w = 22;
    // Calculate columns and rows
    columns = 48;
    rows = 18;
    // Wacky way to make a 2D array is JS
    board = new Array(columns);
    squares = new Array(columns);
    for (var i = 0; i < columns; i++) {
        board[i] = new Array(rows);
        squares[i] = new Array(rows);
    }
    // Going to use multiple 2D arrays and swap them
    next = new Array(columns);
    for (i = 0; i < columns; i++) {
        next[i] = new Array(rows);
    }
    init();

    for (var i = 0; i < columns; i++) {
        for (var j = 0; j < rows; j++) {
            squares[i][j] = new Square(i, j);
        }
    }
    slider = createSlider(0, 6, 0);
    text("slider 2", 0, 30)
    yAxisSlider = createSlider(0, 10, 0);
    yAxisSlider.position(0, 20);

    yAxisSlider2 = createSlider(0, 10, 0);
    yAxisSlider2.position(0, 200);


    slider.position(248, 430);
    text("slider 1", 248, 440)

}


var collision1Active = false;

function draw() {
    var d = new Date();


    // print(yAxisSlider.value())
    background(255);
    // squares[5][17].enabled = true;
    // squares[5][17].level = 1;

    //   squares[10][10].enabled = true;
    // squares[10][10].level = 1;

    // generate();
    for (var i = 0; i < columns; i++) {
        for (var j = 0; j < rows; j++) {

            if (squares[i][j].enabled) {

                if (squares[i][j].level == 1 && squares[i][j].enabled) {

                    fill(255, 204, 0);
                } else if (squares[i][j].level == 2 && squares[i][j].enabled) {

                    fill(255, 204, 255);
                } else if (squares[i][j].level == 3 && squares[i][j].enabled) {

                    fill(100, 100, 255);
                } else if (squares[i][j].level == 11 || squares[i][j].level == 22) {
                    // print(squares[i][j].level)
                    fill(20, 200, 30);
                }


            } else {
                fill(255);

            }

            stroke(0);
            rect(210 + (i * w), j * w, w - 1, w - 1);
        }
    }



    // sliderValue = slider.value() * 3;

    // if (!collision1Active) {
    //     for (var j = 0; j < 17; j++) {
    //       // if(!squares[5][17 - j].yEnabled) {
    //         if(j==10) {
    //           print("offender")
    //           print(squares[5][j])
    //         }
    //         squares[5][j].level = 3;
    //         squares[5][j].enabled = false;
    //         board[5][j] = 0;
    //         // print(slider.value())
    //         squares[5][17 - j].yEnabled = false;

    //       // }
    //     }

    //     for (var j = 0; j < sliderValue; j++) {
    //         // print(17-j)
    //         squares[5][17 - j].level = 11;
    //         squares[5][17 - j].enabled = true;
    //         squares[5][17 - j].yEnabled = true;

    //     }

    // }

    yAxisSliderValue = yAxisSlider.value() * 5;
    yAxisSliderValue2 = yAxisSlider2.value() * 5;
    if (!collision1Active) {
        for (var j = 0; j < 48; j++) {

          if(!squares[47 - j][5].xEnabled) {
            squares[47 - j][5].level = 2;
            squares[47 - j][5].enabled = false;
            squares[47 - j][5].xEnabled = false;
            board[47 - j][5] = 0;
          }
              // if(!squares[47 - j][10].xEnabled) {
                if(j==40) {

                  print("turning it off")
                }
            squares[47 - j][10].level = 2;
            squares[47 - j][10].enabled = false;
            squares[47 - j][10].xEnabled = false;

            board[47 - j][10] = 0;
          // }

        }

        for (var j = 0; j < yAxisSliderValue - 2; j++) {
            print(j)
            squares[j][5].level = 22;
            squares[j][5].enabled = true;
            board[j][5] = 1;
            squares[j][5].xEnabled = true;
            // print(squares[47-j][5].xEnabled)

        }

        for (var j = 0; j < yAxisSliderValue2 - 2; j++) {
            // print("This is happening")
            squares[j][10].level = 22;
            squares[j][10].enabled = true;
            board[j][10] = 1;
            squares[j][10].xEnabled = true;
            // print(squares[47-j][5].xEnabled)

        }



    }

}

function clearColor() {
    for (var i = 0; i < columns; i++) {
        for (var j = 0; j < rows; j++) {

            fill(255);

            stroke(0);
            rect(i * w, j * w, w - 1, w - 1);
        }
    }



}
// reset board when mouse is pressed
function mouseReleased() {

      sliderValue = slider.value() * 3;

    if (!collision1Active) {
        for (var j = 0; j < 17; j++) {
          // if(!squares[5][17 - j].yEnabled) {
            if(j==10) {
              print("offender")
              print(squares[5][j])
            }
            squares[5][j].level = 3;
            squares[5][j].enabled = false;
            board[5][j] = 0;
            // print(slider.value())
            squares[5][17 - j].yEnabled = false;

          // }
        }

        for (var j = 0; j < sliderValue; j++) {
            // print(17-j)
            squares[5][17 - j].level = 11;
            squares[5][17 - j].enabled = true;
            squares[5][17 - j].yEnabled = true;

        }

    }

  print(squares)
    // print(collision1Active)

    if (collision1Active) {
        // print("slider value" + slider.value())
        //Update this to not be hard coded
        if (slider.value() < 5) {
            collision1Active = false;
            switchMatrixState(5, 5, 0);
        }

        if (yAxisSlider.value() < 2) {
            collision1Active = false;
            switchMatrixState(5, 5, 0);
            squares[5][5].level = 22;
            squares[5][5].enabled = true;
        }

           if (yAxisSlider2.value() < 2) {
            collision1Active = false;
            collision2Active = false;
            switchMatrixState(5, 10, 0);
            squares[5][10].level = 22;
            squares[5][10].enabled = true;
        }


    }

    for (var j = 0; j < 18; j++) {


        
        if (squares[j][10].xEnabled && squares[j][10].yEnabled) {
            print("IN HERE " + j)
            collision1Active = true;
            collision2Active = true;
            for (var i = 0; i < 47-1 ; i++) {
                squares[47 - i][10].level = 0;
                squares[47 - i][10].enabled = false;
                squares[47 - i][10].yEnabled = false;


            }

            for (var i = 0; i < 17-3; i++) {
                print("NOW IN HERE")
                squares[5][i].level = 0;
                squares[5][i].enabled = false;
                squares[5][i].yEnabled = false;


            }
            switchMatrixState(j, 10, 1);
            print(squares)

        }

        if(!collision2Active){

        if (squares[5][j].xEnabled && squares[5][j].yEnabled) {
            print("ACTUALLy HERE ")
            collision1Active = true;
            for (var i = 0; j < 47 - i + 4; i++) {
                squares[47 - i][5].level = 0;
                squares[47 - i][5].enabled = false;
                squares[47 - i][5].xEnabled = false;

                collisionsLookup['c1']['x'] = 47 - i;
                collisionsLookup['c1']['y'] = 5;
                collisionsLookup['c1']['active'] = true;


            }

            for (var i = 0; i < 17 - j - 3; i++) {
                squares[5][i].level = 0;
                squares[5][i].enabled = false;
                squares[5][i].xEnabled = false;

            }
            switchMatrixState(5, j, 1);


        }
}

    }
    print('finAL squares')
    print(squares)

}


function switchMatrixState(xCoordinate, yCoordinate, state) {


    if (state == 0) {
        print("switchMatrixState off")
        fillSquare(xCoordinate, yCoordinate, 0, 1);
        fillSquare(xCoordinate, yCoordinate, 0, 2);
        fillSquare(xCoordinate, yCoordinate, 0, 3);

    } else {

        // triOsc.freq(220);
        // env.play(triOsc, 0, 0.2);


        fillSquare(xCoordinate, yCoordinate, 1, 1);
        print("done filling");
        // setTimeout(function() {

        fillSquare(xCoordinate, yCoordinate, 1, 2)
        triOsc.freq(440);
        print("done filling2 ");
        // env.play(triOsc, 0, 0.2);


        // }, 1000)
        // setTimeout(function() {
        fillSquare(xCoordinate, yCoordinate, 1, 3);
        triOsc.freq(660);
        // env.play(triOsc, 0, 0.2);
        print("done filling3");


        // }, 2000);

        // setTimeout(function() {
        //      clearColor();

        // }, 1000);



    }

}


function fillSquare(xCoordinate, yCoordinate, state, level) {
    var offset = 0;
    if (level == 1) {

        offset = 3;

    } else if (level == 2) {
        offset = 5;

    } else if (level == 3) {

        offset = 7;
    }


    for (x = 0; x < offset; x++) {
        xindex = xCoordinate - level + x;
        for (i = 0; i < offset; i++) {
            yindex = yCoordinate - level + i;
            // print("yCoordinate + " + yCoordinate)
            // print("x index : " + xindex + ' y index : ' + yindex)
            if (state == 1 && !squares[xindex][yindex].enabled) {
                squares[xindex][yindex].enabled = true;
                squares[xindex][yindex].level = level;
                //         stroke(0);
                //            fill(100, 200, 255);
                // rect(210 + (xindex * w), yindex * w, w - 1, w - 1);

            }


            if (state == 0) {
                squares[xindex][yindex].enabled = false;
                squares[xindex][yindex].level = 0;

            }

            // board[xindex][yindex] = state;
        }
    }
}

// Fill board randomly
function init() {

}