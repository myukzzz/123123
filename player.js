const players = Array.from(document.querySelectorAll(".player"));
let activePlayer = null;
const sourceLabel = new Map(players.map((player) => [
  player, player.getAttribute("aria-label").replace(/^Play /, "")
]));
function update(player, play) {
  const image = player.nextElementSibling;
  image.src = play ? player.dataset.gif : player.dataset.poster;
  player.setAttribute("aria-pressed", String(play));
  player.setAttribute("aria-label", (play ? "Pause " : "Play ") + sourceLabel.get(player));
  player.querySelector(".play-text").textContent = play ? "Pause" : "Play";
}
for (const player of players) {
  player.hidden = false;
  player.addEventListener("click", () => {
    if (activePlayer === player) {
      update(player, false);
      activePlayer = null;
      return;
    }
    if (activePlayer) update(activePlayer, false);
    update(player, true);
    activePlayer = player;
  });
}

