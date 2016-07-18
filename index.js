"use strict"
var QuadTree = require('./Quadtree.js');

module.exports = class QuadTreeMap {
  constructor(top,bottom,left,right) {
    this.top = top;
    this.bottom = bottom;
    this.left = left;
    this.right = right;
    
    this.config = {
      maxQuad: 12,
      positionkey: "position",
      useQuad: true,
    }
    this.quadtree = new QuadTree(top,bottom,left,right,0,false,0,this.config);
  }
  get(key) {
    
    
  }
  setPower(state) {
    this.useQuad = state
  }
  setMaxBound(numb) {
    this.config.maxQuad = numb;
  }
  set(key,data) {
    this.quadtree.setNode(key,data)
    
  }
  forEach(callback) {
    return this.quadtree.allNodes.forEach(callback);
    
  }
  every(callback) {
    return this.quadtree.allNodes.forEach(callback)
    
  }
  keys() {
    
    return this.quadtree.allNodes.keys();
  }
  getQuadBox(box) {
    return this.quadtree.getQuad(null,box)
  }
  getQuad(node) {
   return this.quadtree.getQuad(node)
    
  }
  setPosVar(va) {
    return this.config.positionkey = va;
    
  }
  reSort() {
    this.quadtree.reSort();
  }
  changeBorders(top,bottom,left,right) {
    this.top = top;
    this.bottom = bottom;
    this.left = left;
    this.right = right;
    this.quadtree.resize(top,bottom,left,right);
  }
  
  
  
}
