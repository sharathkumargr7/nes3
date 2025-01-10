import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Camera, EventDispatcher, MOUSE, Vector2 } from 'three';


const GrowTent: React.FC = () => {
    const mountRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.shadowMap.enabled = true; // Enable shadows
        if (mountRef.current) {
            mountRef.current.appendChild(renderer.domElement);
        }

        // Create ground plane
        const groundGeometry = new THREE.PlaneGeometry(20, 20);
        const groundMaterial = new THREE.MeshStandardMaterial({ color: 0x654321 });
        const ground = new THREE.Mesh(groundGeometry, groundMaterial);
        ground.rotation.x = -Math.PI / 2; // Rotate to lay flat
        ground.receiveShadow = true;
        scene.add(ground);

        // Add lighting
        const ambientLight = new THREE.AmbientLight(0x404040); // Soft white light
        scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(5, 10, 7.5);
        directionalLight.castShadow = true;
        scene.add(directionalLight);

        // Create a realistic plant model
        const createPlant = () => {
            const plantGroup = new THREE.Group();

            // Create stem
            const stemGeometry = new THREE.CylinderGeometry(0.05, 0.05, 1, 8);
            const stemMaterial = new THREE.MeshStandardMaterial({ color: 0x8B4513 }); // Brown color for the stem
            const stem = new THREE.Mesh(stemGeometry, stemMaterial);
            stem.position.y = 0.5; // Position the stem above the ground
            plantGroup.add(stem);

            // Create branches
            const createBranch = (positionY: number) => {
                const branchGeometry = new THREE.CylinderGeometry(0.02, 0.02, 0.5, 8);
                const branchMaterial = new THREE.MeshStandardMaterial({ color: 0x8B4513 });
                const branch = new THREE.Mesh(branchGeometry, branchMaterial);
                branch.position.y = positionY; // Position the branch
                branch.rotation.z = Math.random() * Math.PI; // Random rotation
                return branch;
            };

            // Add branches to the plant
            for (let i = 0; i < 2; i++) {
                const branch = createBranch(0.5 + Math.random() * 0.5);
                plantGroup.add(branch);
            }

            // Create leaves
            const createLeaf = () => {
                const leafShape = new THREE.Shape();
                leafShape.moveTo(0, 0);
                leafShape.bezierCurveTo(0.1, 0.2, 0.1, 0.5, 0, 0.5);
                leafShape.bezierCurveTo(-0.1, 0.5, -0.1, 0.2, 0, 0); // Create a leaf shape

                const leafGeometry = new THREE.ExtrudeGeometry(leafShape, { depth: 0.01, bevelEnabled: false });
                const leafMaterial = new THREE.MeshStandardMaterial({ color: 0x228B22, side: THREE.DoubleSide }); // Green color for the leaves
                const leaf = new THREE.Mesh(leafGeometry, leafMaterial);

                // Position and rotate the leaf
                leaf.position.y = 1 + Math.random() * 0.5; // Position leaves above the stem
                leaf.rotation.z = Math.random() * Math.PI; // Random rotation for natural look
                leaf.rotation.y = Math.random() * Math.PI; // Random rotation for natural look

                return leaf;
            };

            // Create multiple leaves with variations
            for (let i = 0; i < 5; i++) {
                plantGroup.add(createLeaf());
            }

            // Create a base for the plant
            const baseGeometry = new THREE.CylinderGeometry(0.1, 0.1, 0.1, 8);
            const baseMaterial = new THREE.MeshStandardMaterial({ color: 0x8B4513 }); // Brown color for the base
            const base = new THREE.Mesh(baseGeometry, baseMaterial);
            base.position.y = 0; // Position at ground level
            plantGroup.add(base);

            // Randomize position
            plantGroup.position.set(Math.random() * 4 - 2, 0, Math.random() * 4 - 2);
            return plantGroup;
        };

        // Add multiple plants to the scene
        for (let i = 0; i < 10; i++) {
            scene.add(createPlant());
        }

        // Set camera position
        camera.position.z = 10;

        // Initialize OrbitControls
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
        controls.dampingFactor = 0.25;
        controls.screenSpacePanning = false; // Prevent panning out of the scene

        // Animation loop
        const animate = () => {
            requestAnimationFrame(animate);
            controls.update(); // Update controls
            renderer.render(scene, camera);
        };
        animate();

        // Cleanup on component unmount
        return () => {
            if (mountRef.current) {
                mountRef.current.removeChild(renderer.domElement);
            }
        };
    }, []);

    return <div ref={mountRef} />;
};

export default GrowTent;


declare module 'three/examples/jsm/controls/OrbitControls' {

    export class OrbitControls extends EventDispatcher {
        constructor(camera: Camera, domElement: HTMLElement);

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
}