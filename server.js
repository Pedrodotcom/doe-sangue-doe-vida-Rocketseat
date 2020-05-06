const express = require('express')
const server = express()

const db = require('./db')

server.use(express.static("public"))

server.use(express.urlencoded({ extended: true }))

const nunjucks = require("nunjucks")
    nunjucks.configure("views", {
        express: server,
        noCache: true,
    })

server.get("/", function(request, response) {

    db.all(`SELECT * FROM cadastro`, function(err, rows) {
        if (err) {
            return response.send(`Erro no banco de dados. Por favor, tente novamente`)
        }

        const reverseDonors = rows.reverse()

        let lastDonors = []
        for (let donor of reverseDonors) {
            if (lastDonors.length < 4) {
                lastDonors.push(donor)
            }
        }

        return response.render("index.html", { cadastro: lastDonors })
    })

})

server.get("/check", function(request, response) {

    db.all(`SELECT * FROM cadastro`, function(err, rows) {
        if (err) {
            return response.send(`Erro no banco de dados. Por favor, tente novamente.`)
        }

        const reverseDonors = rows.reverse()

        return response.send({ cadastro: reverseDonors })
    })

})

server.post("/", function(request, response) {

    const query = `
        INSERT INTO cadastro(
            name,
            email,
            bloodtype
        ) VALUES (?, ?, ?);
    `

    const values = [
        request.body.name,
        request.body.email,
        request.body.bloodtype
    ]

    db.run(query, values, function(err) {
        if (err) {
            return response.send(`Erro no banco de dados. Por favor, tente novamente.`)
        }

        return response.redirect("/")
    })
})

server.listen(3000)