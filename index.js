const express = require('express')
const fallback = require('express-history-api-fallback')

const app = express()
const root = `${__dirname}/dist`

app.use(express.static(root))
app.use(fallback('index.html', { root }))
app.listen(process.env.PORT || 8080)
