mocha.setup('bdd');
var expect = chai.expect;

function neighbourCoordinates(x, y) {
  return [
    { x: x - 1, y: y - 1 },
    { x: x, y: y - 1 },
    { x: x + 1, y: y - 1 },

    { x: x - 1, y: y },
    { x: x + 1, y: y },

    { x: x - 1, y: y + 1 },
    { x: x, y: y + 1 },
    { x: x + 1, y: y + 1 },
  ];
}

function numberOfLivingNeighbours(livingCells, x, y) {
  const coordinates = neighbourCoordinates(x, y);
  const neighbourLivingCells = livingCells.filter(cell =>
    coordinates.some(c => c.x === cell.x && c.y === cell.y)
  );
  return neighbourLivingCells.length;
}

function shouldLive(livingCells, x, y, isLiving) {
  const livingNeighbourCount = numberOfLivingNeighbours(livingCells, x, y);

  if (livingNeighbourCount > 3 || livingNeighbourCount < 2) {
    return false;
  }

  return true;
}

// x For each coordinate
// x Get neighbours
// x Figure out which of them are alive
// x Count how mant are alive
// Apply rules

describe('Game of Life', function() {
  describe('neighbourCoordinates', function() {
    it('returns a number of living neighbours for given cell', function() {
      var coordinates = neighbourCoordinates(2, 2);
      expect(coordinates.length).to.equal(8);

      expect(
        coordinates.some(coordinate => coordinate.x === 1 && coordinate.y === 2)
      ).to.be.true;

      expect(
        coordinates.some(coordinate => coordinate.x === 4 && coordinate.y === 2)
      ).to.be.false;
    });
  });

  describe('numberOfLivingNeighbours', function() {
    it('returns a number of living neighbours for given cell', function() {
      expect(numberOfLivingNeighbours([], 1, 1)).to.equal(0);

      const livingCells = [{ x: 3, y: 5 }, { x: 4, y: 4 }, { x: 100, y: 200 }];
      expect(numberOfLivingNeighbours(livingCells, 3, 4)).to.equal(2);
    });
  });

  describe('GOL rules', function() {
    it('#1 Any live cell with fewer than two live neighbours dies, as if caused by underpopulation', function() {
      const livingCells = [{ x: 3, y: 5 }, { x: 4, y: 4 }, { x: 100, y: 200 }];
      expect(shouldLive(livingCells, 50, 50), true).to.equal(false);
    });

    it('#2 Any live cell with two or three live neighbours lives on to the next generation.', function() {
      const livingCells = [{ x: 3, y: 5 }, { x: 4, y: 4 }, { x: 100, y: 200 }];
      expect(shouldLive(livingCells, 4, 5), true).to.equal(true);
    });

    it('#3 Any live cell with more than three live neighbours dies, as if by overpopulation.', function() {
      const livingCells = [
        { x: 3, y: 5 },
        { x: 4, y: 4 },
        { x: 5, y: 4 },
        { x: 5, y: 5 },
      ];
      expect(shouldLive(livingCells, 4, 5), true).to.equal(false);
    });

    it('#4 Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.', function() {
      const livingCells = [{ x: 3, y: 5 }, { x: 4, y: 4 }, { x: 4, y: 4 }];
      expect(shouldLive(livingCells, 4, 5), false).to.equal(true);
    });
  });
});

mocha.run();
