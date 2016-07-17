"use strict"
const FastMap = require('collections/fast-map');

var QTree = class QuadTree {
constructor(top,bottom,left,right, level,parent,numb,positkey) {
this.top = top;
this.bottom = bottom;
this.numb = numb;
this.left = left;
this.right = right;
this.quads = new FastMap();
this.nodes = new FastMap();
this.allnodes = new FastMap();
this.positionkey = (!positkey && parent.positionkey) ? parent.positionkey : positkey;

}
getNodes() {
  
  
}
setNode(id,node) {
  if (this.level == 0) this.allnodes.set(id,node);
  var quad = this.getQuad(node)
 return quad.setnode(id,node);
}
getAverageQuad(nodes) {
 var mode = function(array)
{
    if(array.length == 0)
    	return null;
    var modeMap = {};
    var maxEl = array[0], maxCount = 1;
    for(var i = 0; i < array.length; i++)
    {
    	var el = array[i];
    	if(modeMap[el] == null)
    		modeMap[el] = 1;
    	else
    		modeMap[el]++;	
    	if(modeMap[el] > maxCount)
    	{
    		maxEl = el;
    		maxCount = modeMap[el];
    	}
    }
    return maxEl;
}
  var test = function(pos) {
    
  
   var vert = Math.floor((this.left + this.right) / 2);
  var hor = Math.floor((this.top + this.bottom) / 2)
    if (pos.x >= vert && pos.y >= hor) return 1;
      if (pos.x < vert && pos.y >= hor) return 2;
      if (pos.x < vert && pos.y < hor) return 3;
      if (pos.x >= vert && pos.y < hor) return 4;
    return false;
    
  }
  var list = [];
  nodes.forEach((node)=>{
   var pos = node.node[this.positionkey]
  list.push(test(pos))c;
  });
  
  return mode(list); 
}
createQuad(number) {
  var test = function(pos) {
  var quadholder = class quadholder{
    constructor(top,bottom,left,right,numb) {
this.top = top;
this.numb = numb;
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
  var one = new quadholder(this.top,hor,vert,this.right,1);
  if (number == 1) return one;
  var one = new quadholder(this.top,hor,this.left,vert,2);
 if (number == 2) return one;
  var one = new quadholder(hor,this.bottom,this.left,vert,3);
 if (number == 3) return one;
  var one = new quadholder(hor,this.bottom,vert,this.right,4);
 if (number == 4) return one;
  return false;
  }
  var quad = test(pos);
  if (!quad || this.quads.has(quad.numb)) return false;
  var newq = new QTree(quad.top,quad.bottom,quad.left,quad.right,this.level + 1,this,quad.numb);
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
    
    var newq = this.createQuad(this.getAverageQuad(this.nodes));
    if (!newq) return false;
    this.quads.set(newq.numb,newq);
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
check() {
  if (this.nodes.length + this.quads.length <= 4) return true; 
   var newq = this.createQuad(this.getAverageQuad(this.nodes));

  
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
      quad.quads.forEach((quada)=>{
      if (quada].doesFitBox(box)) {
        quad = quada;
        
        
      }  
        
        
      });
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
     quad.quads.forEach((quada)=>{
        
        if (quada.doesFit(node[this.positionkey])) quad = quada;
        
      });
    }
  } else return false;
  
  }
}




}
module.exports = QTree;
