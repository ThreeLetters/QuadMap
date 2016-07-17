"use strict"
const FastMap = require('collections/fast-map');

var QTree = class QuadTree {
constructor(top,bottom,left,right, level,parent,positkey) {
this.top = top;
this.bottom = bottom;
this.left = left;
this.right = right;
this.quads = [];
this.nodes = new FastMap();
this.allnodes = new FastMap();
this.positionkey = (!positkey && parent.positionkey) ? parent.positionkey : positkey;

}
setNode(id,node) {
  if (this.level == 0) this.allnodes.set(id,node);
  var quad = this.getQuad(node)
  quad.setnode(id,node);
}
createQuadAtPoint(pos) {
  var test = function(pos) {
  var quadholder = class quadholder{
    constructor(top,bottom,left,right) {
this.top = top;
this.bottom = bottom;
this.left = left;
this.right = right;
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
  }
  
  var vert = Math.floor((this.left + this.right) / 2);
  var hor = Math.floor((this.top + this.bottom) / 2)
  var one = new quadholder(this.top,hor,vert,this.right);
  if (one.doesFit(pos)) return one;
  var one = new quadholder(this.top,hor,this.left,vert);
  if (one.doesFit(pos)) return one;
  var one = new quadholder(hor,this.bottom,this.left,vert);
  if (one.doesFit(pos)) return one;
  var one = new quadholder(hor,this.bottom,vert,this.right);
  if (one.doesFit(pos)) return one;
  return false;
  }
  var quad = test(pos);
  if (!quad) return false;
  var newq = new QTree(quad.top,quad.bottom,quad,left,quad.right,this.level + 1,this);
  return newq;
}
setnode(id,node) {
  if (this.nodes.length + this.quads.length >= 4) {
    var newq = this.createQuadAtPoint(node[this.positionkey].x)
    if (!newq) return false;
    this.quads.push(newq);
    newq.nodes.set(id,node);
    this.reSort();
  } else {
  
  this.nodes.set(id,node);
  }
}
reSort() {
  
  
  
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
module.exports = QTree;
