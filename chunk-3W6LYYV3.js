import{A as k,Ba as p,Ca as m,N as x,O as w,c as a,d as u,e as l,i as y,j as h,m as I,o as D,za as d}from"./chunk-PIGHQLUY.js";import{a as b,b as v}from"./chunk-JHI3MBHO.js";function P(t){return x(v(b({},t),{loader:void 0,stream:e=>{let f,n=()=>f?.unsubscribe();e.abortSignal.addEventListener("abort",n);let r=y({value:void 0}),o,s=new Promise(i=>o=i);function c(i){r.set(i),o?.(r),o=void 0}let g=t.stream??t.loader;if(g===void 0)throw new a(990,!1);return f=g(e).subscribe({next:i=>c({value:i}),error:i=>{c({error:w(i)}),e.abortSignal.removeEventListener("abort",n)},complete:()=>{o&&c({error:new a(991,!1)}),e.abortSignal.removeEventListener("abort",n)}}),s}}))}var z=(()=>{let e=class e{constructor(n){this.el=n,this.appImgFallback="assets/images/placeholder.png"}onError(){this.setImage()}onIonError(){this.setImage()}setImage(){this.el.nativeElement.src!==this.appImgFallback&&(this.el.nativeElement.src=this.appImgFallback)}};e.\u0275fac=function(r){return new(r||e)(I(h))},e.\u0275dir=D({type:e,selectors:[["img","appImgFallback",""],["ion-img","appImgFallback",""]],hostBindings:function(r,o){r&1&&k("error",function(){return o.onError()})("ionError",function(){return o.onIonError()})},inputs:{appImgFallback:"appImgFallback"}});let t=e;return t})();var F=m`
    query Recipes($first: Int, $after: String) {
  recipes(first: $first, after: $after) {
    pageInfo {
      hasNextPage
      endCursor
    }
    nodes {
      id
      title
      bannerUrl
      voteAverage
      author {
        name
      }
    }
  }
}
    `,Q=(()=>{let e=class e extends p{constructor(n){super(n),this.document=F}};e.\u0275fac=function(r){return new(r||e)(l(d))},e.\u0275prov=u({token:e,factory:e.\u0275fac,providedIn:"root"});let t=e;return t})(),q=m`
    query Recipe($id: Int!) {
  recipe(id: $id) {
    id
    title
    bannerUrl
    servings
    voteAverage
    ingredients {
      id
      name
      unit
      quantity
    }
    indications {
      prepTime
      cookTime
      restTime
      difficulty
    }
    steps {
      stepNumber
      description
      imageUrl
    }
    author {
      name
      avatarUrl
    }
  }
}
    `,W=(()=>{let e=class e extends p{constructor(n){super(n),this.document=q}};e.\u0275fac=function(r){return new(r||e)(l(d))},e.\u0275prov=u({token:e,factory:e.\u0275fac,providedIn:"root"});let t=e;return t})();export{P as a,z as b,Q as c,W as d};
