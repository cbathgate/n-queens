/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(n) {
  if (n === 1) {
    return [[1]];
  }

  var solution = new Board({n: n});
  var blankArray = solution.rows()[0].slice();
  var result = [];
  
  var createTree = function(matrix) {
    var newNode = new Board(matrix);
    var setArray = blankArray.slice();

    for (var row = 0; row < newNode.rows().length; row++) {
      for (var col = 0; col < newNode.rows().length; col++) {
        var test = newNode.rows();
        test[row][col] = 1;
        test = new Board(test);
        
        if (!test.hasRowConflictAt(row) && !test.hasColConflictAt(col)) {
          setArray[col] = 1;
          newNode.set(row, setArray);
          result = newNode;
          return createTree(newNode.rows());
        } else {
          return;
        }
      }
    }
    // return matrix;
  };

  createTree(solution.rows());
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return result;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
