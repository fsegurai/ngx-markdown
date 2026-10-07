import{a as Re,c as Pe}from"./chunk-O6SZ2GLN.js";import{a as Se}from"./chunk-UYNHNYMO.js";import{$ as Ut,$a as X,$b as ve,A as x,Aa as ut,Ab as re,B as Z,Ba as dt,Bc as Me,Ca as mt,Da as g,E as G,Ea as c,Eb as se,F as M,Fa as d,Fb as le,G as H,Ga as D,Gb as ce,H as z,Hb as tt,I as s,Ib as ue,Jb as de,K as T,Kb as me,Lb as be,Ma as v,Mb as et,Nb as pe,Oa as I,Ob as he,Pa as F,Pb as _e,Q as $t,Qa as Y,Qb as fe,R as h,Ra as Yt,Sa as C,T as lt,Ta as y,Tb as nt,U as Wt,V as q,Va as Kt,W as S,Wa as Xt,Wb as ge,Xa as K,Xb as De,Ya as Jt,Yb as L,Za as E,_ as m,_a as $,ab as bt,c as rt,ca as Qt,cc as Fe,d as Tt,da as Vt,dc as Ce,e as Q,ea as Zt,ec as ht,f as It,fa as _,fb as te,g as Bt,ga as Gt,gb as ee,i as k,ic as _t,j as wt,ja as qt,k as w,l as Mt,lc as ye,m as St,mc as ft,n as st,na as f,nb as ne,nc as Ee,o as Rt,oa as R,oc as Ae,pa as j,pb as ae,pc as ke,q as Pt,qa as ct,qb as J,qc as N,r as Lt,s as Nt,sb as ie,t as Ot,ub as oe,uc as xe,v as Ht,va as P,vb as b,vc as gt,wb as pt,wc as Te,x as zt,xc as Ie,y as V,yc as Be,z as jt,zc as we}from"./chunk-NVXSS6HW.js";Prism.languages.typescript=Prism.languages.extend("typescript",{"class-name":[Prism.languages.typescript["class-name"],{pattern:/(:)\s*([A-Z][a-zA-Z0-9_]*(?:\[\])?)/,lookbehind:!0,alias:"type-annotation"},{pattern:/([A-Z][a-zA-Z0-9_]*)\s*(<[^>]*>)/,inside:{generic:{pattern:/<[^>]*>/,inside:Prism.languages.typescript}}},{pattern:/(implements\s+)([A-Z][a-zA-Z0-9_]*(?:\s*,\s*[A-Z][a-zA-Z0-9_]*)*)/,lookbehind:!0,inside:{"interface-name":/[A-Z][a-zA-Z0-9_]*/,punctuation:/,/}},{pattern:/(extends\s+)([A-Z][a-zA-Z0-9_]*)/,lookbehind:!0},{pattern:/(new\s+)([A-Z][a-zA-Z0-9_]*)/,lookbehind:!0},{pattern:/\b([A-Z][a-zA-Z0-9_]*)(\s*\.)/,lookbehind:!1,inside:{"class-reference":/[A-Z][a-zA-Z0-9_]*/,punctuation:/\./}}],function:[Prism.languages.typescript.function,{pattern:/([a-zA-Z_$][a-zA-Z0-9_$]*)\s*[=:]\s*\([^)]*\)\s*=>/,inside:{"function-name":/^[a-zA-Z_$][a-zA-Z0-9_$]*/,punctuation:/[=:()]/,operator:/=>/}},{pattern:/\b([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\([^)]*\)\s*[:{]/,inside:{"method-name":/^[a-zA-Z_$][a-zA-Z0-9_$]*/,punctuation:/[(){}:]/}}],keyword:[...Prism.languages.typescript.keyword,/\b(?:abstract|as|asserts|constructor|declare|enum|implements|interface|is|keyof|namespace|never|readonly|type|typeof|unknown)\b/,/\b(?:private|protected|public|static|readonly)\b/],decorator:{pattern:/@[a-zA-Z_$][a-zA-Z0-9_$]*(?:\.[a-zA-Z_$][a-zA-Z0-9_$]*)*/,alias:"symbol"},"type-assertion":{pattern:/<[^>]+>/,inside:Prism.languages.typescript},import:[Prism.languages.typescript.import,{pattern:/(import\s*{)\s*([^}]+)/,lookbehind:!0,inside:{"import-name":/[a-zA-Z_$][a-zA-Z0-9_$]*/,punctuation:/[,\s]/,keyword:/\bas\b/}},{pattern:/(import\s+)([a-zA-Z_$][a-zA-Z0-9_$]*)/,lookbehind:!0,alias:"import-default"}],generic:{pattern:/<[^<>]*>/,inside:Prism.languages.typescript},"type-parameter":{pattern:/\b[A-Z][a-zA-Z0-9_]*(?:\s+extends\s+[^,>=]+)?/,inside:{constraint:{pattern:/extends\s+.+/,inside:Prism.languages.typescript}}}});Prism.languages.ts=Prism.languages.typescript;var Le=[{path:"get-started",loadComponent:()=>import("./chunk-3NU2PXLF.js"),data:{label:"Get Started"}},{path:"cheat-sheet",loadComponent:()=>import("./chunk-KKZFSSAK.js"),data:{label:"Cheat Sheet"}},{path:"syntax-highlight",loadComponent:()=>import("./chunk-BYNR7ZLO.js"),data:{label:"Syntax Highlight"}},{path:"bindings",loadComponent:()=>import("./chunk-SHMVFXIR.js"),data:{label:"Bindings"}},{path:"plugins",loadComponent:()=>import("./chunk-X34IBDYW.js"),data:{label:"Plugins"}},{path:"re-render",loadComponent:()=>import("./chunk-RW3FQLJX.js"),data:{label:"Re-render"}},{path:"playground",loadComponent:()=>import("./chunk-MHDMURH6.js"),data:{label:"Playground"}},{path:"",pathMatch:"full",redirectTo:"get-started"},{path:"**",redirectTo:"get-started"}];function Ne(i){let o=new gt;return o.link=({href:t,title:e,tokens:n,text:a,raw:r})=>{let l=i.normalizeExternalUrl(t);return gt.prototype.link.call(o,{type:"link",raw:r,href:l,title:e,text:a,tokens:n})},{renderer:o}}var O=class i{constructor(){this.document=s(h);this.locationStrategy=s(re);this.route=s(me);this.router=s(et);this.viewportScroller=s(le)}interceptClick(o){let t=o.target;if(!(t instanceof HTMLAnchorElement))return;let e=t.getAttribute("href")||"";this.isExternalUrl(e)||this.isRouterLink(t)||(this.navigate(e),o.preventDefault())}navigate(o,t=!1){let e=this.getUrlTree(o);this.router.navigated=!1,this.router.navigateByUrl(e,{replaceUrl:t})}normalizeExternalUrl(o){if(this.isExternalUrl(o))return o;let t=this.getUrlTree(o),e=this.router.serializeUrl(t);return this.locationStrategy.prepareExternalUrl(e)}scrollToAnchor(){this.router.parseUrl(this.router.url).fragment&&this.navigate(this.router.url,!0)}setOffset(...o){this.viewportScroller.setOffset(...o)}getUrlTree(o){let t=this.stripFragment(o)||this.stripFragment(this.router.url),e=this.router.parseUrl(o).fragment||void 0;return this.router.createUrlTree([t],{relativeTo:this.route,fragment:e})}isExternalUrl(o){try{let t=new URL(o,this.document.location?.origin??"http://localhost");return["http:","https:","ftp:","ftps:","mailto:","tel:","sms:","geo:","file:","data:"].includes(t.protocol)}catch{return!1}}isRouterLink(o){return o.getAttributeNames().some(t=>t.startsWith("_ngcontent"))}stripFragment(o){return/[^#]*/.exec(o)[0]}static{this.\u0275fac=function(t){return new(t||i)}}static{this.\u0275prov=G({token:i,factory:i.\u0275fac,providedIn:"root"})}};var Oe=/[\0-\x1F!-,\.\/:-@\[-\^`\{-\xA9\xAB-\xB4\xB6-\xB9\xBB-\xBF\xD7\xF7\u02C2-\u02C5\u02D2-\u02DF\u02E5-\u02EB\u02ED\u02EF-\u02FF\u0375\u0378\u0379\u037E\u0380-\u0385\u0387\u038B\u038D\u03A2\u03F6\u0482\u0530\u0557\u0558\u055A-\u055F\u0589-\u0590\u05BE\u05C0\u05C3\u05C6\u05C8-\u05CF\u05EB-\u05EE\u05F3-\u060F\u061B-\u061F\u066A-\u066D\u06D4\u06DD\u06DE\u06E9\u06FD\u06FE\u0700-\u070F\u074B\u074C\u07B2-\u07BF\u07F6-\u07F9\u07FB\u07FC\u07FE\u07FF\u082E-\u083F\u085C-\u085F\u086B-\u089F\u08B5\u08C8-\u08D2\u08E2\u0964\u0965\u0970\u0984\u098D\u098E\u0991\u0992\u09A9\u09B1\u09B3-\u09B5\u09BA\u09BB\u09C5\u09C6\u09C9\u09CA\u09CF-\u09D6\u09D8-\u09DB\u09DE\u09E4\u09E5\u09F2-\u09FB\u09FD\u09FF\u0A00\u0A04\u0A0B-\u0A0E\u0A11\u0A12\u0A29\u0A31\u0A34\u0A37\u0A3A\u0A3B\u0A3D\u0A43-\u0A46\u0A49\u0A4A\u0A4E-\u0A50\u0A52-\u0A58\u0A5D\u0A5F-\u0A65\u0A76-\u0A80\u0A84\u0A8E\u0A92\u0AA9\u0AB1\u0AB4\u0ABA\u0ABB\u0AC6\u0ACA\u0ACE\u0ACF\u0AD1-\u0ADF\u0AE4\u0AE5\u0AF0-\u0AF8\u0B00\u0B04\u0B0D\u0B0E\u0B11\u0B12\u0B29\u0B31\u0B34\u0B3A\u0B3B\u0B45\u0B46\u0B49\u0B4A\u0B4E-\u0B54\u0B58-\u0B5B\u0B5E\u0B64\u0B65\u0B70\u0B72-\u0B81\u0B84\u0B8B-\u0B8D\u0B91\u0B96-\u0B98\u0B9B\u0B9D\u0BA0-\u0BA2\u0BA5-\u0BA7\u0BAB-\u0BAD\u0BBA-\u0BBD\u0BC3-\u0BC5\u0BC9\u0BCE\u0BCF\u0BD1-\u0BD6\u0BD8-\u0BE5\u0BF0-\u0BFF\u0C0D\u0C11\u0C29\u0C3A-\u0C3C\u0C45\u0C49\u0C4E-\u0C54\u0C57\u0C5B-\u0C5F\u0C64\u0C65\u0C70-\u0C7F\u0C84\u0C8D\u0C91\u0CA9\u0CB4\u0CBA\u0CBB\u0CC5\u0CC9\u0CCE-\u0CD4\u0CD7-\u0CDD\u0CDF\u0CE4\u0CE5\u0CF0\u0CF3-\u0CFF\u0D0D\u0D11\u0D45\u0D49\u0D4F-\u0D53\u0D58-\u0D5E\u0D64\u0D65\u0D70-\u0D79\u0D80\u0D84\u0D97-\u0D99\u0DB2\u0DBC\u0DBE\u0DBF\u0DC7-\u0DC9\u0DCB-\u0DCE\u0DD5\u0DD7\u0DE0-\u0DE5\u0DF0\u0DF1\u0DF4-\u0E00\u0E3B-\u0E3F\u0E4F\u0E5A-\u0E80\u0E83\u0E85\u0E8B\u0EA4\u0EA6\u0EBE\u0EBF\u0EC5\u0EC7\u0ECE\u0ECF\u0EDA\u0EDB\u0EE0-\u0EFF\u0F01-\u0F17\u0F1A-\u0F1F\u0F2A-\u0F34\u0F36\u0F38\u0F3A-\u0F3D\u0F48\u0F6D-\u0F70\u0F85\u0F98\u0FBD-\u0FC5\u0FC7-\u0FFF\u104A-\u104F\u109E\u109F\u10C6\u10C8-\u10CC\u10CE\u10CF\u10FB\u1249\u124E\u124F\u1257\u1259\u125E\u125F\u1289\u128E\u128F\u12B1\u12B6\u12B7\u12BF\u12C1\u12C6\u12C7\u12D7\u1311\u1316\u1317\u135B\u135C\u1360-\u137F\u1390-\u139F\u13F6\u13F7\u13FE-\u1400\u166D\u166E\u1680\u169B-\u169F\u16EB-\u16ED\u16F9-\u16FF\u170D\u1715-\u171F\u1735-\u173F\u1754-\u175F\u176D\u1771\u1774-\u177F\u17D4-\u17D6\u17D8-\u17DB\u17DE\u17DF\u17EA-\u180A\u180E\u180F\u181A-\u181F\u1879-\u187F\u18AB-\u18AF\u18F6-\u18FF\u191F\u192C-\u192F\u193C-\u1945\u196E\u196F\u1975-\u197F\u19AC-\u19AF\u19CA-\u19CF\u19DA-\u19FF\u1A1C-\u1A1F\u1A5F\u1A7D\u1A7E\u1A8A-\u1A8F\u1A9A-\u1AA6\u1AA8-\u1AAF\u1AC1-\u1AFF\u1B4C-\u1B4F\u1B5A-\u1B6A\u1B74-\u1B7F\u1BF4-\u1BFF\u1C38-\u1C3F\u1C4A-\u1C4C\u1C7E\u1C7F\u1C89-\u1C8F\u1CBB\u1CBC\u1CC0-\u1CCF\u1CD3\u1CFB-\u1CFF\u1DFA\u1F16\u1F17\u1F1E\u1F1F\u1F46\u1F47\u1F4E\u1F4F\u1F58\u1F5A\u1F5C\u1F5E\u1F7E\u1F7F\u1FB5\u1FBD\u1FBF-\u1FC1\u1FC5\u1FCD-\u1FCF\u1FD4\u1FD5\u1FDC-\u1FDF\u1FED-\u1FF1\u1FF5\u1FFD-\u203E\u2041-\u2053\u2055-\u2070\u2072-\u207E\u2080-\u208F\u209D-\u20CF\u20F1-\u2101\u2103-\u2106\u2108\u2109\u2114\u2116-\u2118\u211E-\u2123\u2125\u2127\u2129\u212E\u213A\u213B\u2140-\u2144\u214A-\u214D\u214F-\u215F\u2189-\u24B5\u24EA-\u2BFF\u2C2F\u2C5F\u2CE5-\u2CEA\u2CF4-\u2CFF\u2D26\u2D28-\u2D2C\u2D2E\u2D2F\u2D68-\u2D6E\u2D70-\u2D7E\u2D97-\u2D9F\u2DA7\u2DAF\u2DB7\u2DBF\u2DC7\u2DCF\u2DD7\u2DDF\u2E00-\u2E2E\u2E30-\u3004\u3008-\u3020\u3030\u3036\u3037\u303D-\u3040\u3097\u3098\u309B\u309C\u30A0\u30FB\u3100-\u3104\u3130\u318F-\u319F\u31C0-\u31EF\u3200-\u33FF\u4DC0-\u4DFF\u9FFD-\u9FFF\uA48D-\uA4CF\uA4FE\uA4FF\uA60D-\uA60F\uA62C-\uA63F\uA673\uA67E\uA6F2-\uA716\uA720\uA721\uA789\uA78A\uA7C0\uA7C1\uA7CB-\uA7F4\uA828-\uA82B\uA82D-\uA83F\uA874-\uA87F\uA8C6-\uA8CF\uA8DA-\uA8DF\uA8F8-\uA8FA\uA8FC\uA92E\uA92F\uA954-\uA95F\uA97D-\uA97F\uA9C1-\uA9CE\uA9DA-\uA9DF\uA9FF\uAA37-\uAA3F\uAA4E\uAA4F\uAA5A-\uAA5F\uAA77-\uAA79\uAAC3-\uAADA\uAADE\uAADF\uAAF0\uAAF1\uAAF7-\uAB00\uAB07\uAB08\uAB0F\uAB10\uAB17-\uAB1F\uAB27\uAB2F\uAB5B\uAB6A-\uAB6F\uABEB\uABEE\uABEF\uABFA-\uABFF\uD7A4-\uD7AF\uD7C7-\uD7CA\uD7FC-\uD7FF\uE000-\uF8FF\uFA6E\uFA6F\uFADA-\uFAFF\uFB07-\uFB12\uFB18-\uFB1C\uFB29\uFB37\uFB3D\uFB3F\uFB42\uFB45\uFBB2-\uFBD2\uFD3E-\uFD4F\uFD90\uFD91\uFDC8-\uFDEF\uFDFC-\uFDFF\uFE10-\uFE1F\uFE30-\uFE32\uFE35-\uFE4C\uFE50-\uFE6F\uFE75\uFEFD-\uFF0F\uFF1A-\uFF20\uFF3B-\uFF3E\uFF40\uFF5B-\uFF65\uFFBF-\uFFC1\uFFC8\uFFC9\uFFD0\uFFD1\uFFD8\uFFD9\uFFDD-\uFFFF]|\uD800[\uDC0C\uDC27\uDC3B\uDC3E\uDC4E\uDC4F\uDC5E-\uDC7F\uDCFB-\uDD3F\uDD75-\uDDFC\uDDFE-\uDE7F\uDE9D-\uDE9F\uDED1-\uDEDF\uDEE1-\uDEFF\uDF20-\uDF2C\uDF4B-\uDF4F\uDF7B-\uDF7F\uDF9E\uDF9F\uDFC4-\uDFC7\uDFD0\uDFD6-\uDFFF]|\uD801[\uDC9E\uDC9F\uDCAA-\uDCAF\uDCD4-\uDCD7\uDCFC-\uDCFF\uDD28-\uDD2F\uDD64-\uDDFF\uDF37-\uDF3F\uDF56-\uDF5F\uDF68-\uDFFF]|\uD802[\uDC06\uDC07\uDC09\uDC36\uDC39-\uDC3B\uDC3D\uDC3E\uDC56-\uDC5F\uDC77-\uDC7F\uDC9F-\uDCDF\uDCF3\uDCF6-\uDCFF\uDD16-\uDD1F\uDD3A-\uDD7F\uDDB8-\uDDBD\uDDC0-\uDDFF\uDE04\uDE07-\uDE0B\uDE14\uDE18\uDE36\uDE37\uDE3B-\uDE3E\uDE40-\uDE5F\uDE7D-\uDE7F\uDE9D-\uDEBF\uDEC8\uDEE7-\uDEFF\uDF36-\uDF3F\uDF56-\uDF5F\uDF73-\uDF7F\uDF92-\uDFFF]|\uD803[\uDC49-\uDC7F\uDCB3-\uDCBF\uDCF3-\uDCFF\uDD28-\uDD2F\uDD3A-\uDE7F\uDEAA\uDEAD-\uDEAF\uDEB2-\uDEFF\uDF1D-\uDF26\uDF28-\uDF2F\uDF51-\uDFAF\uDFC5-\uDFDF\uDFF7-\uDFFF]|\uD804[\uDC47-\uDC65\uDC70-\uDC7E\uDCBB-\uDCCF\uDCE9-\uDCEF\uDCFA-\uDCFF\uDD35\uDD40-\uDD43\uDD48-\uDD4F\uDD74\uDD75\uDD77-\uDD7F\uDDC5-\uDDC8\uDDCD\uDDDB\uDDDD-\uDDFF\uDE12\uDE38-\uDE3D\uDE3F-\uDE7F\uDE87\uDE89\uDE8E\uDE9E\uDEA9-\uDEAF\uDEEB-\uDEEF\uDEFA-\uDEFF\uDF04\uDF0D\uDF0E\uDF11\uDF12\uDF29\uDF31\uDF34\uDF3A\uDF45\uDF46\uDF49\uDF4A\uDF4E\uDF4F\uDF51-\uDF56\uDF58-\uDF5C\uDF64\uDF65\uDF6D-\uDF6F\uDF75-\uDFFF]|\uD805[\uDC4B-\uDC4F\uDC5A-\uDC5D\uDC62-\uDC7F\uDCC6\uDCC8-\uDCCF\uDCDA-\uDD7F\uDDB6\uDDB7\uDDC1-\uDDD7\uDDDE-\uDDFF\uDE41-\uDE43\uDE45-\uDE4F\uDE5A-\uDE7F\uDEB9-\uDEBF\uDECA-\uDEFF\uDF1B\uDF1C\uDF2C-\uDF2F\uDF3A-\uDFFF]|\uD806[\uDC3B-\uDC9F\uDCEA-\uDCFE\uDD07\uDD08\uDD0A\uDD0B\uDD14\uDD17\uDD36\uDD39\uDD3A\uDD44-\uDD4F\uDD5A-\uDD9F\uDDA8\uDDA9\uDDD8\uDDD9\uDDE2\uDDE5-\uDDFF\uDE3F-\uDE46\uDE48-\uDE4F\uDE9A-\uDE9C\uDE9E-\uDEBF\uDEF9-\uDFFF]|\uD807[\uDC09\uDC37\uDC41-\uDC4F\uDC5A-\uDC71\uDC90\uDC91\uDCA8\uDCB7-\uDCFF\uDD07\uDD0A\uDD37-\uDD39\uDD3B\uDD3E\uDD48-\uDD4F\uDD5A-\uDD5F\uDD66\uDD69\uDD8F\uDD92\uDD99-\uDD9F\uDDAA-\uDEDF\uDEF7-\uDFAF\uDFB1-\uDFFF]|\uD808[\uDF9A-\uDFFF]|\uD809[\uDC6F-\uDC7F\uDD44-\uDFFF]|[\uD80A\uD80B\uD80E-\uD810\uD812-\uD819\uD824-\uD82B\uD82D\uD82E\uD830-\uD833\uD837\uD839\uD83D\uD83F\uD87B-\uD87D\uD87F\uD885-\uDB3F\uDB41-\uDBFF][\uDC00-\uDFFF]|\uD80D[\uDC2F-\uDFFF]|\uD811[\uDE47-\uDFFF]|\uD81A[\uDE39-\uDE3F\uDE5F\uDE6A-\uDECF\uDEEE\uDEEF\uDEF5-\uDEFF\uDF37-\uDF3F\uDF44-\uDF4F\uDF5A-\uDF62\uDF78-\uDF7C\uDF90-\uDFFF]|\uD81B[\uDC00-\uDE3F\uDE80-\uDEFF\uDF4B-\uDF4E\uDF88-\uDF8E\uDFA0-\uDFDF\uDFE2\uDFE5-\uDFEF\uDFF2-\uDFFF]|\uD821[\uDFF8-\uDFFF]|\uD823[\uDCD6-\uDCFF\uDD09-\uDFFF]|\uD82C[\uDD1F-\uDD4F\uDD53-\uDD63\uDD68-\uDD6F\uDEFC-\uDFFF]|\uD82F[\uDC6B-\uDC6F\uDC7D-\uDC7F\uDC89-\uDC8F\uDC9A-\uDC9C\uDC9F-\uDFFF]|\uD834[\uDC00-\uDD64\uDD6A-\uDD6C\uDD73-\uDD7A\uDD83\uDD84\uDD8C-\uDDA9\uDDAE-\uDE41\uDE45-\uDFFF]|\uD835[\uDC55\uDC9D\uDCA0\uDCA1\uDCA3\uDCA4\uDCA7\uDCA8\uDCAD\uDCBA\uDCBC\uDCC4\uDD06\uDD0B\uDD0C\uDD15\uDD1D\uDD3A\uDD3F\uDD45\uDD47-\uDD49\uDD51\uDEA6\uDEA7\uDEC1\uDEDB\uDEFB\uDF15\uDF35\uDF4F\uDF6F\uDF89\uDFA9\uDFC3\uDFCC\uDFCD]|\uD836[\uDC00-\uDDFF\uDE37-\uDE3A\uDE6D-\uDE74\uDE76-\uDE83\uDE85-\uDE9A\uDEA0\uDEB0-\uDFFF]|\uD838[\uDC07\uDC19\uDC1A\uDC22\uDC25\uDC2B-\uDCFF\uDD2D-\uDD2F\uDD3E\uDD3F\uDD4A-\uDD4D\uDD4F-\uDEBF\uDEFA-\uDFFF]|\uD83A[\uDCC5-\uDCCF\uDCD7-\uDCFF\uDD4C-\uDD4F\uDD5A-\uDFFF]|\uD83B[\uDC00-\uDDFF\uDE04\uDE20\uDE23\uDE25\uDE26\uDE28\uDE33\uDE38\uDE3A\uDE3C-\uDE41\uDE43-\uDE46\uDE48\uDE4A\uDE4C\uDE50\uDE53\uDE55\uDE56\uDE58\uDE5A\uDE5C\uDE5E\uDE60\uDE63\uDE65\uDE66\uDE6B\uDE73\uDE78\uDE7D\uDE7F\uDE8A\uDE9C-\uDEA0\uDEA4\uDEAA\uDEBC-\uDFFF]|\uD83C[\uDC00-\uDD2F\uDD4A-\uDD4F\uDD6A-\uDD6F\uDD8A-\uDFFF]|\uD83E[\uDC00-\uDFEF\uDFFA-\uDFFF]|\uD869[\uDEDE-\uDEFF]|\uD86D[\uDF35-\uDF3F]|\uD86E[\uDC1E\uDC1F]|\uD873[\uDEA2-\uDEAF]|\uD87A[\uDFE1-\uDFFF]|\uD87E[\uDE1E-\uDFFF]|\uD884[\uDF4B-\uDFFF]|\uDB40[\uDC00-\uDCFF\uDDF0-\uDFFF]/g;var rn=Object.hasOwnProperty,U=class{constructor(){this.occurrences,this.reset()}slug(o,t){let e=this,n=sn(o,t===!0),a=n;for(;rn.call(e.occurrences,n);)e.occurrences[a]++,n=a+"-"+e.occurrences[a];return e.occurrences[n]=0,n}reset(){this.occurrences=Object.create(null)}};function sn(i,o){return typeof i!="string"?"":(o||(i=i.toLowerCase()),i.replace(Oe,"").replace(/ /g,"-"))}var He=new U,ze=[],ln=/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig;function cn(i){return i.replace(ln,(o,t)=>(t=t.toLowerCase(),t==="colon"?":":t.charAt(0)==="#"?t.charAt(1)==="x"?String.fromCharCode(parseInt(t.substring(2),16)):String.fromCharCode(+t.substring(1)):""))}function je({prefix:i="",globalSlugs:o=!1}={}){return{headerIds:!1,hooks:{preprocess(t){return o||un(),t}},useNewRenderer:!0,renderer:{heading({tokens:t,depth:e}){let n=this.parser.parseInline(t),a=cn(n).trim().replace(/<[!\/a-z].*?>/gi,""),r=e,l=`${i}${He.slug(a.toLowerCase())}`,u={level:r,text:n,id:l,raw:a};return ze.push(u),`<h${r} id="${l}">${n}</h${r}>
`}}}}function un(){ze=[],He=new U}var $e={providers:[ne(),ue(),_e(Le,fe({anchorScrolling:"enabled",scrollPositionRestoration:"enabled"})),Me({loader:tt,clipboardOptions:{provide:Te,useValue:{buttonComponent:Pe}},markedOptions:{provide:Be,useFactory:Ne,deps:[O]},markedExtensions:[{provide:Ie,useFactory:je,multi:!0}],mermaidOptions:{provide:we,useValue:{darkMode:!0,look:"handDrawn"}},sanitize:T.NONE})]};function We(i){return Error(`Unable to find icon with the name "${i}"`)}function dn(){return Error("Could not find HttpClient for use with Angular Material icons. Please add provideHttpClient() to your providers.")}function Ue(i){return Error(`The URL provided to MatIconRegistry was not trusted as a resource URL via Angular's DomSanitizer. Attempted URL was "${i}".`)}function Qe(i){return Error(`The literal provided to MatIconRegistry was not trusted as safe HTML by Angular's DomSanitizer. Attempted literal was "${i}".`)}var A=class{url;svgText;options;svgElement=null;constructor(o,t,e){this.url=o,this.svgText=t,this.options=e}},Ze=(()=>{class i{_httpClient;_sanitizer;_errorHandler;_document;_svgIconConfigs=new Map;_iconSetConfigs=new Map;_cachedIconsByUrl=new Map;_inProgressUrlFetches=new Map;_fontCssClassesByAlias=new Map;_resolvers=[];_defaultFontSetClass=["material-icons","mat-ligature-font"];constructor(t,e,n,a){this._httpClient=t,this._sanitizer=e,this._errorHandler=a,this._document=n}addSvgIcon(t,e,n){return this.addSvgIconInNamespace("",t,e,n)}addSvgIconLiteral(t,e,n){return this.addSvgIconLiteralInNamespace("",t,e,n)}addSvgIconInNamespace(t,e,n,a){return this._addSvgIconConfig(t,e,new A(n,null,a))}addSvgIconResolver(t){return this._resolvers.push(t),this}addSvgIconLiteralInNamespace(t,e,n,a){let r=this._sanitizer.sanitize(T.HTML,n);if(!r)throw Qe(n);let l=L(r);return this._addSvgIconConfig(t,e,new A("",l,a))}addSvgIconSet(t,e){return this.addSvgIconSetInNamespace("",t,e)}addSvgIconSetLiteral(t,e){return this.addSvgIconSetLiteralInNamespace("",t,e)}addSvgIconSetInNamespace(t,e,n){return this._addSvgIconSetConfig(t,new A(e,null,n))}addSvgIconSetLiteralInNamespace(t,e,n){let a=this._sanitizer.sanitize(T.HTML,e);if(!a)throw Qe(e);let r=L(a);return this._addSvgIconSetConfig(t,new A("",r,n))}registerFontClassAlias(t,e=t){return this._fontCssClassesByAlias.set(t,e),this}classNameForFontAlias(t){return this._fontCssClassesByAlias.get(t)||t}setDefaultFontSetClass(...t){return this._defaultFontSetClass=t,this}getDefaultFontSetClass(){return this._defaultFontSetClass}getSvgIconFromUrl(t){let e=this._sanitizer.sanitize(T.RESOURCE_URL,t);if(!e)throw Ue(t);let n=this._cachedIconsByUrl.get(e);return n?k(at(n)):this._loadSvgIconFromConfig(new A(t,null)).pipe(Z(a=>this._cachedIconsByUrl.set(e,a)),w(a=>at(a)))}getNamedSvgIcon(t,e=""){let n=Ve(e,t),a=this._svgIconConfigs.get(n);if(a)return this._getSvgFromConfig(a);if(a=this._getIconConfigFromResolvers(e,t),a)return this._svgIconConfigs.set(n,a),this._getSvgFromConfig(a);let r=this._iconSetConfigs.get(e);return r?this._getSvgFromIconSetConfigs(t,r):wt(We(n))}ngOnDestroy(){this._resolvers=[],this._svgIconConfigs.clear(),this._iconSetConfigs.clear(),this._cachedIconsByUrl.clear()}_getSvgFromConfig(t){return t.svgText?k(at(this._svgElementFromConfig(t))):this._loadSvgIconFromConfig(t).pipe(w(e=>at(e)))}_getSvgFromIconSetConfigs(t,e){let n=this._extractIconWithNameFromAnySet(t,e);if(n)return k(n);let a=e.filter(r=>!r.svgText).map(r=>this._loadSvgIconSetFromConfig(r).pipe(Pt(l=>{let p=`Loading icon set URL: ${this._sanitizer.sanitize(T.RESOURCE_URL,r.url)} failed: ${l.message}`;return this._errorHandler.handleError(new Error(p)),k(null)})));return Mt(a).pipe(w(()=>{let r=this._extractIconWithNameFromAnySet(t,e);if(!r)throw We(t);return r}))}_extractIconWithNameFromAnySet(t,e){for(let n=e.length-1;n>=0;n--){let a=e[n];if(a.svgText&&a.svgText.toString().indexOf(t)>-1){let r=this._svgElementFromConfig(a),l=this._extractSvgIconFromSet(r,t,a.options);if(l)return l}}return null}_loadSvgIconFromConfig(t){return this._fetchIcon(t).pipe(Z(e=>t.svgText=e),w(()=>this._svgElementFromConfig(t)))}_loadSvgIconSetFromConfig(t){return t.svgText?k(null):this._fetchIcon(t).pipe(Z(e=>t.svgText=e))}_extractSvgIconFromSet(t,e,n){let a=t.querySelector(`[id="${e}"]`);if(!a)return null;let r=a.cloneNode(!0);if(r.removeAttribute("id"),r.nodeName.toLowerCase()==="svg")return this._setSvgAttributes(r,n);if(r.nodeName.toLowerCase()==="symbol")return this._setSvgAttributes(this._toSvgElement(r),n);let l=this._svgElementFromString(L("<svg></svg>"));return l.appendChild(r),this._setSvgAttributes(l,n)}_svgElementFromString(t){let e=this._document.createElement("DIV");e.innerHTML=t;let n=e.querySelector("svg");if(!n)throw Error("<svg> tag not found");return n}_toSvgElement(t){let e=this._svgElementFromString(L("<svg></svg>")),n=t.attributes;for(let a=0;a<n.length;a++){let{name:r,value:l}=n[a];r!=="id"&&e.setAttribute(r,l)}for(let a=0;a<t.childNodes.length;a++)t.childNodes[a].nodeType===this._document.ELEMENT_NODE&&e.appendChild(t.childNodes[a].cloneNode(!0));return e}_setSvgAttributes(t,e){return t.setAttribute("fit",""),t.setAttribute("height","100%"),t.setAttribute("width","100%"),t.setAttribute("preserveAspectRatio","xMidYMid meet"),t.setAttribute("focusable","false"),e&&e.viewBox&&t.setAttribute("viewBox",e.viewBox),t}_fetchIcon(t){let{url:e,options:n}=t,a=n?.withCredentials??!1;if(!this._httpClient)throw dn();if(e==null)throw Error(`Cannot fetch icon from URL "${e}".`);let r=this._sanitizer.sanitize(T.RESOURCE_URL,e);if(!r)throw Ue(e);let l=this._inProgressUrlFetches.get(r);if(l)return l;let u=this._httpClient.get(r,{responseType:"text",withCredentials:a}).pipe(w(p=>L(p)),Ot(()=>this._inProgressUrlFetches.delete(r)),Ht());return this._inProgressUrlFetches.set(r,u),u}_addSvgIconConfig(t,e,n){return this._svgIconConfigs.set(Ve(t,e),n),this}_addSvgIconSetConfig(t,e){let n=this._iconSetConfigs.get(t);return n?n.push(e):this._iconSetConfigs.set(t,[e]),this}_svgElementFromConfig(t){if(!t.svgElement){let e=this._svgElementFromString(t.svgText);this._setSvgAttributes(e,t.options),t.svgElement=e}return t.svgElement}_getIconConfigFromResolvers(t,e){for(let n=0;n<this._resolvers.length;n++){let a=this._resolvers[n](e,t);if(a)return mn(a)?new A(a.url,null,a.options):new A(a,null)}}static \u0275fac=function(e){return new(e||i)(z(tt,8),z(de),z(h,8),z(q))};static \u0275prov=G({token:i,factory:i.\u0275fac,providedIn:"root"})}return i})();function at(i){return i.cloneNode(!0)}function Ve(i,o){return i+":"+o}function mn(i){return!!(i.url&&i.options)}var bn=["*"],pn=new H("MAT_ICON_DEFAULT_OPTIONS"),hn=new H("mat-icon-location",{providedIn:"root",factory:()=>{let i=s(h),o=i?i.location:null;return{getPathname:()=>o?o.pathname+o.search:""}}}),Ge=["clip-path","color-profile","src","cursor","fill","filter","marker","marker-start","marker-mid","marker-end","mask","stroke"],_n=Ge.map(i=>`[${i}]`).join(", "),fn=/^url\(['"]?#(.*?)['"]?\)$/,qe=(()=>{class i{_elementRef=s(m);_iconRegistry=s(Ze);_location=s(hn);_errorHandler=s(q);_defaultColor;get color(){return this._color||this._defaultColor}set color(t){this._color=t}_color;inline=!1;get svgIcon(){return this._svgIcon}set svgIcon(t){t!==this._svgIcon&&(t?this._updateSvgIcon(t):this._svgIcon&&this._clearSvgElement(),this._svgIcon=t)}_svgIcon;get fontSet(){return this._fontSet}set fontSet(t){let e=this._cleanupFontValue(t);e!==this._fontSet&&(this._fontSet=e,this._updateFontIconClasses())}_fontSet;get fontIcon(){return this._fontIcon}set fontIcon(t){let e=this._cleanupFontValue(t);e!==this._fontIcon&&(this._fontIcon=e,this._updateFontIconClasses())}_fontIcon;_previousFontSetClass=[];_previousFontIconClass;_svgName=null;_svgNamespace=null;_previousPath;_elementsWithExternalReferences;_currentIconFetch=rt.EMPTY;constructor(){let t=s(new J("aria-hidden"),{optional:!0}),e=s(pn,{optional:!0});e&&(e.color&&(this.color=this._defaultColor=e.color),e.fontSet&&(this.fontSet=e.fontSet)),t||this._elementRef.nativeElement.setAttribute("aria-hidden","true")}_splitIconName(t){if(!t)return["",""];let e=t.split(":");switch(e.length){case 1:return["",e[0]];case 2:return e;default:throw Error(`Invalid icon name: "${t}"`)}}ngOnInit(){this._updateFontIconClasses()}ngAfterViewChecked(){let t=this._elementsWithExternalReferences;if(t&&t.size){let e=this._location.getPathname();e!==this._previousPath&&(this._previousPath=e,this._prependPathToReferences(e))}}ngOnDestroy(){this._currentIconFetch.unsubscribe(),this._elementsWithExternalReferences&&this._elementsWithExternalReferences.clear()}_usingFontIcon(){return!this.svgIcon}_setSvgElement(t){this._clearSvgElement();let e=this._location.getPathname();this._previousPath=e,this._cacheChildrenWithExternalReferences(t),this._prependPathToReferences(e),this._elementRef.nativeElement.appendChild(t)}_clearSvgElement(){let t=this._elementRef.nativeElement,e=t.childNodes.length;for(this._elementsWithExternalReferences&&this._elementsWithExternalReferences.clear();e--;){let n=t.childNodes[e];(n.nodeType!==1||n.nodeName.toLowerCase()==="svg")&&n.remove()}}_updateFontIconClasses(){if(!this._usingFontIcon())return;let t=this._elementRef.nativeElement,e=(this.fontSet?this._iconRegistry.classNameForFontAlias(this.fontSet).split(/ +/):this._iconRegistry.getDefaultFontSetClass()).filter(n=>n.length>0);this._previousFontSetClass.forEach(n=>t.classList.remove(n)),e.forEach(n=>t.classList.add(n)),this._previousFontSetClass=e,this.fontIcon!==this._previousFontIconClass&&!e.includes("mat-ligature-font")&&(this._previousFontIconClass&&t.classList.remove(this._previousFontIconClass),this.fontIcon&&t.classList.add(this.fontIcon),this._previousFontIconClass=this.fontIcon)}_cleanupFontValue(t){return typeof t=="string"?t.trim().split(" ")[0]:t}_prependPathToReferences(t){let e=this._elementsWithExternalReferences;e&&e.forEach((n,a)=>{n.forEach(r=>{a.setAttribute(r.name,`url('${t}#${r.value}')`)})})}_cacheChildrenWithExternalReferences(t){let e=t.querySelectorAll(_n),n=this._elementsWithExternalReferences=this._elementsWithExternalReferences||new Map;for(let a=0;a<e.length;a++)Ge.forEach(r=>{let l=e[a],u=l.getAttribute(r),p=u?u.match(fn):null;if(p){let B=n.get(l);B||(B=[],n.set(l,B)),B.push({name:r,value:p[1]})}})}_updateSvgIcon(t){if(this._svgNamespace=null,this._svgName=null,this._currentIconFetch.unsubscribe(),t){let[e,n]=this._splitIconName(t);e&&(this._svgNamespace=e),n&&(this._svgName=n),this._currentIconFetch=this._iconRegistry.getNamedSvgIcon(n,e).pipe(Nt(1)).subscribe(a=>this._setSvgElement(a),a=>{let r=`Error retrieving icon ${e}:${n}! ${a.message}`;this._errorHandler.handleError(new Error(r))})}}static \u0275fac=function(e){return new(e||i)};static \u0275cmp=f({type:i,selectors:[["mat-icon"]],hostAttrs:["role","img",1,"mat-icon","notranslate"],hostVars:10,hostBindings:function(e,n){e&2&&(P("data-mat-icon-type",n._usingFontIcon()?"font":"svg")("data-mat-icon-name",n._svgName||n.fontIcon)("data-mat-icon-namespace",n._svgNamespace||n.fontSet)("fontIcon",n._usingFontIcon()?n.fontIcon:null),$(n.color?"mat-"+n.color:""),E("mat-icon-inline",n.inline)("mat-icon-no-color",n.color!=="primary"&&n.color!=="accent"&&n.color!=="warn"))},inputs:{color:"color",inline:[2,"inline","inline",b],svgIcon:"svgIcon",fontSet:"fontSet",fontIcon:"fontIcon"},exportAs:["matIcon"],ngContentSelectors:bn,decls:1,vars:0,template:function(e,n){e&1&&(I(),F(0))},styles:[`mat-icon, mat-icon.mat-primary, mat-icon.mat-accent, mat-icon.mat-warn {
  color: var(--mat-icon-color, inherit);
}

.mat-icon {
  -webkit-user-select: none;
  user-select: none;
  background-repeat: no-repeat;
  display: inline-block;
  fill: currentColor;
  height: 24px;
  width: 24px;
  overflow: hidden;
}
.mat-icon.mat-icon-inline {
  font-size: inherit;
  height: inherit;
  line-height: inherit;
  width: inherit;
}
.mat-icon.mat-ligature-font[fontIcon]::before {
  content: attr(fontIcon);
}

[dir=rtl] .mat-icon-rtl-mirror {
  transform: scale(-1, 1);
}

.mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-prefix .mat-icon,
.mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-suffix .mat-icon {
  display: block;
}
.mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-prefix .mat-icon-button .mat-icon,
.mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-suffix .mat-icon-button .mat-icon {
  margin: auto;
}
`],encapsulation:2,changeDetection:0})}return i})(),Ye=(()=>{class i{static \u0275fac=function(e){return new(e||i)};static \u0275mod=R({type:i});static \u0275inj=M({imports:[N]})}return i})();var Ct=["*"];var Dn=["tabListContainer"],vn=["tabList"],Fn=["tabListInner"],Cn=["nextPaginator"],yn=["previousPaginator"];var En=["mat-tab-nav-bar",""],An=["mat-tab-link",""];var Dt="mdc-tab-indicator--active",Ke="mdc-tab-indicator--no-transition",Ft=class{_items;_currentItem;constructor(o){this._items=o}hide(){this._items.forEach(o=>o.deactivateInkBar()),this._currentItem=void 0}alignToElement(o){let t=this._items.find(n=>n.elementRef.nativeElement===o),e=this._currentItem;if(t!==e&&(e?.deactivateInkBar(),t)){let n=e?.elementRef.nativeElement.getBoundingClientRect?.();t.activateInkBar(n),this._currentItem=t}}},kn=(()=>{class i{_elementRef=s(m);_inkBarElement=null;_inkBarContentElement=null;_fitToContent=!1;get fitInkBarToContent(){return this._fitToContent}set fitInkBarToContent(t){this._fitToContent!==t&&(this._fitToContent=t,this._inkBarElement&&this._appendInkBarElement())}activateInkBar(t){let e=this._elementRef.nativeElement;if(!t||!e.getBoundingClientRect||!this._inkBarContentElement){e.classList.add(Dt);return}let n=e.getBoundingClientRect(),a=t.width/n.width,r=t.left-n.left;e.classList.add(Ke),this._inkBarContentElement.style.setProperty("transform",`translateX(${r}px) scaleX(${a})`),e.getBoundingClientRect(),e.classList.remove(Ke),e.classList.add(Dt),this._inkBarContentElement.style.setProperty("transform","")}deactivateInkBar(){this._elementRef.nativeElement.classList.remove(Dt)}ngOnInit(){this._createInkBarElement()}ngOnDestroy(){this._inkBarElement?.remove(),this._inkBarElement=this._inkBarContentElement=null}_createInkBarElement(){let t=this._elementRef.nativeElement.ownerDocument||document,e=this._inkBarElement=t.createElement("span"),n=this._inkBarContentElement=t.createElement("span");e.className="mdc-tab-indicator",n.className="mdc-tab-indicator__content mdc-tab-indicator__content--underline",e.appendChild(this._inkBarContentElement),this._appendInkBarElement()}_appendInkBarElement(){this._inkBarElement;let t=this._fitToContent?this._elementRef.nativeElement.querySelector(".mdc-tab__content"):this._elementRef.nativeElement;t.appendChild(this._inkBarElement)}static \u0275fac=function(e){return new(e||i)};static \u0275dir=j({type:i,inputs:{fitInkBarToContent:[2,"fitInkBarToContent","fitInkBarToContent",b]}})}return i})();var Xe={passive:!0},xn=650,Tn=100,In=(()=>{class i{_elementRef=s(m);_changeDetectorRef=s(oe);_viewportRuler=s(Re);_dir=s(ke,{optional:!0});_ngZone=s(Wt);_platform=s(nt);_sharedResizeObserver=s(Se);_injector=s($t);_renderer=s(qt);_animationsDisabled=_t();_eventCleanups;_scrollDistance=0;_selectedIndexChanged=!1;_destroyed=new Q;_showPaginationControls=!1;_disableScrollAfter=!0;_disableScrollBefore=!0;_tabLabelCount;_scrollDistanceChanged=!1;_keyManager;_currentTextContent;_stopScrolling=new Q;disablePagination=!1;get selectedIndex(){return this._selectedIndex}set selectedIndex(t){let e=isNaN(t)?0:t;this._selectedIndex!=e&&(this._selectedIndexChanged=!0,this._selectedIndex=e,this._keyManager&&this._keyManager.updateActiveItem(e))}_selectedIndex=0;selectFocusedIndex=new lt;indexFocused=new lt;constructor(){this._eventCleanups=this._ngZone.runOutsideAngular(()=>[this._renderer.listen(this._elementRef.nativeElement,"mouseleave",()=>this._stopInterval())])}ngAfterViewInit(){this._eventCleanups.push(this._renderer.listen(this._previousPaginator.nativeElement,"touchstart",()=>this._handlePaginatorPress("before"),Xe),this._renderer.listen(this._nextPaginator.nativeElement,"touchstart",()=>this._handlePaginatorPress("after"),Xe))}ngAfterContentInit(){let t=this._dir?this._dir.change:k("ltr"),e=this._sharedResizeObserver.observe(this._elementRef.nativeElement).pipe(Lt(32),x(this._destroyed)),n=this._viewportRuler.change(150).pipe(x(this._destroyed)),a=()=>{this.updatePagination(),this._alignInkBarToSelectedTab()};this._keyManager=new Ce(this._items).withHorizontalOrientation(this._getLayoutDirection()).withHomeAndEnd().withWrap().skipPredicate(()=>!1),this._keyManager.updateActiveItem(Math.max(this._selectedIndex,0)),Gt(a,{injector:this._injector}),st(t,n,e,this._items.changes,this._itemsResized()).pipe(x(this._destroyed)).subscribe(()=>{this._ngZone.run(()=>{Promise.resolve().then(()=>{this._scrollDistance=Math.max(0,Math.min(this._getMaxScrollDistance(),this._scrollDistance)),a()})}),this._keyManager?.withHorizontalOrientation(this._getLayoutDirection())}),this._keyManager.change.subscribe(r=>{this.indexFocused.emit(r),this._setTabFocus(r)})}_itemsResized(){return typeof ResizeObserver!="function"?Bt:this._items.changes.pipe(V(this._items),jt(t=>new Tt(e=>this._ngZone.runOutsideAngular(()=>{let n=new ResizeObserver(a=>e.next(a));return t.forEach(a=>n.observe(a.elementRef.nativeElement)),()=>{n.disconnect()}}))),zt(1),Rt(t=>t.some(e=>e.contentRect.width>0&&e.contentRect.height>0)))}ngAfterContentChecked(){this._tabLabelCount!=this._items.length&&(this.updatePagination(),this._tabLabelCount=this._items.length,this._changeDetectorRef.markForCheck()),this._selectedIndexChanged&&(this._scrollToLabel(this._selectedIndex),this._checkScrollingControls(),this._alignInkBarToSelectedTab(),this._selectedIndexChanged=!1,this._changeDetectorRef.markForCheck()),this._scrollDistanceChanged&&(this._updateTabScrollPosition(),this._scrollDistanceChanged=!1,this._changeDetectorRef.markForCheck())}ngOnDestroy(){this._eventCleanups.forEach(t=>t()),this._keyManager?.destroy(),this._destroyed.next(),this._destroyed.complete(),this._stopScrolling.complete()}_handleKeydown(t){if(!Fe(t))switch(t.keyCode){case 13:case 32:if(this.focusIndex!==this.selectedIndex){let e=this._items.get(this.focusIndex);e&&!e.disabled&&(this.selectFocusedIndex.emit(this.focusIndex),this._itemSelected(t))}break;default:this._keyManager?.onKeydown(t)}}_onContentChanges(){let t=this._elementRef.nativeElement.textContent;t!==this._currentTextContent&&(this._currentTextContent=t||"",this._ngZone.run(()=>{this.updatePagination(),this._alignInkBarToSelectedTab(),this._changeDetectorRef.markForCheck()}))}updatePagination(){this._checkPaginationEnabled(),this._checkScrollingControls(),this._updateTabScrollPosition()}get focusIndex(){return this._keyManager?this._keyManager.activeItemIndex:0}set focusIndex(t){!this._isValidIndex(t)||this.focusIndex===t||!this._keyManager||this._keyManager.setActiveItem(t)}_isValidIndex(t){return this._items?!!this._items.toArray()[t]:!0}_setTabFocus(t){if(this._showPaginationControls&&this._scrollToLabel(t),this._items&&this._items.length){this._items.toArray()[t].focus();let e=this._tabListContainer.nativeElement;this._getLayoutDirection()=="ltr"?e.scrollLeft=0:e.scrollLeft=e.scrollWidth-e.offsetWidth}}_getLayoutDirection(){return this._dir&&this._dir.value==="rtl"?"rtl":"ltr"}_updateTabScrollPosition(){if(this.disablePagination)return;let t=this.scrollDistance,e=this._getLayoutDirection()==="ltr"?-t:t;this._tabList.nativeElement.style.transform=`translateX(${Math.round(e)}px)`,(this._platform.TRIDENT||this._platform.EDGE)&&(this._tabListContainer.nativeElement.scrollLeft=0)}get scrollDistance(){return this._scrollDistance}set scrollDistance(t){this._scrollTo(t)}_scrollHeader(t){let e=this._tabListContainer.nativeElement.offsetWidth,n=(t=="before"?-1:1)*e/3;return this._scrollTo(this._scrollDistance+n)}_handlePaginatorClick(t){this._stopInterval(),this._scrollHeader(t)}_scrollToLabel(t){if(this.disablePagination)return;let e=this._items?this._items.toArray()[t]:null;if(!e)return;let n=this._tabListContainer.nativeElement.offsetWidth,{offsetLeft:a,offsetWidth:r}=e.elementRef.nativeElement,l,u;this._getLayoutDirection()=="ltr"?(l=a,u=l+r):(u=this._tabListInner.nativeElement.offsetWidth-a,l=u-r);let p=this.scrollDistance,B=this.scrollDistance+n;l<p?this.scrollDistance-=p-l:u>B&&(this.scrollDistance+=Math.min(u-B,l-p))}_checkPaginationEnabled(){if(this.disablePagination)this._showPaginationControls=!1;else{let t=this._tabListInner.nativeElement.scrollWidth,e=this._elementRef.nativeElement.offsetWidth,n=t-e>=5;n||(this.scrollDistance=0),n!==this._showPaginationControls&&(this._showPaginationControls=n,this._changeDetectorRef.markForCheck())}}_checkScrollingControls(){this.disablePagination?this._disableScrollAfter=this._disableScrollBefore=!0:(this._disableScrollBefore=this.scrollDistance==0,this._disableScrollAfter=this.scrollDistance==this._getMaxScrollDistance(),this._changeDetectorRef.markForCheck())}_getMaxScrollDistance(){let t=this._tabListInner.nativeElement.scrollWidth,e=this._tabListContainer.nativeElement.offsetWidth;return t-e||0}_alignInkBarToSelectedTab(){let t=this._items&&this._items.length?this._items.toArray()[this.selectedIndex]:null,e=t?t.elementRef.nativeElement:null;e?this._inkBar.alignToElement(e):this._inkBar.hide()}_stopInterval(){this._stopScrolling.next()}_handlePaginatorPress(t,e){e&&e.button!=null&&e.button!==0||(this._stopInterval(),St(xn,Tn).pipe(x(st(this._stopScrolling,this._destroyed))).subscribe(()=>{let{maxScrollDistance:n,distance:a}=this._scrollHeader(t);(a===0||a>=n)&&this._stopInterval()}))}_scrollTo(t){if(this.disablePagination)return{maxScrollDistance:0,distance:0};let e=this._getMaxScrollDistance();return this._scrollDistance=Math.max(0,Math.min(e,t)),this._scrollDistanceChanged=!0,this._checkScrollingControls(),{maxScrollDistance:e,distance:this._scrollDistance}}static \u0275fac=function(e){return new(e||i)};static \u0275dir=j({type:i,inputs:{disablePagination:[2,"disablePagination","disablePagination",b],selectedIndex:[2,"selectedIndex","selectedIndex",pt]},outputs:{selectFocusedIndex:"selectFocusedIndex",indexFocused:"indexFocused"}})}return i})();var Bn=new H("MAT_TABS_CONFIG");var yt=(()=>{class i extends In{_focusedItem=S(null);get fitInkBarToContent(){return this._fitInkBarToContent.value}set fitInkBarToContent(t){this._fitInkBarToContent.next(t),this._changeDetectorRef.markForCheck()}_fitInkBarToContent=new It(!1);stretchTabs=!0;get animationDuration(){return this._animationDuration}set animationDuration(t){let e=t+"";this._animationDuration=/^\d+$/.test(e)?t+"ms":e}_animationDuration;_items;get backgroundColor(){return this._backgroundColor}set backgroundColor(t){let e=this._elementRef.nativeElement.classList;e.remove("mat-tabs-with-background",`mat-background-${this.backgroundColor}`),t&&e.add("mat-tabs-with-background",`mat-background-${t}`),this._backgroundColor=t}_backgroundColor;get disableRipple(){return this._disableRipple()}set disableRipple(t){this._disableRipple.set(t)}_disableRipple=S(!1);color="primary";tabPanel;_tabListContainer;_tabList;_tabListInner;_nextPaginator;_previousPaginator;_inkBar;constructor(){let t=s(Bn,{optional:!0});super(),this.disablePagination=t&&t.disablePagination!=null?t.disablePagination:!1,this.fitInkBarToContent=t&&t.fitInkBarToContent!=null?t.fitInkBarToContent:!1,this.stretchTabs=t&&t.stretchTabs!=null?t.stretchTabs:!0}_itemSelected(){}ngAfterContentInit(){this._inkBar=new Ft(this._items),this._items.changes.pipe(V(null),x(this._destroyed)).subscribe(()=>this.updateActiveLink()),super.ngAfterContentInit(),this._keyManager.change.pipe(V(null),x(this._destroyed)).subscribe(()=>this._focusedItem.set(this._keyManager?.activeItem||null))}ngAfterViewInit(){this.tabPanel,super.ngAfterViewInit()}updateActiveLink(){if(!this._items)return;let t=this._items.toArray();for(let e=0;e<t.length;e++)if(t[e].active){this.selectedIndex=e,this.tabPanel&&(this.tabPanel._activeTabId=t[e].id),this._focusedItem.set(t[e]),this._changeDetectorRef.markForCheck();return}this.selectedIndex=-1}_getRole(){return this.tabPanel?"tablist":this._elementRef.nativeElement.getAttribute("role")}_hasFocus(t){return this._keyManager?.activeItem===t}static \u0275fac=function(e){return new(e||i)};static \u0275cmp=f({type:i,selectors:[["","mat-tab-nav-bar",""]],contentQueries:function(e,n,a){if(e&1&&Y(a,Et,5),e&2){let r;C(r=y())&&(n._items=r)}},viewQuery:function(e,n){if(e&1&&Yt(Dn,7)(vn,7)(Fn,7)(Cn,5)(yn,5),e&2){let a;C(a=y())&&(n._tabListContainer=a.first),C(a=y())&&(n._tabList=a.first),C(a=y())&&(n._tabListInner=a.first),C(a=y())&&(n._nextPaginator=a.first),C(a=y())&&(n._previousPaginator=a.first)}},hostAttrs:[1,"mat-mdc-tab-nav-bar","mat-mdc-tab-header"],hostVars:17,hostBindings:function(e,n){e&2&&(P("role",n._getRole()),Jt("--mat-tab-animation-duration",n.animationDuration),E("mat-mdc-tab-header-pagination-controls-enabled",n._showPaginationControls)("mat-mdc-tab-header-rtl",n._getLayoutDirection()=="rtl")("mat-mdc-tab-nav-bar-stretch-tabs",n.stretchTabs)("mat-primary",n.color!=="warn"&&n.color!=="accent")("mat-accent",n.color==="accent")("mat-warn",n.color==="warn")("_mat-animation-noopable",n._animationsDisabled))},inputs:{fitInkBarToContent:[2,"fitInkBarToContent","fitInkBarToContent",b],stretchTabs:[2,"mat-stretch-tabs","stretchTabs",b],animationDuration:"animationDuration",backgroundColor:"backgroundColor",disableRipple:[2,"disableRipple","disableRipple",b],color:"color",tabPanel:"tabPanel"},exportAs:["matTabNavBar","matTabNav"],features:[ct],attrs:En,ngContentSelectors:Ct,decls:13,vars:6,consts:[["previousPaginator",""],["tabListContainer",""],["tabList",""],["tabListInner",""],["nextPaginator",""],["mat-ripple","",1,"mat-mdc-tab-header-pagination","mat-mdc-tab-header-pagination-before",3,"click","mousedown","touchend","matRippleDisabled"],[1,"mat-mdc-tab-header-pagination-chevron"],[1,"mat-mdc-tab-link-container",3,"keydown"],[1,"mat-mdc-tab-list",3,"cdkObserveContent"],[1,"mat-mdc-tab-links"],["mat-ripple","",1,"mat-mdc-tab-header-pagination","mat-mdc-tab-header-pagination-after",3,"mousedown","click","touchend","matRippleDisabled"]],template:function(e,n){e&1&&(I(),c(0,"div",5,0),v("click",function(){return n._handlePaginatorClick("before")})("mousedown",function(r){return n._handlePaginatorPress("before",r)})("touchend",function(){return n._stopInterval()}),D(2,"div",6),d(),c(3,"div",7,1),v("keydown",function(r){return n._handleKeydown(r)}),c(5,"div",8,2),v("cdkObserveContent",function(){return n._onContentChanges()}),c(7,"div",9,3),F(9),d()()(),c(10,"div",10,4),v("mousedown",function(r){return n._handlePaginatorPress("after",r)})("click",function(){return n._handlePaginatorClick("after")})("touchend",function(){return n._stopInterval()}),D(12,"div",6),d()),e&2&&(E("mat-mdc-tab-header-pagination-disabled",n._disableScrollBefore),g("matRippleDisabled",n._disableScrollBefore||n.disableRipple),_(10),E("mat-mdc-tab-header-pagination-disabled",n._disableScrollAfter),g("matRippleDisabled",n._disableScrollAfter||n.disableRipple))},dependencies:[ft,ve],styles:[`.mdc-tab {
  min-width: 90px;
  padding: 0 24px;
  display: flex;
  flex: 1 0 auto;
  justify-content: center;
  box-sizing: border-box;
  border: none;
  outline: none;
  text-align: center;
  white-space: nowrap;
  cursor: pointer;
  z-index: 1;
  touch-action: manipulation;
}

.mdc-tab__content {
  display: flex;
  align-items: center;
  justify-content: center;
  height: inherit;
  pointer-events: none;
}

.mdc-tab__text-label {
  transition: 150ms color linear;
  display: inline-block;
  line-height: 1;
  z-index: 2;
}

.mdc-tab--active .mdc-tab__text-label {
  transition-delay: 100ms;
}

._mat-animation-noopable .mdc-tab__text-label {
  transition: none;
}

.mdc-tab-indicator {
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  justify-content: center;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
}

.mdc-tab-indicator__content {
  transition: var(--mat-tab-animation-duration, 250ms) transform cubic-bezier(0.4, 0, 0.2, 1);
  transform-origin: left;
  opacity: 0;
}

.mdc-tab-indicator__content--underline {
  align-self: flex-end;
  box-sizing: border-box;
  width: 100%;
  border-top-style: solid;
}

.mdc-tab-indicator--active .mdc-tab-indicator__content {
  opacity: 1;
}

._mat-animation-noopable .mdc-tab-indicator__content, .mdc-tab-indicator--no-transition .mdc-tab-indicator__content {
  transition: none;
}

.mat-mdc-tab-ripple.mat-mdc-tab-ripple {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  pointer-events: none;
}

.mat-mdc-tab-header {
  display: flex;
  overflow: hidden;
  position: relative;
  flex-shrink: 0;
}

.mdc-tab-indicator .mdc-tab-indicator__content {
  transition-duration: var(--mat-tab-animation-duration, 250ms);
}

.mat-mdc-tab-header-pagination {
  -webkit-user-select: none;
  user-select: none;
  position: relative;
  display: none;
  justify-content: center;
  align-items: center;
  min-width: 32px;
  cursor: pointer;
  z-index: 2;
  -webkit-tap-highlight-color: transparent;
  touch-action: none;
  box-sizing: content-box;
  outline: 0;
}
.mat-mdc-tab-header-pagination::-moz-focus-inner {
  border: 0;
}
.mat-mdc-tab-header-pagination .mat-ripple-element {
  opacity: 0.12;
  background-color: var(--mat-tab-inactive-ripple-color, var(--mat-sys-on-surface));
}
.mat-mdc-tab-header-pagination-controls-enabled .mat-mdc-tab-header-pagination {
  display: flex;
}

.mat-mdc-tab-header-pagination-before,
.mat-mdc-tab-header-rtl .mat-mdc-tab-header-pagination-after {
  padding-left: 4px;
}
.mat-mdc-tab-header-pagination-before .mat-mdc-tab-header-pagination-chevron,
.mat-mdc-tab-header-rtl .mat-mdc-tab-header-pagination-after .mat-mdc-tab-header-pagination-chevron {
  transform: rotate(-135deg);
}

.mat-mdc-tab-header-rtl .mat-mdc-tab-header-pagination-before,
.mat-mdc-tab-header-pagination-after {
  padding-right: 4px;
}
.mat-mdc-tab-header-rtl .mat-mdc-tab-header-pagination-before .mat-mdc-tab-header-pagination-chevron,
.mat-mdc-tab-header-pagination-after .mat-mdc-tab-header-pagination-chevron {
  transform: rotate(45deg);
}

.mat-mdc-tab-header-pagination-chevron {
  border-style: solid;
  border-width: 2px 2px 0 0;
  height: 8px;
  width: 8px;
  border-color: var(--mat-tab-pagination-icon-color, var(--mat-sys-on-surface));
}

.mat-mdc-tab-header-pagination-disabled {
  box-shadow: none;
  cursor: default;
  pointer-events: none;
}
.mat-mdc-tab-header-pagination-disabled .mat-mdc-tab-header-pagination-chevron {
  opacity: 0.4;
}

.mat-mdc-tab-list {
  flex-grow: 1;
  position: relative;
  transition: transform 500ms cubic-bezier(0.35, 0, 0.25, 1);
}
._mat-animation-noopable .mat-mdc-tab-list {
  transition: none;
}

.mat-mdc-tab-links {
  display: flex;
  flex: 1 0 auto;
}
[mat-align-tabs=center] > .mat-mdc-tab-link-container .mat-mdc-tab-links {
  justify-content: center;
}
[mat-align-tabs=end] > .mat-mdc-tab-link-container .mat-mdc-tab-links {
  justify-content: flex-end;
}
.cdk-drop-list .mat-mdc-tab-links, .mat-mdc-tab-links.cdk-drop-list {
  min-height: var(--mat-tab-container-height, 48px);
}

.mat-mdc-tab-link-container {
  display: flex;
  flex-grow: 1;
  overflow: hidden;
  z-index: 1;
  border-bottom-style: solid;
  border-bottom-width: var(--mat-tab-divider-height, 1px);
  border-bottom-color: var(--mat-tab-divider-color, var(--mat-sys-surface-variant));
}

.mat-mdc-tab-nav-bar.mat-tabs-with-background > .mat-mdc-tab-link-container, .mat-mdc-tab-nav-bar.mat-tabs-with-background > .mat-mdc-tab-header-pagination {
  background-color: var(--mat-tab-background-color);
}
.mat-mdc-tab-nav-bar.mat-tabs-with-background.mat-primary > .mat-mdc-tab-link-container .mat-mdc-tab-link .mdc-tab__text-label {
  color: var(--mat-tab-foreground-color);
}
.mat-mdc-tab-nav-bar.mat-tabs-with-background.mat-primary > .mat-mdc-tab-link-container .mdc-tab-indicator__content--underline {
  border-color: var(--mat-tab-foreground-color);
}
.mat-mdc-tab-nav-bar.mat-tabs-with-background:not(.mat-primary) > .mat-mdc-tab-link-container .mat-mdc-tab-link:not(.mdc-tab--active) .mdc-tab__text-label {
  color: var(--mat-tab-foreground-color);
}
.mat-mdc-tab-nav-bar.mat-tabs-with-background:not(.mat-primary) > .mat-mdc-tab-link-container .mat-mdc-tab-link:not(.mdc-tab--active) .mdc-tab-indicator__content--underline {
  border-color: var(--mat-tab-foreground-color);
}
.mat-mdc-tab-nav-bar.mat-tabs-with-background > .mat-mdc-tab-link-container .mat-mdc-tab-header-pagination-chevron,
.mat-mdc-tab-nav-bar.mat-tabs-with-background > .mat-mdc-tab-link-container .mat-focus-indicator::before, .mat-mdc-tab-nav-bar.mat-tabs-with-background > .mat-mdc-tab-header-pagination .mat-mdc-tab-header-pagination-chevron,
.mat-mdc-tab-nav-bar.mat-tabs-with-background > .mat-mdc-tab-header-pagination .mat-focus-indicator::before {
  border-color: var(--mat-tab-foreground-color);
}
.mat-mdc-tab-nav-bar.mat-tabs-with-background > .mat-mdc-tab-link-container .mat-ripple-element, .mat-mdc-tab-nav-bar.mat-tabs-with-background > .mat-mdc-tab-link-container .mdc-tab__ripple::before, .mat-mdc-tab-nav-bar.mat-tabs-with-background > .mat-mdc-tab-header-pagination .mat-ripple-element, .mat-mdc-tab-nav-bar.mat-tabs-with-background > .mat-mdc-tab-header-pagination .mdc-tab__ripple::before {
  background-color: var(--mat-tab-foreground-color);
}
.mat-mdc-tab-nav-bar.mat-tabs-with-background > .mat-mdc-tab-link-container .mat-mdc-tab-header-pagination-chevron, .mat-mdc-tab-nav-bar.mat-tabs-with-background > .mat-mdc-tab-header-pagination .mat-mdc-tab-header-pagination-chevron {
  color: var(--mat-tab-foreground-color);
}
`],encapsulation:2})}return i})(),Et=(()=>{class i extends kn{_tabNavBar=s(yt);elementRef=s(m);_focusMonitor=s(ge);_destroyed=new Q;_isActive=!1;_tabIndex=ae(()=>this._tabNavBar._focusedItem()===this?this.tabIndex:-1);get active(){return this._isActive}set active(t){t!==this._isActive&&(this._isActive=t,this._tabNavBar.updateActiveLink())}disabled=!1;get disableRipple(){return this._disableRipple()}set disableRipple(t){this._disableRipple.set(t)}_disableRipple=S(!1);tabIndex=0;rippleConfig;get rippleDisabled(){return this.disabled||this.disableRipple||this._tabNavBar.disableRipple||!!this.rippleConfig.disabled}id=s(ht).getId("mat-tab-link-");constructor(){super(),s(De).load(Ee);let t=s(ye,{optional:!0}),e=s(new J("tabindex"),{optional:!0});this.rippleConfig=t||{},this.tabIndex=e==null?0:parseInt(e)||0,_t()&&(this.rippleConfig.animation={enterDuration:0,exitDuration:0}),this._tabNavBar._fitInkBarToContent.pipe(x(this._destroyed)).subscribe(n=>{this.fitInkBarToContent=n})}focus(){this.elementRef.nativeElement.focus()}ngAfterViewInit(){this._focusMonitor.monitor(this.elementRef)}ngOnDestroy(){this._destroyed.next(),this._destroyed.complete(),super.ngOnDestroy(),this._focusMonitor.stopMonitoring(this.elementRef)}_handleFocus(){this._tabNavBar.focusIndex=this._tabNavBar._items.toArray().indexOf(this)}_handleKeydown(t){(t.keyCode===32||t.keyCode===13)&&(this.disabled?t.preventDefault():this._tabNavBar.tabPanel&&(t.keyCode===32&&t.preventDefault(),this.elementRef.nativeElement.click()))}_getAriaControls(){return this._tabNavBar.tabPanel?this._tabNavBar.tabPanel?.id:this.elementRef.nativeElement.getAttribute("aria-controls")}_getAriaSelected(){return this._tabNavBar.tabPanel?this.active?"true":"false":this.elementRef.nativeElement.getAttribute("aria-selected")}_getAriaCurrent(){return this.active&&!this._tabNavBar.tabPanel?"page":null}_getRole(){return this._tabNavBar.tabPanel?"tab":this.elementRef.nativeElement.getAttribute("role")}static \u0275fac=function(e){return new(e||i)};static \u0275cmp=f({type:i,selectors:[["","mat-tab-link",""],["","matTabLink",""]],hostAttrs:[1,"mdc-tab","mat-mdc-tab-link","mat-focus-indicator"],hostVars:11,hostBindings:function(e,n){e&1&&v("focus",function(){return n._handleFocus()})("keydown",function(r){return n._handleKeydown(r)}),e&2&&(P("aria-controls",n._getAriaControls())("aria-current",n._getAriaCurrent())("aria-disabled",n.disabled)("aria-selected",n._getAriaSelected())("id",n.id)("tabIndex",n._tabIndex())("role",n._getRole()),E("mat-mdc-tab-disabled",n.disabled)("mdc-tab--active",n.active))},inputs:{active:[2,"active","active",b],disabled:[2,"disabled","disabled",b],disableRipple:[2,"disableRipple","disableRipple",b],tabIndex:[2,"tabIndex","tabIndex",t=>t==null?0:pt(t)],id:"id"},exportAs:["matTabLink"],features:[ct],attrs:An,ngContentSelectors:Ct,decls:5,vars:2,consts:[[1,"mdc-tab__ripple"],["mat-ripple","",1,"mat-mdc-tab-ripple",3,"matRippleTrigger","matRippleDisabled"],[1,"mdc-tab__content"],[1,"mdc-tab__text-label"]],template:function(e,n){e&1&&(I(),D(0,"span",0)(1,"div",1),c(2,"span",2)(3,"span",3),F(4),d()()),e&2&&(_(),g("matRippleTrigger",n.elementRef.nativeElement)("matRippleDisabled",n.rippleDisabled))},dependencies:[ft],styles:[`.mat-mdc-tab-link {
  -webkit-tap-highlight-color: transparent;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-decoration: none;
  background: none;
  height: var(--mat-tab-container-height, 48px);
  font-family: var(--mat-tab-label-text-font, var(--mat-sys-title-small-font));
  font-size: var(--mat-tab-label-text-size, var(--mat-sys-title-small-size));
  letter-spacing: var(--mat-tab-label-text-tracking, var(--mat-sys-title-small-tracking));
  line-height: var(--mat-tab-label-text-line-height, var(--mat-sys-title-small-line-height));
  font-weight: var(--mat-tab-label-text-weight, var(--mat-sys-title-small-weight));
}
.mat-mdc-tab-link.mdc-tab {
  flex-grow: 0;
}
.mat-mdc-tab-link .mdc-tab-indicator__content--underline {
  border-color: var(--mat-tab-active-indicator-color, var(--mat-sys-primary));
  border-top-width: var(--mat-tab-active-indicator-height, 2px);
  border-radius: var(--mat-tab-active-indicator-shape, 0);
}
.mat-mdc-tab-link:hover .mdc-tab__text-label {
  color: var(--mat-tab-inactive-hover-label-text-color, var(--mat-sys-on-surface));
}
.mat-mdc-tab-link:focus .mdc-tab__text-label {
  color: var(--mat-tab-inactive-focus-label-text-color, var(--mat-sys-on-surface));
}
.mat-mdc-tab-link.mdc-tab--active .mdc-tab__text-label {
  color: var(--mat-tab-active-label-text-color, var(--mat-sys-on-surface));
}
.mat-mdc-tab-link.mdc-tab--active .mdc-tab__ripple::before,
.mat-mdc-tab-link.mdc-tab--active .mat-ripple-element {
  background-color: var(--mat-tab-active-ripple-color, var(--mat-sys-on-surface));
}
.mat-mdc-tab-link.mdc-tab--active:hover .mdc-tab__text-label {
  color: var(--mat-tab-active-hover-label-text-color, var(--mat-sys-on-surface));
}
.mat-mdc-tab-link.mdc-tab--active:hover .mdc-tab-indicator__content--underline {
  border-color: var(--mat-tab-active-hover-indicator-color, var(--mat-sys-primary));
}
.mat-mdc-tab-link.mdc-tab--active:focus .mdc-tab__text-label {
  color: var(--mat-tab-active-focus-label-text-color, var(--mat-sys-on-surface));
}
.mat-mdc-tab-link.mdc-tab--active:focus .mdc-tab-indicator__content--underline {
  border-color: var(--mat-tab-active-focus-indicator-color, var(--mat-sys-primary));
}
.mat-mdc-tab-link.mat-mdc-tab-disabled {
  opacity: 0.4;
  pointer-events: none;
}
.mat-mdc-tab-link.mat-mdc-tab-disabled .mdc-tab__content {
  pointer-events: none;
}
.mat-mdc-tab-link.mat-mdc-tab-disabled .mdc-tab__ripple::before,
.mat-mdc-tab-link.mat-mdc-tab-disabled .mat-ripple-element {
  background-color: var(--mat-tab-disabled-ripple-color, var(--mat-sys-on-surface-variant));
}
.mat-mdc-tab-link .mdc-tab__ripple::before {
  content: "";
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0;
  pointer-events: none;
  background-color: var(--mat-tab-inactive-ripple-color, var(--mat-sys-on-surface));
}
.mat-mdc-tab-link .mdc-tab__text-label {
  color: var(--mat-tab-inactive-label-text-color, var(--mat-sys-on-surface));
  display: inline-flex;
  align-items: center;
}
.mat-mdc-tab-link .mdc-tab__content {
  position: relative;
  pointer-events: auto;
}
.mat-mdc-tab-link:hover .mdc-tab__ripple::before {
  opacity: 0.04;
}
.mat-mdc-tab-link.cdk-program-focused .mdc-tab__ripple::before, .mat-mdc-tab-link.cdk-keyboard-focused .mdc-tab__ripple::before {
  opacity: 0.12;
}
.mat-mdc-tab-link .mat-ripple-element {
  opacity: 0.12;
  background-color: var(--mat-tab-inactive-ripple-color, var(--mat-sys-on-surface));
}
.mat-mdc-tab-header.mat-mdc-tab-nav-bar-stretch-tabs .mat-mdc-tab-link {
  flex-grow: 1;
}
.mat-mdc-tab-link::before {
  margin: 5px;
}

@media (max-width: 599px) {
  .mat-mdc-tab-link {
    min-width: 72px;
  }
}
`],encapsulation:2,changeDetection:0})}return i})(),tn=(()=>{class i{id=s(ht).getId("mat-tab-nav-panel-");_activeTabId;static \u0275fac=function(e){return new(e||i)};static \u0275cmp=f({type:i,selectors:[["mat-tab-nav-panel"]],hostAttrs:["role","tabpanel",1,"mat-mdc-tab-nav-panel"],hostVars:2,hostBindings:function(e,n){e&2&&P("aria-labelledby",n._activeTabId)("id",n.id)},inputs:{id:"id"},exportAs:["matTabNavPanel"],ngContentSelectors:Ct,decls:1,vars:0,template:function(e,n){e&1&&(I(),F(0))},encapsulation:2,changeDetection:0})}return i})(),en=(()=>{class i{static \u0275fac=function(e){return new(e||i)};static \u0275mod=R({type:i});static \u0275inj=M({imports:[N]})}return i})();var Mn=["*",[["mat-toolbar-row"]]],Sn=["*","mat-toolbar-row"],At=(()=>{class i{static \u0275fac=function(e){return new(e||i)};static \u0275dir=j({type:i,selectors:[["mat-toolbar-row"]],hostAttrs:[1,"mat-toolbar-row"],exportAs:["matToolbarRow"]})}return i})(),nn=(()=>{class i{_elementRef=s(m);_platform=s(nt);_document=s(h);color;_toolbarRows;constructor(){}ngAfterViewInit(){this._platform.isBrowser&&(this._checkToolbarMixedModes(),this._toolbarRows.changes.subscribe(()=>this._checkToolbarMixedModes()))}_checkToolbarMixedModes(){this._toolbarRows.length}static \u0275fac=function(e){return new(e||i)};static \u0275cmp=f({type:i,selectors:[["mat-toolbar"]],contentQueries:function(e,n,a){if(e&1&&Y(a,At,5),e&2){let r;C(r=y())&&(n._toolbarRows=r)}},hostAttrs:[1,"mat-toolbar"],hostVars:6,hostBindings:function(e,n){e&2&&($(n.color?"mat-"+n.color:""),E("mat-toolbar-multiple-rows",n._toolbarRows.length>0)("mat-toolbar-single-row",n._toolbarRows.length===0))},inputs:{color:"color"},exportAs:["matToolbar"],ngContentSelectors:Sn,decls:2,vars:0,template:function(e,n){e&1&&(I(Mn),F(0),F(1,1))},styles:[`.mat-toolbar {
  background: var(--mat-toolbar-container-background-color, var(--mat-sys-surface));
  color: var(--mat-toolbar-container-text-color, var(--mat-sys-on-surface));
}
.mat-toolbar, .mat-toolbar h1, .mat-toolbar h2, .mat-toolbar h3, .mat-toolbar h4, .mat-toolbar h5, .mat-toolbar h6 {
  font-family: var(--mat-toolbar-title-text-font, var(--mat-sys-title-large-font));
  font-size: var(--mat-toolbar-title-text-size, var(--mat-sys-title-large-size));
  line-height: var(--mat-toolbar-title-text-line-height, var(--mat-sys-title-large-line-height));
  font-weight: var(--mat-toolbar-title-text-weight, var(--mat-sys-title-large-weight));
  letter-spacing: var(--mat-toolbar-title-text-tracking, var(--mat-sys-title-large-tracking));
  margin: 0;
}
@media (forced-colors: active) {
  .mat-toolbar {
    outline: solid 1px;
  }
}
.mat-toolbar .mat-form-field-underline,
.mat-toolbar .mat-form-field-ripple,
.mat-toolbar .mat-focused .mat-form-field-ripple {
  background-color: currentColor;
}
.mat-toolbar .mat-form-field-label,
.mat-toolbar .mat-focused .mat-form-field-label,
.mat-toolbar .mat-select-value,
.mat-toolbar .mat-select-arrow,
.mat-toolbar .mat-form-field.mat-focused .mat-select-arrow {
  color: inherit;
}
.mat-toolbar .mat-input-element {
  caret-color: currentColor;
}
.mat-toolbar .mat-mdc-button-base.mat-mdc-button-base.mat-unthemed {
  --mat-button-text-label-text-color: var(--mat-toolbar-container-text-color, var(--mat-sys-on-surface));
  --mat-button-outlined-label-text-color: var(--mat-toolbar-container-text-color, var(--mat-sys-on-surface));
}

.mat-toolbar-row, .mat-toolbar-single-row {
  display: flex;
  box-sizing: border-box;
  padding: 0 16px;
  width: 100%;
  flex-direction: row;
  align-items: center;
  white-space: nowrap;
  height: var(--mat-toolbar-standard-height, 64px);
}
@media (max-width: 599px) {
  .mat-toolbar-row, .mat-toolbar-single-row {
    height: var(--mat-toolbar-mobile-height, 56px);
  }
}

.mat-toolbar-multiple-rows {
  display: flex;
  box-sizing: border-box;
  flex-direction: column;
  width: 100%;
  min-height: var(--mat-toolbar-standard-height, 64px);
}
@media (max-width: 599px) {
  .mat-toolbar-multiple-rows {
    min-height: var(--mat-toolbar-mobile-height, 56px);
  }
}
`],encapsulation:2,changeDetection:0})}return i})();var an=(()=>{class i{static \u0275fac=function(e){return new(e||i)};static \u0275mod=R({type:i});static \u0275inj=M({imports:[N]})}return i})();var it=(t=>(t.Light="light",t.Dark="dark",t))(it||{});function on(i){return i!=null&&typeof i=="string"&&Object.values(it).includes(i)}var kt="light",xt="ngx-markdown:theme";var Pn=["tabHeader"];function Ln(i,o){if(i&1&&(c(0,"a",13,3)(2,"div",15),D(3,"img",16),c(4,"span"),X(5),d()()()),i&2){let t=o.$implicit,e=K(1);g("active",e.isActive)("routerLink",t.path),_(3),g("src",ee("icon-",t.path,".svg"),Qt)("alt",te(t.data==null?null:t.data.label)),_(2),bt(t.data==null?null:t.data.label)}}var ot=class i{constructor(){this.document=s(h);this.anchorService=s(O);this.router=s(et);this.isBrowser=se(s(Ut));this.theme=S(kt);this.tabHeader=ie("tabHeader",{read:m});this.stickyClassName="mat-mdc-tab-nav-bar--sticky";this.routes=this.router.config.filter(o=>o.data&&o.data.label)}onDocumentClick(o){this.anchorService.interceptClick(o)}onWindowScroll(){let o=this.tabHeader();if(o==null)return;let t=o.nativeElement,e=Math.ceil(t.offsetTop),n=Math.ceil(this.document.defaultView?.scrollY??0),a=t.classList.contains(this.stickyClassName);!a&&n>=e&&t.classList.add(this.stickyClassName),a&&n<e&&t.classList.remove(this.stickyClassName)}ngOnInit(){if(this.anchorService.setOffset([0,64]),!this.isBrowser)return;let o=this.readStoredTheme();this.setTheme(on(o)?o:kt)}handleFragment(){this.anchorService.scrollToAnchor()}onRouteAnimationEnd(o){o.target instanceof Element&&o.target.parentElement===o.currentTarget&&this.handleFragment()}toggleTheme(){this.setTheme(this.theme()==="light"?"dark":"light")}setTheme(o){this.theme.set(o);let t=this.document.querySelector("body").classList,e=/\w*-theme\b/.exec(t.value);e&&t.remove(...e),t.add(`${o}-theme`);try{localStorage.setItem(xt,o)}catch{}}readStoredTheme(){try{return localStorage.getItem(xt)}catch{return null}}static{this.\u0275fac=function(t){return new(t||i)}}static{this.\u0275cmp=f({type:i,selectors:[["app-root"]],viewQuery:function(t,e){t&1&&Kt(e.tabHeader,Pn,5,m),t&2&&Xt()},hostBindings:function(t,e){t&1&&v("click",function(a){return e.onDocumentClick(a)},Zt)("scroll",function(){return e.onWindowScroll()},Vt)},decls:19,vars:3,consts:[["tabHeader",""],["tabPanel",""],["outlet","outlet"],["tabLink","routerLinkActive"],["color","primary"],[1,"lib-title"],[1,"spacer"],["mat-icon-button","","type","button",3,"click"],["src","icon-light-on.svg","alt","Light theme",3,"hidden"],["src","icon-light-off.svg","alt","Dark theme",3,"hidden"],["href","https://github.com/fsegurai/ngx-markdown","mat-icon-button",""],["src","icon-github.svg","alt","GitHub",1,"github-icon"],["backgroundColor","primary","disableRipple","","fitInkBarToContent","","mat-stretch-tabs","false","mat-tab-nav-bar","",3,"tabPanel"],["mat-tab-link","","routerLinkActive","",3,"active","routerLink"],[1,"outlet-wrapper",3,"animationend"],[1,"tab-label"],[3,"src","alt"]],template:function(t,e){if(t&1&&(c(0,"mat-toolbar",4)(1,"mat-toolbar-row")(2,"h1",5),X(3,"@fsegurai/ngx-markdown"),d(),D(4,"span",6),c(5,"button",7),v("click",function(){return e.toggleTheme()}),c(6,"mat-icon"),D(7,"img",8)(8,"img",9),d()(),c(9,"a",10),D(10,"img",11),d()()(),c(11,"nav",12,0),dt(13,Ln,6,7,"a",13,ut),d(),c(15,"mat-tab-nav-panel",14,1),v("animationend",function(a){return e.onRouteAnimationEnd(a)}),D(17,"router-outlet",null,2),d()),t&2){let n=K(16);_(7),g("hidden",e.theme()==="light"),_(),g("hidden",e.theme()==="dark"),_(3),g("tabPanel",n),_(2),mt(e.routes)}},dependencies:[xe,Ae,Ye,qe,en,yt,tn,Et,an,nn,At,pe,he,be],styles:["[_nghost-%COMP%]{display:block}.spacer[_ngcontent-%COMP%]{box-sizing:border-box;flex:1 1 0%}.tab-label[_ngcontent-%COMP%]{align-items:center;box-sizing:border-box;display:flex;flex-direction:row;gap:8px;place-content:center}.lib-title[_ngcontent-%COMP%]{font-size:20px;font-weight:700}.github-icon[_ngcontent-%COMP%]{--mat-icon-button-icon-size: 28px;position:relative;top:-2px;left:-2px}.mat-mdc-tab-nav-bar--sticky[_ngcontent-%COMP%]{box-shadow:0 3px 5px -1px #0003,0 6px 10px #00000024,0 1px 18px #0000001f;transition:box-shadow .3s ease-out}.mat-mdc-tab-nav-bar[_ngcontent-%COMP%]    {position:sticky;top:0;z-index:24}.mat-mdc-tab-nav-bar[_ngcontent-%COMP%]     .mdc-tab-indicator__content--underline{border-radius:3px 3px 0 0;border-top-width:3px;transition-duration:.5s}.mat-mdc-tab-nav-bar[_ngcontent-%COMP%]     .mat-mdc-tab-link{font-size:14px;font-weight:500;letter-spacing:normal;margin:0 16px;min-width:0;opacity:.6;padding:0;text-decoration:none;transition:all .2s ease-out}.mat-mdc-tab-nav-bar[_ngcontent-%COMP%]     .mat-mdc-tab-link:not(.mdc-tab--active):hover{transform:translateY(-1px)}.mat-mdc-tab-nav-bar[_ngcontent-%COMP%]     .mat-mdc-tab-link:hover, .mat-mdc-tab-nav-bar[_ngcontent-%COMP%]     .mdc-tab--active{opacity:1}.mat-mdc-tab-nav-bar[_ngcontent-%COMP%]     .mat-mdc-tab-link-container{margin:0 auto;max-width:960px;overflow:auto}.mat-mdc-tab-nav-bar[_ngcontent-%COMP%]     .mdc-tab__ripple{opacity:0}.mat-mdc-tab-nav-bar[_ngcontent-%COMP%]     .mat-mdc-tab-header-pagination{display:none!important}.mat-mdc-tab-nav-bar[_ngcontent-%COMP%]     .mat-mdc-tab-list{transform:unset!important}.mat-toolbar[_ngcontent-%COMP%]     .mat-toolbar-row{margin:0 auto;max-width:960px;padding-left:16px;padding-right:16px}.mat-toolbar[_ngcontent-%COMP%]     .mat-icon-button{transition:all .2s ease-out}.mat-toolbar[_ngcontent-%COMP%]     .mat-icon-button:hover{transform:translateY(-2px)}.outlet-wrapper[_ngcontent-%COMP%]{margin:16px auto;max-width:960px;padding-left:16px;padding-right:16px;display:block;position:relative}"],changeDetection:0})}};ce(ot,$e).catch(i=>console.error(i));
