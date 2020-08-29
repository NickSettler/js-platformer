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

    move(x: number, y: number): void {
        this._deltaX = (x - this._x) / 60;
        this._deltaY = (y - this._y) / 60;
        this._finalX = x;
        this._finalY = y;
    }

    isOnCoordinates(x: number, y: number): boolean {
        return this._x === x && this._x === y;
    }

    update(_time?: number): void {
        if ((this._deltaX < 0 && this._x > this._finalX) ||
            (this._deltaX > 0 && this._x < this._finalX)) {
            this._x += this._deltaX;
        }
        if ((this._deltaY < 0 && this._y > this._finalY) ||
            (this._deltaY > 0 && this._y < this._finalY)) {
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
