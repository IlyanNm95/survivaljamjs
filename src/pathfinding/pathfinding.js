// ! Test function, deprecated but usefull if i need to do any test
const testPathfinding = (map = actualPlayerMap.objectLayer, start = [0, 0], end = [10, 10]) => {
    return searchPath(start, end, map) // Easy if you just wan't to test it in your console
}

const searchPath = (startPath, pathToFind, mapLayer) => {
    let pathGrid = getNodePathArray(mapLayer)

    let startNode = pathGrid[startPath[0]][startPath[1]]
    let endNode = pathGrid[pathToFind[0]][pathToFind[1]]
    if (startNode === null || endNode === null) return null; // Doing it on invalid Path 
    

    let openList = [startNode]; // This will be the list of every node we will explore
    let closedList = []; // This will be the list of every node we explored 


    startNode.gCost = 0; // Then set the start gCost to 0 cause it's the start 
    startNode.hCost = calculateDistanceCost(startNode, endNode); // Calculate the hCost by the distance Cost between

    while(openList.length > 0) // If the open list still contains some node, it will just WHILEEEEEEE
    {
        let currentNode = getLowerFCostNode(openList)
        if(currentNode === endNode) return calculatePathFromNode(endNode); // If the current node is = to the end node, then we found our path and we just need to calculate it
        

        openList.splice(openList.indexOf(currentNode), 1)
        
        closedList.push(currentNode)

        let neighbours = getNeighbourNodeArray(currentNode, pathGrid)
        for(let i = 0; i < neighbours.length; i++)
        {

            if(closedList.includes(neighbours[i])) continue; // if the neighbour is already explored
            if(neighbours[i].isWalkable === false) continue; // if the neighbour is walkable

            // tentativeGcost is the distance from start to the neighbor through current
            let tentativeGCost = currentNode.gCost + calculateDistanceCost(currentNode, neighbours[i]); 

            if(tentativeGCost < neighbours[i].gCost) // bigger is the g cost, closer the node is from the end
            {
                // That means that this path is better than any previous one.
                neighbours[i].cameFromNode = currentNode;
                neighbours[i].gCost = tentativeGCost;
                neighbours[i].hCost = calculateDistanceCost(neighbours[i], endNode);

                if(!openList.includes(neighbours[i]))
                {
                    openList.push(neighbours[i])
                }

            }
        }
    }

    return null; // if it returns null, that means no path exist

}


const calculatePathFromNode = (endNode) => {

    let pathArray = [] 
    pathArray.push(endNode)
    let currentNode = endNode;

    while (currentNode.cameFromNode !== null)
    {
        pathArray.push(currentNode.cameFromNode)
        currentNode = currentNode.cameFromNode
    }

    // My own 'method'... 
    let pathToReturn = []
    for(let i = pathArray.length-1; i>=0; i--)
    {
        pathToReturn.push(pathArray[i]);
    }
    // TODO : Find a better way to reverse an array

    return pathToReturn;
}


const getNeighbourNodeArray = (currentNode, currentGridPathfindingNode) => {
    let neighbourList = [];

    if(currentNode.posOnGrid[0] -1 >= 0) neighbourList.push(currentGridPathfindingNode[currentNode.posOnGrid[0] - 1][ currentNode.posOnGrid[1]]); 
    // Get left node if exists
    if(currentNode.posOnGrid[0] + 1 < currentGridPathfindingNode.length) neighbourList.push(currentGridPathfindingNode[currentNode.posOnGrid[0] + 1][ currentNode.posOnGrid[1]]); 
    // Get right node if exists
    if(currentNode.posOnGrid[1] - 1 >= 0) neighbourList.push(currentGridPathfindingNode[currentNode.posOnGrid[0]][currentNode.posOnGrid[1] -1]); 
    // Get bottom node if exists
    if(currentNode.posOnGrid[1] + 1 < currentGridPathfindingNode.length) neighbourList.push(currentGridPathfindingNode[currentNode.posOnGrid[0]][ currentNode.posOnGrid[1] +1]); 
    // Get top node if exists

    return neighbourList;
}


const getNodePathArray = (mapLayer) => {
    let arrayGridNode = new Array(mapLayer.length);
    for(let y = 0; y < arrayGridNode.length; y++)
    {
        arrayGridNode[y] = new Array(mapLayer.length);
        for(let x = 0; x < arrayGridNode[y].length; x++)
        {
            arrayGridNode[y][x] = getNode(y, x, mapLayer)
        }
    }
    return arrayGridNode;
}


const getNode = (x, y, mapLayer = null) => {
    let canWalk = true;
    if(mapLayer !== null && mapLayer[y][x] !== -1)
    {
        canWalk = false; 
        
    }
    return {
        posOnGrid : [x, y],
        gCost : 999999, // set node gCost to the 'maximum' lol
        hCost : 0,
        fCost : 0,
        isWalkable : canWalk,
        cameFromNode : null
    }
}


const getFCostFromNodeObject = (node) => {
    return node.gCost + node.hCost
}


const getLowerFCostNode = (arrayNode) => {
    let lowestFCostNode = arrayNode[0]

    for (let i = 1; i < arrayNode.length; i++) {
        if (getFCostFromNodeObject(arrayNode[i]) < getFCostFromNodeObject(lowestFCostNode)) {
            lowestFCostNode = arrayNode[i];
        }
    }

    return lowestFCostNode;
}



const calculateDistanceCost = (nodeFrom, nodeTo) =>
    {
        let xDistance = Math.abs(nodeFrom.posOnGrid[0] - nodeTo.posOnGrid[0]);
        let yDistance = Math.abs(nodeFrom.posOnGrid[1] - nodeTo.posOnGrid[1]);
        let remaining = Math.abs(xDistance - yDistance);
        return Math.min(xDistance, yDistance) + MoveStraightCost * remaining;
}

