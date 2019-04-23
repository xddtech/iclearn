declare namespace THREEX {
    export class TrackballControls {
        constructor(camera: any);

        rotateSpeed: number;
        zoomSpeed: number;
        panSpeed: number;
        noZoom: boolean;
        noPan: boolean;
        staticMoving: boolean;
        dynamicDampingFactor: number;

        keys: any;
        addEventListener: any;

        update(): void;
    }
}

declare module 'threex' {
    export = THREEX;
}