// tests/linkedList.test.js
// Unit tests for the Linked List data structure

const { LinkedList, Node } = require('../utils/linkedList');

describe('LinkedList', () => {
  let list;

  beforeEach(() => {
    list = new LinkedList();
  });

  test('should start empty', () => {
    expect(list.head).toBeNull();
    expect(list.tail).toBeNull();
    expect(list.length).toBe(0);
  });

  test('should append single element', () => {
    list.append('A');
    expect(list.head.value).toBe('A');
    expect(list.tail.value).toBe('A');
    expect(list.length).toBe(1);
  });

  test('should append multiple elements in order', () => {
    list.append('A');
    list.append('B');
    list.append('C');
    expect(list.head.value).toBe('A');
    expect(list.tail.value).toBe('C');
    expect(list.length).toBe(3);
  });

  test('should maintain correct next pointers', () => {
    list.append(1);
    list.append(2);
    list.append(3);
    expect(list.head.next.value).toBe(2);
    expect(list.head.next.next.value).toBe(3);
    expect(list.head.next.next.next).toBeNull();
  });

  test('toArray should return all elements in order', () => {
    list.append('X');
    list.append('Y');
    list.append('Z');
    expect(list.toArray()).toEqual(['X', 'Y', 'Z']);
  });

  test('toArray should return empty array for empty list', () => {
    expect(list.toArray()).toEqual([]);
  });

  test('forEach should iterate over all elements', () => {
    list.append(10);
    list.append(20);
    list.append(30);

    const values = [];
    const indices = [];
    list.forEach((value, index) => {
      values.push(value);
      indices.push(index);
    });

    expect(values).toEqual([10, 20, 30]);
    expect(indices).toEqual([0, 1, 2]);
  });

  test('should handle object values', () => {
    const restaurant = { id: 1, name: 'Test Restaurant' };
    list.append(restaurant);
    expect(list.head.value).toEqual(restaurant);
    expect(list.toArray()[0].name).toBe('Test Restaurant');
  });

  test('append should return the list for chaining', () => {
    const result = list.append('A');
    expect(result).toBe(list);
  });
});

describe('Node', () => {
  test('should create a node with value and null next', () => {
    const node = new Node('test');
    expect(node.value).toBe('test');
    expect(node.next).toBeNull();
  });
});
