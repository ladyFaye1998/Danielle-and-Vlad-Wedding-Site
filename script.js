/*************************************************************************
 Simple vanilla JS helpers
 *************************************************************************/
const target = new Date("2025-07-22T13:00:00Z"); // 16:00 Israel (UTC+3)

function pad(n) { return n.toString().padStart(2, "0"); }

function renderCountdown() {
    const diff = target - Date.now();
    const d = Math.max(0, Math.floor(diff / 864e5));
    const h = Math.max(0, Math.floor((diff % 864e5) / 36e5));
    const m = Math.max(0, Math.floor((diff % 36e5) / 6e4));
    const s = Math.max(0, Math.floor((diff % 6e4) / 1e3));

    document.getElementById("count").innerHTML = `
    <span class="flex flex-col items-center"><strong>${pad(d)}</strong><small>days</small></span>
    <span class="flex flex-col items-center"><strong>${pad(h)}</strong><small>h</small></span>
    <span class="flex flex-col items-center"><strong>${pad(m)}</strong><small>m</small></span>
    <span class="flex flex-col items-center"><strong>${pad(s)}</strong><small>s</small></span>
  `;
}
renderCountdown();
setInterval(renderCountdown, 1000);

/* Tiny RSVP success message */
document.getElementById("rsvpForm").addEventListener("submit", (e) => {
    e.preventDefault();
    alert("🕊️  Thank you! Your raven is en route.");
    e.target.reset();
});
