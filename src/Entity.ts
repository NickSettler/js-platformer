import {COLORS} from "./Colors";

export interface EntityInterface {
    move(x: number, y: number): void;

    isOnCoordinates(x: number, y: number): boolean;

    update(time: number): void;

    draw(context: CanvasRenderingContext2D): void;
}

export type EntityOptions = {
    x: number;
    y: number;
}

const DefaultEntityOptions: EntityOptions = {
    x: 0,
    y: 0,
};

export default class Entity implements EntityInterface {
    protected _x: number;
    protected _y: number;
    private _deltaX: number;
    private _deltaY: number;
    private _finalX: number;
    private _finalY: number;

    constructor(options: EntityOptions = DefaultEntityOptions) {
        this._x = options.x;
        this._y = options.y;
    }

    move(x: number, y: number, speed = 5): void {
        this._deltaX = speed;
        this._deltaY = speed;
        this._finalX = x;
        this._finalY = y;
    }

    isOnCoordinates(x: number, y: number): boolean {
        return this._x === x && this._x === y;
    }

    update(time: number): void {
        console.log(time);

        if (this._x < this._finalX || this._y < this._finalY) {
            console.log(this._x);
            this._x += this._deltaX;
            this._y += this._deltaY;
        }
    }

    draw(context: CanvasRenderingContext2D): void {
        context.beginPath();

        const [r, g, b] = [
            Math.random() * 255,
            Math.random() * 255,
            Math.random() * 255,
        ];

        context.fillStyle = `rgba(${r}, ${g}, ${b}, 1)`;
        context.arc(this._x, this._y, 1, 0, Math.PI * 2);
        context.fill();

        context.closePath();
    }

    set x(x: number) {
        this._x = x;
    }

    get x(): number {
        return this._x;
    }

    set y(y: number) {
        this._y = y;
    }

    get y(): number {
        return this._y;
    }
}
