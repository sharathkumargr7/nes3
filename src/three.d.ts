declare module 'three/examples/jsm/controls/OrbitControls' {
    import { Camera, EventDispatcher, MOUSE, Vector2 } from 'three';

    export interface OrbitControls extends EventDispatcher {
        object: Camera;
        domElement: HTMLElement;

        // Methods
        getPolarAngle(): number;
        getAzimuthalAngle(): number;
        saveState(): void;
        reset(): void;
        update(): void;

        // Properties
        enabled: boolean;
        target: Vector2;
        minDistance: number;
        maxDistance: number;
        minPolarAngle: number;
        maxPolarAngle: number;
        minAzimuthAngle: number;
        maxAzimuthAngle: number;
        enableDamping: boolean;
        dampingFactor: number;
        enableZoom: boolean;
        zoomSpeed: number;
        enableRotate: boolean;
        rotateSpeed: number;
        enablePan: boolean;
        panSpeed: number;
        screenSpacePanning: boolean;
        mouseButtons: {
            LEFT: MOUSE;
            MIDDLE: MOUSE;
            RIGHT: MOUSE;
        };
    }

    export function OrbitControls(camera: Camera, domElement: HTMLElement): OrbitControls;
}
