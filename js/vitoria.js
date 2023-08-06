class vitoria extends Phaser.Scene {

    constructor(){
        super ({ key:'vitoria'});

        this.press;
        this.game;
        this.click;
        this.VitoriaSound;

    }

    preload()
    {
        // -- Load das imagens
        this.load.image('ultimoecra', 'assets/ultimoecra.png');

        // -- Load do botão sair
        this.load.image('sairbotao2', 'assets/sairbotao2.png');

        // -- Load do som do click
        this.load.audio('click', [ 'assets/audio/click.mp3']);

        // -- Load do som de vitória
        this.load.audio('VitoriaSound', [ 'assets/audio/VitoriaSound.mp3']);
    }

    create(){

        // -- Parar o som do jogo
        this.game.sound.stopAll();

        // -- Imagem de background
        this.add.image(400, 300, 'ultimoecra');

        // -- Som de clicar no botão com volume 0.2
        this.click = this.sound.add("click", {volume: 0.2});

        // -- Som de fundo
        this.VitoriaSound = this.sound.add("VitoriaSound", {volume: 0.2});

        this.VitoriaSound.play();
       
        // -- Botão de sair
        this.button1 = this.add.image(73, 43, 'sairbotao2').setScale(1).setInteractive({ useHandCursor: true });

        // -- Clique no botão sair
        this.button1.once('pointerdown', function (pointer) { 
            this.VitoriaSound.stop();
            this.scene.start('paginainicial'); this.click.play();}, this);

    }

    
}