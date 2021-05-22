const assert = require('chai').assert
var myCall = require('../src/myCall.js')

describe('实现 Function.prototype.call()', () => {
  it('myCall 在 Function 的原型上', () => {
    // 老写法
    assert.isTrue('myCall' in Function.prototype)

    // ES6 
    assert.isTrue(Reflect.has(Function.prototype, 'myCall'))
  })

  it('如果没有传递第一个参数，this 的值将会被绑定为全局对象。', () => {
    function testFn(a, b) {
      assert.equal(this, global)
      return a + b
    }
    testFn.myCall()
  })

  it('如果第一个参数是原始数据类型， this 的原型指向该原始值的自动包装对象', () => {
    // 数字
    function testNumberContext(a, b) {
      assert.equal(Object.getPrototypeOf(this), Object.getPrototypeOf(new Number()))
      return a + b
    }
    testNumberContext.myCall(666)


    // 字符串
    function testStringContext(a, b) {
      assert.equal(Object.getPrototypeOf(this), Object.getPrototypeOf(new String()))
      return a + b
    }
    testStringContext.myCall('123')


    // 布尔值
    function testBooleanContext(a, b) {
      assert.equal(Object.getPrototypeOf(this), Object.getPrototypeOf(new Boolean()))
      return a + b
    }

    testBooleanContext.myCall(true)
    testBooleanContext.myCall(false)

  })

  it('使用 myCall 方法调用匿名函数', () => {
    const animals = [
      { species: 'Lion', name: 'King' },
      { species: 'Whale', name: 'Fail' }
    ];

    let fakeResult = ['#0 Lion: King', '#1 Whale: Fail']
    let realResult = []

    for (let i = 0; i < animals.length; i++) {
      (function (i) {
        this.print = function () {
          realResult.push(`#${i} ${this.species}: ${this.name}`)
        }
        this.print();
      }).myCall(animals[i], i);
    }
    assert.equal(fakeResult[0], realResult[0])
    assert.equal(fakeResult[1], realResult[1])
  })

  it('使用 call 方法调用函数并且指定上下文的 this', () => {
    function greet() {
      var reply = [this.animal, 'typically sleep between', this.sleepDuration].join(' ');
      assert.equal(reply, 'cats typically sleep between 12 and 16 hours')
    }
    var obj = {
      animal: 'cats', sleepDuration: '12 and 16 hours'
    };
    greet.myCall(obj);  // 
  })

  it('使用 call 方法调用父构造函数', () => {
    function Product(name, price) {
      this.name = name;
      this.price = price;
    }

    function Food(name, price) {
      Product.call(this, name, price);
      this.category = 'food';
    }

    function Toy(name, price) {
      Product.call(this, name, price);
      this.category = 'toy';
    }

    var cheese = new Food('feta', 5);
    var fun = new Toy('robot', 40);

    assert.equal(cheese.name, 'feta')
    assert.equal(cheese.category, 'food')
    
    assert.equal(fun.price, 40)
    assert.equal(fun.category, 'toy')

  })
})


