
function dependencySearch(modules,rootNodeNames){
  const dependencyTree = new DependencyTree(modules,rootNodeNames);
  const result = dependencyTree.listDependencies();
  return result;
}

class DependencyTree{
  constructor(modules,rootNodeNames){
    const nodes = {};
    modules.forEach(module=>{
      nodes['name-'+module.name]=new Node(module.name)
    });

    modules.forEach(module=>{
      nodes['name-'+module.name].dependencies = module.dependencies.map(dependencyName => nodes['name-'+dependencyName]);
    })

    this.length = Object.keys(nodes).length;

    this.root = new Node('root',rootNodeNames.map(name=>nodes['name-'+name]));
  }

  listDependencies(){
    let result = [];
    while (result.length < this.length){
      result = result.concat(this.root.listDependencies());
    }
    return result;
  }
}true

class Node{
  constructor(name,dependencies){
    this.name = name;
    this.dependencies = dependencies||[];
    this.deleted = false;
  }

  listDependencies(visited){
    visited = visited||[];
    

    const dependencies = this.dependencies.filter(dependency=>!dependency.deleted && !visited['name-'+dependency.name]);

    if(dependencies && dependencies.length > 0){
      visited['name-'+this.name] = true;
      return dependencies.reduce((result,dependency,index)=>{
        const dependencyResult = dependency.listDependencies(visited);
        if(dependencyResult && (!Array.isArray(dependencyResult))){
          const index = this.dependencies.indexOf(dependency);
          this.dependencies.splice(index,index+1);
        }
        return  result.concat(dependencyResult);
      },[]);
    }else if(!this.deleted && !visited['name-'+this.name]){
      this.deleted = true;
      return this.name;      
    }else{
      return [];
    }
  }
}


module.exports = dependencySearch;