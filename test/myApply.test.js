const assert = require('chai').assert
var myApply = require('../src/myApply.js')

describe('实现 Function.prototype.apply()', () => {
  it('myApply 在 Function 的原型上', () => {
    // 老写法
    assert.isTrue('myApply' in Function.prototype)

    // ES6 
    assert.isTrue(Reflect.has(Function.prototype, 'myApply'))
  })

  it('如果没有传递第一个参数，this 的值将会被绑定为全局对象。', () => {
    function testFn(a, b) {
      assert.equal(this, global)
      return a + b
    }
    testFn.myApply()
  })

  it('如果第一个参数是原始数据类型， this 的原型指向该原始值的自动包装对象', () => {
    // 数字
    function testNumberContext(a, b) {
      assert.equal(Object.getPrototypeOf(this), Object.getPrototypeOf(new Number()))
      return a + b
    }
    testNumberContext.myApply(666)


    // 字符串
    function testStringContext(a, b) {
      assert.equal(Object.getPrototypeOf(this), Object.getPrototypeOf(new String()))
      return a + b
    }
    testStringContext.myApply('123')


    // 布尔值
    function testBooleanContext(a, b) {
      assert.equal(Object.getPrototypeOf(this), Object.getPrototypeOf(new Boolean()))
      return a + b
    }

    testBooleanContext.myApply(true)
    testBooleanContext.myApply(false)

  })

  // 以下是 MDN 提供的例子
  it('用 apply 将数组各项添加到另一个数组', () => {
    var array = ['a', 'b'];
    var elements = [0, 1, 2];
    array.push.apply(array, elements);
    assert.equal(array.length, 5)
  })                 
})


