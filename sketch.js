/*

  # Mohamed Elshorbagy
  # 20 / 12 / 2017
  # Game Of Life
  # Ref. : https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life



  - Rules for the Game from Wiki Page : 
      = Death --> Neighbours == 3 --> Be Life :D
      = Live --> Neighbours < 2 || Neighbours > 3 --> Be Death :(


 */


// Global Variables
let grid;
let rows;
let cols;
let scaleValue = 20;





function setup() {  
createCanvas(600,400);

cols = width / scaleValue;
rows = height / scaleValue;
grid = createTwoDArray(cols,rows);


// Fill the Array with Zeroes and Ones
for(let i = 0;i < cols;i++) {
  for(let j = 0 ; j < rows;j++){
      grid[i][j] = floor(random(2));
  } 
}




}


function draw() {
background(0);

for(let i = 0;i < cols;i++) {
  for(let j = 0 ; j < rows;j++){
    let x = i * scaleValue;
    let y = j * scaleValue;

    if(grid[i][j] == 0) {
        fill(255);
    } else if(grid[i][j] == 1) {
        fill(0);
    }

    rect(x,y,scaleValue - 1,scaleValue - 1);


  } 
}



// SECOND STEP : 
// Check The Rules of The Game 

let nextState = createTwoDArray(cols,rows);

for(let i = 0;i < cols;i++) {
  for(let j = 0 ; j < rows;j++){
    let currentState = grid[i][j];

    // Make the Infinite Wrapper World
    // For the Edges
        let sumNeighbours = checkNeighbours(grid , i , j);

        // Implemnting the Rules
        // For the Death
        if(currentState == 0 && sumNeighbours == 3) {
          nextState[i][j] = 1;
        } else if(currentState == 1 && (sumNeighbours < 2 || sumNeighbours > 3) ) {
          nextState[i][j] = 0;      
        } else {
          nextState[i][j] = currentState;
        }

  }
}




// New Generations
grid = nextState;


}



// Global Functions 



/*
  [ Function Name ] : createTwoDArray(cols,rows)
  [ Function Returned Value Type ] : Array
  [ Inherited Function or Classes ] : - Built In
                              = Array Class 
  [ Functionality ] : Make a 2D Array for the Grid System

*/

function createTwoDArray(cols,rows) {

let temp = new Array(cols);

for(let i = 0;i < temp.length;i++) {
  temp[i] = new Array(rows);
}

return temp;

}

/*
  [ Function Name ] : checkNeighbours(grid , x , y)
  [ Function Returned Value Type ] : Number ( Float or Integer )
  [ Inherited Function or Classes ] : - Built In
                                          = Array Class 
                                      - Techniques :
                                        = Infinite World Wrapper
                                        = Modulo Operator Technique   
  [ Functionality ] : To check the Neighbours Values to Make the Rules Referenced at the Beginning

*/



function checkNeighbours(grid , x , y) {
  let sum = 0;
  for(let i = -1; i < 2;i++) {
    for(let j = -1 ; j < 2;j++) {

        // Infinite Wrapper World
        let singleCol = ( x + i + cols ) % cols;
        let singleRow = ( y + j + rows ) % rows;

        sum += grid[singleCol][singleRow];
    }
  }

  sum -= grid[x][y];
  return sum;


} 




