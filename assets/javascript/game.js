$(document).ready(function(){

var characters = [{
    name: 'Obi Wan',
    power: 120,
    image: 'Obi_Wan_Kenobi.jpg'
}, {
    name: 'Luke Skywalker',
    power: 100,
    image: 'Luke_skywalker.jpg'
}, {
    name: 'Darth Sidious',
    power: 150,
    image: 'Darth_Sidious.jpg'
},{
    name: 'Darth Maul',
    power: 172,
    image: 'Darth_Maul.jpg'
}];

var selectCharacter_index;
var button_status = true;
var enemy_life;
var your_character_life;
var defeated_enemy = 0;

// Add all characters
var display_character = function (){
    for (var i = 0; i < characters.length; i++) {
        $('.all_characters').append('<div class = "character" data-index = "'+i+'">' +
                '<p class = name>' + characters[i].name + '</p>' +
                '<img src="assets/images/' + characters[i].image +'">'+
                '<p class="power">' + characters[i].power + '</p>' + '</div>' );
    }
}

display_character();


// Select your character
    $('.all_characters').on('click', ".character", function select_your_character () {
        $('.your_character').html("<p class = 'show'>" + "Your Character" + "</p>");
        $('.your_character').append(this);
        your_character_life = parseInt($(".your_character p.power").text()); 
        selectCharacter_index = $(this).attr('data-index');
        $(".all_characters").html("");
        for (var i = 0; i < characters.length; i++) {
        if (i != selectCharacter_index){
        $('.available_enimies').append('<div class = "character" data-index = "'+i+'">' +
                '<p class = name>' + characters[i].name + '</p>' +
                '<img src="assets/images/' + characters[i].image +'">'+
                '<p class= "power">' + characters[i].power + '</p>' + '</div>' );
        }
    }
    });


//Select your enemy
$('.available_enimies').on('click', '.character',function select_enemy (){
    $('.defender').html(this);
    enemy_life = parseInt($(".defender p.power").text());
    button_status = true    
});

//fight
var attack_number = 0;
var enemy_reduce;
var your_character_reduce ;
var your_character_life;

$("button").on('click', function(){
    if (button_status === true){
        if  ($(".defender p.power").text() == 100){
            your_character_reduce = 5;
        }
        else if ($(".defender p.power").text() == 172){
            your_character_reduce = 25;
        }
        else if ($(".defender p.name").text() == 150){
            your_character_reduce = 20;
        }
        else if ($(".defender p.name").text() == 120){
            your_character_reduce = 10;
        }
        if (your_character_life > 0 && enemy_life > 0){
            attack_number ++;
            enemy_reduce = attack_number * 8;
            your_character_life -=your_character_reduce;
            enemy_life -= 8 * attack_number;
            if (attack_number === 1){
            $("div.result").append("<div class = 'add_result'>" + "<p>" + "You attacked " + $(".defender p.name").text() + " for " 
                + enemy_reduce + " damage." + "</p>" + "<p>" + $(".defender p.name").text() +
                " attacked you back for " + your_character_reduce + " damage" + "</p>" + "</div>");
            }
            else {
            $("div.add_result").html("<p>" + "You attacked " + $(".defender p.name").text() + " for " 
                + enemy_reduce + " damage." + "</p>" + "<p>" + $(".defender p.name").text() +
                " attacked you back for " + your_character_reduce + " damage" + "</p>");  
            }
        }
        else if (enemy_life <= 0 && defeated_enemy !== 2){
            $("div.defender").html("<br><br><br><br><br><br>"); 
            button_status = false;
            defeated_enemy++;
            $("div.add_result").html("<p>" + "You have defated " + $(".defender p.name").text() + 
                ", you can choose to fight another enemy" + "</p>")
        }

        else if (enemy_life <= 0 && defeated_enemy === 2){
        $("div.add_result").html("<p>" + "You win the game" + "</p>" + "<button class='btn'>"
            + "Restart" + "</button>");
        $(".defender").html("");
        button_status = true;
        }

        else if (your_character_life <= 0){
        $("div.add_result").html("<p>" + "You loss the game" + "</p>" + "<button class='btn'>"
        + "Restart" + "</button>");
        }
    }

    else {
        $("div.add_result").html("<p>" + "No enemy here" + "</p>");
        button_status = true;
    }
    
});

$(".result").on("click", "button", function(){
    display_character();
    $('.your_character').html("<p class = 'show'>" + "Your Character" + "</p>"
        +"<br><br><br><br><br><br>");
    $(".result").html("<div class = 'clear'></div>");
    $("..available_enimies".html(""));
    defeated_enemy = 0;
    attack_number = 0;
});

});
