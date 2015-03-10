var _package = require('../../package.json'),
  i18n = require('i18n'),
  core = require('ournet.core'),
  utils = require('../utils.js'),
  dataWeather = require('../data/weather.js'),
  util = {
    moment: require('moment'),
    format: require('util').format,
    startWithUpperCase: core.util.startWithUpperCase,
    numberFormat: core.util.numberFormat
  };

module.exports = function(req, res, next) {
  var config = res.locals.config;
  var culture = res.locals.currentCulture = {
    language: res.locale,
    country: config.country
  };
  culture.languageName = config.languagesNames[culture.language];
  culture.countryName = res.locals.__('country_' + culture.country);

  res.locals.site = {
    name: config.name,
    head: {}
  };

  res.locals.project = {
    version: _package.version,
    name: 'exchange'
  };

  //res.locals.noGoogleAds = true;

  res.locals.util = util;

  res.locals.topBarMenu = [];
  res.locals.showTopPageBar = true;

  for (var project in config.projects) {
    var host = config.projects[project];
    var item = {
      id: project,
      text: res.locals.__(project),
      href: 'http://' + host + res.locals.links.home({
        ul: culture.language
      })
    };
    if (host == config.host)
      item.cssClass = 'active';
    res.locals.topBarMenu.push(item);
  }

  utils.maxage(res, 60 * 1);

  dataWeather.getWidget(config.country, culture.language).then(function(widget) {
    res.locals.weatherWidget = widget;
  }).finally(next);
};