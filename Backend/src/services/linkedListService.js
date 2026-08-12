const LinkedList = require("../dataStructures/LinkedList");

const list = new LinkedList();

list.append({
    name: "Pizza Hut Kandy",
    type: "Restaurant"
});

list.append({
    name: "Earl's Regency",
    type: "Hotel"
});

list.append({
    name: "Cafe Kegalle",
    type: "Cafe"
});

list.append({
    name: "Temple of the Tooth",
    type: "Attraction"
});

module.exports = list;