function n(n){return n&&n.__esModule?n.default:n}var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},l={},t={},i=e.parcelRequireab20;null==i&&((i=function(n){if(n in l)return l[n].exports;if(n in t){var e=t[n];delete t[n];var i={id:n,exports:{}};return l[n]=i,e.call(i.exports,i,i.exports),i.exports}var o=new Error("Cannot find module '"+n+"'");throw o.code="MODULE_NOT_FOUND",o}).register=function(n,e){t[n]=e},e.parcelRequireab20=i);var o=n(i("eZk27")).template({compiler:[8,">= 4.3.0"],main:function(n,e,l,t,i){var o,r,a=null!=e?e:n.nullContext||{},s=n.hooks.helperMissing,u="function",d=n.lookupProperty||function(n,e){if(Object.prototype.hasOwnProperty.call(n,e))return n[e]};return'<main class="main">\n    <form class="signIn_container" name="signInForm" action="" id="signInForm" >\n        <h1 class="signIn_title">Вход</h1>\n        '+(null!=(o=typeof(r=null!=(r=d(l,"fieldset")||(null!=e?d(e,"fieldset"):e))?r:s)===u?r.call(a,{name:"fieldset",hash:{},data:i,loc:{start:{line:4,column:8},end:{line:4,column:22}}}):r)?o:"")+'\n        <div class="signIn_buttonBlock">\n            '+(null!=(o=typeof(r=null!=(r=d(l,"btnPr")||(null!=e?d(e,"btnPr"):e))?r:s)===u?r.call(a,{name:"btnPr",hash:{},data:i,loc:{start:{line:6,column:12},end:{line:6,column:23}}}):r)?o:"")+"\n            "+(null!=(o=typeof(r=null!=(r=d(l,"btnLink")||(null!=e?d(e,"btnLink"):e))?r:s)===u?r.call(a,{name:"btnLink",hash:{},data:i,loc:{start:{line:7,column:12},end:{line:7,column:25}}}):r)?o:"")+"\n        </div>\n\n    </form>\n\n</main>\n\n\n"},useData:!0}),r=i("iOzm9"),a=i("iD7Bc"),s=i("k1w4d");document.querySelector("#root").innerHTML=o({btnPr:(0,r.default)("Войти","button_primary","submit","signInSubmit"),btnLink:(0,s.default)("linkToSignUp","Нет аккаунта?","buttonLink_center"),fieldset:(0,a.default)([{id:"login",name:"login",label:"Логин",type:"text",placeholder:"Логин",errorMessage:"error",disabled:!1},{id:"password",name:"password",label:"Пароль",type:"password",placeholder:"Пароль",errorMessage:"",disabled:!1}],"signIn_fieldset")});document.querySelector("#signInForm").addEventListener("submit",(n=>{n.preventDefault(),window.location.pathname="/chatList.html"}));document.querySelector("#linkToSignUp").addEventListener("click",(n=>{n.preventDefault(),window.location.pathname="/signUp.html"}));