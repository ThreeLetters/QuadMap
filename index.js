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

module.exports = class QuadMap {
  constructor(top,bottom,left,right) {
    this.top = top;
    this.bottom = bottom;
    this.left = left;
    this.right = right;
    this["length"] = 0;
    this.config = {
      maxQuad: 12,
      positionkey: "position",
      useQuad: true,
      test: false,
      quadv: false,
      main: this,
    }
    this.quadtree = new QuadTree(top,bottom,left,right,0,false,0,this.config);
    this.interval = setInterval(function () {
     this.quadtree.update();
    }.bind(this),700);
    this.nodeint = setInterval(function() {
     
     this.quadtree.nodeInt()
    }.bind(this),500)
  }
  some(c) {
 return this.quadtree.allNodes.some(c)
}
  setQuadVar(a) {
   this.config.quadv = a;
  }
  update() {
   this.quadtree.update();
   
  }
  nodeInt() {
   this.quadtree.nodeInt();
  }
  addVar(a) {
   var bad = [
    "quadtree",
    "top",
    "bottom",
    "left",
    "right",
    "length",
    "config",
   "interval",
    "nodeint",
    "numb",
    "level",
    "parent",
    "quads",
    "nodes",
    "allnodes",
    "allNodes",
    "vars"
   ]
   if (bad.indexOf(a) != -1) 
    throw "INVALID: " + a + " is not a valid var name. It is in the list of prohibited names";
   
   this.quadtree.addVar(a);
   this[a] = this.quadtree[a];
  }
  deleteVar(a) {
   var bad = [
    "quadtree",
    "top",
    "bottom",
    "left",
    "right",
    "length",
    "config",
   "interval",
    "nodeint",
    "numb",
    "level",
    "parent",
    "quads",
    "nodes",
    "allnodes",
    "allNodes",
    "vars"
   ]
   if (bad.indexOf(a) != -1) 
    throw "INVALID: " + a + " is not a valid var name. It is in the list of prohibited names";
   this[a] = null;
   this.quadtree.deleteVar(a)
  }
  setTest(test) {
   this.config.test = test;
  }
  clearNodeInt() {
   try {
   clearInterval(this.nodeint);
   return true
   } catch (e) {
    return false
   }
   
  }
  setNodeIntTime(time) {
   clearInterval(this.nodeint)
   this.nodeint = setInterval(function() {
     
     this.quadtree.nodeInt()
    }.bind(this),time)
   
  }
  setIntTime(time) {
   clearInterval(this.interval);
    this.interval = setInterval(function () {
     this.quadtree.update();
    }.bind(this),time);
  }
  get(key) {
    return this.quadtree.get(key);
    
  }
  toArray() {

return this.quadtree.allNodes.toArray();
}
delete(id) {

return this.quadtree.delete(id);

}
clear(a) {
return this.quadtree.clear(a)


}

  updatePos(id) {
   return this.quadtree.updatePos(id);
  }
  getNodes(progres,keep) {
   return this.quadtree.getNodes(progres,keep);
   
  }
  updateAllPos() {
   this.quadtree.allnodes.keys().forEach((key)=>{
    this.updatePos(key);
   })
   
  }
  useQuad(state) {
    this.useQuad = state
  }
  setMaxLevel(numb) {
    this.config.maxQuad = numb;
  }
  set(key,data) {
  return this.quadtree.setNode(key,data)
    
  }
  forEach(callback) {
    return this.quadtree.allNodes.forEach(callback);
    
  }
  every(callback) {
    return this.quadtree.allNodes.every(callback)
    
  }
  keys() {
    
    return this.quadtree.allNodes.keys();
  }
  getQuadBox(box) {
    return this.quadtree.getQuad(null,box)
  }
  getQuad(pos) {
   return this.quadtree.getQuad(pos)
    
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
