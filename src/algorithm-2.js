
const INFINITY = -1;

const dijkstra = (matrix,startNodeIndex)=>{
  
  const [remainingVertex,minNodes,distances] = initializeDijkstra(matrix,startNodeIndex);  

  while(remainingVertex.length > 0){
    const vertex = extractMin();
    const adjacents = getAdjacent(vertex);
    adjacents.forEach(adjacent=>relax(vertex,adjacent))
  }

  const result = formatResults(matrix,distances,minNodes);

  printResult(result);

  return result;


  function relax(vertex,adjacent){
    const temp = distances[vertex] + getWeight(vertex,adjacent);
    if((distances[adjacent] == INFINITY)||( distances[adjacent] > temp )){
      distances[adjacent] = temp;
      minNodes[adjacent] = vertex;
    }
  }
  function getAdjacent(vertex){
    return matrix[vertex].reduce((acc,child,index)=> child != INFINITY ? acc.concat(index) : acc,[]);
  }
  function getWeight(from,to){
    return matrix[from][to];
  }
  function extractMin(){
    //@TODO: Implementar um heap, para melhor eficiência

    let lowest = {index:INFINITY,value:INFINITY};

    remainingVertex.forEach((vertex,index)=>{      
      if((lowest.value == INFINITY) ||  ( (lowest.value >= distances[vertex]) && (distances[vertex] != INFINITY ) )){
        lowest = {index:index,value:distances[vertex],vertex:vertex}
      }
    })
    
    remainingVertex.splice(lowest.index,1);
    
    return lowest.vertex;
  }
  function initializeDijkstra(matrix,startNodeIndex){
    const remainingVertex = [];
    const minNodes = [];
    const distances = [];
    matrix.forEach((col,index) => {
      remainingVertex.push(index);    
      distances.push(INFINITY);
      minNodes.push(null);
    });
    distances[startNodeIndex] = 0;
    return [remainingVertex,minNodes,distances]
  }
  
  function formatResults(matrix,distances,minNodes){
    const results = [];
  
    return distances.map((distance,index)=>({vertex:index,distance,path:getPath(index)}));
  
    function getPath(index){
      if(index == startNodeIndex) return startNodeIndex.toString();
  
      let i = index;
      let path = index.toString();
  
      do{
        i = minNodes[i];     
        path = `${i}-${path}`
      }while(i != startNodeIndex);

      return path;
    }
  }
  
  function printResult(result){
    const color_red = '\x1b[31m';
    const color_green = '\x1b[32m';
    const color_blue = '\x1b[34m';
    const color_yellow = '\x1b[33m';
    const color_reset = '\x1b[0m';
  
    console.log(color_green);
    console.log('-----------------------------------------------------');
    console.log('                 Result')
    console.log('-----------------------------------------------------');
    result.forEach((item,index)=>{
      if(index == startNodeIndex) return;
      console.log(`${color_red}${item.vertex}, ${color_blue}${item.distance}, ${color_yellow}${item.path}`);
    })
    console.log(color_green,'-----------------------------------------------------',color_reset);
    console.log(`Legenda: ${color_red}Vértice, ${color_blue}Distância, ${color_yellow}Caminho`)
    console.log(color_green,'-----------------------------------------------------',color_reset);
  }
}


class MinHeap{
  constructor(array){
    this.array = array;

    for(let i=this.array.length/2;i>=1;i--){
      this.fixHeap(i);
    }
  }

  fixHeap(i){
    let j = i;
    while(2*j <= n){
      let f = 2*j;
      if((f <  n) && (this.array[f] > this.array[f+1])) f++;
      if (this.array[j] <= this.array[f]) j = n;
      else{
        const temp = this.array[j];
        this.array[j] = this.array[f];
        this.array[f] = temp;
        j = f;
      }
    }
  }

  getMin(){
    const min = this.array[0];
    this.fixHeap()
  }
}

module.exports = dijkstra;