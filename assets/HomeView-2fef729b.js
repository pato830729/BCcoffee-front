import{r as p,b as m,k as g,S as h,c,d as u,e as t,F as b,m as D,w as S,n as v,t as d,f as a,v as n,J as k,i as x,M as V}from"./index-8da19006.js";const w=x('<div class="admin_title_search"><div class="admin_title_addDelete"><h1>會員管理</h1></div><div class="search_container"><input type="text" class="search_input" placeholder="以會員編號搜尋"><button class="admin_button button_search"><i class="fa-solid fa-magnifying-glass"></i> 搜尋 </button></div></div>',1),C={class:"admin_table"},U=t("thead",null,[t("tr",null,[t("th",{class:"table_th_id"},"會員ID"),t("th",{class:"table_th_ell"},"帳號"),t("th",{class:"table_th_ell"},"信箱"),t("th",{class:"table_th_ell"},"狀態"),t("th",{class:"table_th_short"})])],-1),q={class:"table_td_id"},M={class:"table_td_ell"},F={class:"table_td_ell"},N={class:"table_th_short"},T=["onClick"],H=t("i",{class:"fa-solid fa-pen"},null,-1),I={class:"dialogBg"},z=["onSubmit"],A=t("i",{class:"fa-solid fa-xmark"},null,-1),E=[A],J={class:"dialog_container"},L={class:"text_container"},$={class:"dialog_container_left"},j={class:"adminDialogBg_inputStyle"},G=t("label",{for:"dialog_name"},"會員ID：",-1),K={class:"input_position"},O={class:"adminDialogBg_inputStyle"},P=t("label",{for:"dialog_name"},"帳號：",-1),Q={class:"input_position"},R={class:"adminDialogBg_inputStyle"},W=t("label",{for:"dialog_name"},"信箱：",-1),X={class:"input_position"},Y={class:"adminDialogBg_selectStyle"},Z=t("label",{for:"dialog_select_sell"},"狀態：",-1),tt=t("option",{value:"false"},"正常",-1),st=t("option",{value:"true"},"停權",-1),et=[tt,st],ot={class:"dialog_container_right"},lt={class:"adminDialogBg_inputStyle"},it=t("label",{for:"dialog_name"},"姓名：",-1),at={class:"input_position"},nt={class:"adminDialogBg_inputStyle"},dt=t("label",{for:"dialog_name"},"地址：",-1),_t={class:"input_position"},ct={class:"adminDialogBg_inputStyle"},ut=t("label",{for:"dialog_name"},"電話：",-1),rt={class:"input_position"},pt=t("button",{class:"admin_button button_save",type:"submit"},"儲存",-1),bt={__name:"HomeView",setup(mt){const r=p(!1),s=m({_id:"",account:"",email:"",name:"",address:"",phone:"",suspension:!1,idx:-1}),_=()=>{const l=document.querySelector(".darkDialogBg"),o=document.querySelector(".dialogBg");l.style.display="none",o.style.display="none"},y=l=>{s._id=i[l]._id,s.account=i[l].account,s.email=i[l].email,s.name=i[l].name,s.address=i[l].address,s.phone=i[l].phone,s.suspension=i[l].suspension,p(!1),s.idx=l;const o=document.querySelector(".darkDialogBg"),e=document.querySelector(".dialogBg");o.style.display="block",e.style.display="block"},f=async()=>{if(!r.value)return;const l=new FormData;l.append("suspension",s.suspension);const{data:o}=await g.patch("/users/"+s._id,l);i[s.idx]=o.result,h.fire({icon:"success",title:"成功",text:"編輯成功"}),_()},i=m([]);return(async()=>{try{const{data:l}=await g.get("/users/all");i.push(...l.result)}catch{h.fire({icon:"error",title:"失敗",text:"取得會員失敗"})}})(),(l,o)=>(c(),u(b,null,[w,t("div",C,[t("table",null,[U,t("tbody",null,[(c(!0),u(b,null,D(i,(e,B)=>(c(),u("tr",{key:e._id},[t("td",q,d(e._id),1),t("td",M,d(e.account),1),t("td",F,d(e.email),1),t("td",{class:"table_td_ell",style:V(e.suspension?"color:#e43939;":"color:#52b96c;")},d(e.suspension?"停權":"正常"),5),t("td",N,[t("button",{class:"admin_button button_controll",onClick:gt=>y(B)},[H,v("修改")],8,T)])]))),128))])])]),t("div",I,[t("form",{ref_key:"valid",ref:r,onSubmit:S(f,["prevent"])},[t("div",{class:"dialogTitle"},[v(d("編輯會員")+" "),t("div",{class:"dialogClose",onClick:_},E)]),t("div",J,[t("div",L,[t("div",$,[t("div",j,[G,t("div",K,[a(t("input",{type:"text",id:"dialog_name","onUpdate:modelValue":o[0]||(o[0]=e=>s._id=e),disabled:""},null,512),[[n,s._id]])])]),t("div",O,[P,t("div",Q,[a(t("input",{type:"text",id:"dialog_name","onUpdate:modelValue":o[1]||(o[1]=e=>s.account=e),disabled:""},null,512),[[n,s.account]])])]),t("div",R,[W,t("div",X,[a(t("input",{type:"text",id:"dialog_name","onUpdate:modelValue":o[2]||(o[2]=e=>s.email=e),disabled:""},null,512),[[n,s.email]])])]),t("div",Y,[Z,a(t("select",{id:"dialog_select_sell","onUpdate:modelValue":o[3]||(o[3]=e=>s.suspension=e)},et,512),[[k,s.suspension]])])]),t("div",ot,[t("div",lt,[it,t("div",at,[a(t("input",{type:"text",id:"dialog_name","onUpdate:modelValue":o[4]||(o[4]=e=>s.name=e),disabled:""},null,512),[[n,s.name]])])]),t("div",nt,[dt,t("div",_t,[a(t("input",{type:"text",id:"dialog_name","onUpdate:modelValue":o[5]||(o[5]=e=>s.address=e),disabled:""},null,512),[[n,s.address]])])]),t("div",ct,[ut,t("div",rt,[a(t("input",{type:"text",id:"dialog_name","onUpdate:modelValue":o[6]||(o[6]=e=>s.phone=e),disabled:""},null,512),[[n,s.phone]])])])])]),t("div",{class:"dialog_btn_container"},[t("button",{class:"admin_button button_close",onClick:_},"取消"),pt])])],40,z)]),t("div",{class:"darkDialogBg",onClick:_})],64))}};export{bt as default};