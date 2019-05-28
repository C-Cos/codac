const hashPassword = require('../Functions/usersfunctions.js');

test('password with letters', () => {
    expect(hashPassword("kikoo")).toBe("aa7b57d4638e0c3b27acfbf7b5efd99603995339");
});

test('password with various char', () => {
    expect(hashPassword("£b2].RR5")).toBe("115bb452a5ae35c4d3af30ea0cede06d8d1eccf6");
});

test('password with various char', () => {
    expect(hashPassword("©®µ¾")).toBe("d5bf01e1a8153ebd84c2fb4a5e81c48fb6d74b0d");
});