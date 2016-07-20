# QuadMap
A map-styled quadtree. (uses collections/fast-map)


[![Build Status](https://travis-ci.org/AJS-development/QuadMap.svg?branch=master)](https://travis-ci.org/AJS-development/QuadMap)


## Installation

> npm install QuadMap

## Usage
```
var QuadMap = require("QuadMap");
var quadMap = new QuadMap(top,bottom,left,right);
```

To insert a node


```
var QuadMap = require("QuadMap");
var quadMap = new QuadMap(100,-100,-100,100);

var node = {
position: {x:10,y: 20},
name: "hello",
color: {R:0,G:0,B:0}
node.id: id
}
quadMap.set(node.id,node);
```


To get a node


```
quadMap.get(id)
```

To get the nodes in the nodes quad


```
var quad = quadMap.getQuadById(id);
var nodes = quad.getNodes();
```


To change the position variable 


```
var QuadMap = require("QuadMap");
var quadMap = new QuadMap(100,-100,-100,100);

var node = {
pos: {x:10,y: 20}, // Note the var is now "pos" not "position". "position" is default
name: "hello",
color: {R:0,G:0,B:0}
node.id: id
}
quadMap.setPosVar("pos");
quadMap.set(node.id,node);
```


To change the max amount of levels


```
quadMap.setMaxLevel(number);
```
## Documentation

#### Quadmap.prototye.set(id,node)
Insert an item

#### Quadmap.prototype.get(id)
returns the item based on its id.

#### Quadmap.prototype.delete(id)
deleted the node based apon its id

#### Quadmap.prototype.clear(id)
clears the quadmap/quad

#### Quadmap.prototype.getQuad(pos)
gets the quad based apon the pos

#### Quadmap.prototype.getQuadBox(box)
gets the quad the box fits into

#### Quadmap.prototype.getNodes(progressive,include)
Gets the nodes in a quad. If progressive is true, then any nodes in quads under the quad will also be included. if include is true, then it will return an onject like below.
> {
> node: node,
> QTree: quad,
> compiled: true,
> stored: true,
>}

The original node can be found in the .node variable, and the QTree is the quad it resides in. Compiled and stored are system variables.
#### Quadmap.prototype.setPosVar(var)
sets the name of the variable to get a nodes pos from

#### Quadmap.prototype.setNodeIntTime(time)
sets the time in which the node update runs
