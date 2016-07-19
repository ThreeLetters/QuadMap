# QuadMap
A map-styled quadtree. (uses collections/fast-map)


[![Build Status](https://travis-ci.org/AJS-development/QuadMap.svg?branch=master)](https://travis-ci.org/AJS-development/QuadMap)

## Documentation

                    Function | Docs 
-----------------------------|--------------------------------
get(key)                     |  Get an item using its key
set(key,node)                |  Insert an item by a key
getNodes(progressive,include)|  Get nodes the nodes in a Quad
useQuad(state)               |  Wether to use the quad-system or not
setMaxLevel(number)          |  Maximum amount of levels
forEach(callback)            |  forEach
every(callback)              |  every
keys()                       |  Get all the keys
delete(id)                   |  Delete a item by its key
setIntTime(time)             |  Set the time for the create/delete loop
toArray()                    |  Returns an array of the values



#### getNodes(progressive,include)
Gets the nodes in a quad. If progressive is true, then any nodes in quads under the quad will also be included. if include is true, then it will return an onject like below.
> {
> node: node,
> QTree: quad,
> compiled: true,
> stored: true,
>}

The original node can be found in the .node variable, and the QTree is the quad it resides in. Compiled and stored are system variables.

#### getQuad(node)
Returns the quad it would be in based apon its position.

#### getQuadBox(box)
Returns the quad that the box fits in
