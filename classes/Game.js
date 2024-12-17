import Card from "./Card.js";
import Rect from "./Rect.js";
export default class Game{
    constructor (p5){
        this.card = new Card(p5,[0,0]);
        this.card2 = new Card(p5,[100,0]);
        this.gridrects = [];
        this.lines = []
    }

    createGrid(p5, startPos, distance) {
    distance+= 50
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        let x = startPos[0] + distance * i; 
        let y = startPos[1] + distance * j; 
        this.gridrects.push(new Rect(p5, [x, y],[30,30]));
          }
        }
    }
    setup(p5){
        this.createGrid(p5,[105,105],30)
        let resetButton = p5.createButton('Reset Page');
        resetButton.position(450, 10);
        
        // Assign a function to the button's mousePressed event
        resetButton.mousePressed(this.resetPage);
        
        // let firstposition = this.gridrects[0].position.array()
        // let lastposition = [this.gridrects[this.gridrects.length-1].right,this.gridrects[this.gridrects.length-1].bottom]
        // console.log(firstposition,lastposition)
    }
    resetPage() {
      window.location.reload();
    }
    
    render(p5){
      this.gridrects.forEach(square => {
        if (square.colliderect(this.card) && !p5.mouseIsPressed){
          let position = square.get_center(p5).array()
          this.card.lock_to_center(...position)
          this.card.clicked= false
        }
        if (square.colliderect(this.card2) && !p5.mouseIsPressed){
          let position = square.get_center(p5).array()
          this.card2.lock_to_center(...position)
          this.card2.clicked= false
        }
        square.draw(p5)
      }); 
      
      this.card.draw(p5)
      this.card2.draw(p5)
      
    }
}