import Entity, {EntityOptions} from "./Entity";
import ColorfulEntity from "./ColorfulEntity";
import Helpers from "./Helpers";

interface RectInterface extends EntityInterface {
    resize(w: number, h: number, steps: number): void;
}

type RectOptions = EntityOptions & {
    w: number,
    h: number,
};

const DefaultRectOptions: RectOptions = {
    x: 100,
    y: 100,
    w: 60,
    h: 40,
};

export default class Rect extends Entity implements RectInterface {
    private _w: number;
    private _h: number;
    private _deltaW: number;
    private _deltaH: number;
    private _finalW: number;
    private _finalH: number;

    constructor(options: RectOptions = DefaultRectOptions) {
        super(options);

        this._w = options.w;
        this._h = options.h;
        this._deltaW = 0;
        this._deltaH = 0;
        this._finalW = -1;
        this._finalH = -1;
    }

    resize(w: number, h: number): void {
        this._deltaW = (w - this._w) / 60;
        this._deltaH = (h - this._h) / 60;
        this._finalW = this._w + w;
        this._finalH = this._h + h;

        console.log(this._finalW, this._finalH);
    }

    isOnCoordinates(x: number, y: number): boolean {
        const maxX = this._x + this._w;
        const maxY = this._y + this._h;

        return this._x < x && x < maxX && this._y < y && y < maxY;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    update(time: number): void {
        super.update(time);
        if ((this._deltaH < 0 && this._h > this._finalH) ||
            (this._deltaH > 0 && this._h < this._finalH)) {
            this._h += this._deltaH;
        }
        if ((this._deltaW < 0 && this._w > this._finalW) ||
            (this._deltaW > 0 && this._w < this._finalW)) {
            this._w += this._deltaW;

        }

        console.log(this._w, this._h);
    }

    draw(context: CanvasRenderingContext2D): void {
        context.beginPath();

        // @ts-ignore
        context.fillStyle = this._color;

        // @ts-ignore
        if (this._isColorRandomized) {
            const [r, g, b] = [
                Math.random() * 255,
                Math.random() * 255,
                Math.random() * 255,
            ];

            context.fillStyle = `rgba(${r}, ${g}, ${b}, 1)`;
        }
        context.rect(this._x, this._y, this._w, this._h);
        context.fill();

        context.closePath();
    }

    set w(value: number) {
        this._w = value;
    }

    get w(): number {
        return this._w;
    }

    set h(value: number) {
        this._h = value;
    }

    get h(): number {
        return this._h;
    }
}

Helpers.applyMixin(Rect, [ColorfulEntity]);
