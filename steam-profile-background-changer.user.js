// ==UserScript==
// @name         steam profile background changer
// @version      v1
// @description  try out different steam profile backgrounds without buying them
// @author       wateroverdose
// @match        *://steamcommunity.com/id/*
// @match        *://*.steamcommunity.com/id/*
// @match        *://steamcommunity.com/profiles/*
// @match        *://*.steamcommunity.com/profiles/*
// @match        *://store.steampowered.com/points/shop/c/backgrounds/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=steamcommunity.com
// @grant        unsafeWindow
// @updateURL    https://github.com/wateroverdose/steam-profile-background-changer/raw/main/steam-profile-background-changer.user.js
// @downloadURL  https://github.com/wateroverdose/steam-profile-background-changer/raw/main/steam-profile-background-changer.user.js
// ==/UserScript==

(function() {
   'use strict';

   unsafeWindow.ds = function ds(dom_node) {
      if (dom_node === undefined) {return undefined} else {return document.querySelector(dom_node)};
   }

   unsafeWindow.ds_a = function ds_a(dom_node) {
      if (dom_node === undefined) {return undefined} else {return document.querySelectorAll(dom_node)};
   }

   unsafeWindow.create_dom_node = function create_dom_node(type, name) {
      let item = document.createElement(type);
      if (name !== undefined) item.classList.add(name);
      return item;
   }
   
   if (window.location.href.match(/\bsteamcommunity\b/i) !== null) {
      // spbc = steam profile background changer
      let cont = ds('body').appendChild(create_dom_node('div', 'spbc'));
      // ds('.favorite_badge').remove();
   
      // cont.classList.add('favorite_badge');
   
      let inp = cont.appendChild(create_dom_node('input'));
      let btn = cont.appendChild(create_dom_node('button'));
          
      
      btn.innerHTML = 'change background';
      inp.placeholder = 'enter url';

      inp.style = 'width: 70%; background: #fff; border: solid 1px #000; border-radius: 3px; padding: 5px;';
      cont.style = 'position: fixed; z-index: 9999; bottom: 6vh; right: 6vw; display: flex; align-items: center; width: 200px; height: 30px; box-shadow: 0 0 3px #000;';
      btn.style = 'background: #fff; border-radius: 5px; border: solid 1px #000; font-size: 12px; font-weight: bold; color: #000;';

      btn.addEventListener('click', () => {
         change_bg(inp.value);
      });
   
      unsafeWindow.change_bg = function change_bg(url) {
         let el = ds('.profile_animated_background > video');
         el.poster = '';
         let a = ds_a('.profile_animated_background > video > source');
         for (let n = 0; n < a.length; n++) a[n].remove();
         el.src = url;
      }
   }
   
   if (window.location.href.match(/\bstore.steampowered\b/i) !== null) {
      unsafeWindow.get_video_links = function get_video_links() {
         let el = ds_a('.redeempointsmodal_VideoPreview_3_O3d > source');
         let arr = [el[0].src, el[1].src];
         return arr;
      }
   
      let store_body = ds('body');
      let vid_btn = store_body.appendChild(create_dom_node('div', 'flying_vid_btn'));

      vid_btn.innerHTML = 'copy background link';
      vid_btn.style = 'position: fixed; bottom: 6vh; right: 6vw; z-index: 9999; cursor: pointer; padding: 5px; background: #fff; border-radius: 5px; border: solid 1px #000; box-shadow: 0 0 3px #000; font-size: 14px; font-weight: bold; color: #000;';

      vid_btn.addEventListener('click', () => {
         try {
            navigator.clipboard.writeText(get_video_links()[0]);
         }
         catch(err) {
            if (err.message.match(/\baccess property\b/i) !== null) {
               alert(`select a background first`);
            }
         }
      });
   }
})();