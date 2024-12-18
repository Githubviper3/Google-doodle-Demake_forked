import Rect from "./Rect.js";
export default class Card extends Rect{
    constructor(p5,position = [0,0],size = [50,50],color=[9,7,140],border = 1){
      super(p5,position,size,color,border)
      this.clicked = false
    }
    
    collidemouse(p5){
      if (this.right > p5.mouseX -6 && this.left < p5.mouseX +6  && this.bottom > p5.mouse - 9 && this.top < p5.mouseY + 9) 
        {
        return true;
      }
      return false;
    }
  
    
    lock_to_center(centerX,centerY){
      let x = centerX - this.width/2
      let y = centerY - this.height/2
      this.update([x,y])
    }
    hoverHandler(p5){
      if (p5.mouseIsPressed && this.collidemouse(p5)){
        this.color = "red"
        this.clicked = true
      } else if (!p5.mouseIsPressed){
        this.color = [9,7,140]
        this.clicked = false
      }
    }
  
    draw(p5){
      this.hoverHandler(p5)
      if (this.clicked){
        this.lock_to_center(p5.mouseX,p5.mouseY)
      }
      
      super.draw(p5)
  
    }
  
  }