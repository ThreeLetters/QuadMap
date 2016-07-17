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
getQuad(node,box) {
  if (!node[this.positionkey]) return false;
  this.doesFit(node[this.positionkey])
  
}




}
