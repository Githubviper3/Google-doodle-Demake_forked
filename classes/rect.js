export class Rect {
    constructor(p5,position = [0,0],size = [50,50],color=[9,7,140],border = 1){
      this.position= p5.createVector(...position)
      this.top = this.position.y
      this.left = this.position.x;
      [this.width, this.height] = size
      this.bottom = this.top + this.height;
      this.right = this.left + this.width;
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
    get_center(p5){
      return p5.createVector(...[this.left+ (this.width/2),this.top+ (this.height/2)])
    }

    update(new_position){
      this.position.set(...new_position)
      this.top = this.position.y
      this.left = this.position.x;
      this.bottom = this.top + this.height;
      this.right = this.left + this.width;
    }

  
    draw(p5) {
      p5.fill(this.color);
      p5.strokeWeight(this.strokeWeight);
      

      p5.rect(this.position.x,this.position.y,this.width,this.height); 
    }
  }

export class Card extends Rect{
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