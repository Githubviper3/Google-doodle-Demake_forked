import Rect from "./Rect.js";
export default class Card extends Rect{
    constructor(p5,position = [0,0],size = [50,50],color=[9,7,140],border = 1){
      super(p5,position,size,color,border)
      this.clicked = false
    }
    
    collidemouse(p5){
      if (this.right > p5.mouseX && this.left < p5.mouseX +12  && this.bottom > p5.mouseY && this.top < p5.mouseY + 18) 
        {
        return true;
      }
      return false;
    }
  
    
    update_by_center(centerX,centerY){
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
        this.update_by_center(p5.mouseX,p5.mouseY)
      }
      super.draw(p5)
  
    }
  
  }