# QuadMap
A map-styled quadtree. (uses collections/fast-map)


[![Build Status](https://travis-ci.org/AJS-development/QuadMap.svg?branch=master)](https://travis-ci.org/AJS-development/QuadMap)


## Installation

> npm install QuadMap


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

#### Quadmap.prototype.getQuad(node)
Returns the quad it would be in based apon its position.

#### Quadmap.prototype.getQuadBox(box)
Returns the quad that the box fits in
