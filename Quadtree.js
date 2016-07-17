"use strict"
const FastMap = require('collections/fast-map');

module.exports = class QuadTree {
constructor(top,bottom,left,right, level,parent,positkey) {
this.top = top;
this.bottom = bottom;
this.left = left;
this.right = right;
this.quads = [];
this.nodes = new FastMap();
this.positionkey = (!positkey && parent.positionkey) ? parent.positionkey : positkey;

}
doesFit(position) {
  var x = position.x;
  var y = position.y;
  if (x < this.left) return false;
  if (x >= this.right) return false;
  if (y < this.bottom) return false;
  if (y >= this.top) return false;
  return true;
  
}
doesFitBox(box) {
  var top = box.top
  var bottom = box.bottom
  var left = box.left
  var right = box.right
  if (box.top >= this.top) return false;
  if (box.bottom < this.bottom) return false;
  if (box.left >= this.left) return false;
  if (box.right < this.right) return false;
  return true;
}
getQuad(node,box) {
  
  if (box) {
    if (this.doesFitBox(box)) {
    var quad = this;
    var prevquad = [];
    for (;0==0;) {
      if (!quad) return false;
      if (quad.quads.length <= 0) return quad;
      prevquad = quad;
      for (var i in quad.quads) {
      if (quad.quads[i].doesFitBox(box)) {
        quad = quad.quads[i];
        
        
      }  
        
        
      }
      if (quad == prevquad) return prevquad;
    }
    } else return false;
  } else {
    if (!node[this.positionkey]) return false;
  if (this.doesFit(node[this.positionkey])) {
    var quad = this;
    for (;1==1;) {
      if (!quad) return false;
      if (quad.quads.length <= 0) return quad;
      for (var i in quad.quads) {
        
        if (quad.quads[i].doesFit(node[this.positionkey])) quad = quad.quads[i];
        
      }
    }
  } else return false;
  
  }
}




}
