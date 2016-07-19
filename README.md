# QuadMap
A map-styled quadtree. (uses collections/fast-map)


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
