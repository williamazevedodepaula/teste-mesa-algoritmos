var chai = require('chai');
var dijkstra = require('../src/algorithm-2');
chai.should();

describe('Algorithm 2', async () => {

  it('Deve realizar a busca utilizando Dijkstra - cenário 1', async function () {
    const matrizAdjacencia = [
      [ -1,  2, -1, -1,  3, -1, -1, -1 ],
      [  2, -1, -1,  8, -1,  9,  6, -1 ],
      [ -1, -1, -1, -1, -1,  3,  7, -1 ],
      [ -1,  8, -1, -1, -1, -1, -1,  6 ],
      [  3, -1, -1, -1, -1, -1,  5,  9 ],
      [ -1,  9,  3, -1, -1, -1,  4,  5 ],
      [ -1,  6,  7, -1,  5,  4, -1, -1 ],
      [ -1, -1, -1,  6,  9,  5, -1, -1 ],
    ];

    const expectedResult = [
      {vertex:0,distance:0, path:'0'},
      {vertex:1,distance:2, path:'0-1'},
      {vertex:2,distance:14,path:'0-1-5-2'},
      {vertex:3,distance:10,path:'0-1-3'},
      {vertex:4,distance:3 ,path:'0-4'},
      {vertex:5,distance:11,path:'0-1-5'},
      {vertex:6,distance:8 ,path:'0-1-6'},
      {vertex:7,distance:12,path:'0-4-7'},
    ]

    dijkstra(matrizAdjacencia,0).should.deep.equal(expectedResult);
  });


  it('Deve realizar a busca utilizando Dijkstra iniciando de outro nó - cenário 2', async function () {
    const matrizAdjacencia = [
      [ -1,  2, -1, -1,  3, -1, -1, -1 ],
      [  2, -1, -1,  8, -1,  9,  6, -1 ],
      [ -1, -1, -1, -1, -1,  3,  7, -1 ],
      [ -1,  8, -1, -1, -1, -1, -1,  6 ],
      [  3, -1, -1, -1, -1, -1,  5,  9 ],
      [ -1,  9,  3, -1, -1, -1,  4,  5 ],
      [ -1,  6,  7, -1,  5,  4, -1, -1 ],
      [ -1, -1, -1,  6,  9,  5, -1, -1 ],
    ];

    const expectedResult = [
      {vertex:0,distance:14, path:'2-5-1-0'},
      {vertex:1,distance:12, path:'2-5-1'},
      {vertex:2,distance:0,path:'2'},
      {vertex:3,distance:14,path:'2-5-7-3'},
      {vertex:4,distance:12 ,path:'2-6-4'},
      {vertex:5,distance:3,path:'2-5'},
      {vertex:6,distance:7 ,path:'2-6'},
      {vertex:7,distance:8,path:'2-5-7'},
    ]

    dijkstra(matrizAdjacencia,2).should.deep.equal(expectedResult);
  });

})