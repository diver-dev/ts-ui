import{j as e,P as z,T as m,R as I,N as S,aS as j,G as h,aq as P,s as U,u as H,al as $,q as E,as as W,r as p,aT as B,au as x,aU as F,aV as G,aW as Q,I as D,aX as V,p as b,F as v,aY as X,aZ as Y,n as Z}from"./index-BnH1FrvR.js";import{A as _,a as y}from"./index-D69MKJan.js";import{u as M}from"./FollowButton-92M1BIiJ.js";import{P as J}from"./PostCard-DtJ4JL90.js";import{U as K}from"./UserCard-BwF-HXW0.js";import"./Checkbox-BfLdzD2m.js";import"./CardContent-BKe73X8M.js";import"./Link-BBKROMoE.js";function T({searchQuery:s="",...a}){return e.jsxs(z,{...a,children:[e.jsx(m,{gutterBottom:!0,align:"center",variant:"subtitle1",children:"Not found"}),e.jsxs(m,{variant:"body2",align:"center",children:["No results found for  ",e.jsxs("strong",{children:['"',s,'"']}),". Try checking for typos or using complete words."]})]})}const O=S("div")(()=>({textAlign:"center"}));function ee({loadMore:s,loading:a,hasNextPage:r,posts:t,query:n}){const[o]=M({loading:a,hasNextPage:r,onLoadMore:s,disabled:!1,rootMargin:"0px 0px 400px 0px"});return e.jsxs(j,{sx:{mt:5},children:[e.jsxs(h,{container:!0,spacing:3,justifyContent:"center",children:[t&&t.size>0?t.map(c=>e.jsx(h,{item:!0,xs:12,md:8,children:e.jsx(J,{post:c})},c.get("id"))):void 0,t&&t.size===0&&!a&&!r?e.jsx(T,{searchQuery:n,sx:{p:3,mx:"auto",width:"calc(100% - 48px)",bgcolor:"background.neutral"}}):void 0]}),a||r?e.jsx(O,{ref:o,children:e.jsx(P,{sx:{alignSelf:"center"},size:20})}):void 0]})}const se=I.memo(ee,(s,a)=>a.posts.equals(s.posts)&&a.hasNextPage===s.hasNextPage&&a.loading===s.loading),ae=S("div")(()=>({textAlign:"center",marginTop:"1em"}));function re({friends:s,hasNextPage:a,loading:r,loadMore:t,sx:n,query:o}){const[c]=M({loading:r,hasNextPage:a,onLoadMore:t,disabled:!1,rootMargin:"0px 0px 400px 0px"});return e.jsxs(j,{sx:{mt:5,...n},children:[e.jsxs(h,{container:!0,spacing:1,children:[s.map(i=>e.jsx(h,{item:!0,xs:12,md:4,children:e.jsx(K,{user:i,sx:{p:2}})},i.get("objectId"))),s&&s.size===0&&!r&&!a?e.jsx(T,{searchQuery:o,sx:{p:3,mx:"auto",width:"calc(100% - 48px)",bgcolor:"background.neutral"}}):void 0]}),r||a?e.jsx(ae,{ref:c,children:e.jsx(P,{sx:{alignSelf:"center"},size:20})}):void 0]})}const te=b.selectSearchPeople(),oe=b.selectMoreSearchPeople(),ce=v.selectSearchPosts(),ne=v.selectHasMorePostSeach();function fe(){const s=U(),a=H(),r=$(),{t}=E(),{enqueueSnackbar:n}=W(),[o,c]=p.useState(0),[i,u]=p.useState(!1),g=B(),C=x(te),q=x(oe),N=x(ce),A=x(ne),{q:d}=F.parse(g.search),L=async()=>{try{u(!0),await s(X(d,o,10)),c(o+1)}catch(l){n(l.message,{variant:"error"})}finally{u(!1)}},f=l=>{a(Z.search.root.replace(":category",`${l}?q=${d}`))},R=async()=>{if(!i)try{u(!0),await s(Y(d,o,10)),c(o+1)}catch(l){n(l.message,{variant:"error"})}finally{u(!1)}};p.useEffect(()=>{c(0),s(G()),s(Q()),u(!1),s(D(t(`search.${r.category}`)))},[g,s,r.category,t]);const k=(l,w)=>{f(w===0?"people":"posts")};return e.jsxs(V,{children:[e.jsxs(_,{indicatorColor:"secondary",onChange:k,value:r.category==="people"?0:1,centered:!0,textColor:"primary",children:[e.jsx(y,{label:t("search.people")}),e.jsx(y,{label:t("search.posts")})]}),e.jsxs("div",{children:[r.category==="people"&&e.jsx(re,{friends:C,loadMore:R,hasNextPage:q,loading:i,query:d}),r.category==="posts"&&e.jsx(se,{posts:N,loadMore:L,hasNextPage:A,loading:i,query:d})]})]})}export{fe as default};
