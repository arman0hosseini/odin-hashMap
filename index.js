class HashMap {
    loadFactor = 0.75;
    capacity = 16;
    mainArray = new Array(16);

    growth() {
        const keyValArray = this.entries();

        this.capacity = this.capacity * 2;
        this.mainArray = new Array(this.capacity);


        for (const [key, value] of keyValArray) {
            this.set(key, value);
        }
    }

    hash(key) {
        let hashCode = 0;
        const primeNumber = 31;

        for (let i = 0; i < key.length; i++) {
            hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
        }

        return hashCode;
    }

    set(key, value) {
        const hashCode = this.hash(key);

        if (!this.mainArray[hashCode]) {
            const linkedList = new LinkedList();
            this.mainArray[hashCode] = linkedList;
            linkedList.append(key, value);
        } else {
            const bucket = this.mainArray[hashCode];
            if (bucket.containsKey(key)) {
                bucket.removeByKey(key);
            }
            bucket.append(key, value);
        }
        if (this.length() > (this.capacity * this.loadFactor)) {
            this.growth();
        }
    }

    get(key) {
        const hashCode = this.hash(key);

        if (!this.mainArray[hashCode]) return null;
        else {
            return this.mainArray[hashCode].atKey(key);
        }
    }

    has(key) {
        const hashCode = this.hash(key);

        const bucket = this.mainArray[hashCode];
        if (!bucket) return false;

        return bucket.containsKey(key);
    }

    remove(key) {
        const hashCode = this.hash(key);
        const bucket = this.mainArray[hashCode];
        if (!bucket) return false;

        else {
            if (!bucket.containsKey(key)) return false;
            else {
                bucket.removeByKey(key);
                return true;
            }
        }


    }

    length() {
        let total = 0;

        for (const bucket of this.mainArray) {
            if (bucket) total += bucket.size();
        }

        return total;
    }

    clear() {
        this.mainArray = new Array(this.capacity);
    }

    keys() {
        const keysArray = [];

        for (const bucket of this.mainArray) {
            if (!bucket) continue;

            let current = bucket.head;
            while (current) {
                keysArray.push(current.key);
                current = current.nextNode;
            }
        }

        return keysArray;
    }

    values() {
        const valuesArray = [];

        for (const bucket of this.mainArray) {
            if (!bucket) continue;

            let current = bucket.head;
            while (current) {
                valuesArray.push(current.value);
                current = current.nextNode;
            }
        }

        return valuesArray;
    }

    entries() {
        const entriesArray = [];

        for (const bucket of this.mainArray) {
            if (!bucket) continue;

            let current = bucket.head;
            while (current) {
                entriesArray.push([current.key, current.value]);
                current = current.nextNode;
            }
        }

        return entriesArray;
    }


}

class LinkedList {
    constructor() {
        this.head = null;
    }

    append(key, value) {
        const node = new ListNode(key, value);
        if (!this.head) {
            this.head = node;
            return;
        }
        let current = this.head;
        while (current.nextNode) current = current.nextNode;
        current.nextNode = node;
    }

    prepend(value) {
        const node = new ListNode(value);
        let currentHead = this.head;
        this.head = node;
        node.nextNode = currentHead;
    }

    size() {
        let current = this.head;
        let counter = 0;
        while (current) {
            counter++;
            current = current.nextNode;
        }
        return counter;
    }

    getHead() {
        return this.head;
    }

    getTail() {
        let current = this.head;

        while (current.nextNode) {
            current = current.nextNode;
        }

        return current;
    }

    at(index) {
        if (index >= (this.size())) {
            return;
        }
        let current = this.head;
        for (let i = 0; i < index; i++) {
            current = current.nextNode;
        }
        return current;
    }

    atKey(key) {
        let current = this.head;

        while (current) {
            if (current.key === key) return current.value;
            current = current.nextNode;
        }
        return null;

    }

    pop() {
        if (!this.head) return null;

        if (!this.head.nextNode) {
            const value = this.head.value;
            this.head = null;
            return value;
        }

        let current = this.head;
        while (current.nextNode.nextNode) {
            current = current.nextNode;
        }

        const value = current.nextNode.value;
        current.nextNode = null;
        return value;
    }

    containsKey(key) {
        let current = this.head;

        while (current) {
            if (key === current.key) return true;
            current = current.nextNode;
        }

        return false;
    }

    containsValue(value) {
        let current = this.head;

        while (current) {
            if (value === current.value) return true;
            current = current.nextNode;
        }
        return false;
    }

    find(value) {
        let current = this.head;
        let counter = 0;

        while (current) {
            if (value === current.value) return counter;
            current = current.nextNode;
            counter++;
        }
        return null;
    }

    toString() {
        let current = this.head;
        let myString = "[Head] -> ";

        while (current) {
            myString += `[${current.value}] --> `
            current = current.nextNode;
        }
        myString += "[Tail]";

        return myString;
    }

    insertAt(value, index) {
        if (index === 0) {
            this.prepend(value);
            return;
        }

        const prev = this.at(index - 1);
        if (!prev) return; // index out of range

        const newNode = new ListNode(value, prev.nextNode);
        prev.nextNode = newNode;
    }

    removeAt(index) {
        if (index >= this.size()) return;

        if (index === 0) {
            this.head = this.head.nextNode;
            return;
        }

        const prev = this.at(index - 1);
        if (!prev || !prev.nextNode) return;

        prev.nextNode = prev.nextNode.nextNode;


    }

    removeByKey(key) {
        if (!this.head) return;

        if (this.head.key === key) {
            this.head = this.head.nextNode;
            return;
        }

        let current = this.head;
        while (current.nextNode) {
            if (current.nextNode.key === key) {
                current.nextNode = current.nextNode.nextNode;
                return;
            }
            current = current.nextNode;
        }
    }
}

class ListNode {
    constructor(key, value, nextNode = null) {
        this.key = key;
        this.value = value;
        this.nextNode = nextNode;
    }
}


const test = new HashMap();
test.set('apple', 'red')
test.set('banana', 'yellow')
test.set('carrot', 'orange')
test.set('dog', 'brown')
test.set('elephant', 'gray')
test.set('frog', 'green')
test.set('grape', 'purple')
test.set('hat', 'black')
test.set('ice cream', 'white')
test.set('jacket', 'blue')
test.set('kite', 'pink')
test.set('lion', 'golden')


