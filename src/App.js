import { useEffect, useState } from "react";
import Escena from "./components/Escena";
import Phaser from "phaser"


function App(){

    const [listo, setListo] = useState(false);

    useEffect(() => {

        var config = {
            type: Phaser.AUTO,
            width: 800,
            height: 600,
            physics: {
                default: 'arcade',
                arcade: {
                    gravity: { y: 800 }
                }
            },
            scene:[Escena]
        };
        // Arranca el juego
        var game = new Phaser.Game(config);

        //trigger cuando el juego esta completamente listo
        game.events.on("LISTO", setListo)

        //si no pongo esto, se acumulan duplicados del lienzo
        return () => {
            setListo(false);
            game.destroy(true);
        }
    },[listo]);
}
export default App;