# Order
Execute javascript functions ir right order (one after the onother) with timeouts

## Usage
```
var a = new window._Order();
a.next(function () {
    console.info('start');
});
a.next(function () {
    console.info('after 1000 milsecond');
}, 1000);

a.next(function () {
    console.info('after 10 milsecond');
}, 10);
a.next(function () {
    console.info('end');
});

```
with requireJS
```
requirejs(["index"], function(Order) {
    var a = new Order();
    a.next(function () {
        console.info('start');
    });
    a.next(function () {
        console.info('after 1000 milsecond');
    }, 1000);

    a.next(function () {
        console.info('after 10 milsecond');
    }, 10);
    a.next(function () {
        console.info('end');
    });
});

```