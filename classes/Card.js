import Rect from "./Rect.js"
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
  
    lock_to_mouse(p5){
      this.update([p5.mouseX,p5.mouseY])
    }
  
    //mouseover
    hoverHandler(p5){
      if (p5.mouseIsPressed && this.collidemouse(p5)){
        this.color = "red"
        this.clicked = true
      } else{
        this.color = [9,7,140]
        this.clicked = false
      }
    }
  
    draw(p5){
      this.hoverHandler(p5)
      if (this.clicked){
        this.lock_to_mouse(p5)
      }
      super.draw(p5)
  
    }
  
  }