var chai = require('chai'); 
var dependencySearch = require('../src/algorithm-1');
chai.should();

describe('Algorithm 1',async()=>{
  it('Deve retornar a ordem correta',async function(){
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

    dependencySearch(modules,rootNodes).should.deep.equal(expected_output)
  })
})