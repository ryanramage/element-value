Element Value
=============

Set or get a dom element value


install
-------

    jam install element-value

    npm install element-value


or as a browser global

    <script src="element-value/index.js"></script>

Usage
=====

requirejs/jam
-------------

    define(['element-value'], function(value){
      var $inp = document.querySelector('.redform input');
      var data = value($inp)
    })

node/browserify
---------------

    var value = require('element-value');
    var $inp = document.querySelector('.redform input');
    var data = value($inp)

Credits
=======

I had to port this for a project from https://github.com/component/value