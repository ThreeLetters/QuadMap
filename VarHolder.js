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
module.exports = class VarHolder {
constructor(main,varn) {
this.main = main;
this.varn = varn;
this.allnodes = new FastMap()
this.allNodes = new FastMap()
}
clear() {
 this.allnodes.forEach((node)=>{
 var ind = node.vars.forEach(this.varn)
  if (ind != -1) node.vars.slice(ind,1)
 })
 
 this.allnodes.clear();
 this.allNodes.clear();
 this.main.clearVar(this.varn);
}
set(id,node) {
 this["length"] = this.allnodes.length
  var setn = function(id,node) {
var n = this.main.allnodes.get(id);
if (n && n.node == node) {
  if (n.QTree != this.main) n.QTree[this.varn].set(id,node);
  if (n.vars.indexOf(this.varn) == -1) n.vars.push(this.varn);
  this.allnodes.set(id,n);
  this.allNodes.set(id,n.node);
}
  else {
  this.main.setNode(id,node)
  setn(id,node)
  
  
}
}.bind(this);
return setn(id,node);
}
forEach(c) {
 return this.allNodes.forEach(c)
}
every(c) {
 return this.allNodes.every(c)
 
}
get(id) {
return this.allNodes.get(id);
}
delete(id) {
  this["length"] = this.allnodes.length
this.allnodes.delete(id);
this.allNodes.delete(id);
var n = this.main.allnodes.get(id);
if (n) {
  if (n.QTree != this.main) n.QTree[this.varn].delete(id);
  var i = n.vars.indexOf(this.varn);
  if (i != -1) n.vars.slice(i,1)
}
}
toArray() {
return this.allNodes.toArray()
}
getNodes(progressive,keep) {
if (keep) return this.allnodes; else return this.allNodes;
}

}
