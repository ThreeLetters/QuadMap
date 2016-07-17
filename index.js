
var QuadTree = require('./Quadtree.js');

module.exports = class QuadTreeMap {
  constructor(top,bottom,left,right) {
    this.top = top;
    this.bottom = bottom;
    this.left = left;
    this.right = right;
    this.positionkey = "position";
    this.quadtree = new QuadTree();
  }
  get(key) {
    
    
  }
  set(key,data) {
    
    
  }
  forEach(callback) {
    
    
  }
  every(callback) {
    
    
  }
  keys() {
    
    return this.quadtree.keys();
  }
  getQuad(node) {
   return this.quadtree.getQuad(node)
    
  }
  setPosVar(var) {
    return this.positionkey = var;
    
  }
  reSort() {
    this.quadtree.reSort();
  }
  changeBorders(top,bottom,left,right) {
    this.top = top;
    this.bottom = bottom;
    this.left = left;
    this.right = right;
    this.quadtree.reSort();
  }
  
  
  
}
