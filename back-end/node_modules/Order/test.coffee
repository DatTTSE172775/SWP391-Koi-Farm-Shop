sinon = require('sinon')
expect = require('expect.js')

Order = require('./index')


describe 'Order', ->
  o = null
  clock = null
  spy = null
  beforeEach ->
    clock = sinon.useFakeTimers()
    spy = sinon.spy()
    o = new Order()

  afterEach ->
    clock.restore()

  describe 'next', ->
    it 'timeouts', ->
      o.next ->
        spy(1)
      , 100
      o.next ->
        spy(2)
      , 50
      o.next ->
        spy(3)
      clock.tick(200)
      expect(spy.getCall(0).args[0]).to.be(1)
      expect(spy.getCall(1).args[0]).to.be(2)
      expect(spy.getCall(2).args[0]).to.be(3)

    it 'next after', ->
      clock = sinon.useFakeTimers()
      spy = sinon.spy()
      o.next ->
        spy(1)
      , 50
      o.next ->
        spy(2)
      , 100
      expect(spy.callCount).to.be(0)
      clock.tick(100)
      expect(spy.callCount).to.be(1)
      o.next ->
        spy(3)
      , 50
      clock.tick(50)
      expect(spy.callCount).to.be(2)
      clock.tick(50)
      expect(spy.callCount).to.be(3)
      clock.tick(100)
      o.next ->
        spy(4)
      , 50
      clock.tick(10)
      expect(spy.callCount).to.be(4)