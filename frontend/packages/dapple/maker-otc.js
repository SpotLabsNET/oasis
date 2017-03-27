if (typeof Dapple === 'undefined') {
  Dapple = {};
}

if (typeof web3 === 'undefined' && typeof Web3 === 'undefined') {
  var Web3 = require('web3');
}

Dapple['maker-otc'] = (function builder () {
  var environments = {
      'develop': {},
      'live': {
        'otc': {
          'value': '0xc350ebf34b6d83b64ea0ee4e39b6ebe18f02ad2f',
          'type': 'ExpiringMarket[]'
        }
      },
      'kovan': {
        'otc': {
          'value': '0x5490ebdbABC74046855A3104095E71f19BE97f20',
          'type': 'ExpiringMarket[]'
        }
      }
    };

  function ContractWrapper (headers, _web3) {
    if (!_web3) {
      throw new Error('Must supply a Web3 connection!');
    }

    this.headers = headers;
    this._class = _web3.eth.contract(headers.interface);
  }

  ContractWrapper.prototype.deploy = function () {
    throw new Error('Module was built without any deploy data.');
  };

  ContractWrapper.prototype.new = function () {
    throw new Error('Module was built without any deploy data.');
  };

  var passthroughs = ['at'];
  for (var i = 0; i < passthroughs.length; i += 1) {
    ContractWrapper.prototype[passthroughs[i]] = (function (passthrough) {
      return function () {
        return this._class[passthrough].apply(this._class, arguments);
      };
    })(passthroughs[i]);
  }

  function constructor (_web3, env) {
    if (!env) {
      env = {
      'objects': {},
      'type': 'internal'
    };
    }
    if(!("objects" in env) && typeof env === "object") {
      env = {objects: env};
    }
    while (typeof env !== 'object') {
      if (!(env in environments)) {
        throw new Error('Cannot resolve environment name: ' + env);
      }
      env = environments[env];
    }

    if (typeof _web3 === 'undefined') {
      if (!env.rpcURL) {
        throw new Error('Need either a Web3 instance or an RPC URL!');
      }
      _web3 = new Web3(new Web3.providers.HttpProvider(env.rpcURL));
    }

    this.headers = {
      'ExpiringMarket': {
        'interface': [{"constant":false,"inputs":[{"name":"closeMarket","type":"bool"}],"name":"setClosed","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"haveToken","type":"address"},{"name":"wantToken","type":"address"},{"name":"haveAmount","type":"uint128"},{"name":"wantAmount","type":"uint128"}],"name":"make","outputs":[{"name":"id","type":"bytes32"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"last_offer_id","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"cancelAllOffers","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"id","type":"uint256"}],"name":"getNextOfferId","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"id","type":"uint256"}],"name":"cancel","outputs":[{"name":"success","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"id","type":"uint256"}],"name":"getOffer","outputs":[{"name":"","type":"uint256"},{"name":"","type":"address"},{"name":"","type":"uint256"},{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"mingas","type":"uint256"}],"name":"setCancelMingas","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"id","type":"bytes32"},{"name":"maxTakeAmount","type":"uint128"}],"name":"take","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"getTime","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"close_time","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"sell_which_token","type":"address"},{"name":"min_amount","type":"uint256"}],"name":"setMinSellAmount","outputs":[{"name":"success","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"lifetime","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"first_offer_id","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"id","type":"uint256"}],"name":"isActive","outputs":[{"name":"active","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"offers","outputs":[{"name":"sell_how_much","type":"uint256"},{"name":"sell_which_token","type":"address"},{"name":"buy_how_much","type":"uint256"},{"name":"buy_which_token","type":"address"},{"name":"owner","type":"address"},{"name":"active","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"destructContract","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"getFirstOffer","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"sell_which_token","type":"address"}],"name":"deleteMinSellAmount","outputs":[{"name":"success","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"min_sell_amount","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"sell_which_token","type":"address"}],"name":"getMinSellAmount","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"id","type":"bytes32"}],"name":"kill","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"prev_offer_id","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"isClosed","outputs":[{"name":"closed","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"id","type":"uint256"}],"name":"getOwner","outputs":[{"name":"owner","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"getOfferCount","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"id","type":"uint256"}],"name":"getPrevOfferId","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"id","type":"uint256"},{"name":"quantity","type":"uint256"}],"name":"buy","outputs":[{"name":"success","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"sell_how_much","type":"uint256"},{"name":"sell_which_token","type":"address"},{"name":"buy_how_much","type":"uint256"},{"name":"buy_which_token","type":"address"}],"name":"offer","outputs":[{"name":"id","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"next_offer_id","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"getLastOffer","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"inputs":[{"name":"lifetime_","type":"uint256"}],"payable":false,"type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"id","type":"uint256"}],"name":"ItemUpdate","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"sell_how_much","type":"uint256"},{"indexed":true,"name":"sell_which_token","type":"address"},{"indexed":false,"name":"buy_how_much","type":"uint256"},{"indexed":true,"name":"buy_which_token","type":"address"}],"name":"Trade","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"id","type":"bytes32"},{"indexed":true,"name":"pair","type":"bytes32"},{"indexed":true,"name":"maker","type":"address"},{"indexed":false,"name":"haveToken","type":"address"},{"indexed":false,"name":"wantToken","type":"address"},{"indexed":false,"name":"haveAmount","type":"uint128"},{"indexed":false,"name":"wantAmount","type":"uint128"},{"indexed":false,"name":"timestamp","type":"uint64"}],"name":"LogMake","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"id","type":"bytes32"},{"indexed":true,"name":"pair","type":"bytes32"},{"indexed":true,"name":"maker","type":"address"},{"indexed":false,"name":"haveToken","type":"address"},{"indexed":false,"name":"wantToken","type":"address"},{"indexed":true,"name":"taker","type":"address"},{"indexed":false,"name":"takeAmount","type":"uint128"},{"indexed":false,"name":"giveAmount","type":"uint128"},{"indexed":false,"name":"timestamp","type":"uint64"}],"name":"LogTake","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"id","type":"bytes32"},{"indexed":true,"name":"pair","type":"bytes32"},{"indexed":true,"name":"maker","type":"address"},{"indexed":false,"name":"haveToken","type":"address"},{"indexed":false,"name":"wantToken","type":"address"},{"indexed":false,"name":"haveAmount","type":"uint128"},{"indexed":false,"name":"wantAmount","type":"uint128"},{"indexed":false,"name":"timestamp","type":"uint64"}],"name":"LogKill","type":"event"}]
      },
      'SimpleMarket': {
        'interface': [{"constant":false,"inputs":[{"name":"closeMarket","type":"bool"}],"name":"setClosed","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"haveToken","type":"address"},{"name":"wantToken","type":"address"},{"name":"haveAmount","type":"uint128"},{"name":"wantAmount","type":"uint128"}],"name":"make","outputs":[{"name":"id","type":"bytes32"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"last_offer_id","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"cancelAllOffers","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"id","type":"uint256"}],"name":"getNextOfferId","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"id","type":"uint256"}],"name":"cancel","outputs":[{"name":"success","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"id","type":"uint256"}],"name":"getOffer","outputs":[{"name":"","type":"uint256"},{"name":"","type":"address"},{"name":"","type":"uint256"},{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"mingas","type":"uint256"}],"name":"setCancelMingas","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"id","type":"bytes32"},{"name":"maxTakeAmount","type":"uint128"}],"name":"take","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"sell_which_token","type":"address"},{"name":"min_amount","type":"uint256"}],"name":"setMinSellAmount","outputs":[{"name":"success","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"first_offer_id","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"id","type":"uint256"}],"name":"isActive","outputs":[{"name":"active","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"offers","outputs":[{"name":"sell_how_much","type":"uint256"},{"name":"sell_which_token","type":"address"},{"name":"buy_how_much","type":"uint256"},{"name":"buy_which_token","type":"address"},{"name":"owner","type":"address"},{"name":"active","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"destructContract","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"getFirstOffer","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"sell_which_token","type":"address"}],"name":"deleteMinSellAmount","outputs":[{"name":"success","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"min_sell_amount","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"sell_which_token","type":"address"}],"name":"getMinSellAmount","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"id","type":"bytes32"}],"name":"kill","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"prev_offer_id","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"isClosed","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"id","type":"uint256"}],"name":"getOwner","outputs":[{"name":"owner","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"getOfferCount","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"id","type":"uint256"}],"name":"getPrevOfferId","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"id","type":"uint256"},{"name":"quantity","type":"uint256"}],"name":"buy","outputs":[{"name":"success","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"sell_how_much","type":"uint256"},{"name":"sell_which_token","type":"address"},{"name":"buy_how_much","type":"uint256"},{"name":"buy_which_token","type":"address"}],"name":"offer","outputs":[{"name":"id","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"next_offer_id","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"getLastOffer","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"inputs":[],"payable":false,"type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"id","type":"uint256"}],"name":"ItemUpdate","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"sell_how_much","type":"uint256"},{"indexed":true,"name":"sell_which_token","type":"address"},{"indexed":false,"name":"buy_how_much","type":"uint256"},{"indexed":true,"name":"buy_which_token","type":"address"}],"name":"Trade","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"id","type":"bytes32"},{"indexed":true,"name":"pair","type":"bytes32"},{"indexed":true,"name":"maker","type":"address"},{"indexed":false,"name":"haveToken","type":"address"},{"indexed":false,"name":"wantToken","type":"address"},{"indexed":false,"name":"haveAmount","type":"uint128"},{"indexed":false,"name":"wantAmount","type":"uint128"},{"indexed":false,"name":"timestamp","type":"uint64"}],"name":"LogMake","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"id","type":"bytes32"},{"indexed":true,"name":"pair","type":"bytes32"},{"indexed":true,"name":"maker","type":"address"},{"indexed":false,"name":"haveToken","type":"address"},{"indexed":false,"name":"wantToken","type":"address"},{"indexed":true,"name":"taker","type":"address"},{"indexed":false,"name":"takeAmount","type":"uint128"},{"indexed":false,"name":"giveAmount","type":"uint128"},{"indexed":false,"name":"timestamp","type":"uint64"}],"name":"LogTake","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"id","type":"bytes32"},{"indexed":true,"name":"pair","type":"bytes32"},{"indexed":true,"name":"maker","type":"address"},{"indexed":false,"name":"haveToken","type":"address"},{"indexed":false,"name":"wantToken","type":"address"},{"indexed":false,"name":"haveAmount","type":"uint128"},{"indexed":false,"name":"wantAmount","type":"uint128"},{"indexed":false,"name":"timestamp","type":"uint64"}],"name":"LogKill","type":"event"}]
      }
    };

    this.classes = {};
    for (var key in this.headers) {
      this.classes[key] = new ContractWrapper(this.headers[key], _web3);
    }

    this.objects = {};
    for (var i in env.objects) {
      var obj = env.objects[i];
      if(!(obj['type'].split('[')[0] in this.classes)) continue;
      this.objects[i] = this.classes[obj['type'].split('[')[0]].at(obj.value);
    }
  }

  return {
    class: constructor,
    environments: environments
  };
})();

if (typeof module !== 'undefined' && module.exports) {
  module.exports = Dapple['maker-otc'];
}
