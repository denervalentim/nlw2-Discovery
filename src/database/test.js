const Database = require('./db')
const createProffy = require('./createProffy')


Database.then(async (db) => {
    //INSERIR DADOS
    proffyValue = {
        name: "Dener Valentim Rosa", 
        avatar: "https://avatars3.githubusercontent.com/u/57849623?s=460&u=4dede7f27846fe71bdd79d19a8041f449a8f8319&v=4", 
        whatsapp: "989907665", 
        bio: "Entusiasta das melhores tecnologias de química avançada.<br><br>Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através de experiências. Mais de 200.000 pessoas já passaram por uma das minhas explosões.",
    }

    classValue = {
        subject: 1, 
        cost: "20",
        //O PROFFY ID VIRÁ PELO BANCO DE DADOS
    }

    classScheduleValues = [
        //CLASS_ID VIRÁ PELO BANCO DE DADOS, APÓS CADASTRARMOS A CLASS
        {
            weekday: 1,
            time_from: 720,
            time_to: 1220
        },
        {
            weekday: 0,
            time_from: 520,
            time_to: 1220
        }
    ]

    //await createProffy(db, {proffyValue, classValue, classScheduleValues})

    //CONSULTAR OS DADOS INSERIDOS

    /*TODOS OS PROFFYS*/
    const selectedProffys = await db.all("SELECT * FROM proffys")
    //console.log(selectedProffys)

    //CONSULTAR AS CLASSES DE UM DETERMINADO PROFESSOR
    //E TRAZER JUNTO OS DADOS DO PROFESSOR
    const selectClassesAndProffys = await db.all(`
        SELECT classes.*, proffys.*
        FROM proffys
        JOIN classes ON (classes.proffy_id = proffys.id)
        WHERE classes.proffy_id = 1;
    `)
    //console.log(selectClassesAndProffys)

    // O HORÁRIO QUE A PESSOA TRABALHA, POR EXEMPLO, É DAS 8H - 18H
    // O HORÁRIO DO time_from (8H) PRECISA SER MENOR OU IGUAL AO HORÁRIO SOLICITADO
    // O time_to PRECISA SER ACIMA
    const selectClassesSchedules = await db.all(`
        SELECT class_schedule.*
        FROM class_schedule
        WHERE class_schedule.class_id = "1"
        AND class_schedule.weekday = "0"
        AND class_schedule.time_from <= "1300"
        AND class_schedule.time_to > "1300"
    `)

    console.log(selectClassesSchedules)

})