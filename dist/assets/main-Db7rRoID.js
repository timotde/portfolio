import{c as n,S as c}from"./lucide-DIOogdfi.js";/**
 * @license lucide v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const d=[["path",{d:"M5 12h14"}],["path",{d:"m12 5 7 7-7 7"}]];n({icons:{SquareArrowOutUpRight:c,ArrowRight:d}});const a=document.getElementById("topbar-toggle"),s=document.getElementById("sidebar"),r=document.getElementById("sidebar-overlay");function l(){s.classList.add("open"),r.classList.add("active"),a.setAttribute("aria-expanded","true")}function o(){s.classList.remove("open"),r.classList.remove("active"),a.setAttribute("aria-expanded","false")}a.addEventListener("click",()=>{s.classList.contains("open")?o():l()});r.addEventListener("click",o);s.querySelectorAll("a").forEach(e=>{e.addEventListener("click",()=>{window.innerWidth<=768&&o()})});const p=document.querySelectorAll(".fade-in"),i=new IntersectionObserver(e=>{e.forEach(t=>{t.isIntersecting&&(t.target.classList.add("visible"),i.unobserve(t.target))})},{threshold:.08,rootMargin:"0px 0px -30px 0px"});p.forEach((e,t)=>{e.style.transitionDelay=`${t*.09}s`,i.observe(e)});
