import{y as U,u as L,a as A,r as x,b as g,o as E,j as F,S as O,c as a,d as l,l as R,e as s,F as w,m as q,h as c,t as _,w as J,f as u,E as m,v as T,n as p,_ as B}from"./index-8da19006.js";const D={id:"container"},j=s("div",{class:"pageTitle"},[s("span",null,"ORDER"),s("h1",null,"外送餐點")],-1),P={id:"sort"},G={class:"sort_box"},H=s("div",{class:"sort_linebox"},[s("div",{class:"sort_lineFocus"}),s("div",{class:"sort_line"})],-1),I={id:"ordercard_container"},K={class:"ordercard"},Q={class:"cardimg_bg"},W={class:"cardimg"},X=["src"],Y={class:"card_textbox"},Z={class:"card_textbox_display"},ss={key:0,class:"fa-regular fa-snowflake"},es={key:1,class:"fa-solid fa-mug-hot"},os={key:0,class:"ordercard_size"},ts={key:1,class:"ordercard_prize"},is={key:2,class:"ordercard_size"},as={key:3,class:"ordercard_prize"},ls=["onClick"],ns={key:1,class:"order_infocard"},cs={key:0,class:"ordercard_unsale"},rs={class:"product_info_container"},ds={class:"product_info_img"},_s=["src"],us={class:"product_info_text"},ms={class:"product_info_out"},ps={class:"name_prize"},hs={key:0,class:"ordercard_size"},fs={key:1,class:"ordercard_prize"},vs={key:2,class:"ordercard_size"},gs={key:3,class:"ordercard_prize"},ys=s("i",{class:"fa-solid fa-xmark"},null,-1),ks=[ys],zs={class:"describe_info"},bs=s("div",{class:"product_info_line"},null,-1),xs=["onSubmit"],$s={class:"choose_container"},Cs={class:"choose_box"},ws=s("h3",null,"尺寸選擇",-1),Ss={key:0,class:"options01"},Vs=s("label",{for:"size_m"},[s("span"),p(" 中杯 ")],-1),Ms={key:1,class:"options02"},Ns=s("label",{for:"size_l"},[s("span"),p(" 大杯 ")],-1),Us=s("div",{class:"product_info_line"},null,-1),Ls={class:"choose_box"},As=s("h3",null,"冰熱選擇",-1),Es={key:0,class:"options01"},Fs=s("label",{for:"ice_cold"},[s("span"),p(" 冰 ")],-1),Os={key:1,class:"options02"},Rs=s("label",{for:"ice_hot"},[s("span"),p(" 熱 ")],-1),qs=s("div",{class:"product_info_line"},null,-1),Js={class:"choose_box"},Ts=s("h3",null,"甜度選擇",-1),Bs={key:0,class:"options01"},Ds=s("label",{for:"sugar_sugar"},[s("span"),p(" 全糖 ")],-1),js={key:1,class:"options02"},Ps=s("label",{for:"sugar_nosugar"},[s("span"),p(" 無糖 ")],-1),Gs=s("div",{class:"product_info_line"},null,-1),Hs={class:"amountbtn_container"},Is={class:"amount_container"},Ks=s("i",{class:"fa-solid fa-minus"},null,-1),Qs=[Ks],Ws=s("i",{class:"fa-solid fa-plus"},null,-1),Xs=[Ws],Ys=s("button",{class:"addproduct_btn",type:"submit"},"加入購物車",-1),ee={__name:"ProductsView",setup(Zs){U(),L();const $=i=>{h.value+=i},S=A(),{editCart:V}=S,C=x(!1),h=x(0),n=g({size:"",ice:"",sugar:""});g({_id:"",name:"",mprice:0,lprice:0,description:"",image:void 0,sell:!1,category:"",idx:-1,custom:{msize:!1,lsize:!1,ice:!1,hot:!1,sugar:!1,nosugar:!1}});const M=()=>{C.value&&(V({_id:t._id,quantity:h.value,custom:JSON.stringify(n),showPu:!0}),z())},t=g({_id:"",name:"",mprice:0,lprice:0,description:"",image:"",sell:!1,category:"",idx:-1,custom:{msize:!1,lsize:!1,ice:!1,hot:!1,sugar:!1,nosugar:!1}}),y=x(!1),N=i=>{y.value=!0,t._id=r[i]._id,t.name=r[i].name,t.mprice=r[i].mprice,t.lprice=r[i].lprice,t.description=r[i].description,t.image=r[i].image,t.sell=r[i].sell,t.category=r[i].category,t.idx=i,t.custom=r[i].custom?JSON.parse(r[i].custom):{msize:!1,lsize:!1,ice:!1,hot:!1,sugar:!1,nosugar:!1},h.value=0,t.custom.msize?n.size="M":n.size="L",t.custom.ice?n.ice="ice":n.ice="hot",t.custom.sugar?n.sugar="sugar":n.sugar="nosugar"},z=()=>{y.value=!1};E(()=>{const i=document.querySelectorAll(".sort_item"),o=document.querySelector(".sort_lineFocus"),e=100/i.length;for(let d=0;d<i.length;d++)i[0].style.color="#fc9f4d",i[d].style.width=`${e}%`,i[d].addEventListener("click",()=>{o.style.transition="all .5s ease",o.style.left=`${e*d}%`,i[d].style.color="#fc9f4d";const b=Array.from(i).filter(v=>v!==i[d]);for(let v=0;v<b.length;v++)b[v].style.color="#a35e47"});o.style.width=`${e}%`});const r=g([]),k=g([]),f=i=>{r.length=0;for(const o in k)(i==k[o].category||i=="All")&&r.push(k[o])};return(async()=>{try{const{data:i}=await F.get("/products");k.push(...Array.from(i.result))}catch(i){O.fire({icon:"error",title:"失敗",text:i?.response?.data?.message||"發生錯誤"})}f("latte")})(),(i,o)=>(a(),l(w,null,[R(B),s("div",D,[j,s("div",P,[s("ul",G,[s("li",{class:"sort_item",onClick:o[0]||(o[0]=e=>f("latte"))},"拿鐵咖啡 Latte"),s("li",{class:"sort_item",onClick:o[1]||(o[1]=e=>f("espresso"))},"義式咖啡 Espresso"),s("li",{class:"sort_item",onClick:o[2]||(o[2]=e=>f("tea"))},"萃茶 Tea"),s("li",{class:"sort_item",onClick:o[3]||(o[3]=e=>f("special"))},"期間限定 Special")]),H]),s("div",I,[(a(!0),l(w,null,q(r,(e,d)=>(a(),l("div",K,[s("div",Q,[s("div",W,[s("img",{src:e.image},null,8,X)])]),s("div",Y,[s("div",Z,[s("h2",null,_(e.name),1),JSON.parse(e.custom).hot?c("",!0):(a(),l("i",ss)),JSON.parse(e.custom).ice?c("",!0):(a(),l("i",es))]),e.mprice!==0?(a(),l("span",os,"M")):c("",!0),e.mprice!==0?(a(),l("span",ts,"$"+_(e.mprice),1)):c("",!0),e.lprice!==0?(a(),l("span",is,"L")):c("",!0),e.lprice!==0?(a(),l("span",as,"$"+_(e.lprice),1)):c("",!0)]),s("div",{class:"card_btn",onClick:b=>N(d)},"加入購物車",8,ls)]))),256))]),y.value===!0?(a(),l("div",{key:0,class:"order_blackbg",onClick:z})):c("",!0),y.value===!0?(a(),l("div",ns,[t.sell?c("",!0):(a(),l("div",cs,"此商品已下架")),s("div",rs,[s("div",ds,[s("img",{src:t.image},null,8,_s)]),s("div",us,[s("div",ms,[s("div",ps,[s("h2",null,_(t.name),1),t.custom.msize?(a(),l("span",hs,"M")):c("",!0),t.custom.msize?(a(),l("span",fs,"$"+_(t.mprice),1)):c("",!0),t.custom.lsize?(a(),l("span",vs,"L")):c("",!0),t.custom.lsize?(a(),l("span",gs,"$"+_(t.lprice),1)):c("",!0)]),s("div",{class:"card_out",onClick:z},ks)]),s("div",zs,[s("p",null,_(t.description),1)])])]),bs,s("form",{ref_key:"valid",ref:C,onSubmit:J(M,["prevent"])},[s("div",$s,[s("div",Cs,[ws,t.custom.msize?(a(),l("div",Ss,[u(s("input",{type:"radio",id:"size_m",name:"size_choose",class:"text_radio",value:"M","onUpdate:modelValue":o[4]||(o[4]=e=>n.size=e)},null,512),[[m,n.size]]),Vs])):c("",!0),t.custom.lsize?(a(),l("div",Ms,[u(s("input",{type:"radio",id:"size_l",name:"size_choose",class:"text_radio",value:"L","onUpdate:modelValue":o[5]||(o[5]=e=>n.size=e)},null,512),[[m,n.size]]),Ns])):c("",!0)]),Us,s("div",Ls,[As,t.custom.ice?(a(),l("div",Es,[u(s("input",{type:"radio",id:"ice_cold",name:"cold_choose",class:"text_radio",value:"ice","onUpdate:modelValue":o[6]||(o[6]=e=>n.ice=e)},null,512),[[m,n.ice]]),Fs])):c("",!0),t.custom.hot?(a(),l("div",Os,[u(s("input",{type:"radio",id:"ice_hot",name:"cold_choose",class:"text_radio",value:"hot","onUpdate:modelValue":o[7]||(o[7]=e=>n.ice=e)},null,512),[[m,n.ice]]),Rs])):c("",!0)]),qs,s("div",Js,[Ts,t.custom.sugar?(a(),l("div",Bs,[u(s("input",{type:"radio",id:"sugar_sugar",name:"sugar_choose",class:"text_radio",value:"sugar","onUpdate:modelValue":o[8]||(o[8]=e=>n.sugar=e)},null,512),[[m,n.sugar]]),Ds])):c("",!0),t.custom.nosugar?(a(),l("div",js,[u(s("input",{type:"radio",id:"sugar_nosugar",name:"sugar_choose",class:"text_radio",value:"nosugar","onUpdate:modelValue":o[9]||(o[9]=e=>n.sugar=e)},null,512),[[m,n.sugar]]),Ps])):c("",!0)])]),Gs,s("div",Hs,[s("div",Is,[s("div",{class:"amount_btn amount_minus",onClick:o[10]||(o[10]=e=>$(-1))},Qs),u(s("input",{type:"number",placeholder:"0","onUpdate:modelValue":o[11]||(o[11]=e=>h.value=e)},null,512),[[T,h.value,void 0,{number:!0}]]),s("div",{class:"amount_btn amount_plus",onClick:o[12]||(o[12]=e=>$(1))},Xs)]),Ys])],40,xs)])):c("",!0)])],64))}};export{ee as default};