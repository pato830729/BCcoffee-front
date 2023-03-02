import{b as v,r as y,k as f,S as p,D as C,c,d as _,e as t,n as m,F as D,m as q,w as U,t as a,f as r,v as h,h as k,J as S,l as $,M}from"./index-8da19006.js";const N={class:"admin_title_search"},F={class:"admin_title_addDelete"},T=t("h1",null,"折扣碼管理",-1),z=t("i",{class:"fa-solid fa-circle-plus"},null,-1),A=t("div",{class:"search_container"},[t("input",{type:"text",class:"search_input",placeholder:"以折扣碼編號搜尋"}),t("button",{class:"admin_button button_search"},[t("i",{class:"fa-solid fa-magnifying-glass"}),m(" 搜尋 ")])],-1),E={class:"admin_table"},I=t("thead",null,[t("tr",null,[t("th",{class:"table_th_id"},"折扣碼ID"),t("th",{class:"table_th_ell"},"標題"),t("th",{class:"table_th_short"},"折扣碼"),t("th",{class:"table_th_short"},"分類"),t("th",{class:"table_th_short"},"狀態"),t("th",{class:"table_th_short"})])],-1),J={class:"table_td_id"},L={class:"table_td_ell"},j={class:"table_th_short"},G={class:"table_th_short"},H={class:"table_th_short"},K=["onClick"],O=t("i",{class:"fa-solid fa-pen"},null,-1),P={class:"dialogBg"},Q=["onSubmit"],R={class:"dialogTitle"},W=t("i",{class:"fa-solid fa-xmark"},null,-1),X=[W],Y={class:"dialog_container"},Z={class:"text_container"},tt={class:"dialog_container_left"},et={class:"adminDialogBg_inputStyle"},st=t("label",{for:"dialog_title"},"標題：",-1),ot={class:"input_position"},it={key:0,class:"error_dialog"},lt={class:"adminDialogBg_inputStyle"},at=t("label",{for:"dialog_subtitle"},"副標題：",-1),nt={class:"input_position"},dt={key:0,class:"error_dialog"},ct={class:"adminDialogBg_inputStyle"},_t=t("label",{for:"dialog_code"},"折扣碼：",-1),rt={class:"input_position"},ut={key:0,class:"error_dialog"},gt={class:"adminDialogBg_selectStyle"},pt=t("label",{for:"dialog_select_show"},"狀態：",-1),ht=t("option",{value:"true",selected:""},"上架",-1),mt=t("option",{value:"false"},"下架",-1),bt=[ht,mt],vt={class:"adminDialogBg_selectStyle"},yt=t("label",{for:"dialog_select_category"},"消息分類：",-1),ft=t("option",{value:"新品上市",selected:""},"新品上市",-1),kt=t("option",{value:"活動消息"},"活動消息",-1),Bt=t("option",{value:"媒體報導"},"媒體報導",-1),wt=t("option",{value:"店鋪資訊"},"店鋪資訊",-1),Dt=[ft,kt,Bt,wt],St={class:"dialog_container_right"},Vt={class:"adminDialogBg_textareaStyle"},xt=t("label",{for:"dialog_description"},"內文：",-1),Ct={class:"adminDialogBg_image"},qt=t("label",null,"消息圖片：",-1),Ut=t("button",{class:"admin_button button_save",type:"submit"},"儲存",-1),Ft={__name:"CodeView",setup($t){const n={required(o){return!!o||"欄位必填"}},l=v([]),B=y(!1),e=v({_id:"",title:"",subtitle:"",code:"",description:"",image:void 0,show:!1,category:"",idx:-1}),d=v({name:"",description:""});function g(o){d[o]=!0}const u=()=>{const o=document.querySelector(".darkDialogBg"),s=document.querySelector(".dialogBg");o.style.display="none",s.style.display="none"},w=o=>{o===-1?(e._id="",e.title="",e.subtitle="",e.code="",e.description="",e.image=void 0,e.show=!1,e.category="",y(!1),e.idx=-1):(e._id=l[o]._id,e.title=l[o].title,e.subtitle=l[o].subtitle,e.code=l[o].code,e.description=l[o].description,e.image=l[o].image,e.show=l[o].show,e.category=l[o].category,y(!1),e.idx=o);for(const i in d)d[i]=!1;const s=document.querySelector(".darkDialogBg"),b=document.querySelector(".dialogBg");s.style.display="block",b.style.display="block"},V=async()=>{if(!B.value)return;const o=new FormData;o.append("title",e.title),o.append("subtitle",e.subtitle),o.append("code",e.code),o.append("description",e.description),o.append("image",e.image),o.append("show",e.show),o.append("category",e.category);try{if(e._id.length===0){const{data:s}=await f.post("/code",o);l.push(s.result),p.fire({icon:"success",title:"成功",text:"新增成功"}),u()}else{const{data:s}=await f.patch("/code/"+e._id,o);l[e.idx]=s.result,p.fire({icon:"success",title:"成功",text:"編輯成功"}),u()}}catch(s){p.fire({icon:"error",title:"失敗",text:s?.response?.data?.message||"發生錯誤"})}};return(async()=>{try{const{data:o}=await f.get("/code/all");l.push(...o.result)}catch(o){p.fire({icon:"error",title:"失敗",text:o?.response?.data?.message||"發生錯誤"})}})(),(o,s)=>{const b=C("v-image-input");return c(),_(D,null,[t("div",N,[t("div",F,[T,t("button",{class:"admin_button button_add",onClick:s[0]||(s[0]=i=>w(-1))},[z,m(" 新增 ")])]),A]),t("div",E,[t("table",null,[I,t("tbody",null,[(c(!0),_(D,null,q(l,(i,x)=>(c(),_("tr",null,[t("td",J,a(i._id),1),t("td",L,a(i.title),1),t("td",j,a(i.code),1),t("td",G,a(i.category),1),t("td",{class:"table_th_short",style:M(i.sell?"color:#52b96c;":"color:#e43939;")},a(i.sell?"上架":"下架"),5),t("td",H,[t("button",{class:"admin_button button_controll",onClick:Mt=>w(x)},[O,m("修改")],8,K)])]))),256))])])]),t("div",P,[t("form",{ref_key:"valid",ref:B,onSubmit:U(V,["prevent"])},[t("div",R,[m(a(e._id.length>0?"編輯折扣碼":"新增折扣碼")+" ",1),t("div",{class:"dialogClose",onClick:u},X)]),t("div",Y,[t("div",Z,[t("div",tt,[t("div",et,[st,t("div",ot,[r(t("input",{type:"text",id:"dialog_title","onUpdate:modelValue":s[1]||(s[1]=i=>e.title=i),onBlur:s[2]||(s[2]=i=>g("title"))},null,544),[[h,e.title]]),d.title&&n.required(e.title)!==!0?(c(),_("p",it,a(n.required(e.title)),1)):k("",!0)])]),t("div",lt,[at,t("div",nt,[r(t("input",{type:"text",id:"dialog_subtitle","onUpdate:modelValue":s[3]||(s[3]=i=>e.subtitle=i),onBlur:s[4]||(s[4]=i=>g("subtitle"))},null,544),[[h,e.subtitle]]),d.subtitle&&n.required(e.subtitle)!==!0?(c(),_("p",dt,a(n.required(e.subtitle)),1)):k("",!0)])]),t("div",ct,[_t,t("div",rt,[r(t("input",{type:"text",id:"dialog_code","onUpdate:modelValue":s[5]||(s[5]=i=>e.code=i),onBlur:s[6]||(s[6]=i=>g("code"))},null,544),[[h,e.code]]),d.code&&n.required(e.code)!==!0?(c(),_("p",ut,a(n.required(e.code)),1)):k("",!0)])]),t("div",gt,[pt,r(t("select",{id:"dialog_select_show","onUpdate:modelValue":s[7]||(s[7]=i=>e.show=i)},bt,512),[[S,e.show]])]),t("div",vt,[yt,r(t("select",{id:"dialog_select_category","onUpdate:modelValue":s[8]||(s[8]=i=>e.category=i)},Dt,512),[[S,e.category]])])]),t("div",St,[t("div",Vt,[xt,r(t("textarea",{id:"dialog_description",rows:"10","onUpdate:modelValue":s[9]||(s[9]=i=>e.description=i),onBlur:s[10]||(s[10]=i=>g("description"))},null,544),[[h,e.description]])]),t("div",Ct,[qt,$(b,{modelValue:e.image,"onUpdate:modelValue":s[11]||(s[11]=i=>e.image=i),"max-file-size":1,removable:""},null,8,["modelValue"])])])]),t("div",{class:"dialog_btn_container"},[t("button",{class:"admin_button button_close",onClick:u},"取消"),Ut])])],40,Q)]),t("div",{class:"darkDialogBg",onClick:u})],64)}}};export{Ft as default};
