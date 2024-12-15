import {Rect,Card} from "./classes/rect.js";
export class Engine{
    constructor (p5){
        this.card = new Card(p5,[0,0]);
        this.gridrects = [];
        this.lines = []
    }

    createGrid(p5, startPos, distance) {
    let squareArray = [];
    distance+= 30
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        let x = startPos[0] + distance * i; 
        let y = startPos[1] + distance * j; 
        this.gridrects.push(new Rect(p5, [x, y],[30,30]));
          }
        }
    }
    setup(p5){
        this.createGrid(p5,[125,125],30)
    }
    
    render(p5){

    }
}