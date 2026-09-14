// Renders shows, clips, and photos from content.json.
// Shows whose date has passed are hidden automatically, so you never have to delete old ones.

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text) node.textContent = text;
  return node;
}

function parseDate(str) {
  // "2026-10-03" -> local midnight (avoids the date shifting a day due to time zones)
  const [y, m, d] = str.split("-").map(Number);
  return new Date(y, m - 1, d);
}

function renderShows(shows) {
  const list = document.getElementById("show-list");
  list.innerHTML = "";

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const upcoming = shows
    .filter((s) => s.date && parseDate(s.date) >= today)
    .sort((a, b) => parseDate(a.date) - parseDate(b.date));

  if (upcoming.length === 0) {
    const empty = el("p", "empty", "No shows scheduled right now. More data are being collected. ");
    const link = el("a", null, "Book me for yours.");
    link.href = "#contact";
    empty.append(link);
    list.append(empty);
    return;
  }

  for (const show of upcoming) {
    const date = parseDate(show.date);
    const row = el("article", "show");

    const dateBox = el("div", "show-date");
    dateBox.append(
      el("span", "month", MONTHS[date.getMonth()]),
      el("span", "day", String(date.getDate())),
      el("span", "weekday", [WEEKDAYS[date.getDay()], show.time].filter(Boolean).join(" · "))
    );

    const info = el("div", "show-info");
    info.append(el("h3", "show-title", show.title || "Comedy show"));
    const meta = [show.venue, show.city].filter(Boolean).join(" · ");
    if (meta) info.append(el("p", "show-meta", meta));
    if (show.note) info.append(el("p", "show-note", show.note));

    row.append(dateBox, info);

    if (show.link) {
      const btn = el("a", "btn", show.linkText || "Tickets");
      btn.href = show.link;
      btn.target = "_blank";
      btn.rel = "noopener";
      row.append(btn);
    }

    list.append(row);
  }
}

function youtubeId(url) {
  const match = url.match(/(?:youtu\.be\/|v=|embed\/|shorts\/)([\w-]{11})/);
  return match ? match[1] : null;
}

function renderClips(clips) {
  const list = document.getElementById("clip-list");
  list.innerHTML = "";

  if (clips.length === 0) {
    const fig = el("figure", "clip");
    fig.append(el("div", "clip-placeholder", "Clip forthcoming (pending peer review)"));
    const cap = el("figcaption");
    cap.append(el("span", "fig-num", "Fig. 2. "), document.createTextNode("Footage of the author being funny."));
    fig.append(cap);
    list.append(fig);
    return;
  }

  clips.forEach((clip, i) => {
    const id = youtubeId(clip.youtube || "");
    if (!id) return;

    const fig = el("figure", "clip");
    const frame = el("div", "clip-frame");
    const iframe = document.createElement("iframe");
    iframe.src = `https://www.youtube-nocookie.com/embed/${id}`;
    iframe.title = clip.title || "Comedy clip";
    iframe.loading = "lazy";
    iframe.allow = "accelerometer; encrypted-media; gyroscope; picture-in-picture; fullscreen";
    iframe.allowFullscreen = true;
    frame.append(iframe);

    const cap = el("figcaption");
    cap.append(el("span", "fig-num", `Fig. ${i + 2}. `), document.createTextNode(clip.title || ""));

    fig.append(frame, cap);
    list.append(fig);
  });
}

function renderPhotos(photos) {
  const list = document.getElementById("photo-list");
  list.innerHTML = "";

  if (photos.length === 0) {
    const fig = el("figure", "photo");
    fig.append(el("div", "photo-placeholder", "Photos forthcoming"));
    list.append(fig);
    return;
  }

  photos.forEach((photo, i) => {
    if (!photo.file) return;
    const src = photo.file.includes("/") ? photo.file : `images/${photo.file}`;

    const fig = el("figure", "photo");
    const link = el("a");
    link.href = src;
    link.target = "_blank";
    link.rel = "noopener";
    const img = document.createElement("img");
    img.src = src;
    img.alt = photo.caption || "Dr. Ji performing";
    img.loading = "lazy";
    img.onerror = () => fig.remove(); // hide photos whose file is missing
    link.append(img);

    const cap = el("figcaption");
    cap.append(el("span", "fig-num", `Plate ${i + 2}. `), document.createTextNode(photo.caption || ""));

    fig.append(link, cap);
    list.append(fig);
  });
}

document.getElementById("year").textContent = new Date().getFullYear();

fetch("content.json", { cache: "no-cache" })
  .then((r) => r.json())
  .then((data) => {
    renderShows(data.shows || []);
    renderClips(data.clips || []);
    renderPhotos(data.photos || []);
  })
  .catch(() => {
    document.getElementById("show-list").innerHTML =
      '<p class="empty">Couldn’t load shows. Check that content.json is valid JSON.</p>';
  });
