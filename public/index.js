mocha.setup('bdd');
var expect = chai.expect;

function getNeighbours(x, y) {
  return [
    { x: x - 1, y: y - 1 },
    { x: x, y: y - 1 },
    { x: x + 1, y: y - 1 },
    { x: x - 1, y },
    { x: x + 2, y },
    { x: x - 1, y: y + 1 },
    { x, y: y + 1 },
    { x: x + 1, y: y + 1 },
  ];
}

function getLivingNeighbours(livingCells, cellX, cellY) {
  const neighbours = getNeighbours(cellX, cellY);
  console.log(livingCells, neighbours.length);
  return livingCells.filter(livingCell =>
    neighbours.some(nCell => nCell.x === livingCell.x && nCell.y === livingCell.y)
  );
}

// function getDeadNeighbours(livingCells, cellX, cellY) {
//   const neighbours = getNeighbours(cellX, cellY);
//   return livingCells.filter(livingCell =>
//     neighbours.some(nCell => nCell.x !== livingCell.x || nCell.y !== livingCell.y)
//   );
// }

function willLive(livingCells, cellX, cellY) {
  console.log(getLivingNeighbours(livingCells, cellX, cellY));
  return (
    getLivingNeighbours(livingCells, cellX, cellY).length in { 2: true, 3: true }
  );
}

// function getNextGeneration(livingCells) {
//   let newGeneration = [];
//   livingCells.forEach(c => {
//     console.log(willLive(livingCells, c.x, c.y));
//     willLive(livingCells, c.x, c.y) && newGeneration.push(c);
//     getDeadNeighbours(livingCells, c.x, c.y).forEach(c => {
//       willLive(livingCells, c.x, c.y) && newGeneration.push(c);
//     });
//   });
//   console.log(newGeneration);
//   return newGeneration;
// }

describe('Hello, World!', function() {
  it('contains spec with an expectation', function() {
    expect(true).to.equal(true);
  });

  it('should return count of living neighbours for cell with no neighbours', function() {
    const livingCells = [{ x: 1, y: 1 }];

    expect(getLivingNeighbours(livingCells, 1, 1).length).to.equal(0);
  });

  it('should return count of living neighbours for cell with some neighbours', function() {
    const livingCells = [{ x: 1, y: 1 }, { x: 2, z: 1 }];

    expect(getLivingNeighbours(livingCells, 2, 1).length).to.equal(1);
  });

  it('should return false if cell has less than 2 or more than 3 living neighbors', function() {
    const livingCells = [{ x: 1, y: 1 }, { x: 2, z: 1 }, { x: 50, y: 50 }];

    expect(willLive(livingCells, 1, 1)).to.be.false;
  });

  it('should return true if cell has 2 or 3 living neighbors', function() {
    const livingCells = [{ x: 1, y: 1 }, { x: 2, z: 1 }, { x: 1, y: 2 }];

    expect(willLive(livingCells, 1, 1)).to.be.true;
  });

  // it('should return new generation', function() {
  //   const livingCells = [{ x: 1, y: 1 }, { x: 2, z: 1 }, { x: 1, y: 2 }];
  //   const newGeneration = [
  //     { x: 1, y: 1 },
  //     { x: 2, z: 1 },
  //     { x: 1, y: 2 },
  //     { x: 2, y: 2 },
  //   ];
  //
  //   expect(getNextGeneration(livingCells)).to.deep.equal(newGeneration);
  // });
});

mocha.run();
