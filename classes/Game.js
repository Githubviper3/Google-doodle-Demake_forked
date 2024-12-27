const alphabet = [..."abcdefghijklmnopqrstuvwxyz"];
const chunkArray = (array, chunkSize) => {
  const numberOfChunks = Math.ceil(array.length / chunkSize);

  return [...Array(numberOfChunks)].map((value, index) => {
    return [...array.slice(index * chunkSize, (index + 1) * chunkSize)];
  });
};

//generating each grid position's neighbors in code
// function generate_graph(){
//   let newgraph = {}
//   let counter=0;
//   while (true){
//       console.log("Neighbors to",alphabet[counter],": ")
//       let neighbors= prompt("input: ")
//       newgraph[alphabet[counter]] = [...neighbors]
  
//       let end = prompt('Enter -1 to end: ')
//       if (end == "-1"){
//           break
//       }
//       counter += 1
//   }
//   return newgraph
//   }
  

class Game {
  constructor() {
    this.lines = [];
    this.gridrects = [];
    this.cards = [];
    this.aicards = [];
    this.aicardtargets = {};
    this.selected;
    this.position;
    this.lock;
    this.users_turn =true;
    this.graphgrid = {};
    this.gridpositions= [];
    this.lockstates = {};
    this.gridstate = {};
    this.selectedAI;
    this.readyAI = false;
    this.skip = false;
    this.graphform = {
      "a": ["b", "d"],
      "b": ["a", "c", "e"],
      "c": ["b", "f"],
      "d": ["a", "e", "g"],
      "e": ["b", "d", "f", "h"],
      "f": ["c", "e", "i"],
      "g": ["d", "h"],
      "h": ["g", "e", "i"],
      "i": ["f", "h"],
    };
    this.graphform2 = {
      "a": [ 'e' ],
      "b": [ 'e' ],
      "c": [ 'e' ],
      "d": [ 'e' ],
      "e": [ 'f', 'g', 'h', 'i' ],
      "f": ["e"],
      "g": ["e"],
      "h": ["e"],
      "i": ["e"]
    }
    
  }

  RemoveCycles(graph){
    let keys = Object.keys(graph);
    let clone = JSON.parse(JSON.stringify(graph));
    let traversed = []
    keys.forEach((key) => {
        traversed.push(key)
        let childnodes = graph[key]
        childnodes =childnodes.filter((node)=>{return !traversed.includes(node)})
        clone[key] = childnodes
    });
    return clone
  }  

  createGrid(startPos, distance, width = 3, height = 3) {
    let graphpositions = chunkArray(alphabet, width).slice(0, height);
    distance += 30;
    for (let i = 0; i < width; i++) {
      for (let j = 0; j < height; j++) {
        let x = startPos[0] + distance * i;
        let y = startPos[1] + distance * j;
        let grid_rect = new Rect({ position: [x, y], size: [30, 30],border:1,data: graphpositions[j][i]});
        this.graphgrid[grid_rect.data] = grid_rect.get_center();
        this.gridpositions.push(grid_rect.get_center())
        this.gridrects.push(grid_rect);
      }
    }
  }

  
  createlines() {
    let flattenedgraph = this.RemoveCycles(this.graphform);
    let neighbors;
    let neighborpositions = [];
    let keys = Object.keys(flattenedgraph);
    keys.forEach((key) => {
      let currentposition = this.graphgrid[key];
      neighbors = flattenedgraph[key]
      neighborpositions = neighbors.map((node)=> {return this.graphgrid[node]})
      neighborpositions.forEach((position)=>{
                this.lines.push([currentposition,position])

      })

    })
  }

  setup() {
    this.createGrid([125, 125], 30);
    this.createlines();
    this.aicards.push(new Rect({ position: [0, 0],data:"1" ,color:"red"}));
    this.aicards.push(new Rect({ position: [100,0],data:"2",color:"red" }));
    this.aicards.push(new Rect({ position: [200,0],data:"3" ,color:"red"}));
    this.cards.push(new Rect({ position: [0, 300],data:"1",border:1}));
    this.cards.push(new Rect({ position: [100, 300],data:"2",border:1 }));
    this.cards.push(new Rect({ position: [200, 300],data:"3",border:1 }));

    

    // let firstposition = this.gridrects[0].position.array().slice(0,2)
    // let lastposition = [this.gridrects[this.gridrects.length-1].right,this.gridrects[this.gridrects.length-1].bottom]
    // console.log(firstposition,lastposition)

  }
  
  displaygraphpositions(square) {
    push();
    fill("white");
    let [x, y] = this.graphgrid[square.data];
    text(`${square.data}`, x, y);
    pop();
  }


  render() {
    if (keyIsPressed && (key === "r" || key === "R")) {
      window.location.reload(); // Reloads the page
    } 

    this.lines.forEach((positions) => {
      line(positions[0][0],positions[0][1],positions[1][0],positions[1][1]);
    })

    this.gridrects.forEach((square) => {
      square.draw();
      this.displaygraphpositions(square);
      if (this.users_turn){
      if (square.active && this.selected && !this.selected.active) {
        if (this.selected.colliderect(square)) {
          this.position = this.graphgrid[square.data];
          this.gridstate[square.data] = this.selected.data
          this.skip = false;


        }
      }
    }
    });
    
    this.cards.forEach((card) => {

      if (this.users_turn){
      
        if (card === this.selected) {
          if (!this.skip) {
            card.lock_to_center(this.position);
            card.active = false;
            this.lockstates[card.data] = true;
            this.selectedAI  = false
            this.users_turn = false
            this.lock = false;
          } else {
            card.lock_to_center(mouseX, mouseY);
            this.lock = true;
          }
        } else {
          if (card.active && (!this.selected || !this.lock)) {
            this.selected = card;
            this.skip = true;
          }
        }
      }
      card.draw();
    });

    this.aicards.forEach((card) => {
      if (!this.users_turn){
        if (!this.selectedAI){
          this.selectedAI =this.aicards[parseInt(Math.random()*this.aicards.length)]
        } else
        if (card === this.selectedAI){
          let randomindex = parseInt(Math.random()*this.aicards.length)
          card.lock_to_center(this.gridpositions[randomindex])
          this.selectedAI = false
          this.users_turn = true
        }
  
      }
      


      card.draw()
    })


  }
}
