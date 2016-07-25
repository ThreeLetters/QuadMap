"use strict";
const FastMap = require('collections/fast-map');
module.exports = class AdvFast extends FastMap {
constructor(ma,vari) {
this.ma = ma;
this.vari = vari;
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
