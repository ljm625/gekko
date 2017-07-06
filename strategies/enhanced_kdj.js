/**
 * Created by jiaminli on 2017/7/6.
 */

var log = require('../core/log');
var config = require('../core/util.js').getConfig();
var settings = config.enhanced_kdj;
var method = {};


method.init = function() {
    var customStochSettings = {
        optInFastK_Period:9,
        optInSlowK_Period:3,
        optInSlowK_MAType:0,
        optInSlowD_Period:3,
        optInSlowD_MAType:0
    }

    // add the indicator to the method
    this.addTalibIndicator('kdj', 'stoch', customStochSettings);
}

method.check = function() {
    // use indicator results
    var result = this.talibIndicators.stoch.result;
    log.debug(result);
    // do something with macdiff
};
module.exports = method;