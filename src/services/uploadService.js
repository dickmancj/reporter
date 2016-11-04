/******************************************************************************
 UNCLASSIFIED
 © 2016 Applied Information Sciences
 See COPYRIGHT.txt for licensing information
 ******************************************************************************/

(function () {
 'use strict';
 //var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
 var fs = require('fs');
 var atob = require('atob');
 //const es_host = process.env.REPORTS_ES_HOST;

 function UploadService(){
  var pub = {};

  pub.SaveReport = function(report){
   //console.log(report);
   fs.writeFile(process.env.REPORTS_ES_FILEDIR + '/' + report.report_content._name, atob(report.report_content._content), function(err) {
    if(err) {
     return console.log(err);
    }

    console.log("The file was saved!");
   });
  };

  return pub;
 }

 module.exports = UploadService;

})();
