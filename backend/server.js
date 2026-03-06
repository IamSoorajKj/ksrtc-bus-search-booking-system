import express from "express"
// Snapshot fix reload
import 'dotenv/config'
import connectDB from "./database/db.js"
import userRoute from "./routes/userRoute.js"
import locationRoute from "./routes/locationRoute.js"
import busRoute from "./routes/busRoute.js"
import paymentRoute from "./routes/paymentRoute.js"
import bookingRoute from "./routes/bookingRoute.js"
import cors from 'cors'


const app = express()

const PORT = process.env.PORT || 8000

app.use(express.json())
app.use(cors({
    origin: [process.env.CLIENT_URL, 'http://localhost:5173', 'http://localhost:5174'],
    credentials: true
}))

app.get('/', (req, res) => {
    res.json({
        message: "KSRTC Bus Search & Booking System API is running smoothly.",
        status: "healthy"
    })
})

app.use('/user', userRoute)
app.use('/location', locationRoute)
app.use('/bus', busRoute)
app.use('/payment', paymentRoute)
app.use('/booking', bookingRoute)

app.listen(PORT, () => {
    connectDB()
})