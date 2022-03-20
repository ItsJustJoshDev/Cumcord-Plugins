(function(W,U,Y){"use strict";function R(a){return a&&typeof a=="object"&&"default"in a?a:{default:a}}var l=R(W),I=R(U);const H=l.default.findByProps("Store","useStateFromStores"),X=l.default.findByProps("isDispatching"),G=l.default.findByProps("getActiveSocketAndDevice"),$=l.default.findByProps("SpotifyAPI"),J=l.default.findByProps("put","get","post"),{timeoutPromise:K}=l.default.findByProps("timeoutPromise");$.SpotifyAPI.post=function(a,n,r,p=1){return r=Object.assign(r,{headers:{authorization:"Bearer "+n}}),J.post(r).then(s=>s.status==202?Promise.reject(s):s).catch(s=>{const S=!r.onlyRetryOnAuthorizationErrors&&s.status==202;return(s.status==401||S)&&p>0?(s.status==202?K(5e3):Promise.resolve()).then(()=>$.getAccessToken(a)).then(y=>$.SpotifyAPI.post(a,y.body.access_token,r,p-1)).then(y=>new Promise(g=>setImmediate(()=>g(y)))):Promise.reject(s)})};class Q extends H.Store{initialize(){this.track=null,this.volume=0,this.playbackState=!1,this.repeat=!1,this.device=null,this._when=0,this._position=0}set position(n){this._position=n,this._when=Date.now()}get position(){return this.playbackState?Date.now()-this._when+this._position:this._position}setPlaying(n){return n?this.put("/me/player/play"):this.put("/me/player/pause")}setPosition(n){return this.put("/me/player/seek",{query:{position_ms:Math.round(n)}})}setVolume(n){return this.volume=n,this.emitChange(),this.put("/me/player/volume",{query:{volume_percent:n}})}skip(){this.post("/me/player/next")}previous(){this.post("/me/player/previous")}request(n,r,p){const s=G.getActiveSocketAndDevice().socket;return $.SpotifyAPI[n](s.accountId,s.accessToken,Object.assign({url:"https://api.spotify.com/v1"+r,body:{},method:"POST"},p))}post(n,r){return this.request("post",n,r)}put(n,r){return this.request("put",n,r)}get(n,r){return this.request("get",n,r)}}const e=new Q(X,a=>{switch(a.type){case"SPOTIFY_PLAYER_STATE":{e.track=a.track||null,e.track&&(e.track.album&&(e.track.album.url=`https://open.spotify.com/album/${e.track.album.id}`),e.track.url=`https://open.spotify.com/track/${e.track.id}`),e.volume=a.volumePercent||0,e.playbackState=a.isPlaying||!1,e.repeat=a.repeat||!1,e.device=a.device||null,e.lockPosition||(e.position=a.position||null),e.emitChange();break}}});function t(a){return".spotify-controls-"+a}const{React:d}=l.default.common,{useStateFromStores:Z}=l.default.findByProps("Store","useStateFromStores");function ee(){const a=Z([e],()=>e.playbackState),n="M144 479H48c-26.5 0-48-21.5-48-48V79c0-26.5 21.5-48 48-48h96c26.5 0 48 21.5 48 48v352c0 26.5-21.5 48-48 48zm304-48V79c0-26.5-21.5-48-48-48h-96c-26.5 0-48 21.5-48 48v352c0 26.5 21.5 48 48 48h96c26.5 0 48-21.5 48-48z",r="M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6z";return d.createElement("div",{className:t("buttons")},d.createElement("button",{className:t("previous-button")+" "+t("button"),onClick:()=>e.previous()},d.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 512 512",height:14},d.createElement("path",{d:"M500.5 231.4l-192-160C287.9 54.3 256 68.6 256 96v320c0 27.4 31.9 41.8 52.5 24.6l192-160c15.3-12.8 15.3-36.4 0-49.2zm-256 0l-192-160C31.9 54.3 0 68.6 0 96v320c0 27.4 31.9 41.8 52.5 24.6l192-160c15.3-12.8 15.3-36.4 0-49.2z"}))),d.createElement("button",{className:t("play-button")+" "+t("button"),onClick:()=>e.setPlaying(!a)},d.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 448 512",height:14},d.createElement("path",{d:a?n:r,className:t("play-button")+" "+t("button")}))),d.createElement("button",{className:t("skip-button")+" "+t("button"),onClick:()=>e.skip()},d.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 512 512",height:14},d.createElement("path",{d:"M500.5 231.4l-192-160C287.9 54.3 256 68.6 256 96v320c0 27.4 31.9 41.8 52.5 24.6l192-160c15.3-12.8 15.3-36.4 0-49.2zm-256 0l-192-160C31.9 54.3 0 68.6 0 96v320c0 27.4 31.9 41.8 52.5 24.6l192-160c15.3-12.8 15.3-36.4 0-49.2z"}))))}const{React:i}=l.default.common,{useState:f,useRef:x,useEffect:k}=i,te=l.default.findByProps("store","useStateFromStores"),{useStateFromStores:b}=te,C=document.createElement("canvas").getContext("2d"),O=l.default.findByProps("openContextMenu","closeContextMenu"),v=l.default.findByProps("MenuItem","MenuStyle"),ae=l.default.find(a=>a.default&&a.default.render&&a.default.render.toString().indexOf(".default.sliderContainer")>-1).default,ne=l.default.findByProps("SUPPORTS_COPY");function _(a){a.preventDefault(),O.openContextMenu(a,()=>i.createElement(oe))}function oe(a){const n=b([e],()=>e.volume);return i.createElement("div",{className:a.className,style:a.style},i.createElement(v.default,{navId:"spotify-context",onClose:O.closeContextMenu,"aria-label":"Spotify Settings"},i.createElement(v.MenuGroup,null,i.createElement(v.MenuControlItem,{id:"volume",key:"volume",label:"Volume",control:(r,p)=>i.createElement(ae,Object.assign({},r,{ref:p,value:n,maxValue:100,onChange:s=>e.setVolume(Math.round(s)),"aria-label":"Volume"}))}),i.createElement(v.MenuItem,{id:"open-spotify-url",label:"Open in Spotify",action:()=>{window.open("spotify:track:"+e.track.id)}}),i.createElement(v.MenuItem,{id:"copy-url",label:"Copy URL",action:()=>ne.copy(e.track.url)}))))}function ie(){k(()=>(e.setup&&e.setup(),()=>{e.dismantle&&e.dismantle()}),[]);const a=b([e],()=>!!e.device),n=x(null),r=x(null),[p,s]=f(0),[S,y]=f(0),[g,D]=f(!1);k(()=>{if(n.current){const o=n.current.getBoundingClientRect();y(o.width),s(o.x)}else y(0),s(0)},[n.current]);const u=b([e],()=>e.track,null,(o,c)=>(o&&o.id)==(c&&c.id)),N=o=>(Math.max(p,Math.min(p+S,o.clientX))-p)/S*u.duration,F=o=>{if(g){const c=N(o);e.playbackState&&(e.setPlaying(!1),e.playbackState=!1),e.position=c,e.lockPosition=!0,e.emitChange()}},T=o=>{if(g){const c=N(o);e.position=c,D(!1),e.emitChange(),e.setPosition(c).then(()=>{e.position=c,e.lockPosition=!1,e.emitChange(),e.playbackState||(e.playbackState=!0,e.emitChange(),e.setPlaying(!0))})}};k(()=>(window&&(window.addEventListener("mousemove",F),window.addEventListener("mouseup",T)),()=>{window.removeEventListener("mousemove",F),window.removeEventListener("mouseup",T)}),[p,S,g,u]);const m=b([e],()=>e.track&&e.track.album,null,(o,c)=>(o&&o.id)==(c&&c.id)),j=b([e],()=>e.track&&e.track.album&&e.track.album.image),le=b([e],()=>e.position),w=x(null),h=x(null),[E,ce]=f(null),[M,ue]=f(null),z=m&&`${u.artists.map(o=>o.name).join(", ")}${m.name&&m.name!=""?` \u2022 ${m.name}`:""}`,[B,me]=f("Whitney"),[q,pe]=f("12.8px"),[L,de]=f("16px");if(k(()=>{if(h.current){const o=getComputedStyle(h.current);me(o.fontFamily),pe(o.fontSize),de(getComputedStyle(w.current).fontSize)}},[h.current]),k(()=>{if(u&&u.name){C.font=`${L} ${B}`;const o=C.measureText(u.name).width-(w.current?w.current.getClientRects()[0].width:0);ce(o),m&&(C.font=`${q} ${B}`,ue(C.measureText(z).width-(h.current?h.current.getClientRects()[0].width:0)))}},[q,L,B,z,u&&u.name,w.current,h.current,m&&m.image]),!u||!a)return null;const V=`${le/u.duration*100}%`;return i.createElement("div",{className:t("player-wrap")},i.createElement("div",{className:t("player")},null,j&&i.createElement(m.url?"a":"span",Object.assign({className:t("album-image")},m.url&&{target:"_blank",href:m.url}),i.createElement("img",{src:j.url,onError:o=>{e.track.album.image=null,e.emitChange()},onContextMenu:o=>_(o)})),i.createElement("div",{className:t("info-box")+(m.image?"":" "+t("no-album"))},i.createElement("div",{className:t("track-name"),ref:w},i.createElement(u.url?"a":"span",Object.assign({style:{width:E,animation:E>0?void 0:"none",animationDuration:`${E>0?E/30:5}s`},onContextMenu:o=>_(o)},u.url&&{target:"_blank",href:u.url}),u.name)),i.createElement("div",{className:t("album-name"),ref:h},i.createElement(m.url?"a":"span",Object.assign({style:{animationDuration:`${M>0?M/30:5}s`,width:M,animation:M>0?void 0:"none"},onContextMenu:o=>_(o)},m.url&&{target:"_blank",href:m.url}),z))),i.createElement(ee)),i.createElement("div",{className:t("playback")},i.createElement("div",{className:t("playback-bar"),style:{backgroundSize:`${V} 100%, 100% 100%`},ref:n,onClick:o=>{const c=N(o);e.position=c,e.lockPosition=!0,e.emitChange(),e.setPosition(c).then(()=>{e.position=c,e.lockPosition=!1,e.emitChange(),e.playbackState||(e.playbackState=!0,e.emitChange(),e.setPlaying(!0))})}},i.createElement("span",{className:t("playback-thumb")+(g?" "+t("active"):""),onMouseDown:()=>{D(!0)},style:{left:V},ref:r}))))}const re=`
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
`;let A,P;var se={return:{onLoad(){P=document.createElement("style"),P.innerText=re,document.head.appendChild(P);const{React:a}=l.default.common,n=l.default.findByProps("usernameContainer"),r=I.default.getOwnerInstance(document.querySelector(`section[class^="panels-"] > .${n.container}`));A=Y.patch(r.__proto__,"render",(p,s)=>[a.createElement(ie),s]),r.forceUpdate()},onunload(){A();const a=l.default.findByProps("usernameContainer");I.default.getOwnerInstance(document.querySelector(`section[class^="panels-"] > .${a.container}`)).forceUpdate(),document.head.removeChild(P)}}};return se})(cumcord.modules.webpack,cumcord.modules.common,cumcord.patcher);
