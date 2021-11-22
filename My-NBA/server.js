const express = require('express')
const app = express()
// const api = require('./api')
const path = require('path')
var urllib = require('urllib')


app.use(express.static(path.join(__dirname,'dist')))
app.use(express.static(path.join(__dirname,'node_modules')))


const teamToIDs = {
    "lakers": "1610612747",
    "warriors": "1610612744",
    "heat": "1610612748",
    "suns": "1610612756"
}
const ourData={players:[]}

urllib.request('http://data.nba.net/10s/prod/v1/2018/players.json', function (err, data, res) {
    ourData.players = JSON.parse(data).league.standard
});

app.get('/teams/:teamName',function(request,response){
    let teamId = teamToIDs[request.params.teamName]
    
    let teamPlayers = ourData.players.filter(p => p.teamId===teamId && p.isActive)
    .map(p =>  {return{"firstName" : p.firstName,
        "lastName" : p.lastName, 
        "jersey":p.jersey, 
        "pos":p.pos}});
    
        response.send(teamPlayers)
})

const port = 3000
app.listen(port,function(){
    console.log("Running on port "+port)
})