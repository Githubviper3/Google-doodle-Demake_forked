export default class Rect {
    constructor(p5,position,color=[9,7,140],size = [50,50],border = 1){
      this.position= p5.createVector(...position)
      this.x = this.top = this.position.y
      this.y =this.left = this.position.x;
      [this.width, this.height] = size
      this.bottom = this.top + this.height;
      this.right = this.left + this.width;
      this.center = p5.createVector(...[this.left+ (this.width/2),this.top+ (this.height/2)])
      this.strokeWeight = border
      this.color = color

    }
  
    colliderect(rect) {
      if (this.right > rect.left && this.left < rect.right && this.bottom > rect.top && this.top < rect.bottom) 
        {
        return true;
      }
      return false;
    }

    
  
   
  
    draw(p5, scroll_offset = [0, 0]) {
      p5.fill(this.color);
      p5.strokeWeight(this.strokeWeight);

      p5.rect(this.position.x + scroll_offset[0],this.position.y + scroll_offset[1],this.width,this.height); 
    }
  }