//optional Node class, could also be object literals,
//ie `{data: "my Data", next: null}`
class Node {
  constructor(data, next = null) {
    this.data = data;
    this.next = next;
  }
}

//ADD A NODE TO A LINKED LIST
//accept the node to which the new node will be attached, and the
//new node itself
appendNode = (head, newNode) => {
  newNode.next = head.next; //attach old tail to new newNode
  head.next = newNode; //attach newNode to head
};

//FIND A NODE IN A LINKED LIST BY DATA
//pass in node and search parameter
search = (head, query) => {
  if (head.data == query) {
    //if parameter found, return the node
    return head;
  } else if (head.next != null) {
    //if next is another node, run the search again on that node
    return search(head.next, query); //this is a recursive call on the list,
    //excluding the current node
  } else {
    return null; //in the case that the list does not contain the needed
    //node, handle that case.
  }
};

//DISCOVER THE LENGTH OF A LINKED LIST
//accept a head, and assume a lower limit of 1, as the head must exist
getListLength = (head, length = 1) => {
  if (head.next === null) {
    //if there is no 'next' value, we are at the end, let's return that length
    return length;
  } else {
    //if there IS a 'next' value, recursively start again, passing
    //'next' into the function, and
    //increasing the length to account for the found "next"
    return getListLength(head.next, length + 1);
  }
};

//GET LINKED LIST ITEM BY POSITION
//pass in the head, and the index position you want
getNodeByIndex = (head, index) => {
  if (index === 0) {
    //if the desired node is the head, return it
    return head;
  } else {
    //if the desired node is not the index...
    return getNodeByIndex(head.next, index - 1); //...pass the next node
    //into the method recursively, reducing
    //the index to account for the removed head
  }
};

//DELETE NODE FROM LIST BY INDEX
//pass in the head, and the index you with to delete
deleteNodeByIndex = (head, index) => {
  if (index === 0) {
    //when the head is the node to be removed, return the remaining tail
    return head.next;
  } else {
    //if the head is to be kept, assign its tail to the outcome
    //of the function called on the tail, reducing the
    //index by 1 to account for the new head
    head.next = deleteNodeByIndex(head.next, index - 1);
    return head;
  }
};

//create nodes using the class
let n1 = new Node("Monday");
let n2 = new Node("Tuesday");
let n3 = new Node("Wednesday");
let n4 = new Node("Thursday");

// add several nodes together
appendNode(n1, n2);
appendNode(n2, n3);
appendNode(n3, n4);
appendNode(n2, { data: "I AM A BANANA!!", next: null }); // add literal node to the list

console.log("HEAD: ", JSON.parse(JSON.stringify(n1))); //view head, parse to prevent update
console.log("LIST LENGTH: ", getListLength(n1)); //read length
console.log("FOUND NODE BY QUERY: ", search(n1, "Tuesday")); //find by query
console.log("FOUND NODE BY INDEX: ", JSON.parse(JSON.stringify(getNodeByIndex(n1, 2)))); //find by index
console.log(
  "MIDDLE NODE: ",
  getNodeByIndex(n1, Math.floor(getListLength(n1) / 2))
); //find by middle index
console.log("DELETE INDEX 2: ", deleteNodeByIndex(n1, 2)); //delete by index
