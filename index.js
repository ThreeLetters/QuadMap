"use strict";
/*
 Copyright 2016 Andrew S

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
   */
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
  return this.quadtree.setNode(key,data)
    
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
   return this.quadtree.reSort();
  }
  changeBorders(top,bottom,left,right) {
    this.top = top;
    this.bottom = bottom;
    this.left = left;
    this.right = right;
  return this.quadtree.resize(top,bottom,left,right);
  }
  
  
  
}
