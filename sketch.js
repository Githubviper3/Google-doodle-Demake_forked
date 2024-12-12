import Rect from "./classes/rect.js";
let squares,mouserect,big;



function createGrid(p5, startPos, distance) {
  let squareArray = [];
  distance+= 30
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      let x = startPos[0] + distance * i; 
      let y = startPos[1] + distance * j; 
      squareArray.push(new Rect(p5, [x, y],[30,30]));
      
  
    }
  }
  
  return squareArray;
}



new p5(function(p5){

p5.setup = function() {
  p5.createCanvas(400, 400);
  squares= createGrid(p5,[125,125],30)
  mouserect = new Rect(p5,[p5.mouseX,p5.mouseY],[12,18],[255,0,0],0)
  let firstposition = squares[0].position.array()
  let lastposition = [squares[squares.length-1].right,squares[squares.length-1].bottom]
  console.log(firstposition,lastposition)
  }

 p5.draw = function() {
  p5.background("#0000B0");
  mouserect.update([p5.mouseX,p5.mouseY])
  
  squares.forEach(square => {
    if (mouserect.colliderect(square)){
      square.color = "red"
    } else{
      square.color = [9,7,140]
    }
    square.draw(p5)
  });

  // if (big.collidepoint(mouserect)){

  // }
  mouserect.draw(p5)

}})