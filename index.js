const filmsList = document.getElementById("films");
const poster = document.getElementById("poster");
const title = document.getElementById("title");
const runtime = document.getElementById("runtime");
const showtime = document.getElementById("showtime");
const availableTickets = document.getElementById("available-tickets");
const buyBtn = document.getElementById("buy-ticket");

let currentFilm = null;
const BASE_URL = "http://localhost:3000/films"; // JSON server endpoint

// Load first film details
fetch(`${BASE_URL}/1`)
  .then(res => res.json())
  .then(film => showFilm(film));

// Load all films into sidebar
fetch(BASE_URL)
  .then(res => res.json())
  .then(films => {
    films.forEach(film => {
      const li = document.createElement("li");
      li.textContent = film.title;
      li.addEventListener("click", () => showFilm(film));
      filmsList.appendChild(li);
    });
  });

// Show film details
function showFilm(film) {
  currentFilm = film;
  poster.src = film.poster;
  title.textContent = film.title;
  runtime.textContent = film.runtime;
  showtime.textContent = film.showtime;
  updateTickets();
}

// Update ticket count
function updateTickets() {
  const available = currentFilm.capacity - currentFilm.tickets_sold;
  availableTickets.textContent = available;
  buyBtn.disabled = available <= 0;
  buyBtn.textContent = available <= 0 ? "Sold Out" : "Buy Ticket";
}

// Buy ticket button
buyBtn.addEventListener("click", () => {
  const available = currentFilm.capacity - currentFilm.tickets_sold;
  if (available > 0) {
    currentFilm.tickets_sold++;

    // Update backend with PATCH
    fetch(`${BASE_URL}/${currentFilm.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tickets_sold: currentFilm.tickets_sold })
    })
    .then(res => res.json())
    .then(updatedFilm => {
      currentFilm = updatedFilm;
      updateTickets();
    });
  }
});
