epo
----------

[Espacenet](http://worldwide.espacenet.com/?locale=en_EP) Open Patent Service API [OPS v.3.1](https://developers.epo.org/?) wraper.

[![Download count](https://img.shields.io/npm/dt/epo.svg?style=flat)](https://www.npmjs.org/package/epo)

For detailed documentation [see here](https://github.com/sujith3g/epo-ops/blob/master/doc.md).

### Basic usage

```javascript
  var epo = require('epo');
  var myEpo = new epo();
  myEpo.register({
   ref_type: "publication",
    format: "epodoc",
    input: "EP1122334"
  },function(epo_data){
    console.log(JSON.parse(epo_data));
  });
///  for registered users
  var myEpo = new epo({
    clientID: 'your-id',
    clientSecret: 'your-secret'
  });
  myEpo.generate_token(function() {
    myEpo.register({
     ref_type: "publication",
      format: "epodoc",
      input: "EP1122334"
    },function(epo_data){
      console.log(JSON.parse(epo_data));
    });
    this.register_search({
      cql: "ti%3Dplastic",
      range_begin: 1,
      range_end: 30
    }, function(epo_data) {
      console.log(epo_data);
    });
 });

```
