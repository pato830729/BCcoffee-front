import{p as w,c as a,d,e as t,o as y,b as f,j as k,S as $,l as _,F as m,m as h,_ as g,q as x,s as b,x as A}from"./index-8da19006.js";const E={},S={class:"float_circle backtotop"},C=t("span",null,"回頂端",-1),F=t("i",{class:"fa-solid fa-arrow-up"},null,-1),N=[C,F];function q(p,i){return a(),d("div",S,N)}const B=w(E,[["render",q]]),L={id:"container"},V=t("div",{class:"pageTitle"},[t("span",null,"NEWS RELEASE"),t("h1",null,"最新消息")],-1),j={id:"sort"},P={class:"sort_box"},R=t("div",{class:"sort_linebox"},[t("div",{class:"sort_lineFocus"}),t("div",{class:"sort_line"})],-1),T={id:"news_cardBox"},M={__name:"NewsView",setup(p){y(()=>{const e=document.querySelectorAll(".sort_item"),s=document.querySelector(".sort_lineFocus"),o=100/e.length;for(let l=0;l<e.length;l++)e[0].style.color="#fc9f4d",e[l].style.width=`${o}%`,e[l].addEventListener("click",()=>{s.style.transition="all .5s ease",s.style.left=`${o*l}%`,e[l].style.color="#fc9f4d";const u=Array.from(e).filter(r=>r!==e[l]);for(let r=0;r<u.length;r++)u[r].style.color="#a35e47"});s.style.width=`${o}%`,document.querySelector(".backtotop").addEventListener("click",()=>{window.scrollTo(0,0)})});const i=f([]),c=f([]),n=e=>{i.length=0;for(const s in c)(e==c[s].category||e=="All")&&i.push(c[s])};return(async()=>{try{const{data:e}=await k.get("/news");c.push(...Array.from(e.result).reverse())}catch(e){$.fire({icon:"error",title:"失敗",text:e?.response?.data?.message||"發生錯誤"})}n("All")})(),(e,s)=>(a(),d(m,null,[_(g),_(B),t("div",L,[V,t("div",j,[t("ul",P,[t("li",{class:"sort_item",onClick:s[0]||(s[0]=o=>n("All"))},"所有消息"),t("li",{class:"sort_item",onClick:s[1]||(s[1]=o=>n("新品上市"))},"新品上市"),t("li",{class:"sort_item",onClick:s[2]||(s[2]=o=>n("活動消息"))},"活動消息"),t("li",{class:"sort_item",onClick:s[3]||(s[3]=o=>n("媒體報導"))},"媒體報導"),t("li",{class:"sort_item",onClick:s[4]||(s[4]=o=>n("店鋪資訊"))},"店鋪資訊")]),R]),t("div",T,[(a(!0),d(m,null,h(i,(o,v)=>(a(),d("div",{class:"news_card",key:o._id},[_(A,x(b(o)),null,16)]))),128))])])],64))}};export{M as default};