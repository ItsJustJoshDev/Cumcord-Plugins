(function(U,be,Y,H,X){"use strict";function _(n){if(n&&n.__esModule)return n;var a=Object.create(null);return n&&Object.keys(n).forEach(function(r){if(r!=="default"){var l=Object.getOwnPropertyDescriptor(n,r);Object.defineProperty(a,r,l.get?l:{enumerable:!0,get:function(){return n[r]}})}}),a.default=n,Object.freeze(a)}var N=_(U),I=_(Y),u=_(X);const G=u.findByProps("Store","useStateFromStores"),J=u.findByProps("isDispatching"),K=u.findByProps("getActiveSocketAndDevice"),$=u.findByProps("SpotifyAPI"),Q=u.findByProps("put","get","post"),{timeoutPromise:Z}=u.findByProps("timeoutPromise");$.SpotifyAPI.post=function(n,a,r,l=1){return r=Object.assign(r,{headers:{authorization:"Bearer "+a}}),Q.post(r).then(s=>s.status==202?Promise.reject(s):s).catch(s=>{const S=!r.onlyRetryOnAuthorizationErrors&&s.status==202;return(s.status==401||S)&&l>0?(s.status==202?Z(5e3):Promise.resolve()).then(()=>$.getAccessToken(n)).then(y=>$.SpotifyAPI.post(n,y.body.access_token,r,l-1)).then(y=>new Promise(g=>setImmediate(()=>g(y)))):Promise.reject(s)})};class ee extends G.Store{initialize(){this.track=null,this.volume=0,this.playbackState=!1,this.repeat=!1,this.device=null,this._when=0,this._position=0}set position(a){this._position=a,this._when=Date.now()}get position(){return this.playbackState?Date.now()-this._when+this._position:this._position}setPlaying(a){return a?this.put("/me/player/play"):this.put("/me/player/pause")}setPosition(a){return this.put("/me/player/seek",{query:{position_ms:Math.round(a)}})}setVolume(a){return this.volume=a,this.emitChange(),this.put("/me/player/volume",{query:{volume_percent:a}})}skip(){this.post("/me/player/next")}previous(){this.post("/me/player/previous")}request(a,r,l){const s=K.getActiveSocketAndDevice().socket;return $.SpotifyAPI[a](s.accountId,s.accessToken,Object.assign({url:"https://api.spotify.com/v1"+r,body:{},method:"POST"},l))}post(a,r){return this.request("post",a,r)}put(a,r){return this.request("put",a,r)}get(a,r){return this.request("get",a,r)}}const e=new ee(J,n=>{switch(n.type){case"SPOTIFY_PLAYER_STATE":{e.track=n.track||null,e.track&&(e.track.album&&(e.track.album.url=`https://open.spotify.com/album/${e.track.album.id}`),e.track.url=`https://open.spotify.com/track/${e.track.id}`),e.volume=n.volumePercent||0,e.playbackState=n.isPlaying||!1,e.repeat=n.repeat||!1,e.device=n.device||null,e.lockPosition||(e.position=n.position||null),e.emitChange();break}}});function t(n){return"cumcord-spotify-controls-"+n}const{React:d}=u.common,{useStateFromStores:te}=u.findByProps("Store","useStateFromStores");function ne(){const n=te([e],()=>e.playbackState),a="M144 479H48c-26.5 0-48-21.5-48-48V79c0-26.5 21.5-48 48-48h96c26.5 0 48 21.5 48 48v352c0 26.5-21.5 48-48 48zm304-48V79c0-26.5-21.5-48-48-48h-96c-26.5 0-48 21.5-48 48v352c0 26.5 21.5 48 48 48h96c26.5 0 48-21.5 48-48z",r="M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6z";return d.createElement("div",{className:t("buttons")},d.createElement("button",{className:t("previous-button")+" "+t("button"),onClick:()=>e.previous()},d.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 512 512",height:14},d.createElement("path",{d:"M500.5 231.4l-192-160C287.9 54.3 256 68.6 256 96v320c0 27.4 31.9 41.8 52.5 24.6l192-160c15.3-12.8 15.3-36.4 0-49.2zm-256 0l-192-160C31.9 54.3 0 68.6 0 96v320c0 27.4 31.9 41.8 52.5 24.6l192-160c15.3-12.8 15.3-36.4 0-49.2z"}))),d.createElement("button",{className:t("play-button")+" "+t("button"),onClick:()=>e.setPlaying(!n)},d.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 448 512",height:14},d.createElement("path",{d:n?a:r,className:t("play-button")+" "+t("button")}))),d.createElement("button",{className:t("skip-button")+" "+t("button"),onClick:()=>e.skip()},d.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 512 512",height:14},d.createElement("path",{d:"M500.5 231.4l-192-160C287.9 54.3 256 68.6 256 96v320c0 27.4 31.9 41.8 52.5 24.6l192-160c15.3-12.8 15.3-36.4 0-49.2zm-256 0l-192-160C31.9 54.3 0 68.6 0 96v320c0 27.4 31.9 41.8 52.5 24.6l192-160c15.3-12.8 15.3-36.4 0-49.2z"}))))}const{React:i}=u.common,{useState:h,useRef:P,useEffect:v}=i,ae=u.findByProps("store","useStateFromStores"),{useStateFromStores:b}=ae,x=document.createElement("canvas").getContext("2d"),j=u.findByProps("openContextMenu","closeContextMenu"),k=u.findByProps("MenuItem","MenuStyle"),oe=u.find(n=>n.default&&n.default.render&&n.default.render.toString().indexOf(".default.sliderContainer")>-1).default,re=u.findByProps("SUPPORTS_COPY");function z(n){n.preventDefault(),j.openContextMenu(n,()=>i.createElement(ie))}function ie(n){const a=b([e],()=>e.volume);return i.createElement("div",{className:n.className,style:n.style},i.createElement(k.default,{navId:"spotify-context",onClose:j.closeContextMenu,"aria-label":"Spotify Settings"},i.createElement(k.MenuGroup,null,i.createElement(k.MenuControlItem,{id:"volume",key:"volume",label:"Volume",control:(r,l)=>i.createElement(oe,Object.assign({},r,{ref:l,value:a,maxValue:100,onChange:s=>e.setVolume(Math.round(s)),"aria-label":"Volume"}))}),i.createElement(k.MenuItem,{id:"open-spotify-url",label:"Open in Spotify",action:()=>{window.open("spotify:track:"+e.track.id)}}),i.createElement(k.MenuItem,{id:"copy-url",label:"Copy URL",action:()=>re.copy(e.track.url)}))))}function se(){v(()=>(e.setup&&e.setup(),()=>{e.dismantle&&e.dismantle()}),[]);const n=b([e],()=>!!e.device),a=P(null),r=P(null),[l,s]=h(0),[S,y]=h(0),[g,D]=h(!1);v(()=>{if(a.current){const o=a.current.getBoundingClientRect();y(o.width),s(o.x)}else y(0),s(0)},[a.current]);const m=b([e],()=>e.track,null,(o,c)=>(o&&o.id)==(c&&c.id)),O=o=>(Math.max(l,Math.min(l+S,o.clientX))-l)/S*m.duration,F=o=>{if(g){const c=O(o);e.playbackState&&(e.setPlaying(!1),e.playbackState=!1),e.position=c,e.lockPosition=!0,e.emitChange()}},T=o=>{if(g){const c=O(o);e.position=c,D(!1),e.emitChange(),e.setPosition(c).then(()=>{e.position=c,e.lockPosition=!1,e.emitChange(),e.playbackState||(e.playbackState=!0,e.emitChange(),e.setPlaying(!0))})}};v(()=>(window&&(window.addEventListener("mousemove",F),window.addEventListener("mouseup",T)),()=>{window.removeEventListener("mousemove",F),window.removeEventListener("mouseup",T)}),[l,S,g,m]);const p=b([e],()=>e.track&&e.track.album,null,(o,c)=>(o&&o.id)==(c&&c.id)),q=b([e],()=>e.track&&e.track.album&&e.track.album.image),ue=b([e],()=>e.position),w=P(null),f=P(null),[E,me]=h(null),[M,pe]=h(null),B=p&&`${m.artists.map(o=>o.name).join(", ")}${p.name&&p.name!=""?` \u2022 ${p.name}`:""}`,[R,de]=h("Whitney"),[V,he]=h("12.8px"),[L,fe]=h("16px");if(v(()=>{if(f.current){const o=getComputedStyle(f.current);de(o.fontFamily),he(o.fontSize),fe(getComputedStyle(w.current).fontSize)}},[f.current]),v(()=>{if(m&&m.name){x.font=`${L} ${R}`;const o=x.measureText(m.name).width-(w.current?w.current.getClientRects()[0].width:0);me(o),p&&(x.font=`${V} ${R}`,pe(x.measureText(B).width-(f.current?f.current.getClientRects()[0].width:0)))}},[V,L,R,B,m&&m.name,w.current,f.current,p&&p.image]),!m||!n)return null;const W=`${ue/m.duration*100}%`;return i.createElement("div",{className:t("player-wrap")},i.createElement("div",{className:t("player")},null,q&&i.createElement(p.url?"a":"span",Object.assign({className:t("album-image")},p.url&&{target:"_blank",href:p.url}),i.createElement("img",{src:q.url,onError:o=>{e.track.album.image=null,e.emitChange()},onContextMenu:o=>z(o)})),i.createElement("div",{className:t("info-box")+(p.image?"":" "+t("no-album"))},i.createElement("div",{className:t("track-name"),ref:w},i.createElement(m.url?"a":"span",Object.assign({style:{width:E,animation:E>0?void 0:"none",animationDuration:`${E>0?E/30:5}s`},onContextMenu:o=>z(o)},m.url&&{target:"_blank",href:m.url}),m.name)),i.createElement("div",{className:t("album-name"),ref:f},i.createElement(p.url?"a":"span",Object.assign({style:{animationDuration:`${M>0?M/30:5}s`,width:M,animation:M>0?void 0:"none"},onContextMenu:o=>z(o)},p.url&&{target:"_blank",href:p.url}),B))),i.createElement(ne)),i.createElement("div",{className:t("playback")},i.createElement("div",{className:t("playback-bar"),style:{backgroundSize:`${W} 100%, 100% 100%`},ref:a,onClick:o=>{const c=O(o);e.position=c,e.lockPosition=!0,e.emitChange(),e.setPosition(c).then(()=>{e.position=c,e.lockPosition=!1,e.emitChange(),e.playbackState||(e.playbackState=!0,e.emitChange(),e.setPlaying(!0))})}},i.createElement("span",{className:t("playback-thumb")+(g?" "+t("active"):""),onMouseDown:()=>{D(!0)},style:{left:W},ref:r}))))}const ce=`
.${t("playback-bar")} {
  position: relative;
  height: 0.25em;
  width: 100%;
  background-image: linear-gradient(var(--interactive-active), var(--interactive-active)), linear-gradient(var(--background-primary), var(--background-primary));
  background-size: 0% 100%, 100% 100%;
  background-repeat: no-repeat;
}
.${t("playback-bar")}:hover .${t("playback-thumb")},
.${t("playback-bar")} .${t("playback-thumb")}:hover,
.${t("playback-bar")} .${t("playback-thumb")}.${t("active")} {
  display: inline-block;
}
.${t("playback-thumb")} {
  position: absolute;
  display: none;
  height: 0.8em;
  width: 0.8em;
  background: #fff;
  border-radius: 100%;
  top: 0.125em;
  transform: translate(-0.4em, -0.4em);
  box-shadow: var(--elevation-stroke), var(--elevation-low)
  cursor: ew-resize;
}
.${t("player")} {
  margin: 0.25em;
  height: 2.5em;
  display: flex;
}
.${t("info-box")} {
  display: inline-flex;
  flex-grow: 1;
  flex-shrink: 1;
  flex-direction: column;
  margin: 0.25em 0em 0.25em 0.5em;
  white-space: nowrap;
  max-width: calc(100% - 7.5em);
}
.${t("info-box")}.${t("no-album")} {
  max-width: calc(100% - 5em);
}
.${t("album-name")} {
  height: 1em;
  overflow: hidden;
  font-size: 0.8em;
}
.${t("track-name")} span,
.${t("track-name")} a {
  color: var(--interactive-active);
}
.${t("album-name")} span,
.${t("album-name")} a {
  color: var(--header-secondary);
}
@keyframes ${t("marquee")} {
  0%,5% {
    transform: translate(0, 0);
  }
  80%,100% {
    transform: translate(-100%, 0);
  }
}
.${t("album-name")} a,
.${t("track-name")} a,
.${t("album-name")} span,
.${t("track-name")} span {
  display: inline-block;
  height: inherit;
  width: 100%;
}
.${t("album-name")}:hover span,
.${t("track-name")}:hover span,
.${t("album-name")}:hover a,
.${t("track-name")}:hover a {
  animation: ${t("marquee")} infinite linear 5s;
  text-decoration: underline;
}
.${t("track-name")} {
  height: 1em;
  overflow: hidden;
  width: 100%;
}
.${t("album-image")} img {
  height: inherit;
  width: 100%;
  border-radius: 5%;
}
.${t("album-image")} {
  flex-grow: 0;
  flex-shrink: 0;
  display: inline-block;
  height: 2.5em;
  width: 2.5em;
}
.${t("timestamp")} {
  font-face: monospace;
  color: #ddd;
  font-size: 0.75em;
}
button.${t("button")} {
  background: none;
}
.${t("button")} path {
  fill: var(--interactive-normal);
}
.${t("button")}:hover path {
  fill: var(--interactive-active);
}
.${t("playback")} {
  display: flex;
}
.${t("previous-button")} {
  transform: scaleX(-1);
}
.${t("buttons")} {
  display: inline-flex;
  flex-shrink: 0;
  flex-grow: 0;
}
`;let A,C;var le={return:{onLoad(){C=document.createElement("style"),C.innerText=ce,document.head.appendChild(C);const{React:n}=N.common,a=N.findByProps("usernameContainer"),r=I.getOwnerInstance(document.querySelector(`section[class^="panels-"] > .${a.container}`));A=H.patch(r.__proto__,"render",(l,s)=>[n.createElement(se),s]),r.forceUpdate()},onunload(){A();const n=N.findByProps("usernameContainer");I.getOwnerInstance(document.querySelector(`section[class^="panels-"] > .${n.container}`)).forceUpdate(),document.head.removeChild(C)}}};return le})(webpackModules$1,cumcord.modules.common,cumcord.reactUtils,cumcord.patcher,cumcord.webpack);
