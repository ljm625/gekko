/**
 * Created by jiaminli on 2017/7/6.
 */

var log = require('../core/log');
var config = require('../core/util.js').getConfig();
var settings = config.enhanced_kdj;
var method = {};

method.init = function() {

    this.trend = {
        action: 'short'
    };


    var customStochSettings = {
        optInFastK_Period:9,
        optInSlowK_Period:3,
        optInSlowK_MAType:0,
        optInSlowD_Period:3,
        optInSlowD_MAType:0
    }
    this.requiredHistory = config.tradingAdvisor.historySize;

    // add the indicator to the method
    this.addTalibIndicator('kdj', 'stoch', customStochSettings);
}

method.update = function (candle) {
    // this.talibIndicators.kdj.run();
}

// For debugging purposes.
method.log = function () {
    // log.debug('calculated random number:');
    // log.debug('\t', this.randomNumber.toFixed(3));
}



method.check = function() {
    // use indicator results
    var result = this.talibIndicators.kdj.result;
    log.debug(result);
    if(this.trend.action==='short'){
        if(result.outSlowD<10 && result.outSlowK<10){
            log.debug("Best Buy Point");
            this.trend.action='long';
            this.advice('long');
        }

    }
    else if (this.trend.action==='long'){
        if(result.outSlowD>90 && result.outSlowK>90){
            log.debug("Best Sell Point");
            this.trend.action='short';
            this.advice('short');
        }
    }
    // do something with macdiff
};
module.exports = method;