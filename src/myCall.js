Function.prototype.myCall = function (context, ...args) {

  if (['number', 'string', 'boolean'].includes(typeof context)) {
    ctx = new Object(context)
  } else {
    ctx = context || global
  }

  // 现在要让这里的函数，也就是目前的 this，给 ctx 调用，
  // 这样真正要执行的那个函数里面的 this  就会指向 ctx
  // 再强调一下，不是这里的 this, 这里的 this 就是那个要执行的函数
  const func = Symbol()
  ctx[func] = this
  const result = args.length ? ctx[func](...args) : ctx[func]()

  // 记得删除该属性
  delete ctx[func]

  return result
}


module.exports = Function.prototype.myCall