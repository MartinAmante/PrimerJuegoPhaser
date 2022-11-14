import Phaser from "phaser";

var puntuacion = 0;
var textoPuntuacion;

class Escena extends Phaser.Scene{

    platform = null
    personaje = null
    cursors = null
    estrellas = null


     preload ()
    {
        this.load.image('sky', 'img/sky.png');
        this.load.image('plataforma', 'img/platform.png');
        this.load.spritesheet('personaje', 'img/dude.png', {frameWidth: 32, frameHeight: 48});
        this.load.image('bomba', './img/bomb.png');
        this.load.image('estrella', './img/star.png' );

    }
    
    
     create ()
    {
        this.add.image(400, 300, 'sky');
    
        this.platform = this.physics.add.staticGroup();

        this.platform.create(400,568 ,'plataforma').setScale(2).refreshBody();

        this.platform.create(100,400 ,'plataforma');
        this.platform.create(700,300 ,'plataforma');

        this.personaje = this.physics.add.sprite(470, 300, 'personaje')

        this.personaje.setBounce(0.8);
        this.personaje.setCollideWorldBounds(true);


        this.bombas = this.physics.add.group();

       textoPuntuacion = this.add.text(16, 16, 'Puntuacion: 0', { fontSize: '32px', fill: '#000' });

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('personaje', {start: 0, end: 3}),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'turn',
            frames: [{key: 'personaje', frame: 4}],
            frameRate: 20
        });
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('personaje', {start: 5, end: 8}),
            frameRate: 10,
            repeat: -1
        });


        this.estrellas = this.physics.add.group({
            key: 'estrella',
            repeat: 15,
            setXY: { x: 12, y: 0, stepX: 70 }
        });
        
        this.estrellas.children.iterate(function (child) {
        
            child.setBounceY(Phaser.Math.FloatBetween(0.2, 0.9));
        
        });

        this.physics.add.collider(this.estrellas, this.platform);

        this.physics.add.collider(this.personaje, this.platform);

        this.cursors = this.input.keyboard.createCursorKeys();

        this.physics.add.overlap(this.personaje, this.estrellas, this.agarrarEstrellas, null, this);

        this.physics.add.collider(this.bombas, this.platform);
    
        this.physics.add.collider(this.personaje, this.bombas, this.hitBomb, null, this);
    }

    hitBomb(personaje, bomba)
{
    this.physics.pause();

    personaje.setTint(0xff0000);

    personaje.anims.play('turn');

    this.gameOver = true;
}

    agarrarEstrellas(estrella, personaje){

        estrella.disableBody(true, true);
        this.puntuacion += 10;
        this.textoPuntuacion.setText("Puntuacion" + this.puntuacion);

        if (this.estrellas.countActive(true) === 0)
    {
        this.estrellas.children.iterate(function (child) {

            child.enableBody(true, child.x, 0, true, true);

        });

        var x = (this.personaje.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

        var bomba = this.bombas.create(x, 16, 'bomb');
        bomba.setBounce(1);
        bomba.setCollideWorldBounds(true);
        bomba.setVelocity(Phaser.Math.Between(-200, 200), 20);

    }

    }
    Update ()
    {
        if (this.cursors.left.isDown)
        {
            this.personaje.setVelocityX(-160);
        
            this.personaje.anims.play('left', true);
        }
        else if (this.cursors.right.isDown)
        {
            this.personaje.setVelocityX(160);
        
            this.personaje.anims.play('right', true);
        }
        else
        {
            this.personaje.setVelocityX(0);
        
            this.personaje.anims.play('turn');
        }
        
        if (this.cursors.up.isDown && this.personaje.body.touching.down)
        {
            this.personaje.setVelocityY(-330);
        }






    }

}

export default Escena; 



