import Rect from "./Rect.js";
export default class Card extends Rect{
    constructor(p5,position = [0,0],name="",size = [50,50],color=[9,7,140],border = 1){
      super(p5,position,size,color,border)
      this.active = false
      this.mousehover =false
      this.name = name
    }
    
    lock_to_center(centerX,centerY){
      this.update([centerX - this.width/2,centerY - this.height/2])
    }


    hoverHandler(p5){
      this.mousehover = this.collidemouse(p5)

      if ( p5.mouseIsPressed && this.mousehover){
        return true
      } else if (!p5.mouseIsPressed){
        return false
      }
    }

  
  }