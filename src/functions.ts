import Scene from "./Scene";
import {COLORS} from "./Colors";
import Rect from "./Rect";
import {EntityLike} from "./types";

export const globalErrorHandler: OnErrorEventHandlerNonNull =
    (
        _msg: Event | string,
        _url: string | undefined,
        _line: number | undefined,
        _col: number | undefined,
        error: Error | undefined
    ) => {
        const overlay: HTMLDivElement = document.createElement('div');
        overlay.style.background = `rgba(21, 21, 21, 0.7)`;
        overlay.style.position = 'fixed';
        overlay.style.width = '100%';
        overlay.style.height = '100%';
        overlay.style.height = '100';
        overlay.style.boxSizing = 'border-box';
        overlay.style.padding = '24px';
        overlay.style.display = 'flex';
        overlay.style.flexDirection = 'column';

        const errorTitle = document.createElement('h1');
        errorTitle.style.fontFamily = `"Roboto", "Arial", sans-serif`;
        errorTitle.style.color = `rgba(255, 134, 134, 1)`;
        errorTitle.append("Error occurred");

        const errorText = document.createElement('p');
        errorText.style.fontFamily = `"Roboto", "Arial", sans-serif`;
        errorText.style.fontSize = `1.5em`;
        errorText.style.color = `rgba(255, 255, 255, 1)`;
        errorText.append(error.message);

        overlay.append(errorTitle);
        overlay.append(errorText);

        document.body.prepend(overlay);
    };

export const canvasMouseHandler = (event: MouseEvent, scene: Scene): void => {
    const {clientX: x, clientY: y} = event;

    const e = scene.getEntityOnCoordinates(x, y) as EntityLike;

    if (e) {
        e.color = COLORS.GREEN;
        document.getElementById("main_canvas").style.cursor = "pointer";
    } else {
        scene.entities.forEach(entity => entity.color = COLORS.RED);
        document.getElementById("main_canvas").style.cursor = "default";
    }
};

export const canvasClickListener = (event: MouseEvent, scene: Scene): void => {
    const {clientX: x, clientY: y} = event;

    const e = scene.getEntityOnCoordinates(x, y) as EntityLike;


    if (e) {
        e.isColorRandomized = !e.isColorRandomized;
    }
};
