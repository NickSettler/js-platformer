import Scene from "./Scene";
import {canvasClickListener, canvasMouseHandler} from "./functions";

interface GameInterface {
    drawScene(sceneName: string): void;

    addScene(scene: Scene): void;

    startProcess(): void;
}

type GameClassOptions = {
    width: number;
    height: number;
}

const GameDefaultOptions: GameClassOptions = {
    width: 800,
    height: 600
};

class Game implements GameInterface {
    private readonly _canvas: HTMLCanvasElement;
    private _context: CanvasRenderingContext2D;
    private _width: number;
    private _height: number;
    private _scenes: Map<string, Scene>;
    private _currentScene: Scene;

    constructor(canvas: HTMLCanvasElement | string, options: GameClassOptions = GameDefaultOptions) {
        if (canvas instanceof HTMLCanvasElement) {
            this._canvas = canvas;
        }

        if (typeof canvas === "string") {
            this._canvas = document.getElementById(canvas) as HTMLCanvasElement;
        }

        this._width = options.width;
        this._height = options.height;

        this.init();
    }

    private init(): void {
        this._canvas.width = this._width;
        this._canvas.height = this._height;
        this._context = this._canvas.getContext("2d");
        this._scenes = new Map<string, Scene>();

        this._canvas.addEventListener("mousemove", (e: MouseEvent) => {
            canvasMouseHandler(e, this._currentScene);
        });
        this._canvas.addEventListener("click", (e: MouseEvent) => {
            canvasClickListener(e, this._currentScene);
        });
    }

    drawScene(sceneName: string): void {
        const scene: Scene = this._scenes.get(sceneName);

        scene.draw(this._context);
    }

    addScene(scene: Scene): void {
        if (scene.isMain) {
            const scenes: Array<Scene> = [];
            this._scenes.forEach((_scene: Scene) => scenes.push(_scene));

            const hasMain = scenes.some((_scene: Scene) => _scene.isMain);

            if (hasMain) {
                throw new Error("Game already has main scene");
            }

            this._currentScene = scene;
        }

        this._scenes.set(scene.name, scene);
    }

    startProcess(): void {
        if (this._scenes.size <= 0) {
            throw new Error('No scened were added to Game');
        }

        if (this._currentScene === undefined) {
            this._currentScene = this._scenes.values().next().value;
        }

        window.requestAnimationFrame((time: number) => {
            this._currentScene.clear(this._context, this._width, this._height);
            this._currentScene.update(time);
            this._currentScene.draw(this._context);

            this.startProcess();
        });
    }

    set width(width: number) {
        this._width = width;
    }

    get width(): number {
        return this._width;
    }

    set height(height: number) {
        this._height = height;
    }

    get height(): number {
        return this._height;
    }

    get context(): CanvasRenderingContext2D {
        return this._context;
    }
}

export default Game;
