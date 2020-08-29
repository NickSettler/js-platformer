import Game from './Game';
import Scene from "./Scene";
import {globalErrorHandler} from "./functions";
import Rect from "./Rect";
import {COLORS} from "./Colors";

window.onerror = globalErrorHandler;

const game = new Game(
    document.getElementById("main_canvas") as HTMLCanvasElement,
    {
        width: 800,
        height: 600
    }
);

const s1 = new Scene({
    name: "Main Scene",
    isMain: true
});

// for (let i = 0; i <= 100; i++) {
//     for (let j = 0; j < 75; j++) {
//         s1.addEntity(new Rect({
//             x: i * 8, y: j * 8, w: 8, h: 8, isColorRandomized: true
//         }));
//     }
// }

const r1 = new Rect({
    x: 100, y: 100,
    w: 20, h: 30,
});

r1.color = COLORS.RED;

setTimeout(() => {
    r1.resize(100, 100);
    r1.move(10, r1.y);
}, 1000);

s1.addEntity(r1);

game.addScene(s1);
window.onload = () => {
    game.startProcess();
};


