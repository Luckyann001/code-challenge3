ABOUT
This is a simple movie ticket web app. It shows a movie poster in the center, a small ticket card on the left, and a movie list on the right. The app connects to a JSON server for data.

Getting Started

Install JSON Server if you don’t already have it:

npm install -g json-server


Start the server:

json-server --watch db.json


Open index.html in your browser to view the app.

API Endpoints

GET /films → fetch all movies

GET /films/:id → fetch a single movie

PATCH /films/:id → update ticket count

DELETE /films/:id → remove a movie

Layout

Left: Ticket card with available tickets + buy button

Center: Movie poster and details

Right: List of movies

Features

View all movies

See movie details

Buy tickets (updates tickets left)

Delete a movie