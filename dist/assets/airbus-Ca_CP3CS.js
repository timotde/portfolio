import{c as y,S as g}from"./lucide-CzqIrkHA.js";/**
 * @license lucide v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const b=[["path",{d:"m12 19-7-7 7-7"}],["path",{d:"M19 12H5"}]];/**
 * @license lucide v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const v=[["ellipse",{cx:"12",cy:"5",rx:"9",ry:"3"}],["path",{d:"M3 5V19A9 3 0 0 0 15 21.84"}],["path",{d:"M21 5V8"}],["path",{d:"M21 12L18 17H22L19 22"}],["path",{d:"M3 12A9 3 0 0 0 14.59 14.87"}]];/**
 * @license lucide v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const f=[["path",{d:"M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49"}],["path",{d:"M14.084 14.158a3 3 0 0 1-4.242-4.242"}],["path",{d:"M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143"}],["path",{d:"m2 2 20 20"}]];/**
 * @license lucide v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const L=[["path",{d:"M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"}],["path",{d:"m15 5 4 4"}]];y({icons:{SquareArrowOutUpRight:g,ArrowLeft:b,DatabaseZap:v,EyeOff:f,Pencil:L}});const n=document.getElementById("topbar-toggle"),a=document.getElementById("sidebar"),r=document.getElementById("sidebar-overlay");function M(){a.classList.add("open"),r.classList.add("active"),n.setAttribute("aria-expanded","true")}function i(){a.classList.remove("open"),r.classList.remove("active"),n.setAttribute("aria-expanded","false")}n.addEventListener("click",()=>{a.classList.contains("open")?i():M()});r.addEventListener("click",i);a.querySelectorAll("a").forEach(e=>{e.addEventListener("click",()=>{window.innerWidth<=768&&i()})});const c=document.querySelector(".cs-hero-img");if(c){const e=document.querySelector(".sidebar .cs-meta"),d=document.querySelector(".sidebar .cs-tags"),l=()=>{const p=c.getBoundingClientRect(),o=window.innerHeight/2;let s=1;if(p.bottom<o){const u=(o-p.bottom)/o;s=Math.max(0,1-u)}c.style.opacity=s;const h=Math.max(0,1-(1-s)*2.5);e&&(e.style.opacity=h),d&&(d.style.opacity=h)};window.addEventListener("scroll",l,{passive:!0}),l()}const t=document.querySelector(".cs-hero-main"),m=document.querySelector(".cs-hero-stack");if(t&&m){const e=()=>{m.style.height=t.getBoundingClientRect().height+"px"};new ResizeObserver(e).observe(t),t.addEventListener("load",e),e()}
