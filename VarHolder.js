const FastMap = require('collections/fast-map');
module.exports = class VarHolder {
constructor(main,varn) {
this.main = main;
this.varn = varn;
this.allnodes = new FastMap()
this.allNodes = new FastMap()
}
set(id,node) {
  var setn = function(id,node) {
var n = this.main.allnodes.get(id);
if (n && n.node == node) {
  n.QTree[this.varn].set(id,node);
  if (n.vars.indexOf(this.varn) == -1) node.vars.push(this.varn);
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
get(id) {
return this.allNodes.get(id);
}
delete(id) {
this.allnodes.delete(id);
this.allNodes.delete(id);
var n = this.main.allnodes.get(id);
if (n) {
  n.QTree[this.varn].delete(id);
  var i = n.vars.indexof(this.varn);
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
