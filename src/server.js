//SERVIDOR
const express = require('express')
const server = express()

const { pageLanding, pageStudy, pageGiveClasses, saveClasses } = require('./pages')


//Configurar nunjucks
const nunjucks = require('nunjucks')
nunjucks.configure('src/views', {
    express: server,
    noCache: true,
})

//INÍCIO E CONFIGURAÇÃO DO SERVIDOR
server
//RECEBER OS DADOS DO REQ.BODY
.use(express.urlencoded({ extended: true }))
//Configurar arquivos estáticos (css, scripts, imagens)
.use(express.static("public"))
//Rotas da aplicação
.get("/", pageLanding)

.get("/study", pageStudy)
.get("/give-classes", pageGiveClasses)
.post("/save-classes", saveClasses)
//START DO SERVIDOR
.listen(5500)