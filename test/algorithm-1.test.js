var chai = require('chai'); 
var dependencySearch = require('../src/algorithm-1').dependencySearch;
var DependencyTree = require('../src/algorithm-1').DependencyTree;
chai.should();

describe('Algorithm 1',async()=>{

  describe('Estratégia 1 -> Caso a remoção de um nó produza uma nova folha/terminal em um galho mais à direita (ainda não visitado), o mesmo se torna uma folha e será retornado na mesma recursão',async ()=>{
    it('Deve retornar a ordem correta - caso 1 / Estrategia 1',async function(){
      const modules = [
        {name:'7',dependencies:['5','6']},
        {name:'6',dependencies:['2','4']},
        {name:'5',dependencies:['3','6']},
        {name:'4',dependencies:[]},
        {name:'3',dependencies:['0']},
        {name:'2',dependencies:['1']},
        {name:'1',dependencies:[]},
        {name:'0',dependencies:[]}
      ]
      const rootNodes = ['7'];
  
      const expected_output = ['0','1','4','3','2','6','5','7'];
  
      dependencySearch(DependencyTree.SEARCH_STRATEGY_1,modules,rootNodes).should.deep.equal(expected_output)
    });

    it('Deve retornar a ordem correta - caso 2 / Estrategia 1',async function(){
      const modules = [
        {name:'pacote 11',dependencies:[]},
        {name:'pacote 10',dependencies:['pacote 8']},
        {name:'pacote 9',dependencies:[]},
        {name:'pacote 8',dependencies:[]},
        {name:'pacote 7',dependencies:['pacote 10']},
        {name:'pacote 6',dependencies:['pacote 8','pacote 9','pacote 7']},
        {name:'pacote 5',dependencies:['pacote 7']},
        {name:'pacote 4',dependencies:['pacote 6']},
        {name:'pacote 3',dependencies:['pacote 5','pacote 11']},
        {name:'pacote 2',dependencies:['pacote 5']},
        {name:'pacote 1',dependencies:['pacote 4']}
      ]
      const rootNodes = ['pacote 1','pacote 2','pacote 3'];
  
      const expected_output = [
        'pacote 8',
        'pacote 9',
        'pacote 10',
        'pacote 11',
        'pacote 7',
        'pacote 5',
        'pacote 3',
        'pacote 6',
        'pacote 2',
        'pacote 4',
        'pacote 1'
      ];
  
      dependencySearch(DependencyTree.SEARCH_STRATEGY_1,modules,rootNodes).should.deep.equal(expected_output)
    });
  })


  describe('Estratégia 2 -> Retornar apenas as folhas que já existiam em cada "galho" da ´arvore, para cada recursão',async ()=>{
    it('Deve retornar a ordem correta - caso 1 / Estrategia 2',async function(){
      const modules = [
        {name:'7',dependencies:['5','6']},
        {name:'6',dependencies:['2','4']},
        {name:'5',dependencies:['3','6']},
        {name:'4',dependencies:[]},
        {name:'3',dependencies:['0']},
        {name:'2',dependencies:['1']},
        {name:'1',dependencies:[]},
        {name:'0',dependencies:[]}
      ]
      const rootNodes = ['7'];
  
      const expected_output = ['0','1','4','3','2','6','5','7'];
  
      dependencySearch(DependencyTree.SEARCH_STRATEGY_2,modules,rootNodes).should.deep.equal(expected_output)
    });

    it('Deve retornar a ordem correta - caso 2 / Estratégia 2',async function(){
      const modules = [
        {name:'pacote 11',dependencies:[]},
        {name:'pacote 10',dependencies:['pacote 8']},
        {name:'pacote 9',dependencies:[]},
        {name:'pacote 8',dependencies:[]},
        {name:'pacote 7',dependencies:['pacote 10']},
        {name:'pacote 6',dependencies:['pacote 8','pacote 9','pacote 7']},
        {name:'pacote 5',dependencies:['pacote 7']},
        {name:'pacote 4',dependencies:['pacote 6']},
        {name:'pacote 3',dependencies:['pacote 5','pacote 11']},
        {name:'pacote 2',dependencies:['pacote 5']},
        {name:'pacote 1',dependencies:['pacote 4']}
      ]
      const rootNodes = ['pacote 1','pacote 2','pacote 3'];
  
      const expected_output = [
        'pacote 8',
        'pacote 9',
        'pacote 11',
        'pacote 10',
        'pacote 7',
        'pacote 6',
        'pacote 5',
        'pacote 4',
        'pacote 2',
        'pacote 3',
        'pacote 1'
      ];
  
      dependencySearch(DependencyTree.SEARCH_STRATEGY_2,modules,rootNodes).should.deep.equal(expected_output)
    })
  })
})