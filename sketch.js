let game = new Game();

function setup() {
  createCanvas(400, 400);
  game.setup();
}

function draw() {
  background("#0000B0");
  game.render()
}