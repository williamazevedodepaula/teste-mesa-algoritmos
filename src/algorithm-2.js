
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
    if(index == 0) return '0';

    let i = index;
    let path = index.toString();

    do{
      i = minNodes[i];     
      path = `${i}-${path}`
    }while(i);
    return path;
  }
}

function printResult(result){
  console.log('-----------------------------------------------------');
  console.log('                 Result')
  console.log('-----------------------------------------------------');
  result.forEach((item,index)=>{
    if(index == 0) return;
    console.log(`${item.vertex},${item.distance},${item.path}`);
  })
  console.log('-----------------------------------------------------');
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