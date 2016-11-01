/******************************************************************************
 UNCLASSIFIED
 © 2016 Applied Information Sciences
 See COPYRIGHT.txt for licensing information
 ******************************************************************************/


(function () {
  'use strict';
  var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
  var atob = require('atob');
  const es_host = process.env.REPORTS_ES_HOST;

  function getSync(url) {
    var request = new XMLHttpRequest();
    request.open('GET', url, false);
    request.send(null);

    return [request.status, JSON.parse(request.responseText), {}];
  };

  function DownloadService() {
    var pub = {};

    pub.downloadFile = function(id, reply) {

      var file_url = (['http:/',es_host,'reports/document',id]).join('/');

      var data = getSync(file_url)[1];
      var report_content = data._source.report_content;
      //response(data);

      var response = reply(atob(report_content._content)).hold();
      var header = response.header('Content-Type', report_content._content_type).header('Content-Disposition', 'attachment; filename=' + report_content._name);
      response.send();

    };

    return pub;
  }



  module.exports = DownloadService;
})();