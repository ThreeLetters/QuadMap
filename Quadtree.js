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
   const AdvFastMap = require('./AdvFastMap')
const FastMap = require('collections/fast-map');
const VarHolder = require('./VarHolder');
var QTree = class QuadTree {
constructor(top,bottom,left,right, level,parent,numb,config,vars) {
this.top = top;
this.bottom = bottom;
this.numb = numb;
this.level = level;
this.parent = parent;
this.left = left;
this.right = right;
this.quads = new FastMap();
this.nodes = new FastMap();
this.config = config;
this.allnodes = new FastMap();
this.allNodes = new FastMap();
this.vars = (vars) ? vars : [];
}

clearVar(a) {
 if (this.level != 0) this[a].clear()
 this.quads.forEach((quad)=>{
  quad.clearVar(a)
  
  
 })
 
}
deleteVar(a) {
 this.nodes.forEach((node)=>{
   var ind = node.vars.indexOf(a);
   if (ind != -1) node.vars.slice(ind,1);
 })
  var ind = this.vars.indexOf(a);
 if (ind != -1) this.vars.slice(ind,1);
 this[a] = null;
 this.quads.forEach((quad)=>{
  quad.deleteVar(a);
 })
}
addVar(a) {
 if (this.level == 0) var b = new VarHolder(this,a); else var b = new AdvFastMap(this,a);
 this[a] = b;
 this.vars.push(a)
 this.quads.forEach((quad)=>{
  quad.addVar(a);
  
 })
}
get(id) {
 if (this.level == 0) return this.allNodes.get(id)
 var node = this.nodes.get(id);
if (node) return node.node
return false;
}
set(id,node) {
 return this.setNode(id,node)
}
getQuadBox(box) {
    return this.getQuad(null,box)
  }
update() {
 this.quads.forEach((quad)=>{
  quad.update();
 });
 this.checkForCreation();
 this.checkForDeletion();
}
getNodes(progressive,keep) {
  var final = new FastMap();
  if (progressive) {
   if (this.level == 0) {
    if (keep) final = this.allnodes; else final = this.allNodes;
    return final;
    
    
   }
   final = this.walk(keep)
return final
  } else {
   if (keep) final = this.nodes; else this.nodes.forEach((node,id)=>{
final.set(id,node.node);
});
return final;
   
  }
  
}
walk(keep) {
var list = new FastMap()
this.nodes.forEach((node,id)=>{
if (!keep) node = node.node;
list.set(id,node)
});
this.quads.forEach((quad)=>{
list.concat(quad.walk(keep))
});


return list;
}
getQuadById(id) {
 var master = this.getMaster();
 var node = master.allnodes.get(id);
return master.getQuad(master.getPos(node))
}
addToMList(id,node) {
 if (this.level != 0 && !this.parent) return false;
 if (this.level != 0) return this.parent.addToMList(id,node);
 this.config.main["length"] = this.allNodes.length;
 this.allnodes.set(id,node)
 this.allNodes.set(id,node.node);
 return true;
}

setNode(id,node) {
 if (node.compiled && node.stored) {
  var quad = this.getQuadAdvanced(this.getPos(node));
  return quad.setnode(id,node);
 }
 if (node.compiled) {
 node.stored = this.addToMList(id,node);
   var quad = this.getQuadAdvanced(this.getPos(node));
  return quad.setnode(id,node);
 }
var comp = this.compile(node,this);
comp.stored = this.addToMList(id,comp);
  var quad = this.getQuadAdvanced(this.getPos(node));
  return quad.setnode(id,comp);
  
 /*
  if (this.level == 0) {
    compiled = (node.compiled) ? node : this.compile(node,this);
    this.allnodes.set(id,compiled);
   if (!node.compiled) this.allNodes.set(id,node);
    if (!this.config.useQuad) return;
  }
  var quad = this.getQuad(node)
  if (compiled) node = compiled;
setTimeout(function () { 
 quad.setnode(id,node);
}.bind(this),Math.floor(Math.random * 100));
*/
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
  var testa = function(pos) {

  
   var vert = Math.floor((this.left + this.right) / 2);
  var hor = Math.floor((this.top + this.bottom) / 2)
    if (pos.x >= vert && pos.y >= hor) return 1;
      if (pos.x < vert && pos.y >= hor) return 2;
      if (pos.x < vert && pos.y < hor) return 3;
      if (pos.x >= vert && pos.y < hor) return 4;
    return false;
    
  }.bind(this)
  var list = [];
  nodes.forEach((node)=>{
if (!node) return;
   var pos = node.node[this.config.positionkey]
  list.push(testa(pos));
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
  }.bind(this)
  var quad = test(number);
  if (!quad || this.quads.has(quad.numb)) return false;
  var newq = new QTree(quad.top,quad.bottom,quad.left,quad.right,this.level + 1,this,quad.numb,this.config,this.vars);
  newq.init();
  return newq;
}
init() {
 this.vars.forEach((va)=>{
  this[va] = new AdvFastMap(this,va);
  
 })
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
nodeInt() {
this.quads.forEach((quad)=>{

quad.nodeInt();

});
   this.nodes.forEach((node,id)=>{
   if (!node) return;
   if (this.config.test) if (!this.config.test(id,node)) return;
    var quad = this.getQuadAdvanced(this.getPos(node));
if (!quad) return;
    quad.setnode(id,node);
   })
   
  

}
getMaster() {
 if (this.level != 0) return this.parent.getMaster();
 return this;
 
}
getQuadAdvanced(pos,box) {

if (this.parent && !this.parent.doesFit(pos)) var quad = this.getMQuad(pos);
else {
    var quad = this.getQuad(pos);
 if (!quad)quad = this.parent.getQuad(pos)   
    
}
return quad;
}
compile(node,qtree) {
  return {
    QTree: qtree,
    node: node,
    compiled: true,
    stored: false,
    vars: [],
  };
}
setnode(id,node) {
this.nodes.set(id,node);
 if (this.config.quadv) node.node[this.config.quadv] = this;
if (node.QTree == this) return;
node.vars.forEach((va)=>{
 this[va].set(id,node);
 node.QTree[va].delete(id)
})
node.QTree.nodes.delete(id);
 node.QTree = this;
   

}
destroy() {
  
  this.nodes.forEach((node,id)=>{
this.nodes.delete(id);
node.QTree = this.parent;
    this.parent.nodes.set(id,node);
    
  })
  this.parent.destroyQuadNumb(this.numb);
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
  this.config.main["length"] = this.allNodes.length;
  var b = this.allnodes.get(id);
  if (b) {
   b.vars.forEach((vars)=>{
    this[vars].delete(id);
   })
  }
      this.allnodes.delete(id);
   this.allNodes.delete(id);
}
removeNode(id,progressive) {
  this.nodes.delete(id);
 
  if (progressive) {
    this.quads.forEach((quad)=>{quad.removeNode(id,true)});
  } 
}
destroyQuadNumb(num) {
  this.quads.delete(num);
  
}
checkForDeletion() {
if (this.level == 0) return;
   if (this.parent.nodes.length + this.parent.quads.length + this.nodes.length - 1 <= 4 && this.quads.length <= 0 && this.level != 0) {
      this.destroy()
      return;
    }
}
sort() {
 this.nodes.forEach((node,id)=>{
var quad = this.getQuad(this.getPos(node));
if (!quad) return;
quad.setnode(id,node);
});
 
 
}

checkForCreation() {
   
  if (this.nodes.length + this.quads.length <= 4 || this.nodes.length <= 0 || this.level >= this.config.maxQuad) return true; 
   var newq = this.createQuad(this.getAverageQuad(this.nodes));
if (!newq) return this.sort();
   this.quads.set(newq.numb,newq);
 
 this.sort();

}

hasItem(id) {
  return this.nodes.has(id);
}

updatePos(id) {
  if (this.level != 0) return this.getMaster().updatePos(id);
 var node = this.allnodes.get(id);
 if (!node) return false;
    var quad = this.getQuadAdvanced(this.getPos(node));
    quad.setnode(id,node)
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
  if (box.left < this.left) return false;
  if (box.right >= this.right) return false;
  return true;
}

getquad(pos,box) {
var aquad = false;
var test = (box) ? this.doesFitBox(box) : this.doesFit(pos);
 if (!test && this.level != 0) return false;
 this.quads.every((quad)=>{
  var bquad = quad.getquad(pos,box);
if (bquad)  {
aquad = bquad;
return false;
}
return true;
 });
if (aquad) return aquad;
 return this;

}
getMQuad(node,box) {
if (this.level != 0) return this.parent.getMQuad(node,box);
return this.getQuad(node,box);

}
getPos(node) {
 if (node.compiled) node = node.node;
 return node[this.config.positionkey]
}
getQuad(pos,box) {
  
  if (box) {
    var quad = this.getquad(false,box);
return quad
  } else {
  var quad = this.getquad(pos);
// if (node.owner) if (quad) node.owner.name = quad.level + " " + quad.nodes.length + " " + quad.quads.length; else node.owner.name = "false"
 return quad
  }



}

}
module.exports = QTree;
