var config = {
    type : Phaser.AUTO,
    parent: 'content',
    width: 800, 
    height: 600,
    physics : {
        default: 'arcade',
        arcade: {
            gravity: {y:300},
            debug: false,
        }
    },

    scene:[
        paginainicial,
        regras,
        primeironivel,
        segundonivel,
        terceironivel,
        gameover,
        vitoria,
        //GameOver
    ]
};

var game= new Phaser.Game(config);