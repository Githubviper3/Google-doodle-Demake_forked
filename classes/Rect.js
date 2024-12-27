class Rect {
    constructor({position = [0,0],size = [50,50],color=[9,7,140],border =1,data=null}) {
      this.position= createVector(...position)
      this.top = this.position.y
      this.left = this.position.x;
      [this.width, this.height] = size
      this.bottom = this.top + this.height;
      this.right = this.left + this.width;
      this.strokeWeight = border
      this.color = color
      this.data = data
      this.active;
      

    }
    
    mouseHover(){
      return  this.right > mouseX && this.left < mouseX +12  && this.bottom > mouseY  && this.top < mouseY +24
    } 

    
    lock_to_center(center,centerY=null){
      if (center instanceof Array){
        this.update([center[0] - this.width/2,center[1] - this.height/2])  
      } else{
      this.update([center - this.width/2,centerY - this.height/2])
      }
    }
    

    

    colliderect(rect) {
      return (this.right > rect.left && this.left < rect.right && this.bottom > rect.top && this.top < rect.bottom) 
    }



    get_center(){
      return createVector(...[this.left+ (this.width/2),this.top+ (this.height/2)])
    }


    update(new_position= null,positionY){
      if (new_position instanceof Array){
        this.position.set(...new_position)
      } else if (positionY){
        this.position.set(new_position,positionY)
      }
      this.top = this.position.y
      this.left = this.position.x;
      this.bottom = this.top + this.height;
      this.right = this.left + this.width;
    }

  
    draw() {
      fill(this.color);
      strokeWeight(this.strokeWeight);
      this.active = mouseIsPressed && this.mouseHover()
      rect(this.position.x,this.position.y,this.width,this.height); 
    }
  }

