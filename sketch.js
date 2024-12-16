import Game from "./classes/Game.js";
let game;
new p5(function(p5){
  game = new Game(p5)
  
  p5.setup = function() {
  p5.createCanvas(400, 400);
  game.setup(p5)
  }

 p5.draw = function() {
  p5.background("#0000B0");
  game.render(p5)
  


}})