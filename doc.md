<a name="Epo"></a>
## Epo
Interface for classes that represents [EPO-OPS](https://developers.epo.org/) instance.

**Kind**: global interface  

| Param | Type | Description |
| --- | --- | --- |
| config | <code>Object</code> | optional configurations object for EPO-OPS instance. |
| config.clientID | <code>String</code> | is the clientID from the EPO-OPS for registered users. |
| config.clientSecret | <code>String</code> | is the clientSecret from the EPO-OPS for registered users. |


* [Epo](#Epo)
  * [.generate_token(callback)](#Epo+generate_token)
  * [.read_token()](#Epo+read_token)
  * [.register(options, callback)](#Epo+register)
  * [.published_data(options, callback)](#Epo+published_data)
  * [.family(options, callback)](#Epo+family)
  * [.published_data_search(options, callback)](#Epo+published_data_search)
  * [.register_search(options, callback)](#Epo+register_search)

<a name="Epo+generate_token"></a>
### epo.generate_token(callback)
Get the oauth-token from epo-ops if there is clientID & clientSecret provided, and populates `token` property with oauth-token.
This is optional, only for users registered with EPO-OPS and have a clientID & clientSecret.

**Kind**: instance method of <code>[Epo](#Epo)</code>  

| Param | Type | Description |
| --- | --- | --- |
| callback | <code>function</code> | `callback` is called with `this` as EPO-OPS instance with oauth-token. |

<a name="Epo+read_token"></a>
### epo.read_token()
Returns the oauth-token if there is generated token available for the EPO-OPS instance.

**Kind**: instance method of <code>[Epo](#Epo)</code>  
<a name="Epo+register"></a>
### epo.register(options, callback)
For retrieving data using EPO-OPS Register service

**Kind**: instance method of <code>[Epo](#Epo)</code>  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>Object</code> | an object with API options/inputs |
| options.ref_type | <code>String</code> | is the Reference type of OPS register service `publication` OR `application` |
| options.format | <code>String</code> | Any of the valid EPO-OPS input format `epodoc` OR `docdb` |
| options.input | <code>String</code> | The input patent/publication/application number |
| options.constituents | <code>string</code> | can be any of the valid EPO-OPS register services `biblio`,`events`,`procedural-steps`. |
| callback | <code>function</code> | `callback` is invoked with first argument as `error` (if any), and second argument as the JSON Respose from EPO-OPS. |

<a name="Epo+published_data"></a>
### epo.published_data(options, callback)
For retrieving data using EPO-OPS published data service

**Kind**: instance method of <code>[Epo](#Epo)</code>  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>Object</code> | An object containing different options including input to retrieve data from OPS. |
| options.ref_type | <code>String</code> | is the Reference type of OPS published data service `application`,`publication`,`priority` |
| options.format | <code>String</code> | Any of the valid EPO-OPS input format `epodoc` OR `docdb` |
| options.input | <code>String</code> | The input patent/publication/application number |
| options.constituents | <code>String</code> | can be any of the valid EPO-OPS published data services `biblio`,`abstract`,`full-cycle`,etc. |
| callback | <code>function</code> | `callback` is invoked with first argument as `error` (if any), and second argument as the JSON Respose from EPO-OPS. |

<a name="Epo+family"></a>
### epo.family(options, callback)
For retrieving data using EPO-OPS family service

**Kind**: instance method of <code>[Epo](#Epo)</code>  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>Object</code> | An object containing different options including input to retrieve data from OPS. |
| options.ref_type | <code>String</code> | is the Reference type of OPS Family service `application`,`publication`,`priority` |
| options.format | <code>String</code> | Any of the valid EPO-OPS input format `epodoc` OR `docdb` |
| options.input | <code>String</code> | The input patent/publication/application number |
| options.constituents | <code>String</code> | can be any of the valid EPO-OPS Family services `biblio`,`legal`. |
| callback | <code>function</code> | `callback` is invoked with first argument as `error` (if any), and second argument as the JSON Respose from EPO-OPS. |

<a name="Epo+published_data_search"></a>
### epo.published_data_search(options, callback)
For retrieving data using CQL query and EPO-OPS published data search service

**Kind**: instance method of <code>[Epo](#Epo)</code>  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>Object</code> | An object containing different options including input to retrieve data from OPS. |
| options.cql | <code>String</code> | is the CQL search query for retrieving data from published data search. |
| options.range_begin | <code>Number</code> | start/min value of Range of results to be retrieved. |
| options.range_end | <code>String</code> | end/max value of Range of results to be retrieved. |
| callback | <code>function</code> | `callback` is invoked with first argument as `error` (if any), and second argument as the JSON Respose from EPO-OPS. |

<a name="Epo+register_search"></a>
### epo.register_search(options, callback)
For retrieving data using CQL query and EPO-OPS register search service

**Kind**: instance method of <code>[Epo](#Epo)</code>  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>Object</code> | An object containing different options including input to retrieve data from OPS. |
| options.cql | <code>String</code> | is the CQL search query for retrieving data from register search. |
| options.range_begin | <code>Number</code> | start/min value of Range of results to be retrieved. |
| options.range_end | <code>String</code> | end/max value of Range of results to be retrieved. |
| callback | <code>function</code> | `callback` is invoked with first argument as `error` (if any), and second argument as the JSON Respose from EPO-OPS. |

