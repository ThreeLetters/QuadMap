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
 return quad.setnode(id,node);
}
getAveragePoint(nodes) {
  var xs = 0;
  var ys = 0;
  nodes.forEach((node)=>{
   var pos = node.node[this.positionkey]
    xs += pos.x;
    ys += pos.y;
  })
  return {x: Math.round(xs/2), y: Math.round(ys/2)};
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
compile(node) {
  return {
    QTree: false,
    node: node,
    compiled: true,
  };
}
setnode(id,node) {
  if (this.nodes.length + this.quads.length >= 4) {
    
    var newq = this.createQuadAtPoint(this.getAveragePoint(this.nodes));
    if (!newq) return false;
    this.quads.push(newq);
    if (node.compiled)
      newq.seto(id,node); else
    newq.setn(id,node);
    this.nodes.forEach((node)=>{if (newq.doesFit(node.node[newq.positionkey])) this.relocate(id,node,quad)});
    return newq;
  } else {
    if (node.compiled) 
      this.seto(id,node);
    else
  this.setn(id,node);
  return this;
  }
}
seto(id,node) {
  if (node.QTree) {
    node.QTree.nodes.delete(id);
  }
  node.QTree = this;
  this.nodes.set(id,node);
}
setn(id,node) {
  return this.nodes.set(id,this.compile(node,this));
}
relocate(id,node,quad) {
  this.nodes.delete(id);
 return quad.setnode(id,node);
}
hasItem(id) {
  return this.nodes.has(id);
}

updatePos(id) {
  if (this.level != 0) return false;
 var node = this.allnodes.get(id);
 if (!node) return false;
    var quad = this.getQuad(node);
    
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
