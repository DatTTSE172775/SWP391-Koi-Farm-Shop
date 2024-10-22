class Order
  constructor: ->
    @_buffer = []
    @_last = 0

  _execute: ->
    if @_buffer.length is 0
      return
    diff =  @_last + @_buffer[0].delay - (new Date()).getTime()
    if diff > 0
      return setTimeout =>
        @_execute()
      , diff
    @_buffer.shift().fn()
    @_last = (new Date()).getTime()
    @_execute()

  next: (fn, delay=0)->
    @_buffer.push({'fn': fn, 'delay': delay})
    @_execute()


if typeof define is 'function' and define.amd
  define ['exports'], (exports)->
    exports = Order
else if typeof module isnt 'undefined'
  module.exports = Order
else
  window._Order = Order