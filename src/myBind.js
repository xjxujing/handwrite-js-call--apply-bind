Function.prototype.myBind = function(context, ...args) {
  let ctx
  if(['number','string','boolean'].includes(typeof context)) {
    ctx = new Object(context)
  }else {
    ctx = context || global
  }

  const newFn = this
  return (...fnArgs) => {
    const newArgs = args.concat(fnArgs)

    // 函数可能有返回值， 所以要 return
    return newFn.call(ctx, ...newArgs)
  }
}

module.exports = Function.prototype.myBind