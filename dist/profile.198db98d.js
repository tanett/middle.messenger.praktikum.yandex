function e(e){return e&&e.__esModule?e.default:e}var n="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},o={},t={},a=n.parcelRequireab20;null==a&&((a=function(e){if(e in o)return o[e].exports;if(e in t){var n=t[e];delete t[e];var a={id:e,exports:{}};return o[e]=a,n.call(a.exports,a,a.exports),a.exports}var r=new Error("Cannot find module '"+e+"'");throw r.code="MODULE_NOT_FOUND",r}).register=function(e,n){t[e]=n},n.parcelRequireab20=a);var r,i=a("bsf6W"),d=a("4DxPR"),l=a("bKXul"),s=a("VavSN"),u=a("4qtUh"),f=a("aC6gi");r={ChatList:l,Profile:s,signIn:u,signUp:f};var p=a("7OKOa");window.addEventListener("DOMContentLoaded",(()=>{Object.values(e(d)).forEach((e=>(0,p.helperRegisterComponent)(e.default))),Object.values(e(r)).forEach((e=>(0,p.helperRegisterComponent)(e.default)));const n=document.querySelector("#root"),o=new(0,i.Profile)({name:"Иван",secondName:"Ivanov",displayName:"vanya",email:"pochta@yandex.ru",login:"Ivan",phone:"+79659959598",password:"1111",editMode:"main"});n.append(o.getContent()),o.dispatchComponentDidMount()}));