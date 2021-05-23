const assert = require('chai').assert
const myBind = require('../src/myBind')
const sinon = require('sinon');


describe('实现 Function.prototype.bind()', () => {
  it('执行 myBind 返回一个新函数', () => {
    const fn = sinon.fake()
    const newFn = fn.myBind()
    assert.isFunction(newFn)
  })


  it('创建绑定函数', () => {
    this.x = 9;    // 在浏览器中，this 指向全局的 "window" 对象
    const module = {
      x: 81,
      getX: function () { return this.x; }
    };

    assert.equal(module.getX(), 81)

    const retrieveX = module.getX;
    retrieveX();

    const boundGetX = retrieveX.myBind(module);
    assert.equal(boundGetX(), 81)
  })

  it('偏函数', () => {
    function list() {
      return Array.prototype.slice.call(arguments);
    }

    function addArguments(arg1, arg2) {
      return arg1 + arg2
    }

    const list1 = list(1, 2, 3); // [1,2,3]
    assert.equal(list1.length, 3)

    var result1 = addArguments(1, 2); // 3
    assert.equal(result1, 3)

    // 创建一个函数，它拥有预设参数列表。
    var leadingThirtysevenList = list.myBind(null, 37);

    // 创建一个函数，它拥有预设的第一个参数
    var addThirtySeven = addArguments.myBind(null, 37);

    var list2 = leadingThirtysevenList();   // [37]
    assert.equal(list2.length, 1)
    assert.equal(list2[0], 37)

    var list3 = leadingThirtysevenList(1, 2, 3); // [37, 1, 2, 3]
    assert.equal(list3.length, 4)
    assert.equal(list3[0], 37)
    assert.equal(list3[1], 1)
    assert.equal(list3[2], 2)
    assert.equal(list3[3], 3)


    var result2 = addThirtySeven(5);  // 37 + 5 = 42
    assert.equal(result2, 42)

    var result3 = addThirtySeven(5, 10);  // 37 + 5 = 42 ，第二个参数被忽略
    assert.equal(result3, 42)
  })


  // it('配合 setTimeout', () => {
  //   function LateBloomer(petalCount) {
  //     this.petalCount = petalCount;
  //   }

  //   // 在 1 秒钟后声明 bloom
  //   LateBloomer.prototype.bloom = function () {
  //     return setTimeout(this.declare.bind(this), 1000);
  //   };

  //   LateBloomer.prototype.declare = function () {
  //     return 'I am a beautiful flower with ' +
  //       this.petalCount + ' petals!'
  //   };

  //   var flower = new LateBloomer();
  //   var res = flower.bloom(7);  // 一秒钟后, 调用 'declare' 方法
  //   assert.equal(res, 'I am a beautiful flower with 7 petals!')
  // })
})
