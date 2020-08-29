import Entity from "./Entity";
import Rect from "./Rect";
import {EntityLike} from "./types";

type SceneOptions = {
    name: string;
    isMain?: boolean;
}

const SceneDefaultOptions: SceneOptions = {
    name: "Default Scene",
    isMain: false,
};

export default class Scene {
    private readonly _name: string;
    private readonly _isMain: boolean;
    private readonly _entities: Array<EntityLike>;

    constructor(options: SceneOptions = SceneDefaultOptions) {
        this._name = options.name;
        this._isMain = options.isMain;
        this._entities = new Array<EntityLike>();
    }

    clear(context: CanvasRenderingContext2D, w: number, h: number): void {
        context.clearRect(0, 0, w, h);
    }


    getEntityOnCoordinates(x: number, y: number): Entity {
        return this._entities.find(entity => entity.isOnCoordinates(x, y));
    }

    update(time: number): void {
        this._entities.forEach(entity => entity.update(time));
    }

    draw(context: CanvasRenderingContext2D): void {
        context.beginPath();

        this._entities.forEach(entity => entity.draw(context));

        context.closePath();
    }

    addEntity(entity: EntityLike): void {
        this._entities.push(entity);
    }

    get name(): string {
        return this._name;
    }

    get isMain(): boolean {
        return this._isMain;
    }

    get entities(): Array<EntityLike> {
        return this._entities;
    }
}
