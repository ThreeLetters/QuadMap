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
const FastMap = require('collections/fast-map');

var QTree = class QuadTree {
constructor(top,bottom,left,right, level,parent,numb,config) {
this.top = top;
this.bottom = bottom;
this.numb = numb;
this.left = left;
this.right = right;
this.quads = new FastMap();
this.nodes = new FastMap();
this.config = config;
this.allnodes = new FastMap();
this.allNodes = new FastMap();
}
get(id) {
 if (this.level == 0) return this.allnodes.get(id)
 return this.nodes.get(id);
}
set(id,node) {
 return this.setNode(id,node)
}
getNodes(progressive,keep) {
  var final = new FastMap();
  if (progressive) {
   if (this.level == 0) {
    if (keep) final = this.allnodes; else final = this.allNodes;
    return final;
    
    
   }
   if (keep) final = this.walk(); else this.walk().forEach((node,id)=>{
final.set(id,node.node);
});
return final;
  } else {
   if (keep) final = this.nodes; else this.nodes.forEach((node,id)=>{
final.set(id,node.node);
});
return final;
   
  }
  
}
walk() {
var list = this.nodes;
this.quads.forEach((quad)=>{
list.concat(quad.walk())
});


return list;
}
getInnQuads(result) {
  this.nodes.forEach((node)=>{
    result.set(id,node)
    
  })
  this.quads.forEach((quad)=>{
    quad.getInnQuads(result)
    
    
  })
  
}
setNode(id,node) {
  var compiled = false;
  if (this.level == 0) {
    compiled = this.compile(node,this);
    this.allnodes.set(id,compiled);
    this.allNodes.set(id,node);
    if (!this.config.useQuad) return;
  }
  var quad = this.getQuad(node)
  if (compiled) node = compiled;
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
   var pos = node.node[this.config.positionkey]
  list.push(test(pos));
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
  var newq = new QTree(quad.top,quad.bottom,quad.left,quad.right,this.level + 1,this,quad.numb,this.config);
  return newq;
}
resize(top,bottom,left,right) {
  this.top = top;
  this.bottom = bottom;
  this.left = left;
  this.right = right;
  
this.reSort();
}
reSort() {
  this.clear(true);
  this.allnodes.forEach((node,id)=>{this.setNode(id,node)});
}
clear(c) {
  this.quads.clear();
  this.nodes.clear();
  this.allnodes.forEach((node)=>{node.QTree = this;});
  if (!c) this.allnodes.clear();
}
compile(node,qtree) {
  return {
    QTree: qtree,
    node: node,
    compiled: true,
  };
}
setnode(id,node) {
  if (this.nodes.length + this.quads.length >= 4 && this.level < this.config.maxQuad) {
    
    var newq = this.createQuad(this.getAverageQuad(this.nodes));
    if (!newq) return false;
    this.quads.set(newq.numb,newq);
    if (node.compiled)
      newq.seto(id,node); else
    newq.setn(id,node);
    this.nodes.forEach((node)=>{if (newq.doesFit(node.node[newq.positionkey])) this.relocate(id,node,quad)});
    this.checkForOthers()
    return newq;
  } else {
    if (node.compiled) 
      this.seto(id,node);
    else
  this.setn(id,node);
  this.checkForOthers();
  return this;
  }
}
destroy() {
  
  this.nodes.forEach((node,id)=>{
    this.parent.setNode(id,node);
    
  })
  this.parent.destroyQuad(this.numb);
}
delete(id) {
 return this.deleteNode(id);
}
deleteNode(id) {
  if (this.level != 0) {
    this.parent.deleteNode(id);
    return;
  }
  this.removeNode(id,true);
  
  
}
removeNode(id,progressive) {
  if (this.level == 0) {
    this.allnodes.delete(id);
   this.allNodes.delete(id);
  }
  this.nodes.delete(id);
 
  checkForRemoval();
  if (progressive) {
    this.quads.forEach((quad)=>{quad.removeNode(id,true)});
  } 
}
destroyQuadNumb(num) {
  this.quads.delete(num);
  
}
checkForRemoval() {
  var check = function() {
   if (this.parent.nodes.length + this.parent.quads.length + this.nodes.length - 1 <= 4 && this.quads.length <= 0 && this.level != 0) {
      this.destroy()
      return;
    }
  }
  check();
}
checkForOthers() {
  var check = function() {
   
  if (this.nodes.length + this.quads.length <= 4 || this.level < this.config.maxQuad) return true; 
   var newq = this.createQuad(this.getAverageQuad(this.nodes));
   this.quads.set(newq.numb,newq);
    this.nodes.forEach((node)=>{if (newq.doesFit(node.node[newq.positionkey])) this.relocate(id,node,quad)});
 
  if (this.nodes.length + this.quads.length > 4) check();
  }
}
seto(id,node) {
  if (node.QTree) {
    node.QTree.removeNode(id);
  }
  node.QTree = this;
  this.nodes.set(id,node);
}
stmasit(id,com) {
  if (!this.parent && this.level != 0) return false;
  if (!this.parent && this.level == 0) {
    this.allnodes.set(id,com);
    
  }
  
  this.parent.stmasit(id,com);
}
setn(id,node) {
 var co = this.compile(node,this)
  if (this.level != 0) this.stmasit(co); else this.allnodes.set(id,co);
  
  return this.nodes.set(id,co);
}
relocate(id,node,quad) {
  this.removeNode(id);
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
    node.QTree.relocate(id,node,quad);
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
getquad(pos) {
 var quad = [];
 if (!this.doesFit(pos)) return false;
 this.quads.forEach((quad)=>{
  var aquad = quad.getquad(pos)
  if (aquad) return aquad
 })
 return this;
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
      if (quada.doesFitBox(box)) {
        quad = quada;
        
        
      }  
        
        
      });
      if (quad == prevquad) return prevquad;
    }
    } else return false;
  } else {
    if (node.compiled) node = node.node;
  return this.getquad(node[this.config.positionkey]);
  
  }
}




}
module.exports = QTree;
