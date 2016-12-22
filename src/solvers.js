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

var Tree = function(board) {
  this.value = board;
  this.children = [];
  this.size = board.rows().length;
};

Tree.prototype.countDistintLeaves = function() {
  var countObj = {};

  var storeLeaves = function(node) {
    if (node.children.length === 0) {
      var sum = 0;
      node.value.rows().forEach(function(array) {
        array.forEach(function(element) {
          if (element === 1) {
            sum++;
          }
        });
      });

      if (sum === node.size) {
        countObj[JSON.stringify(node.value.rows())] = 1;
      }
    } else {
      node.children.forEach(function(element) {
        return storeLeaves(element);
      });
    }
  };

  storeLeaves(this);
  console.log(countObj);
  return Object.keys(countObj).length;
};

window.findNRooksSolution = function(n) {
  if (n === 1) {
    return [[1]];
  }

  var solution = new Board({n: n});
  
  var createTree = function(matrix) {
    var newNode = new Board(matrix);
    var size = newNode.rows().length;

    for (var row = 0; row < size; row++) {
      for (var col = 0; col < size; col++) {
        if (newNode.rows()[row][col] === 0) {
          var test = newNode.rows()[row].slice();
          test[col] = 1;
          var testBoard = new Board(matrix);
          testBoard.set(row, test);
          
          if (!testBoard.hasRowConflictAt(row) && !testBoard.hasColConflictAt(col)) {
            return createTree(testBoard.rows());
          }
        }
      }
    }
    return matrix;
  };

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return createTree(solution.rows());
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var initialBoard = new Board({n: n});
  var treeRoot = new Tree(initialBoard);

  var createTree = function(node) {
    for (var row = 0; row < node.size; row++) {
      for (var col = 0; col < node.size; col++) {
        if (node.value.rows()[row][col] === 0) {
          var newBoard = new Board(node.value.rows());
          var rowCopy = node.value.rows()[row].slice();

          rowCopy[col] = 1;
          newBoard.set(row, rowCopy);

          if (!newBoard.hasAnyRowConflicts() && !newBoard.hasAnyColConflicts()) {
            var newTreeNode = new Tree(newBoard);
            node.children.push(newTreeNode);
            createTree(newTreeNode);
          }
        }
      }
    }
  };

  createTree(treeRoot);
  var solutionCount = treeRoot.countDistintLeaves();
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
  // var solutionCount = undefined; //fixme

  // console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  // return solutionCount;
  var initialBoard = new Board({n: n});
  var treeRoot = new Tree(initialBoard);

  var createTree = function(node) {
    for (var row = 0; row < node.size; row++) {
      for (var col = 0; col < node.size; col++) {
        if (node.value.rows()[row][col] === 0) {
          var newBoard = new Board(node.value.rows());
          var rowCopy = node.value.rows()[row].slice();

          rowCopy[col] = 1;
          newBoard.set(row, rowCopy);

          if (!newBoard.hasAnyRowConflicts() && !newBoard.hasAnyColConflicts() &&
            !newBoard.hasAnyMajorDiagonalConflicts() && !newBoard.hasAnyMinorDiagonalConflicts()) {
            var newTreeNode = new Tree(newBoard);
            node.children.push(newTreeNode);
            createTree(newTreeNode);
          }
        }
      }
    }
  };

  createTree(treeRoot);
  var solutionCount = treeRoot.countDistintLeaves();
  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
