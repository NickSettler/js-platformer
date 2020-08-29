import {COLORS} from "./Colors";
import {EntityOptions} from "./Entity";

type ColorfulEntityOptions = {
    color?: COLORS | string;
    isColorRandomized?: boolean;
}

const DefaultColorfulEntityOptions: ColorfulEntityOptions = {
    isColorRandomized: false,
};

export default class ColorfulEntity {
    protected _color: string;
    protected _isColorRandomized: boolean;

    constructor(options: ColorfulEntityOptions = DefaultColorfulEntityOptions) {
        this._color = options.color;
        this._isColorRandomized = options.isColorRandomized;
    }

    set color(color: COLORS | string) {
        this._color = color;
    }

    get color(): string {
        return this._color;
    }

    set isColorRandomized(isRandom: boolean){
        this._isColorRandomized = isRandom;
    }

    get isColorRandomized(): boolean {
        return this._isColorRandomized;
    }
}
