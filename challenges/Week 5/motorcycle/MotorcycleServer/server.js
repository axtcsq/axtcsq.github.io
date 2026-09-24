const express = require('express')
const cors = require('cors')
const fs = require('fs')
const path = require('path')

const app = express()
const PORT = process.env.PORT || 8000;
const FILE_LOC = path.join(__dirname, 'bookings.json')

app.use(cors())
app.use(express.json())

function loadBookings() {
  return JSON.parse(fs.readFileSync(FILE_LOC, 'utf8'))
}

function saveBookings(bookings) {
  fs.writeFileSync(FILE_LOC, JSON.stringify(bookings, null, 2))
}

function getNextId(bookings) {
  if (bookings.length === 0) return 1
  return Math.max(...bookings.map((booking) => booking.id)) + 1
}

// READ
app.get('/bookings', (req, res) => {
  res.json(loadBookings())
})

// CREATE
app.post('/bookings', (req, res) => {
  const bookings = loadBookings()
  const newBooking = {
    id: getNextId(bookings),
    name: req.body.name,
    day: req.body.day,
    time: req.body.time
  }

  bookings.push(newBooking)
  saveBookings(bookings)
  res.json(newBooking)
})

// UPDATE
app.put('/bookings/:id', (req, res) => {
  const bookings = loadBookings()
  const id = Number(req.params.id)
  const booking = bookings.find((booking) => booking.id === id)

  if (!booking) {
    return res.status(404).json({ message: 'Booking not found' })
  }

  booking.name = req.body.name
  booking.day = req.body.day
  booking.time = req.body.time

  saveBookings(bookings)
  res.json(booking)
})

// DELETE
app.delete('/bookings/:id', (req, res) => {
  const bookings = loadBookings()
  const id = Number(req.params.id)
  const index = bookings.findIndex((booking) => booking.id === id)

  if (index === -1) {
    return res.status(404).json({ message: 'Booking not found' })
  }

  const deletedBooking = bookings.splice(index, 1)[0]
  saveBookings(bookings)
  res.json(deletedBooking)
})

app.listen(PORT, () => {
  console.log(`Motorcycle Server running at http://127.0.0.1:${PORT}`)
})
