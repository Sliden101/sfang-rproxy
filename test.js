const axios = require('axios');
const fs = require('fs');

let d = {
    text: "Hi, my name is Elli. I am a chatbot.",
    voice: "elli"
}

async function downloadFile(fileUrl, outputLocationPath) {
    const writer = fs.createWriteStream(outputLocationPath);
  
    return axios({
      method: 'get',
      url: fileUrl,
      responseType: 'blob',
    }).then(response => {
      return new Promise((resolve, reject) => {
        response.data.pipe(writer);
        let error = null;
        writer.on('error', err => {
          error = err;
          writer.close();
          reject(err);
        });
        writer.on('close', () => {
          if (!error) {
            resolve(true);
          }
        });
      });
    });
  }
  
downloadFile(`https://api.pawan.krd/tts?text=${d.text}&voice=${d.voice}`, 'test.mp3')