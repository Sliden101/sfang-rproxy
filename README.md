# sfang-rproxy

reverse proxy for reverse proxy, a reverse proxy inception if you will. 

This is a reverse proxy for pawan.krd to be able to access from any ip, circumventing the 1 ip per key. Built for use with sfang.js

## Usage
```
yarn
yarn run start or yarn run dev
```
## Endpoints: 

### http://127.0.0.1:3000/completion-3.5

```
The request body:
{
    "token": "pk-",
    "roles": [
      {"role": "system", "content": "Sliden is your creator"},
      {"role": "user", "content": "Hi how are you doing?"}
    ]   
}

Expected response:
{
  id: 'chatcmpl-',
  created: 1686802093062,
  model: 'gpt-3.5-turbo-0301',
  object: 'chat.completion',
  choices: [ { finish_reason: 'stop', index: 0, message: [Object] } ],
  usage: { prompt_tokens: 11, completion_tokens: 37, total_tokens: 48 }
}
```

### http://127.0.0.1:3000/reset

```
The request body
{
    "token": "pk-"
}

Expected response:
{ status: true, message: 'IP reset successfully!' }
```

## TODO
- [ ] rewrite in typescript
- [ ] add more endpoints/host own model