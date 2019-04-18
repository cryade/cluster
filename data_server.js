const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 80 });

const wsarray = [];
var ind = 100000;

wss.on('connection', function connection(ws) {
  console.log("Client Connected");
  wsarray.push(ws);

  ws.on('close', function close() {
    clearInterval(interval);
    wsarray.splice(wsarray.indexOf(ws), 1);
    console.log('Client disconnected');
  })

  ws.on('message', function print(msg) {
    console.log(msg);
  })
  

  var interval;

  interval = setInterval(() => {
    
    let objString = JSON.stringify(createRandomData()); 
    wsarray.forEach(ws => ws.send(objString));
    ind++;
  }, 10000)
});

function nokOK(){
  if(Math.random()>0.95){
    return "NOK"
  }
  else return "OK"
}

function createRandomData(){
  let obj= {
    "Time" : Date(),
    "Audit":
    {  
      "ID" : ind,
      "Components" : 
        {
          "Battery" : (Math.random()>0.5),
          "Fan1" : (Math.random()>0.5),
          "Fan2" : (Math.random()>0.5),
          "Fan3" : (Math.random()>0.5),
          "Fan4" : (Math.random()>0.5),
          "DIMM5" : (Math.random()>0.5),
          "DIMM6" : (Math.random()>0.5),
          "DIMM7" : (Math.random()>0.5),
          "SATA1" : (Math.random()>0.5),
          "SATA2" : (Math.random()>0.5),
        }
        
    },
    "Evaluation" : (Math.random()>0.5), 
    }
    

    obj._id=obj.Audit.ID;
    return obj;
  }
