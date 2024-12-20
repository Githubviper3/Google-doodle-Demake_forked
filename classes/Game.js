import Card from "./Card.js";
import Rect from "./Rect.js";
export default class Game{
    constructor (){
        this.cards = []
        this.gridrects = [];
        this.mouselock = false;
        this.state = {};
        this.lock_location;
        this.lockcard = false;
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
        this.cards.push(new Card(p5,[0,0],"A"))
        this.cards.push(new Card(p5,[100,0],"B"))
        this.cards.push(new Card(p5,[200,0],"C"))
        this.cards.forEach(card => {
          this.state[card.name] = card.active
        })
        // let firstposition = this.gridrects[0].position.array()
        // let lastposition = [this.gridrects[this.gridrects.length-1].right,this.gridrects[this.gridrects.length-1].bottom]
        // console.log(firstposition,lastposition)
    }

    
    render(p5){
      if (p5.keyIsPressed && (p5.key === 'r' || p5.key === 'R')) {
        window.location.reload(); // Reloads the page
      }

      

      

      this.gridrects.forEach(square => {
        this.lockcard = square.collidemouse(p5)
        
        if (this.lockcard){
        this.lock_location = square.get_center(p5).array()
        }
        console.log(this.lock_location)
        square.draw(p5)
      });

      this.cards.forEach(card => {
        this.state[card.name] = card.active

        //handling mouse
        if (card.hoverHandler(p5) && (!this.mouselock || this.state[card.name]) ){
          this.mouselock = true
          card.active = true 
          card.lock_to_center(p5.mouseX,p5.mouseY)
        } else{
          this.state[card.name] = false
        }

        if (this.lockcard && this.state[card.name]){
          this.mouselock = false
          card.active = false
          card.clicked = false
          card.lock_to_center(this.lock_location[0],this.lock_location[1])
       
        } 
        card.draw(p5)

      });

      
    }
}