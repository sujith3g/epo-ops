/**
 * Interface for classes that represents [EPO-OPS](https://developers.epo.org/) instance.
 *
 * @interface Epo
 * @param {Object} config optional configurations object for EPO-OPS instance.
 * @param {String} config.clientID is the clientID from the EPO-OPS for registered users.
 * @param {String} config.clientSecret is the clientSecret from the EPO-OPS for registered users.
 */
const Epo = function (config) {
  if (config && config.clientID && config.clientSecret) {
    this.oauth = {
      useBasicAuthorizationHeader: true,
      site: 'https://ops.epo.org/3.2',
      tokenPath: '/auth/accesstoken',
    };
    this.oauth.clientID = config.clientID;
    this.oauth.clientSecret = config.clientSecret;
  } else {
    throw new Error('clientID and clientSecret is required for EPO-OPS v3.2');
  }
};
Epo.prototype.service_url_prefix = 'https://ops.epo.org/3.2/rest-services';
Epo.prototype.family_path = 'family';
Epo.prototype.published_data_path = 'published-data';
Epo.prototype.published_data_search_path = 'published-data/search';
Epo.prototype.register_path = 'register';
Epo.prototype.register_search_path = 'register/search';
/**
Get the oauth-token from epo-ops if there is clientID & clientSecret provided, and populates `token` property with oauth-token.
This is optional, only for users registered with EPO-OPS and have a clientID & clientSecret.
@param {Function} callback `callback` is called with `this` as EPO-OPS instance with oauth-token.
*/
Epo.prototype.generate_token = function (callback) {
  // eslint-disable-next-line no-underscore-dangle
  const _this = this;
  if (this.oauth && this.oauth.clientID && this.oauth.clientSecret) {
    const oauth2 = require('simple-oauth2')(this.oauth);
    const params = {};
    oauth2.client.getToken(params, (error, result) => {
      if (error) {
        // eslint-disable-next-line no-console
        console.log('Access Token Error', error.message);
      } else if (result) {
        _this.token = oauth2.accessToken.create(result);
        if (callback && typeof callback === 'function') {
          callback.call(_this);
        }
      }
    });
  } else {
    // eslint-disable-next-line no-console
    console.log('epo:Error : clientID OR clientSecret not-set');
  }
};
/**
Returns the oauth-token if there is generated token available for the EPO-OPS instance.
*/
Epo.prototype.read_token = function () {
  return this.token;
};
/**
For retrieving data using EPO-OPS Register service
@param {Object} options an object with API options/inputs
@param {String} options.ref_type is the Reference type of OPS register service `publication` OR `application`
@param {String} options.format Any of the valid EPO-OPS input format `epodoc` OR `docdb`
@param {String} options.input The input patent/publication/application number
@param {string} options.constituents can be any of the valid EPO-OPS register services `biblio`,`events`,`procedural-steps`.
@param {Function} callback `callback` is invoked with first argument as `error` (if any), and second argument as the JSON Respose from EPO-OPS.
*/
Epo.prototype.register = function (options, callback) {
  if (options && options.ref_type && options.format && options.input) {
    options.constituents = options.constituents || 'biblio';
    var request = require('request');
    var urlBuilder = [this.service_url_prefix, this.register_path, options.ref_type, options.format, options.input, options.constituents];
    var reqOptions = {
      url: urlBuilder.join("/"),
      headers: {
        'Accept': 'application/json',
        'Connection': 'Keep-Alive',
        'Host': 'ops.epo.org',
        'X-Target-URI': 'http://ops.epo.org'
      }
    };
    if (this.token) {
      if (this.token.expired()) {
        _this = this;
        this.token.refresh(function (error, result) {
          _this.token = result;
        });
      }
      reqOptions['headers']['Authorization'] = 'Bearer ' +this.token['token']['access_token'];
    }
    if (process.env.DEBUG) console.log('Request to register : ', reqOptions);
    request(reqOptions, function (error, response, body) {
      if (response.statusCode === 200) {
        if (callback && typeof callback === 'function') {
          callback.call(null, body);
        }
      }
    });
  }
};
/**
For retrieving data using EPO-OPS published data service
@param {Object} options An object containing different options including input to retrieve data from OPS.
@param {String} options.ref_type is the Reference type of OPS published data service `application`,`publication`,`priority`
@param {String} options.format Any of the valid EPO-OPS input format `epodoc` OR `docdb`
@param {String} options.input The input patent/publication/application number
@param {String} options.constituents can be any of the valid EPO-OPS published data services `biblio`,`abstract`,`full-cycle`,etc.
@param {Function} callback `callback` is invoked with first argument as `error` (if any), and second argument as the JSON Respose from EPO-OPS.
*/
Epo.prototype.published_data = function (options, callback) {
  if (options && options.ref_type && options.format && options.input) {
    options.constituents = options.constituents || "biblio";
    var request = require('request');
    var urlBuilder = [this.service_url_prefix, this.published_data_path, options.ref_type, options.format, options.input, options.constituents];
    var reqOptions = {
      url: urlBuilder.join('/'),
      headers: {
        'Accept': 'application/json',
        'Connection': 'Keep-Alive',
        'Host': 'ops.epo.org',
        'X-Target-URI': 'http://ops.epo.org',
      },
    };
    if (this.token) {
      if (this.token.expired()) {
        _this = this;
        this.token.refresh(function (error, result) {
          _this.token = result;
        });
      }
      reqOptions['headers']['Authorization'] = 'Bearer ' +this.token['token']['access_token'];
    }
    if (process.env.DEBUG) console.log('Request to register : ', reqOptions);
    request(reqOptions, function (error, response, body) {
      if (response.statusCode === 200) {
        if (callback && typeof callback === 'function') {
          callback.call(null, body);
        }
      }
    });
  }
};
/**
For retrieving data using EPO-OPS family service
@param {Object} options An object containing different options including input to retrieve data from OPS.
@param {String} options.ref_type is the Reference type of OPS Family service `application`,`publication`,`priority`
@param {String} options.format Any of the valid EPO-OPS input format `epodoc` OR `docdb`
@param {String} options.input The input patent/publication/application number
@param {String} options.constituents can be any of the valid EPO-OPS Family services `biblio`,`legal`.
@param {Function} callback `callback` is invoked with first argument as `error` (if any), and second argument as the JSON Respose from EPO-OPS.
*/
Epo.prototype.family = function (options, callback) {
  if (options && options.ref_type && options.format && options.input) {
    options.constituents = options.constituents || "";
    var request = require('request');
    var urlBuilder = [this.service_url_prefix, this.family_path, options.ref_type, options.format, options.input, options.constituents];
    var reqOptions = {
      url: urlBuilder.join('/'),
      headers: {
        'Accept': 'application/json',
        'Connection': 'Keep-Alive',
        'Host': 'ops.epo.org',
        'X-Target-URI': 'http://ops.epo.org',
      },
    };
    if (this.token) {
      if (this.token.expired()) {
        _this = this;
        this.token.refresh(function (error, result) {
          _this.token = result;
        });
      }
      reqOptions['headers']['Authorization'] = 'Bearer ' +this.token['token']['access_token'];
    }
    if (process.env.DEBUG) console.log('Request to register : ', reqOptions);
    request(reqOptions, function (error, response, body) {
      if (response.statusCode === 200) {
        if (callback && typeof callback === "function") {
          callback.call(null, body);
        }
      }
    });
  }
};
/**
For retrieving data using CQL query and EPO-OPS published data search service
@param {Object} options An object containing different options including input to retrieve data from OPS.
@param {String} options.cql is the CQL search query for retrieving data from published data search.
@param {Number} options.range_begin start/min value of Range of results to be retrieved.
@param {String} options.range_end end/max value of Range of results to be retrieved.
@param {Function} callback `callback` is invoked with first argument as `error` (if any), and second argument as the JSON Respose from EPO-OPS.
*/
Epo.prototype.published_data_search = function (options, callback) {
  if (options && options.cql) {
    options.range_begin = options.range_begin || 1;
    options.range_end = options.range_end || 25;
    var request = require('request');
    var urlBuilder = this.service_url_prefix + '/' + this.published_data_search_path + '?q=' + options.cql + '&Range=' + options.range_begin + '-' + options.range_end;
    var reqOptions = {
      url: urlBuilder,
      headers: {
        'Accept': 'application/json',
        'Connection': 'Keep-Alive',
        'Host': 'ops.epo.org',
        'X-Target-URI': 'http://ops.epo.org',
      },
    };
    if (this.token) {
      if (this.token.expired()) {
        _this = this;
        this.token.refresh(function (error, result) {
          _this.token = result;
        });
      }
      reqOptions['headers']['Authorization'] = 'Bearer ' +this.token['token']['access_token'];
    }
    if (process.env.DEBUG) console.log('Request to register : ', reqOptions);
    request(reqOptions, function (error, response, body) {
      if (response.statusCode === 200) {
        if (callback && typeof callback === 'function') {
          callback.call(null, body);
        }
      }
    });
  }
};
/**
For retrieving data using CQL query and EPO-OPS register search service
@param {Object} options An object containing different options including input to retrieve data from OPS.
@param {String} options.cql is the CQL search query for retrieving data from register search.
@param {Number} options.range_begin start/min value of Range of results to be retrieved.
@param {String} options.range_end end/max value of Range of results to be retrieved.
@param {Function} callback `callback` is invoked with first argument as `error` (if any), and second argument as the JSON Respose from EPO-OPS.
*/

Epo.prototype.register_search = function (options, callback) {
  if (options && options.cql) {
    options.range_begin = options.range_begin || 1;
    options.range_end = options.range_end || 25;
    var request = require('request');
    var urlBuilder = this.service_url_prefix + '/' + this.register_search_path + '?q=' + options.cql + '&Range=' + options.range_begin + '-' + options.range_end;
    var reqOptions = {
      url: urlBuilder,
      headers: {
        'Accept': 'application/json',
        'Connection': 'Keep-Alive',
        'Host': 'ops.epo.org',
        'X-Target-URI': 'http://ops.epo.org',
      },
    };
    if (this.token) {
      if (this.token.expired()) {
        _this = this;
        this.token.refresh(function (error, result) {
          _this.token = result;
        });
      }
      reqOptions['headers']['Authorization'] = 'Bearer ' +this.token['token']['access_token'];
    }
    if (process.env.DEBUG) console.log('Request to register : ', reqOptions);
    request(reqOptions, function (error, response, body) {
      if (response.statusCode === 200) {
        if (callback && typeof callback === 'function') {
          callback.call(null, body);
        }
      }
    });
  }
};
module.exports = Epo;
