function e(e){return e&&e.__esModule?e.default:e}var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},n={},o={},r=t.parcelRequireab20;null==r&&((r=function(e){if(e in n)return n[e].exports;if(e in o){var t=o[e];delete o[e];var r={id:e,exports:{}};return n[e]=r,t.call(r.exports,r,r.exports),r.exports}var a=new Error("Cannot find module '"+e+"'");throw a.code="MODULE_NOT_FOUND",a}).register=function(e,t){o[e]=t},t.parcelRequireab20=r);var a,i=r("5ZWvM"),l=r("7GDx4"),d=r("l6hOz"),u=r("61GUs"),p=r("4Ue51"),s=r("8J9DD"),f=r("1Z4Ec"),c=r("3QMcB"),g=r("8XsYA"),h=r("cNQ5k"),v=r("ewqYH");a={ButtonLink:l,Button:d,ChatItem:u,ErrorPage:p,Input:s,InputText:f,InputTextProfile:c,InputTextValidate:g,Message:h,Nav:v};var w=r("gXoAE"),x=r("7OKOa");window.addEventListener("DOMContentLoaded",(()=>{Object.values(e(a)).forEach((e=>(0,x.helperRegisterComponent)(e.default))),Object.values(e(w)).forEach((e=>(0,x.helperRegisterComponent)(e.default)));const t=document.querySelector("#root"),n=new(0,i.ChatList)({});t.append(n.getContent()),n.dispatchComponentDidMount()}));