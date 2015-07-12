var Epo = function(config) {
  if (config) {
    this.oauth = {
      useBasicAuthorizationHeader: true,
      site: 'https://ops.epo.org/3.1',
      tokenPath: "/auth/accesstoken",
    };
    this.oauth.clientID = config.clientID || "";
    this.oauth.clientSecret = config.clientSecret || "";
  }
};
Epo.prototype.service_url_prefix = 'https://ops.epo.org/3.1/rest-services';
Epo.prototype.family_path = 'family';
Epo.prototype.published_data_path = 'published-data';
Epo.prototype.published_data_search_path = 'published-data/search';
Epo.prototype.register_path = 'register';
Epo.prototype.register_search_path = 'register/search';
Epo.prototype.generate_token = function(callback) {
  var _this = this;
  if (this.oauth && this.oauth.clientID && this.oauth.clientSecret) {
    var oauth2 = require('simple-oauth2')(this.oauth);
    var params = {};
    oauth2.client.getToken(params, function(error, result) {
      if (error) {
        console.log('Access Token Error', error.message);
      } else if (result) {
        _this.token = oauth2.accessToken.create(result);
        if (callback && typeof callback === "function") {
          callback.call(_this);
        }
      }
    });
  } else {
    coonsole.log("epo:Error : clientID OR clientSecret not-set");
  }
};
Epo.prototype.read_token = function() {
  return this.token;
};
Epo.prototype.register = function(options, callback) {
  if (options && options.ref_type && options.format && options.input) {
    options.constituents = options.constituents || "biblio";
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
        this.token.refresh(function(error, result) {
          _this.token = result;
        });
      }
      reqOptions["headers"]["Authorization"] = "Bearer " +this.token["token"]["access_token"];
    }
    if (process.env.DEBUG) console.log('Request to register : ', reqOptions);
    request(reqOptions, function(error, response, body) {
      if (response.statusCode === 200) {
        if (callback && typeof callback === "function") {
          callback.call(null, body);
        }
      }
    });
  }
};
Epo.prototype.published_data = function(options, callback) {
  if (options && options.ref_type && options.format && options.input) {
    options.constituents = options.constituents || "biblio";
    var request = require('request');
    var urlBuilder = [this.service_url_prefix, this.published_data_path, options.ref_type, options.format, options.input, options.constituents];
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
        this.token.refresh(function(error, result) {
          _this.token = result;
        });
      }
      reqOptions["headers"]["Authorization"] = "Bearer " +this.token["token"]["access_token"];
    }
    if (process.env.DEBUG) console.log('Request to register : ', reqOptions);
    request(reqOptions, function(error, response, body) {
      if (response.statusCode === 200) {
        if (callback && typeof callback === "function") {
          callback.call(null, body);
        }
      }
    });
  }
};
Epo.prototype.family = function(options, callback) {
  if (options && options.ref_type && options.format && options.input) {
    options.constituents = options.constituents || "";
    var request = require('request');
    var urlBuilder = [this.service_url_prefix, this.family_path, options.ref_type, options.format, options.input, options.constituents];
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
        this.token.refresh(function(error, result) {
          _this.token = result;
        });
      }
      reqOptions["headers"]["Authorization"] = "Bearer " +this.token["token"]["access_token"];
    }
    if (process.env.DEBUG) console.log('Request to register : ', reqOptions);
    request(reqOptions, function(error, response, body) {
      if (response.statusCode === 200) {
        if (callback && typeof callback === "function") {
          callback.call(null, body);
        }
      }
    });
  }
};
Epo.prototype.published_data_search = function(options, callback) {
  if (options && options.cql) {
    options.range_begin = options.range_begin || 1;
    options.range_end = options.range_end || 25;
    var request = require('request');
    var urlBuilder = this.service_url_prefix + "/" + this.published_data_search_path + "?q=" + options.cql + "&Range=" + options.range_begin + "-" + options.range_end;
    var reqOptions = {
      url: urlBuilder,
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
        this.token.refresh(function(error, result) {
          _this.token = result;
        });
      }
      reqOptions["headers"]["Authorization"] = "Bearer " +this.token["token"]["access_token"];
    }
    if (process.env.DEBUG) console.log('Request to register : ', reqOptions);
    request(reqOptions, function(error, response, body) {
      if (response.statusCode === 200) {
        if (callback && typeof callback === "function") {
          callback.call(null, body);
        }
      }
    });
  }
};
Epo.prototype.register_search = function(options, callback) {
  if (options && options.cql) {
    options.range_begin = options.range_begin || 1;
    options.range_end = options.range_end || 25;
    var request = require('request');
    var urlBuilder = this.service_url_prefix + "/" + this.register_search_path + "?q=" + options.cql + "&Range=" + options.range_begin + "-" + options.range_end;
    var reqOptions = {
      url: urlBuilder,
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
        this.token.refresh(function(error, result) {
          _this.token = result;
        });
      }
      reqOptions["headers"]["Authorization"] = "Bearer " +this.token["token"]["access_token"];
    }
    if (process.env.DEBUG) console.log('Request to register : ', reqOptions);
    request(reqOptions, function(error, response, body) {
      if (response.statusCode === 200) {
        if (callback && typeof callback === "function") {
          callback.call(null, body);
        }
      }
    });
  }
};
var myEpo = new Epo({
  clientID: '3U0OeLMQOj5pxi0Mqs5oVYM3BrxxmS3P',
  clientSecret: 's5qxUm5vnQdUOqJ6'
});
myEpo.generate_token(function() {
  console.log(this.token);
  myEpo.register_search({
    cql: "ti%3Dplastic",
    range_begin: 1,
    range_end: 30
  }, function(epo_data) {
    console.log(epo_data);
  });
});
// myEpo.register({
//   ref_type: "publication",
//   format: "epodoc",
//   input: "EP1122334"
// }, function(epo_data) {
//   console.log(JSON.parse(epo_data));
// });
// myEpo.register_search({
//   cql: "ti%3Dplastic",
//   range_begin: 1,
//   range_end: 30
// }, function(epo_data) {
//   console.log(epo_data);
// });


// coonsole.log(myEpo.read_token);
