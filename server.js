// Require the framework and instantiate it
const fastify = require('fastify')({ logger: true })
//Require external modules
const axios = require('axios');

// Declare a route
fastify.get('/', async (request, reply) => {
  return { hello: 'world' }
})

fastify.post('/completion-3.5', async (request, reply) => {
    const config = {
        headers: { 
            'Authorization': `Bearer ${request.body.token}`,
            'Content-Type': 'application/json'
        }
    }
    let reqBody = request.body;
    const max_tokens = 2048; //Hardcode to 2048

    let d = {
        model: 'gpt-3.5-turbo',
        messages: reqBody.roles,
        max_tokens: max_tokens,
    }
    
    try{
        let res = await axios.post('https://api.pawan.krd/v1/chat/completions', d, config)
        console.log(res.data)
        reply.send({success: "True", message: res.data})
    }
    catch(e){
        reply.send({success: 'false', message: e})
    }
  })
  
fastify.post('/reset', async (req, reply) => {
    console.log(req.body)
    const config = {
        headers: { Authorization: `Bearer ${req.body.token}` }
    }
    try{
        let res = await axios.post('https://api.pawan.krd/resetip', {}, config)
        console.log(res.data)
        reply.send({success: res.data.status, message: res.data.message})
    }catch(e){
        reply.send({success: 'false', message: e})
    }
  })

// Run the server!
const start = async () => {
  try {
    await fastify.listen({ port: 3000 })
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()