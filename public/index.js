mocha.setup('bdd');
var expect = chai.expect;

function getNeighbours(x, y) {
  return [
    { x: x - 1, y: y - 1 }, { x, y: y - 1 }, { x: x + 1, y: y - 1 },
    { x: x - 1, y }, { x: x + 1, y },
    { x: x - 1, y: y + 1 }, { x, y: y + 1 }, { x: x + 1, y: y + 1 }
  ];
}

function getLivingNeighbours(livingCells, x, y) {
  const neighbours = getNeighbours(x, y);
  return livingCells.filter(cell => neighbours.some(n => n.x === cell.x && n.y === cell.y));
}

function getDeadNeighbours(livingCells, x, y) {
  const neighbours = getNeighbours(x, y);
  return livingCells.filter(cell => neighbours.some(n => n.x !== cell.x || n.y !== cell.y));
}

function willDie(livingCells, x, y) {
  const livingNeighbours = getLivingNeighbours(livingCells, x, y);
  return !([2, 3].includes(livingNeighbours.length));
}

function willBecomeAlive(livingCells, x, y) {
  const livingNeighbours = getLivingNeighbours(livingCells, x, y);

  return [3].includes(livingNeighbours.length);
}

describe('Game of life', function() {
  it('contains spec with an expectation', function() {
    expect(true).to.equal(true);
  });

  it('should return number of neighbours equal to 8 ', function() {
    expect(getNeighbours(1, 1).length).to.equal(8);
  });

  it('should return number of living neighbours equal to 2', function() {
    const livingCells = [
      {x: 0, y: 0},
      {x: 1, y: 1},
      {x: 5, y: 6},
    ];

    expect(getLivingNeighbours(livingCells, 1, 0).length).to.equal(2);
  });

  it('should return that cell will die as he have less than 2 or more than 3 neighbours', function() {
    const livingCells = [
      {x: 0, y: 0},
      {x: 5, y: 6},
    ];

    expect(willDie(livingCells, 1, 0)).to.be.true;
  });

  it('should return that cell will become alive if he has 3 alive neighbours', function() {
    const livingCells = [
      {x: 0, y: 0},
      {x: 1, y: 0},
      {x: 0, y: 1},
      {x: 5, y: 6},
    ];

    expect(willBecomeAlive(livingCells, 1, 1)).to.be.true;
  });
});

mocha.run();
nextLivingCells = []
const livingCells = [
  {x: 0, y: 0},
  {x: 1, y: 0},
  {x: 0, y: 1},
  {x: 5, y: 6},
];
nextLivingCells = [...nextLivingCells, livingCells.filter(c => !willDie(livingCells, c.x, c.y))];
