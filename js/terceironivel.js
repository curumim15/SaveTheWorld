class terceironivel extends Phaser.Scene {

    constructor(){
        super ({ key:'terceironivel'});

        this.press;
        this.game;

    }

    preload()
    {
        // -- Load do background
        this.load.image('paginanivel3', 'assets/paginanivel3.png');

        // -- Load do heroi
        this.load.spritesheet('heroi', 'assets/SuperHero.png',
              { frameWidth: 32, frameHeight: 384 } );

        // -- Load da plataforma
        this.load.image('plataforma', 'assets/plataforma.png');
        this.load.image('plataforma2', 'assets/plataforma2.2.png');
        this.load.image('plataforma3', 'assets/plataforma3.3.png');
        this.load.image('plataforma4', 'assets/plataforma4.png');

    }

    create(){
        // -- Imagem de background
        this.add.image(400, 300, 'paginanivel3');

        // -- Imagem da plataforma
        this.add.image(300, 600, 'plataforma4');
        this.add.image(138, 550, 'plataforma');
        this.add.image(668, 550, 'plataforma');
        this.add.image(300, 250, 'plataforma2');
        this.add.image(677, 150, 'plataforma2');
        this.add.image(430, 563, 'plataforma3');

    }

   
}