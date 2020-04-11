const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./ex001.appdedoacao.db')

db.serialize(function() {
    db.run(`
        CREATE TABLE IF NOT EXISTS cadastro(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            email TEXT,
            bloodtype TEXT
        )
    `)
})

module.exports = db