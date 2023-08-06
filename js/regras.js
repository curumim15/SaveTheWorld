class regras extends Phaser.Scene {

    constructor(){
        super ({ key:'regras'});

        this.press;
        this.game;
        this.click;

    }

    preload()
    {
        // -- Load das imagens
        this.load.image('paginaregras', 'assets/paginaregras.png');

        // -- Load do botão sair
        this.load.image('sairbotao2', 'assets/sairbotao2.png');

        // -- Load do som do click
        this.load.audio('click', [ 'assets/audio/click.mp3']);
    }

    create(){
        // -- Imagem de background
        this.add.image(400, 300, 'paginaregras');

        // -- Som de clicar no botão com volume 0.2
        this.click = this.sound.add("click", {volume: 0.2});
       
        // -- Botão de sair
        this.button1 = this.add.image(73, 43, 'sairbotao2').setScale(1).setInteractive({ useHandCursor: true });

        // -- Clique no botão sair
        this.button1.once('pointerdown', function (pointer) { this.scene.start('paginainicial'); this.click.play();}, this);

    }

}