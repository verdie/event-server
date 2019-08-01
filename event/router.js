const Event = require ('./EventModel')
const { Router } = require('express');
const router = new Router()

router.get('/event', (request, response,next)=>{
    Event.findAll()
        .then(events => {
            console.log('events:', events)
            response.send(events)
        })
        .catch(console.error)
})

router.post('/event', (request, response,next)=>{
    console.log('REQUEST_BODY',request.body)
    Event
        .create({
            name: request.body.name,
            date: request.body.date,
            description: request.body.description
        })
        .then(event => response.send(event))
        .catch(next)
})
router.get('/event/:eventId', (request, response) => {
    const eventId = request.params.eventId ;
    const event= Event.findByPk(eventId).then(event => response.send(event))
   
    Event.findAll().then((event)=>{response.send(event.dataValues)})
    })

router.put('/event/:eventId',(request, response, next )=>{
    const eventId = request.params.eventId ;
    const event= Event
    .findByPk(eventId)
    .then(event => event.update(request.body))
    .then(event => {
        
            response.json(event);
        })
    .then(event => response.send(event))
    .catch(next)
})

router.delete(
    '/event/:id',
    (request, response, next) => {
        Event
        .destroy({
          where: {
            id: request.params.id
          }
        })
        .then(number => response.send({ number }))
        .catch(next)
    }
)
module.exports = router