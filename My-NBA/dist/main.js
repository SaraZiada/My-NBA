const source = $("#players-template").html();
const template = Handlebars.compile(source);


const getPlayers = function(){
    let teamName = $("#teamName-input").val();
    
    $.get(`/teams/${teamName}`, function (response) {
        console.log(response)
//         $("body").append(`<div>${response[0].firstName} - ${response[0].lastName}</div`)
        renderPlayers(response)

    })

}

const renderPlayers = function(players){
    const data = {players:players}
    const newHTML = template(data);
    console.log(newHTML)
    $(".players").append(newHTML);
}