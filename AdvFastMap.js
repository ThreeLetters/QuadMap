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
module.exports = class AdvFast {
constructor(ma,vari) {
this.ma = ma;
this.vari = vari;
this.nodes = new FastMap()
}
some(c) {
 return this.nodes.some(c)
}
clear() {
  return this.nodes.clear()
}
get(id) {
  this["length"] = this.nodes.length
  return this.nodes.get(id)
}
delete(id) {
  this["length"] = this.nodes.length
  return this.nodes.delete(id)
}
set(id,node) {
  return this.nodes.set(id,node)
}
toArray(){
  return this.nodes.toArray()
}
every(c) {
  return this.nodes.every(c)
}
forEach(c) {
  return this.nodes.forEach(c)
}
getNodes (progressive,keep) {
if (progressive) {
  var ns = new FastMap();
  this.forEach((node,id)=>{
    if (keep) ns.set(id,node); else ns.set(id,node.node);
    
  });
  this.ma.quads.forEach((quad)=>{
    ns.concat(quad[this.vari].getNodes(progressive,keep));
    
  });
  return ns;
} else {
  return (keep) ? this.allnodes : this.allNodes;
}

}
}
