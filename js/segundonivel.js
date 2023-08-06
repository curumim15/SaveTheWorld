class segundonivel extends Phaser.Scene {

    constructor(){
        super ({ key:'segundonivel'});

        this.press;
        this.game;
        this.platforms;
        this.pirata;
        this.player;
        this.cursors;
        this.stars;
        this.score = 0;
        this.scoreText;
        this.bombs;
        this.gameOver = false;
        this.morto = false;
        this.starsound;
        this.DorSound;

    }

    preload()
    {
        // -- Load do background
        this.load.image('paginanivel2', 'assets/paginanivel2.png');

        // -- Load do heroi
        this.load.spritesheet('heroi', 'assets/SuperHero2.png',
              { frameWidth: 48, frameHeight: 48 } );

        // -- Load da plataforma
        this.load.image('plataforma', 'assets/plataforma.png');
        this.load.image('plataforma2', 'assets/plataforma2.2.png');
        this.load.image('plataforma3', 'assets/plataforma3.3.png');
        this.load.image('plataforma4', 'assets/plataforma4.png');
        this.load.image('star', 'assets/star.png');
        this.load.image('bomb', 'assets/bomb.png');
        this.load.image('robo', 'assets/robo.png');

        this.load.audio('starsound', [ 'assets/audio/StarSound.mp3']);
        this.load.audio('DorSound', [ 'assets/audio/DorSound.mp3']);

    }

        

    create(){

        // -- Som de clicar de apanhar uma estrela com volume 0.2
        this.DorSound = this.sound.add("DorSound", {volume: 0.2});

        // -- Som de clicar de apanhar uma estrela com volume 0.2
        this.starsound = this.sound.add("starsound", {volume: 0.2});

        // -- Imagem de background
        this.add.image(400, 300, 'paginanivel2');

        // -- Adicionar as plataformas do jogo com físicas
        this.platforms = this.physics.add.staticGroup();
        this.pirata = this.physics.add.staticGroup();
        

        this.pirata.create(300, 600, 'plataforma4');
        this.pirata.create(150, 400, 'robo');
        this.pirata.create(420, 200, 'robo');
        this.platforms.create(138, 600, 'plataforma');
        this.platforms.create(668, 600, 'plataforma');
        this.platforms.create(150, 300, 'plataforma2');
        this.platforms.create(650, 245, 'plataforma2');
        this.platforms.create(409, 520, 'plataforma3');

        // -- Adicionar o player
        this.player = this.physics.add.sprite(100, 100, 'heroi');

        this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);

        // -- Criar animações
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('heroi',
                                    { start: 3, end: 5}),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('heroi',
                                    { start: 6, end: 8}),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'turn',
            frames: [ { key: 'heroi', frame: 1 } ],
            frameRate: 20,
        });

        // -- Colisão do player com as plataformas 
        this.physics.add.collider(this.player, this.platforms);
        
        // -- Adicionar interação com as teclas de cursor
        this.cursors = this.input.keyboard.createCursorKeys();

        // -- criar as estrelas
        this.stars = this.physics.add.group({
            key: 'star',
            repeat:11,
            setXY: {x: 12, y:0, stepX: 70},
        });
        this.stars.children.iterate(function(child) {
        child.setBounceY(Phaser.Math.FloatBetween(0.4,0.6));

        });

        // --  colisao das estrelas com as plataformas
        this.physics.add.collider(this.stars,this.platforms);

        this.scoreText = this.add.text(127, 35, 'Pontuação: ', {fontSize: '16px', fill: '#fff'}); 

        // -- Recolha das estrelas (Colisão com as estrelas)
        this.physics.add.overlap(this.player, this.stars, this.collectStar, null, this);

        // -- Grupo de bombas
        this.bombs = this.physics.add.group();
        this.physics.add.collider(this.bombs, this.platforms);
        this.physics.add.collider(this.player, this.bombs, this.hitBomb, null, this);

        this.physics.add.collider(this.player, this.pirata, this.hitPirata, null, this);

    }

    // -- colectStar
    collectStar(player, star){

        this.starsound.play();

        this.score += 1;
        this.scoreText.setText('Pontuação: ' + this.score);

        star.disableBody(true, true); // Retira/Desativa a estrela, a estrela continua lá mas o utilizar não consegue ter intereção com ela.

        // -- Verificar se ainda existe estrelas ativas
        if ( this.stars.countActive(true) == 0 ){

            // -- Re-ativar o conjunto das 12 estrelas
            this.stars.children.iterate( function(child) {
                child.enableBody(true, child.x, 0, true, true);
            });

            // -- Calcular a posição da bomba em função da posição do player
            var x = (player.x < 400) ?
                Phaser.Math.Between(400, 800) : 
                Phaser.Math.Between(0, 400);

            this.bomb = this.bombs.create(x, 16, 'bomb');
            this.bomb.setBounce(1);
            this.bomb.setCollideWorldBounds(true);
            this.bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
            this.bomb.allowGravity = false;

        }

    }

     // -- função hitBomb()
        hitBomb(player, bomb){

            // -- Delay antes de trocar de ecrã
            this.time.delayedCall(200,function()
            {
            this.DorSound.play();
            this.physics.pause();
            this.score = 0;
            this.player.setTint(0xff0000);
            this.player.anims.play('turn');
            this.gameOver = true;
            this.scene.start("gameover");
            },[],this);
    }

     // -- função hitPirata()
        hitPirata(player, Pirata){

        // -- Delay antes de trocar de ecrã
        this.time.delayedCall(200,function()
        {
        this.DorSound.play();
        this.morto = false;
        this.score = 0;

        this.physics.pause();
        this.player.setTint(0xff0000);
        this.player.anims.play('turn');
        this.gameOver = true;
        this.scene.start("gameover");
        },[],this);

    }

    update(){

        if (this.gameover){
            return;
        }

        if( this.cursors.left.isDown ) {
            this.player.setVelocityX(-160);
            this.player.anims.play('left',true);
        }
        else     if( this.cursors.right.isDown ) {
            this.player.setVelocityX(160);
            this.player.anims.play('right',true);
        }
        else    {
            this.player.setVelocityX(0);
            this.player.anims.play('turn');
        }

        if ( this.cursors.up.isDown && this.player.body.touching.down ){
            this.player.setVelocityY(-330);
        }

        //
        if ( this.score == 36)
        {
            this.score = 0;
            this.scene.start("vitoria");

        }
        

    }   

}