/**
 * Name: Chad Toomer
 * SID: @0220965969
 * Credit to: Shane Olliver and Yasmin Senior
 * Credit to: softnami.com "Trie Tree with JavaScript" (2020)
 * Credit to: GeeksforGeeks.com "Boggle (Find all possible words in a board
 * of characters) | Set 1" (2020)
 * Credit to: Professor Burge 
 * 
 *
 * Given a Boggle board and a dictionary, returns a list of available words in
 * the dictionary present inside of the Boggle board.
 * @param {string[][]} grid - The Boggle game board.
 * @param {string[]} dictionary - The list of available words.
 * @returns {string[]} solutions - Possible solutions to the Boggle board.
 */
exports.findAllSolutions = function(grid, dictionary) {
  let solutions = [];
  if (grid == null || dictionary == null){
    return solutions;
  }
  
  let new_gridlen = grid.length;
  for (let i=0; i<new_gridlen; i++){
    if (grid[i].length != new_gridlen){
      return solutions;
    }
  }
  convertToLowerCase(grid, dictionary); //jump to function below via local call
  
  if (!isTheGridValid(grid)){
    return solutions;
  }
  
  let new_solution = new Set();
  let hash = createHashMap(dictionary); //you may also use a trie tree
  
  for (let y=0; y<new_gridlen; y++){
    for (let x=0; x<new_gridlen; x++){
      let new_word = "";
      let visited = new Array(new_gridlen).fill(false).map(() => new Array(new_gridlen).fill(false));
      findWordsInGrid(new_word, y, x, grid, visited, hash, new_solution) //recursive function call
    }
  }
  solutions = Array.from(new_solution);
  
  return solutions;
  
   function convertToLowerCase(grid, dictionary){
     for (let i=0; i<grid.length; i++){
       for(let j=0; j<grid[i].length; j++){
         grid[i][j] = grid[i][j].toLowerCase();
       }
     }
     
     for (let i=0; i<dictionary.length; i++){
       dictionary[i] = dictionary[i].toLowerCase();
    }
  }
  
  function isTheGridValid(grid){
    searchfor = /(st|qu) | [a-prt-z]/;
    for (let i=0; i < grid.length; i++){
      for (let j=0; j<grid[i].length; j++){
        if(!grid[i][j].match(searchfor)){
          return solutions;
        }
      }
    }
    return grid;
  } 
  
  function findWordsInGrid(new_word, y, x, grid, visited, hash, new_solution){
    let adjMatrix = [[-1,-1], [-1,0], [-1,1], [0,1], [1,1], [1,0], [1, -1], [0, -1]];
    
    if (y<0 || x<0 || y>=grid.length || x>=grid.length || visited[y][x] == true){
      return;
    }
    
    new_word += grid[y][x];
    
    if (isPrefix(new_word, hash)){
      visited[y][x] = true;
      
      if (isWord(new_word, hash)){
        if (new_word.length >= 3){
          new_solution.add(new_word);
        }
      }
      
      for (let i=0; i<8; i++){
      findWordsInGrid(new_word, y + adjMatrix[i][0], x + adjMatrix[i][1], grid, visited, hash, new_solution);
      } 
   }
    
    visited[y][x] = false;
  
  }
  
  
  function isPrefix(new_word, hash){
    return hash[new_word] != undefined;
  }
  
  function isWord(new_word, hash){
    return hash[new_word] == 1;
  }
  
  
  function createHashMap(dictionary){
    var hashdict = {};
    for (let i=0; i<dictionary.length; i++){
      hashdict[dictionary[i]] = 1;
      let wordlength = dictionary[i].length;
      var hashstr = dictionary[i];
      for (let j=wordlength; wordlength > 1; wordlength--){
        hashstr = hashstr.substr(0, wordlength-1);
        if (hashstr in hashdict){
          if (hashstr == 1){
            hashdict[hashstr] = 1;
          }
        }
        else{
          hashdict[hashstr] = 0;
        }
      }
    }
    return hashdict;
  }
  
} 


var grid = [['T', 'W', 'Y', 'R'],
              ['E', 'N', 'P', 'H'],
              ['G', 'Z', 'Qu', 'R'],
              ['O', 'N', 'T', 'A']];

var dictionary = ['art', 'ego', 'gent', 'get', 'net', 'new', 'newt', 'prat',
                    'pry', 'qua', 'quart', 'quartz', 'rat', 'tar', 'tarp',
                    'ten', 'went', 'wet', 'arty', 'egg', 'not', 'quar'];

console.log("These words were found in the boggle grid\n");

console.log(exports.findAllSolutions(grid, dictionary));
