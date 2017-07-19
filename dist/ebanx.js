!function(e,r){"object"==typeof exports&&"object"==typeof module?module.exports=r():"function"==typeof define&&define.amd?define([],r):"object"==typeof exports?exports.EBANX=r():e.EBANX=r()}(this,function(){return function(e){function r(i){if(t[i])return t[i].exports;var n=t[i]={exports:{},id:i,loaded:!1};return e[i].call(n.exports,n,n.exports,r),n.loaded=!0,n.exports}var t={};return r.m=e,r.c=t,r.p="",r(0)}([function(e,r){"use strict";var t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},i=function(){var e={},r={country:"",mode:"test",publicKey:""};if(e.config=function(){return{isLive:function(){return"production"===r.mode},setPublishableKey:function(e){r.publicKey=String(e)},setCountry:function(e){i.validator.config.validateCountry(e),r.country=String(e)},setMode:function(e){i.validator.config.validateMode(e),r.mode=e},getMode:function(){return r.mode},getPublishableKey:function(){if(""===r.publicKey.trim())throw new i.errors.InvalidConfigurationError("Missing publishable key. You need set publishable key using the method EBANX.config.setPublishableKey.","publicKey");return r.publicKey},getCountry:function(){return r.country||(r.country="br"),r.country},getLocale:function(){var e={br:"pt_BR",mx:"es"};return e[i.config.getCountry()]}}}(),e.config.isLive()&&"https:"!==location.protocol)throw"EBANXInvalidConfigurationError: Your protocol needs to be https.";return e}();i.errors=function(){return{summary:{pt_BR:{"BP-DR-76":"País não informado.","BP-DR-77":"País não permitido.","BP-DR-75":"O número do cartão de crédito é inválido.","BP-DR-S-75":"A bandeira do cartão de crédito é inválida.","BP-DR-51":"Insira o nome que está impresso no cartão de crédito.","BP-DR-55":"O código do cartão de crédito é inválido.","BP-DR-57":"A data do cartão de crédito deve estar no formato mes/ano, por exemplo, 12/2020.","BP-DR-M-57":"O mês data do cartão de crédito é inválido.","BP-DR-Y-57":"O ano data do cartão de crédito é inválido."},es:{"BP-DR-76":"País não informado.","BP-DR-77":"País não permitido.","BP-DR-75":"El número de tarjeta de crédito es inválido.","BP-DR-S-75":"El bandera de tarjeta de crédito es inválido.","BP-DR-51":"Por favor, introduce el nombre como está en tu tarjeta de crédito.","BP-DR-55":"El código de tarjeta de crédito es inválido.","BP-DR-57":"Por favor, escribe la fecha en el formato MM/AAAA.","BP-DR-M-57":"El mes de tarjeta de crédito es inválido.","BP-DR-Y-57":"El año de tarjeta de crédito es inválido."}},InvalidValueFieldError:function(e,r){this.message=i.errors.summary[i.config.getLocale()][e]||e,this.field=r,this.name="InvalidValueFieldError"},InvalidConfigurationError:function(e,r){this.message=i.errors.summary[i.config.getLocale()][e]||e,this.invalidConfiguration=r,this.name="InvalidConfigurationError"}}}(),i.validator=function(){var e={publicKey:{}};return{config:{validatePublishableKey:function(r,t){var n=i.utils.api.resources.validPublicIntegrationKey();return e.publicKey[r]?void t(e.publicKey[r]):void i.http.ajax.request({url:n.url,method:n.method,data:{public_integration_key:r}}).always(function(i){e.publicKey[r]=i,t(i)})},validateCountry:function(e){if(i.utils.availableCountries.indexOf(e)===-1)throw new i.errors.InvalidValueFieldError("BP-DR-77","country")},validateMode:function(e){if(null===e.match(/^(test|production)$/))throw new i.errors.InvalidConfigurationError('Invalid mode, please, use "test" or "production" as test mode.',"mode")}},card:{validateNumber:function(e){var r=/^3[47][0-9]{13}$|^50[0-9]{14,17}$|^(636368|438935|504175|451416|636297|5067|4576|4011|50904|50905|50906)|^3(?:0[0-5]|[68][0-9])[0-9]{11}$|^6(?:011|5[0-9]{2})[0-9]{12}$|^(38|60)[0-9]{11,17}$|^5[1-5][0-9]{14}$|^4[0-9]{12}(?:[0-9]{3})?$/;if(!r.test(e)||!this.luhnAlgCheck(String(e)))throw new i.errors.InvalidValueFieldError("BP-DR-75","card_number")},validateName:function(e){if("string"!=typeof e||0===e.length||null!==e.match(/[0-9]+/))throw new i.errors.InvalidValueFieldError("BP-DR-51","card_name")},luhnAlgCheck:function(e){var r,t,i,n;for(i=+e[r=e.length-1],n=0;r--;)t=+e[r],i+=++n%2?2*t%10+(t>4):t;return i%10===0},validateCvv:function(e){var r=new RegExp("^[0-9]{3,4}$");if(!String(e).match(r))throw new i.errors.InvalidValueFieldError("BP-DR-55","card_cvv")},validateDueDate:function(e){var r=(e+"").split("/");if(r={now:new Date,year:r[1],month:r[0]},/^\d+$/.test(r.month)!==!0||parseInt(r.month,10)<=12!=!0)throw new i.errors.InvalidValueFieldError("BP-DR-M-57","card_due_date");if(!/^\d+$/.test(r.year))throw new i.errors.InvalidValueFieldError("BP-DR-Y-57","card_due_date");if(r.expiration=new Date(r.year,r.month),r.expiration.setMonth(r.expiration.getMonth()-1),r.expiration.setMonth(r.expiration.getMonth()+1,1),r.expiration>r.now!=!0)throw new i.errors.InvalidValueFieldError("BP-DR-57","card_due_date")},validate:function(e){this.validateName(e.card_name),this.validateNumber(e.card_number),this.validateDueDate(e.card_due_date),this.validateCvv(e.card_cvv)}}}}(),i.tokenize=function(){return{card:{token:function(e,r,t){var n=i.utils.api.resources.createToken();i.http.ajax.request({url:n.url,method:n.method,json:!0,data:{request_body:JSON.stringify({public_integration_key:i.config.getPublishableKey(),payment_type_code:i.utils.creditCardScheme(e.card_number),country:i.config.getCountry(),card:e})}}).always(function(e){return"ERROR"!==e.status&&"token"in e?r(e):t(e)})}}}}(),i.utils=function(){var e={api:{path:function(){return i.config.isLive()?"https://api.ebanx.com/":"https://sandbox.ebanx.com/"}},availableCountries:["br","mx","co"].join(", "),creditCardScheme:function(e){i.validator.card.validateNumber(e);var r={br:{amex:/^3[47][0-9]{13}$/,aura:/^50[0-9]{14,17}$/,elo:/^(636368|438935|504175|451416|636297|5067|4576|4011|50904|50905|50906)/,diners:/^3(?:0[0-5]|[68][0-9])[0-9]{11}$/,discover:/^6(?:011|5[0-9]{2})[0-9]{12}$/,hipercard:/^(38|60)[0-9]{11,17}$/},mx:{carnet:/^5[6-9][0-9]{14}$/,mastercard__2:/^2[2-7][0-9]{14}$/},co:{amex:/^3[47][0-9]{13}$/,diners:/^36[0-9]{12}$/},all:{mastercard:/^5[1-5][0-9]{14}$/,visa:/^4[0-9]{12}(?:[0-9]{3})?$/}},t=Object.assign({},r[i.config.getCountry()],r.all);for(var n in t)if(t[n].test(e)){var o=n,a=n.indexOf("__");return a!==-1&&(o=n.substr(0,a)),o}throw new i.errors.InvalidValueFieldError("BP-DR-S-75","card_number")}};return e.api.url=function(){return e.api.path()+"ws"},e.api.resources={createToken:function(){return{url:e.api.url()+"/token",method:"get"}},validPublicIntegrationKey:function(){return{url:e.api.url()+"/merchantIntegrationProperties/isValidPublicIntegrationKey",method:"get"}},fingerPrintResource:function(){return{url:e.api.path()+"fingerprint/",method:"get"}},fingerPrintProvidersResource:function(){return{url:e.api.path()+"fingerprint/provider",method:"post"}}},e}(),i.http=function(){return{normalize:{q:function(e,r){function i(e,r){var n=[];return r=r||[],Object.keys(e).forEach(function(o){if(e.hasOwnProperty(o)){var a=r.slice();a.push(o);var s=[];"object"==t(e[o])?s=i(e[o],a):s.push({path:a,val:e[o]}),s.forEach(function(e){return n.push(e)})}}),n}var n=i(e);n=n.map(function(e){if(1==e.path.length)e.path=e.path[0];else{var r=e.path[0],t=e.path.slice(1);e.path=r+"["+t.join("][")+"]"}return e});var o=n.map(function(e){return e.path+"="+e.val}).join("&");return r?encodeURIComponent(o):o}},ajax:{request:function(e){"string"==typeof e&&(e={url:e}),e.url=e.url||"",e.method=e.method||"get",e.data=e.data||{};var r={host:{},process:function(e){var r=this;return this.xhr=null,window.ActiveXObject?this.xhr=new window.ActiveXObject("Microsoft.XMLHTTP"):window.XMLHttpRequest&&(this.xhr=new XMLHttpRequest),this.xhr&&(this.xhr.onreadystatechange=function(){if(4==r.xhr.readyState){var t=r.xhr.responseText||"{}";e.json===!0&&"undefined"!=typeof JSON&&(t=JSON.parse(t)),r.alwaysCallback&&r.alwaysCallback.apply(r.host,[t,r.xhr])}}),this.xhr.open("GET",e.url+"?"+i.http.normalize.q(e.data),!0),setTimeout(function(){r.xhr.send()},20),this},always:function(e){return this.alwaysCallback=e,this}};return r.process(e)}},injectJS:function(e,r){var t=document.createElement("script");t.type="text/javascript",t.async=!0,t.onload=r,t.src=e,document.getElementsByTagName("head")[0].appendChild(t)}}}(),i.card=function(){var e={};return e.createToken=function(e,r){var t={data:{},error:{}},n=function(e){t.data=e,i.deviceFingerprint.setup(function(e){return t.data.deviceId=e,r(t)})},o=function(e){return t.error.err=e,r(t)},a="";try{a=i.config.getPublishableKey()}catch(e){t.error.err=e,r(t)}i.validator.config.validatePublishableKey(a,function(a){var s=JSON.parse(a);if(!s.success)return t.error.err={status:"ERROR",status_code:"",status_message:s.body.error},void r(t);try{i.validator.card.validate(e),i.tokenize.card.token(e,n,o)}catch(e){t.error.err=e,r(t)}})},e}(),i.deviceFingerprint={ebanx_session_id:null,providerSessionList:[],providerPostPending:null,setup:function(e){var r=this;this.getList(function(t){t&&t.ebanx_session_id&&(i.deviceFingerprint.ebanx_session_id=t.ebanx_session_id,e(t.ebanx_session_id),t.providers.forEach(function(e){r.getProviderSessionId(e)}))})},getList:function(e){i.http.ajax.request({url:i.utils.api.resources.fingerPrintResource().url,data:{publicIntegrationKey:i.config.getPublishableKey(),country:i.config.getCountry()},json:!0}).always(e)},getProviderSessionId:function(e){this.loadProvider(e,this.saveProviderSessionList)},saveProviderSessionList:function(e){var r=i.deviceFingerprint;r.providerPostPending&&clearTimeout(r.providerPostPending),r.providerSessionList.push(e),r.providerPostPending=setTimeout(r.postProviderSessionList,1e3)},postProviderSessionList:function(){var e=i.deviceFingerprint,r=e.providerSessionList;e.providerSessionList=[],clearTimeout(e.providerPostPending),e.providerPostPending=null;var t={publicIntegrationKey:i.config.getPublishableKey(),ebanx_session_id:e.ebanx_session_id,providers:r};i.http.ajax.request({url:i.utils.api.resources.fingerPrintProvidersResource().url,data:t,method:"post",json:!0})},loadProvider:function(e,r){i.http.injectJS(e.source,function(){i.deviceFingerprint[e.provider].setup(e.settings,function(t){r({provider:e.provider,session_id:t})})})}},e.exports=i}])});