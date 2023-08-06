class paginainicial extends Phaser.Scene {

    constructor(){
        super ({ key:'paginainicial'});

        this.press;
        this.game;
        this.button;
        this.click;
        this.lobby;

    }

    preload()
    {
        // -- Load dos diferentes ecrãs
        this.load.image('paginainicial', 'assets/paginainicial.png');
        this.load.image('paginaregras', 'assets/paginaregras.png');
        this.load.image('paginanivel1', 'assets/paginanivel1.png');
        this.load.image('paginanivel2', 'assets/paginanivel2.png');
        this.load.image('paginanivel3', 'assets/paginanivel3.png');
        this.load.image('ultimoecra', 'assets/ultimoecra.png');

        // -- load das plataformas
        this.load.image('plataforma', 'assets/plataforma.png');
        this.load.image('plataforma2', 'assets/plataforma2.2.png');
        this.load.image('plataforma3', 'assets/plataforma3.3.png');
        this.load.image('plataforma4', 'assets/plataforma4.png');

        // -- Load do botões
        this.load.image('jogarbotao2', 'assets/jogarbotao2.png');
        this.load.image('regrasbotao2', 'assets/regrasbotao2.png');
        this.load.image('sairbotao2', 'assets/sairbotao2.png');

        // -- Load do jogador
        this.load.image('SuperHero', 'assets/SuperHero.png');

        // -- Load do som do click
        this.load.audio('click', [ 'assets/audio/click.mp3']);

        // -- Load do som de fundo
        this.load.audio('lobby', [ 'assets/audio/LobbySound.mp3']);

    }

    create(){

        // -- Imagem de background
        this.add.image(400, 300, 'paginainicial');

        // -- Som de clicar no botão com volume 0.2
        this.click = this.sound.add("click", {volume: 0.2});

        this.lobby = this.sound.add("lobby", {volume: 0.2});

        this.lobby.play();
       
        // -- Botões de jogar e regras respetivamente
        this.button1 = this.add.image(93, 152, 'jogarbotao2').setScale(1).setInteractive({ useHandCursor: true });
        this.button2 = this.add.image(94, 206, 'regrasbotao2').setScale(1).setInteractive({ useHandCursor: true });

        // -- Clique no botão jogar e regras respetivamente
        this.button1.once('pointerdown', function (pointer) { 
            this.lobby.stop();
            this.scene.start('primeironivel'); this.click.play();}, this);
        this.button2.once('pointerdown', function (pointer) { this.scene.start('regras'); this.click.play();}, this);
        
    }

   
}