class gameover extends Phaser.Scene {

    constructor(){
        super ({ key:'gameover'});

        this.press;
        this.game;
        this.button1;
        this.click;
        this.GameOverSound;

    }

    preload()
    {
        // -- Load do background
        this.load.image('paginagameover', 'assets/paginagameover.png');

        // -- Load do botão sair
        this.load.image('sairbotao2', 'assets/sairbotao2.png');

        // -- Load do som do click
        this.load.audio('click', [ 'assets/audio/click.mp3']);

        // -- Load do som de insucesso
        this.load.audio('GameOverSound', [ 'assets/audio/GameOverSound.mp3']);

    }

    create(){

        // -- Para o som do jogo
        this.game.sound.stopAll();

        // -- Imagem de background
        this.add.image(400, 300, 'paginagameover');

        // -- Som de clicar no botão com volume 0.2
        this.click = this.sound.add("click", {volume: 0.2});

        // -- Som de fundo
        this.GameOverSound = this.sound.add("GameOverSound", {volume: 0.2});

        this.GameOverSound.play();

        // -- Botão de sair
        this.button1 = this.add.image(60, 70, 'sairbotao2').setScale(1).setInteractive({ useHandCursor: true });

        // -- Clique no botão sair
        this.button1.once('pointerdown', function (pointer) { 
            this.GameOverSound.stop();
            this.scene.start('primeironivel'); this.click.play();}, this);

    }
  
}