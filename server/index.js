var express = require('express')
var bodyParser = require('body-parser')
var groupRoutes = require('./routes/group')
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: false
}))

app.use('/api/groups', groupRoutes)

app.use('/*', (req, res) => {
    return res.send({
        success: true,
        message: 'API is live'
    })
})

const port = process.env.PORT || 3003
app.listen(port, () => {
    console.log(`We are live at ${port} `)
})