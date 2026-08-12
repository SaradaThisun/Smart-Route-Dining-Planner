const Node = require("./Node");

class LinkedList {
    constructor() {
        this.head = null;
    }

    append(data) {
        const newNode = new Node(data);

        if (!this.head) {
            this.head = newNode;
            return;
        }

        let current = this.head;

        while (current.next) {
            current = current.next;
        }

        current.next = newNode;
    }

    toArray() {
        const result = [];

        let current = this.head;

        while (current) {
            result.push(current.data);
            current = current.next;
        }

        return result;
    }

    size() {
        let count = 0;

        let current = this.head;

        while (current) {
            count++;
            current = current.next;
        }

        return count;
    }
}

module.exports = LinkedList;