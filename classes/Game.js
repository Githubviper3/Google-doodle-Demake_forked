import Card from "./Card.js";
import Rect from "./Rect.js";
export default class Game{
    constructor (p5){
        this.cards = []
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
        this.cards.push(new Card(p5,[0,0]))
        this.cards.push(new Card(p5,[100,0]))
        this.cards.push(new Card(p5,[200,0]))
        
        // let firstposition = this.gridrects[0].position.array()
        // let lastposition = [this.gridrects[this.gridrects.length-1].right,this.gridrects[this.gridrects.length-1].bottom]
        // console.log(firstposition,lastposition)
    }

    
    render(p5){
      if (p5.keyIsPressed && (p5.key === 'r' || p5.key === 'R')) {
        window.location.reload(); // Reloads the page
      }

      this.gridrects.forEach(square => {
        square.draw(p5)
      }); 
      
      this.cards.forEach(card => {
        card.draw(p5)
      }); 

      
    }
}