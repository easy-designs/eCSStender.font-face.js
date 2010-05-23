/*------------------------------------------------------------------------------
Function:       eCSStender.font-face.js
Author:         Aaron Gustafson (aaron at easy-designs dot net)
Creation Date:  2009-10-09
Version:        0.2
Homepage:       http://github.com/easy-designs/eCSStender.font-face.js
License:        MIT License 
Note:           If you change or improve on this script, please let us know by
                emailing the author (above) with a link to your demo page.
------------------------------------------------------------------------------*/
(function(){var c=false,a=true,d=null,b,f;if(typeof eCSStender==b){return}f=eCSStender;f.onComplete(function(){var C="",p=" ",t="; ",o="%",u=/url\(\s*['"]?([^'"\s)]*)['"]?\s*\)/,A="@font-face { % } ",h="url('%')",e="format('%')",l={eot:c,ttf:"truetype",otf:"opentype",svg:"svg"},r=f.methods.svg_id||c,n=f.fonts,m=n.length,k=[],B=[],z,x,s=c,g=new q();g.onreadystatechange=w;y();function y(){var i,D,j;for(z=x=0;z<m;z++){i=n[z];D=i.src.replace(u,"$1");for(j in l){if(f.isInheritedProperty(l,j)){continue}k[x++]=D+"."+j}}z=0;w()}function w(){var j,i;if(!s){if(j=k[--x]){s=a;g.open("HEAD",j,c);g.send(d)}else{k=B.join(" ");v()}}else{if(g.readyState==4){s=c;i=g.status;if(i>=200&&(i<300||i==304)){B[z++]=k[x]}w()}}}function v(){var E,H,i,G,j,F,D=C;for(z=0;z<m;z++){E=[];i=n[z];G=i.src.replace(u,"$1");i.src=["local('"+i["font-family"]+"')"];for(F in l){if(f.isInheritedProperty(l,F)){continue}j=G+"."+F;if(k.indexOf(j)>-1){if(F=="eot"){E.push("src: "+h.replace(o,j)+t)}else{if(F=="svg"&&r!=C){j+="#"+r}i.src.push(h.replace(o,j)+(l[F]!=c?p+e.replace(o,l[F]):C))}}}i.src=i.src.join(", ");for(H in i){if(f.isInheritedProperty(i,H)){continue}E.push(H+": "+i[H]+t)}D+=A.replace(o,E.join(""))}f.embedCSS(D)}function q(){var i;try{i=new XMLHttpRequest()}catch(j){try{i=new ActiveXObject("Msxml2.XMLHTTP")}catch(j){try{i=new ActiveXObject("Microsoft.XMLHTTP")}catch(j){i=c}}}return(!i)?d:i}})})();