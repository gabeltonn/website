/* ============================================================
   WORKS — the one file to edit when you add or swap a sample.

   Each item:
     title  : shown under the tile
     meta   : small grey line (role, year, whatever)
     type   : "yt"     → YouTube, 16:9
              "short"  → YouTube Short / vertical, 9:16
              "vimeo"  → Vimeo, 16:9   (add  vertical: true  for 9:16)
              "audio"  → an .mp3/.m4a in /audio (small files only)
              "sq"     → a square embed slot (e.g. Spotify) — give it html
     id     : YouTube ID / Vimeo ID / audio file path / html for "sq"
     thumb  : optional — your own image, e.g. "thumbs/io-trailer.jpg"
              (overrides the YouTube thumbnail; required for Vimeo if you
              want a still before play). 16:9 for yt/vimeo, 9:16 for short.
     link   : optional — "Watch on Instagram/TikTok" line under the tile

   Leave id as "" to show a placeholder tile until you have the link.
   ============================================================ */

const WORKS = {
  podcasting: [
    { title: "Industry Only at The Cheese Store — channel trailer", meta: "Show launch · edit · brand", type: "yt", id: "VUtVzMvu1KY" },
    { title: "Quick Question with Soren & Daniel", meta: "Producer/editor · 2020–2026 · edit, mix, master", type: "yt", id: "Ojl8C_yp57M" },
    { title: "Industry Only at The Cheese Store", meta: "Concept & production · Seasons 1–2 · set, lighting, post", type: "yt", id: "VKVZ_FLb0GY" },
    { title: "Stiff Socks — five-year anniversary", meta: "Founding & on-mic producer · 2019–2024", type: "yt", id: "0q8FWBqFTIk" },
  ],
  video: [
    { title: "Stiff Socks — we blew up my car in Las Vegas", meta: "Director / editor · 12 min doc", type: "yt", id: "8CvzpYCKavE" },
    { title: "Stiff Socks — Amsterdam", meta: "Shot · edited", type: "yt", id: "UjS4XuotMCU" },
    { title: "Lee Fields at Farm House Collective", meta: "Directed · edited", type: "short", id: "", link: "https://www.instagram.com/reel/DLiu-Z0y6Ne/" },
    { title: "Rayna Greenberg at LA Improv", meta: "Shot · edited · recap", type: "short", id: "", link: "https://www.instagram.com/p/DVtOedJDbfi/" },
  ],
  // Optional single before/after for the audio band. Leave both "" to hide it.
  ab: { before: "", after: "", caption: "Dialogue cleanup — remote recording to broadcast-ready" },
};

/* ---------- renderer (no need to edit below) ---------- */
(function () {
  function el(tag, cls, html) { var e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; }

  function tile(item) {
    var shape = item.type === "short" || item.vertical ? "v" : item.type === "sq" ? "sq" : "h";
    var t = el("div", "tile " + shape);
    var lbl = { yt: "YouTube", short: "YouTube · 9:16", vimeo: "Vimeo", sq: "Embed", audio: "Audio" }[item.type] || "";

    if (item.type === "audio") {
      t.className = "tile audio";
      if (item.id) {
        t.innerHTML = '<span class="t"></span><audio controls preload="none" src=""></audio>';
        t.querySelector(".t").textContent = item.title;
        t.querySelector("audio").src = item.id;
      } else {
        t.innerHTML = '<button class="play" aria-label="Placeholder"></button><span class="t"></span><span class="m" style="color:var(--mute);font-size:13px">audio coming soon</span>';
        t.querySelector(".t").textContent = item.title;
      }
      return t;
    }

    if (!item.id && item.link) {
      var out = el("a", "play"); out.href = item.link; out.target = "_blank"; out.rel = "noopener";
      out.setAttribute("aria-label", "Open " + item.title);
      t.appendChild(out);
      var provider = /instagram/.test(item.link) ? "Instagram" : /tiktok/.test(item.link) ? "TikTok" : "External link";
      var externalLabel = el("span", "lbl"); externalLabel.textContent = provider + " ↗"; t.appendChild(externalLabel);
      return t;
    }

    if (!item.id) {
      t.innerHTML = '<span class="play" aria-hidden="true"></span><span class="lbl"></span>';
      t.querySelector(".lbl").textContent = lbl + " · coming soon";
      return t;
    }

    if (item.type === "sq") { t.innerHTML = item.id; return t; }

    var src;
    if (item.type === "vimeo") src = "https://player.vimeo.com/video/" + item.id + "?autoplay=1";
    else src = "https://www.youtube-nocookie.com/embed/" + item.id + "?autoplay=1&rel=0";

    if (item.thumb || item.type === "yt" || item.type === "short") {
      var img = el("img", "thumb"); img.alt = ""; img.loading = "lazy";
      img.src = item.thumb || ("https://i.ytimg.com/vi/" + item.id + "/hqdefault.jpg");
      t.appendChild(img); t.classList.add("has-thumb");
    }
    var btn = el("button", "play"); btn.setAttribute("aria-label", "Play " + item.title);
    t.appendChild(btn);
    var l = el("span", "lbl"); l.textContent = lbl; t.appendChild(l);
    btn.addEventListener("click", function () {
      var f = el("iframe"); f.src = src; f.allow = "autoplay; encrypted-media; picture-in-picture"; f.allowFullscreen = true; f.title = item.title;
      t.innerHTML = ""; t.appendChild(f);
    });
    return t;
  }

  function card(item) {
    var c = el("div", "card");
    c.appendChild(tile(item));
    var t = el("span", "t"); t.textContent = item.title; c.appendChild(t);
    if (item.meta) { var m = el("span", "m"); m.textContent = item.meta; c.appendChild(m); }
    if (item.link) {
      var a = el("a", "m ext"); a.href = item.link; a.target = "_blank"; a.rel = "noopener";
      a.textContent = /instagram/.test(item.link) ? "Watch on Instagram ↗" : /tiktok/.test(item.link) ? "Watch on TikTok ↗" : "Watch ↗";
      c.appendChild(a);
    }
    return c;
  }

  document.querySelectorAll("[data-works]").forEach(function (host) {
    var list = WORKS[host.dataset.works] || [];
    list.forEach(function (item) { host.appendChild(item.type === "audio" ? tile(item) : card(item)); });
  });

  var ab = document.querySelector("[data-ab]");
  if (ab) {
    if (WORKS.ab.before && WORKS.ab.after) {
      ab.innerHTML = '<p class="eyebrow" style="margin-bottom:10px">Before / after</p>' +
        '<div class="grid"><div class="tile audio"><span class="t">Before</span><audio controls preload="none"></audio></div>' +
        '<div class="tile audio"><span class="t">After</span><audio controls preload="none"></audio></div></div>' +
        '<p class="m" style="color:var(--mute);font-size:13px;margin-top:8px"></p>';
      var a = ab.querySelectorAll("audio"); a[0].src = WORKS.ab.before; a[1].src = WORKS.ab.after;
      ab.querySelector("p.m").textContent = WORKS.ab.caption;
    } else { ab.remove(); }
  }
})();
