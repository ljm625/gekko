/**
 * Created by jiaminli on 2017/7/6.
 */

var log = require('../core/log');
var config = require('../core/util.js').getConfig();
var settings = config.enhanced_kdj;
var method = {};

method.init = function() {

    this.trend = {
        action: 'short',
        over_buy:0,
        over_sell:0,
        previous_K:0,
        previous_D:0
    };


    var customStochSettings = {
        optInFastK_Period:settings.optInFastK_Period,
        optInSlowK_Period:settings.optInSlowK_Period,
        optInSlowK_MAType:settings.optInSlowK_MAType,
        optInSlowD_Period:settings.optInSlowD_Period,
        optInSlowD_MAType:settings.optInSlowD_MAType
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



method.check = function(candle) {
    // use indicator results
    if(candle.volume===0) return; // Make sure we don't count when the website is down.
    var result = this.talibIndicators.kdj.result;
    // log.debug(result);
    if(this.trend.action==='short'){
        if(result.outSlowD>=settings.D_low_level || result.outSlowK>=settings.K_low_level){
            if(this.trend.over_buy>=settings.period){
                this.trend.action='long';
                this.advice('long');
            }
            this.trend.over_buy=0;
            return;
        }
        
        if(result.outSlowD<settings.D_low_level && result.outSlowK<settings.K_low_level){
            log.debug("People started to overbuy");
            this.trend.over_buy+=1;
            // this.trend.action='long';
            // this.advice('long');
        }

    }
    else if (this.trend.action==='long'){
        if(result.outSlowD<=settings.D_high_level || result.outSlowK<=settings.K_high_level){
            if(this.trend.over_sell>=settings.period){
                this.trend.action='short';
                this.advice('short');
            }
            this.trend.over_sell=0;
            return;
        }
        if(result.outSlowD>settings.D_high_level && result.outSlowK>settings.K_high_level){
            log.debug("Best Sell Point");
            this.trend.over_sell+=1;
        }
    }
};
module.exports = method;