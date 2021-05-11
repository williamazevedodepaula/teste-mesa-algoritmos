
function dependencySearch(searchStrategy,modules,rootNodeNames){
  const dependencyTree = new DependencyTree(searchStrategy,modules,rootNodeNames);
  const result = dependencyTree.listDependencies();
  return result;
}

/**
 * Abstrai a estrutura de uma árvore de dependencias,
 * para permitir executar o algoritmo de busca
 */
class DependencyTree{

  static get SEARCH_STRATEGY_1(){ return 1 }
  static get SEARCH_STRATEGY_2(){ return 2 }

  /**
   * Constroi a arvore de dependencias a partir de  uma entrada em forma de array.
   * Um Nó Raiz "abstrato" é criado, tendo como filhos todos os nós raiz da árvore de dependência
   * @param {number} searchStrategy estratégia de busca a ser utilizada
   * @param {Array<Object>} modules array de modules, no formato {name:string, dependencies:Array<string>}
   * @param {Array<string>} rootNodeNames array contendo o nome dos nós raiz (dependencias de nível 1)
   */
  constructor(searchStrategy,modules,rootNodeNames){
    const nodes = {};
    modules.forEach(module=>{
      nodes['name-'+module.name]=new Node(searchStrategy,module.name)
    });

    modules.forEach(module=>{
      nodes['name-'+module.name].dependencies = module.dependencies.map(dependencyName => nodes['name-'+dependencyName]);
    })

    /** Indica a estrategia a ser usada na busca */
    this.searchStrategy = searchStrategy;

    /** Quantidade de nós da árvore */
    this.length = Object.keys(nodes).length;

    /** 
     * referência para a raiz da árvore. É um nó "abstrato", não incluso entre os recebidos por parâmetro,
     * com o objetivo de facilitar o algoritmo, garantindo que, mesmo que hajam N pacotes de nível 1,
     * a árvore tenha sempre uma única raiz
     **/
    this.root = new Node(searchStrategy,'root',rootNodeNames.map(name=>nodes['name-'+name]));
  }

  /**
   * Percorre as dependencias e retorna os nomes, na ordem de carregamento.
   * O Algoritmo consiste em, partindo do nó raiz, percorrer seus nós filhos, recursivamente, até chegar às folhas (nós terminais / sem dependência).
   * Ao alcancar os nós terminais (ou folhas), o nome das mesmas é retornado, e elas são removidos da árvore (optei por "soft delete", apenas marcando o nó como ecluído).
   * O processo é repetido, com a árvore "podada", até qe não reste mais nenhum nó.
   * Para reduzir o número de chamadas recursivas e também evitar que valores repetidos sejam retornados, a cada "rodada", os nós já visitados são registrados e, ao
   * passar por um nó mais de uma vez, o mesmo retorna um array vazio em vez de percorrer novamente seus filhos.
   */
  listDependencies(){
    let result = [];
    while (result.length < this.length){
      result = result.concat(this.root.listDependencies([]));
    }
    return result;
  }
}true


/**
 * Abstrai um nó da árvore de dependências, executando a lógica recursiva de buscar os filhos
 */
class Node{

  /**
   * Constrói um nó
   * @param {number} searchStrategy estratégia de busca a ser utilizada
   * @param {string} name nome do Nó (embora os pacotes do exemplo tenham nomes numéricos, achei mais coerente utilizar strings para os nomes) 
   * @param {Array<Node>} dependencies lista de dependências
   */
  constructor(searchStrategy,name,dependencies){
    this.name = name;
    this.deleted = false;
    this.searchStrategy = searchStrategy;
    this.dependencies = dependencies||[];    
  }


  /**
   * Retorna a lista de dependências de um nó, em ordem de visitação (Das folhas até o Nó em si)
   * @param {Array<boolean>} visited hash map utilizado para registrar os nós já visitados durante uma iteração, 
   * para evitar chamadas recursivas desnecessárias e verificação de duplicidade
   */
  listDependencies(visited){
    visited = visited||[];
    
    const dependencies = this.dependencies.filter(dependency=>!dependency.deleted);
    //Se utilizar a estratégia de busca 2, Indica que, embora o nó tenha se tornado uma folha, o filho acabou de ser removido (nesta interação), e portanto este não deve ser contabilizado
    //este controle é util quando há muita dependencia entre os nós, de forma que um mesmo nó pode virar folha
    const hasVisitedDependencies = (this.searchStrategy == DependencyTree.SEARCH_STRATEGY_1) ? [] :  this.dependencies.filter(dependency=>visited['name-'+dependency.name]);

    visited['name-'+this.name] = true;
    if(dependencies && (dependencies.length > 0)){      
      return dependencies.reduce((result,dependency)=> !visited['name-'+dependency.name] ? result.concat(dependency.listDependencies(visited)) : result,[]);
    }else if(hasVisitedDependencies.length == 0){
      this.deleted = true;
      return this.name;      
    }else{
      return [];
    }
  }
}


module.exports = {dependencySearch,DependencyTree,Node};