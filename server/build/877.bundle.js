/*! For license information please see 877.bundle.js.LICENSE.txt */
(self.webpackChunklotoai=self.webpackChunklotoai||[]).push([[877],{877:function(){function t(e){return t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},t(e)}function e(t,e){(null==e||e>t.length)&&(e=t.length);for(var r=0,n=new Array(e);r<e;r++)n[r]=t[r];return n}function r(){"use strict";r=function(){return e};var e={},n=Object.prototype,o=n.hasOwnProperty,i=Object.defineProperty||function(t,e,r){t[e]=r.value},a="function"==typeof Symbol?Symbol:{},u=a.iterator||"@@iterator",c=a.asyncIterator||"@@asyncIterator",s=a.toStringTag||"@@toStringTag";function l(t,e,r){return Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{l({},"")}catch(t){l=function(t,e,r){return t[e]=r}}function f(t,e,r,n){var o=e&&e.prototype instanceof h?e:h,a=Object.create(o.prototype),u=new j(n||[]);return i(a,"_invoke",{value:S(t,r,u)}),a}function d(t,e,r){try{return{type:"normal",arg:t.call(e,r)}}catch(t){return{type:"throw",arg:t}}}e.wrap=f;var p={};function h(){}function v(){}function y(){}var g={};l(g,u,(function(){return this}));var m=Object.getPrototypeOf,b=m&&m(m(E([])));b&&b!==n&&o.call(b,u)&&(g=b);var w=y.prototype=h.prototype=Object.create(g);function x(t){["next","throw","return"].forEach((function(e){l(t,e,(function(t){return this._invoke(e,t)}))}))}function k(e,r){function n(i,a,u,c){var s=d(e[i],e,a);if("throw"!==s.type){var l=s.arg,f=l.value;return f&&"object"==t(f)&&o.call(f,"__await")?r.resolve(f.__await).then((function(t){n("next",t,u,c)}),(function(t){n("throw",t,u,c)})):r.resolve(f).then((function(t){l.value=t,u(l)}),(function(t){return n("throw",t,u,c)}))}c(s.arg)}var a;i(this,"_invoke",{value:function(t,e){function o(){return new r((function(r,o){n(t,e,r,o)}))}return a=a?a.then(o,o):o()}})}function S(t,e,r){var n="suspendedStart";return function(o,i){if("executing"===n)throw new Error("Generator is already running");if("completed"===n){if("throw"===o)throw i;return{value:void 0,done:!0}}for(r.method=o,r.arg=i;;){var a=r.delegate;if(a){var u=O(a,r);if(u){if(u===p)continue;return u}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if("suspendedStart"===n)throw n="completed",r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);n="executing";var c=d(t,e,r);if("normal"===c.type){if(n=r.done?"completed":"suspendedYield",c.arg===p)continue;return{value:c.arg,done:r.done}}"throw"===c.type&&(n="completed",r.method="throw",r.arg=c.arg)}}}function O(t,e){var r=e.method,n=t.iterator[r];if(void 0===n)return e.delegate=null,"throw"===r&&t.iterator.return&&(e.method="return",e.arg=void 0,O(t,e),"throw"===e.method)||"return"!==r&&(e.method="throw",e.arg=new TypeError("The iterator does not provide a '"+r+"' method")),p;var o=d(n,t.iterator,e.arg);if("throw"===o.type)return e.method="throw",e.arg=o.arg,e.delegate=null,p;var i=o.arg;return i?i.done?(e[t.resultName]=i.value,e.next=t.nextLoc,"return"!==e.method&&(e.method="next",e.arg=void 0),e.delegate=null,p):i:(e.method="throw",e.arg=new TypeError("iterator result is not an object"),e.delegate=null,p)}function N(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function L(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function j(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(N,this),this.reset(!0)}function E(e){if(e||""===e){var r=e[u];if(r)return r.call(e);if("function"==typeof e.next)return e;if(!isNaN(e.length)){var n=-1,i=function t(){for(;++n<e.length;)if(o.call(e,n))return t.value=e[n],t.done=!1,t;return t.value=void 0,t.done=!0,t};return i.next=i}}throw new TypeError(t(e)+" is not iterable")}return v.prototype=y,i(w,"constructor",{value:y,configurable:!0}),i(y,"constructor",{value:v,configurable:!0}),v.displayName=l(y,s,"GeneratorFunction"),e.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===v||"GeneratorFunction"===(e.displayName||e.name))},e.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,y):(t.__proto__=y,l(t,s,"GeneratorFunction")),t.prototype=Object.create(w),t},e.awrap=function(t){return{__await:t}},x(k.prototype),l(k.prototype,c,(function(){return this})),e.AsyncIterator=k,e.async=function(t,r,n,o,i){void 0===i&&(i=Promise);var a=new k(f(t,r,n,o),i);return e.isGeneratorFunction(r)?a:a.next().then((function(t){return t.done?t.value:a.next()}))},x(w),l(w,s,"Generator"),l(w,u,(function(){return this})),l(w,"toString",(function(){return"[object Generator]"})),e.keys=function(t){var e=Object(t),r=[];for(var n in e)r.push(n);return r.reverse(),function t(){for(;r.length;){var n=r.pop();if(n in e)return t.value=n,t.done=!1,t}return t.done=!0,t}},e.values=E,j.prototype={constructor:j,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=void 0,this.done=!1,this.delegate=null,this.method="next",this.arg=void 0,this.tryEntries.forEach(L),!t)for(var e in this)"t"===e.charAt(0)&&o.call(this,e)&&!isNaN(+e.slice(1))&&(this[e]=void 0)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var e=this;function r(r,n){return a.type="throw",a.arg=t,e.next=r,n&&(e.method="next",e.arg=void 0),!!n}for(var n=this.tryEntries.length-1;n>=0;--n){var i=this.tryEntries[n],a=i.completion;if("root"===i.tryLoc)return r("end");if(i.tryLoc<=this.prev){var u=o.call(i,"catchLoc"),c=o.call(i,"finallyLoc");if(u&&c){if(this.prev<i.catchLoc)return r(i.catchLoc,!0);if(this.prev<i.finallyLoc)return r(i.finallyLoc)}else if(u){if(this.prev<i.catchLoc)return r(i.catchLoc,!0)}else{if(!c)throw new Error("try statement without catch or finally");if(this.prev<i.finallyLoc)return r(i.finallyLoc)}}}},abrupt:function(t,e){for(var r=this.tryEntries.length-1;r>=0;--r){var n=this.tryEntries[r];if(n.tryLoc<=this.prev&&o.call(n,"finallyLoc")&&this.prev<n.finallyLoc){var i=n;break}}i&&("break"===t||"continue"===t)&&i.tryLoc<=e&&e<=i.finallyLoc&&(i=null);var a=i?i.completion:{};return a.type=t,a.arg=e,i?(this.method="next",this.next=i.finallyLoc,p):this.complete(a)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),p},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.finallyLoc===t)return this.complete(r.completion,r.afterLoc),L(r),p}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.tryLoc===t){var n=r.completion;if("throw"===n.type){var o=n.arg;L(r)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(t,e,r){return this.delegate={iterator:E(t),resultName:e,nextLoc:r},"next"===this.method&&(this.arg=void 0),p}},e}function n(t,e,r,n,o,i,a){try{var u=t[i](a),c=u.value}catch(t){return void r(t)}u.done?e(c):Promise.resolve(c).then(n,o)}function o(t){return function(){var e=this,r=arguments;return new Promise((function(o,i){var a=t.apply(e,r);function u(t){n(a,o,i,u,c,"next",t)}function c(t){n(a,o,i,u,c,"throw",t)}u(void 0)}))}}var i=function(t){return!(null==t||!t.not_authorized||null==t||!t.reload)},a=function(){var t=o(r().mark((function t(e){var n,o,a,u,c;return r().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,fetch("".concat(e.baseUrl,"/contests/get_contests"),{headers:{authorization:null==e?void 0:e.token,userid:null==e?void 0:e.userId}});case 2:if(!(n=t.sent)){t.next=13;break}return t.next=6,n.json();case 6:return o=t.sent,i(o)&&v({reload:!0}),a=new Date,u=a.toLocaleDateString("pt-BR"),c={dateString:u,value:o},v({result:{step:"ruleOfFourteen",saveStorage:JSON.stringify(c),terminationNotice:"Jogos separados"}}),t.abrupt("return",o);case 13:return t.abrupt("return",[]);case 14:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),u=function(){var t=o(r().mark((function t(e){var n,o,a,u,c;return r().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,fetch("".concat(e.baseUrl,"/contests/betting_history"),{headers:{authorization:null==e?void 0:e.token,userid:null==e?void 0:e.userId}});case 2:if(!(n=t.sent)){t.next=13;break}return t.next=6,n.json();case 6:return o=t.sent,i(o)&&v({reload:!0}),a=new Date,u=a.toLocaleDateString("pt-BR"),c={dateString:u,value:o},v({result:{step:"bettingHistory",saveStorage:JSON.stringify(c),terminationNotice:"Treinando IA"}}),t.abrupt("return",o);case 13:return t.abrupt("return",[]);case 14:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),c=function(){var t=o(r().mark((function t(e,n){var o,a,u,c,s,l,f;return r().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(null==n||null===(o=n.best)||void 0===o||!o.length){t.next=3;break}return v({result:{terminationNotice:"Executando algoritmo genético"}}),t.abrupt("return",n.best);case 3:return a={mode:null==n?void 0:n.mode,contests:(null==n?void 0:n.contests)||[],allContests:(null==n?void 0:n.allContests)||[]},t.next=6,fetch("".concat(e.baseUrl,"/contests/start_neural_network"),{method:"POST",body:JSON.stringify(a),headers:{"Access-Control-Allow-Origin":"*","Content-Type":"application/json",Accept:"application/json",authorization:null==e?void 0:e.token,userid:null==e?void 0:e.userId}});case 6:if(!(u=t.sent)){t.next=17;break}return t.next=10,u.json();case 10:return c=t.sent,i(c)&&v({reload:!0}),s=new Date,l=s.toLocaleDateString("pt-BR"),f={dateString:l,value:c.best},v({result:{step:"neuralNetwork",saveStorage:JSON.stringify(f),terminationNotice:"Executando algoritmo genético"}}),t.abrupt("return",c);case 17:return t.abrupt("return",[]);case 18:case"end":return t.stop()}}),t)})));return function(e,r){return t.apply(this,arguments)}}(),s=function(){var t=o(r().mark((function t(e,n){var o,a,u;return r().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return o={mode:null==n?void 0:n.mode,best:(null==n?void 0:n.best)||[],allContests:(null==n?void 0:n.allContests)||[]},t.next=3,fetch("".concat(e.baseUrl,"/contests/start_genetic_algorithm"),{method:"POST",body:JSON.stringify(o),headers:{"Access-Control-Allow-Origin":"*","Content-Type":"application/json",Accept:"application/json",authorization:null==e?void 0:e.token,userid:null==e?void 0:e.userId}});case 3:if(!(a=t.sent)){t.next=11;break}return t.next=7,a.json();case 7:return u=t.sent,i(u)&&v({reload:!0}),v({result:{terminationNotice:"Validando aposta"}}),t.abrupt("return",u);case 11:return t.abrupt("return",[]);case 12:case"end":return t.stop()}}),t)})));return function(e,r){return t.apply(this,arguments)}}(),l=function(){var t=o(r().mark((function t(e,n){var o,a,u,c;return r().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return o={bet:(null==n?void 0:n.bet)||[],allContests:(null==n?void 0:n.allContests)||[]},t.next=3,fetch("".concat(e.baseUrl,"/contests/validate_bet"),{method:"POST",body:JSON.stringify(o),headers:{"Access-Control-Allow-Origin":"*","Content-Type":"application/json",Accept:"application/json",authorization:null==e?void 0:e.token,userid:null==e?void 0:e.userId}});case 3:if(!(a=t.sent)){t.next=13;break}return t.next=7,a.json();case 7:return u=t.sent,i(u)&&v({reload:!0}),c={terminationNotice:"Aposta gerada"},null!=u&&u.success||(c.restart=!0,c.terminationNotice="Reavalidando aposta..."),v({result:c}),t.abrupt("return",u);case 13:return t.abrupt("return",{});case 14:case"end":return t.stop()}}),t)})));return function(e,r){return t.apply(this,arguments)}}(),f=function(){var t=o(r().mark((function t(e,n){var o,a,u,c;return r().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(null!=(a={mode:null==n?void 0:n.mode,bet:(null==n?void 0:n.bet)||[]})&&null!==(o=a.bet)&&void 0!==o&&o.success){t.next=3;break}return t.abrupt("return",{success:!1});case 3:return t.next=5,fetch("".concat(e.baseUrl,"/contests/save_bet"),{method:"POST",body:JSON.stringify(a),headers:{"Access-Control-Allow-Origin":"*","Content-Type":"application/json",Accept:"application/json",authorization:null==e?void 0:e.token,userid:null==e?void 0:e.userId}});case 5:if(!(u=t.sent)){t.next=13;break}return t.next=9,u.json();case 9:return c=t.sent,i(c)&&v({reload:!0}),v({result:{terminationNotice:"Aposta salva"}}),t.abrupt("return",c);case 13:return t.abrupt("return",{});case 14:case"end":return t.stop()}}),t)})));return function(e,r){return t.apply(this,arguments)}}(),d={ruleOfFourteen:a,bettingHistory:u,neuralNetwork:c,geneticAlgorithm:s,validateBet:l,saveBet:f},p=function(t,e){var r=null==t?void 0:t.length,n=0,o=0,i=0;(t||[]).forEach((function(t){var e=t.filter((function(t){return t%2==0})).length,r=t.filter((function(t){return t%2!=0})).length,a=t.filter((function(t){return h(t)})).length;n+=e,o+=r,i+=a}));var a=n/(15*r)*100,u=o/(15*r)*100,c=i/(15*r)*100;null==e||e.sort((function(t,e){return(null==e?void 0:e.occurrences)-(null==t?void 0:t.occurrences)}));var s=null==e?void 0:e.slice(0,10);return null==e||e.sort((function(t,e){return(null==t?void 0:t.occurrences)-(null==e?void 0:e.occurrences)})),{evenPercentage:a,oddPercentage:u,primePercentage:c,popularNumbers:s,noPopularNumbers:null==e?void 0:e.slice(0,10)}},h=function(t){if(t<=1)return!1;if(t<=3)return!0;if(t%2==0||t%3==0)return!1;for(var e=5;e*e<=t;){if(t%e==0||t%(e+2)==0)return!1;e+=6}return!0};self.addEventListener("message",function(){var t=o(r().mark((function t(n){var o,i,a,u,c,s,l,f,h,y,g,m,b,w,x,k,S,O,N,L,j;return r().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(o=n.data,i={error:void 0,result:void 0,token:null==o?void 0:o.token,userId:null==o?void 0:o.userId,baseUrl:"http://localhost:3001"},"localhost"!==self.location.hostname&&(i.baseUrl="https://lotoai.com.br"),null!=o&&o.statistics&&(u=null==o?void 0:o.bettingHistory,c=null===(r=Array(25).keys(),a=function(t){if(Array.isArray(t))return e(t)}(r)||function(t){if("undefined"!=typeof Symbol&&null!=t[Symbol.iterator]||null!=t["@@iterator"])return Array.from(t)}(r)||function(t,r){if(t){if("string"==typeof t)return e(t,r);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?e(t,r):void 0}}(r)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}())||void 0===a?void 0:a.map((function(t){return{number:t+1,occurrences:(e=u,r=t+1,o=0,null===(n=e||[])||void 0===n||n.forEach((function(t){null!=t&&t.includes(r)&&o++})),o)};var e,r,n,o})),s=p(u,c),l=s.evenPercentage,f=s.oddPercentage,h=s.primePercentage,y=s.popularNumbers,g=s.noPopularNumbers,E=void 0,A=void 0,A=null===(E=u||[])||void 0===E?void 0:E.map((function(t){return null==t?void 0:t.reduce((function(t,e){return t+e}),0)})),m=(null==A?void 0:A.reduce((function(t,e){return t+e}),0))/(null==A?void 0:A.length),v({error:i.error,result:{avgSum:m,oddPercentage:f,popularNumbers:y,evenPercentage:l,primePercentage:h,noPopularNumbers:g}})),null==o||!o.start){t.next=39;break}if(t.prev=5,x=null==o?void 0:o.mode,k=null==o?void 0:o.ruleOfFourteen,S=null==o?void 0:o.bettingHistory,O=null==o?void 0:o.neuralNetwork,null!==(b=k)&&void 0!==b&&b.length){t.next=14;break}return t.next=13,d.ruleOfFourteen(i);case 13:k=t.sent;case 14:if(null!==(w=S)&&void 0!==w&&w.length){t.next=18;break}return t.next=17,d.bettingHistory(i);case 17:S=t.sent;case 18:return t.next=20,d.neuralNetwork(i,{contests:k,allContests:S,mode:x,best:O});case 20:return O=t.sent,t.next=23,d.geneticAlgorithm(i,{allContests:S,best:O,mode:x});case 23:return N=t.sent,t.next=26,d.validateBet(i,{allContests:S,bet:N});case 26:return L=t.sent,t.next=29,d.saveBet(i,{bet:L,mode:x});case 29:null!=(j=t.sent)&&j.success?i.result=j:i.error=!0,t.next=36;break;case 33:t.prev=33,t.t0=t.catch(5),i.error=t.t0;case 36:return t.prev=36,v({error:i.error,result:i.result}),t.finish(36);case 39:case"end":return t.stop()}var r,E,A}),t,null,[[5,33,36,39]])})));return function(e){return t.apply(this,arguments)}}());var v=function(t){self.postMessage(t)}}}]);