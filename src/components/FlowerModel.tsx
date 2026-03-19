import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

export default function FlowerModel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const modelRef = useRef<THREE.Group | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 1.2;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true
    });

    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    containerRef.current.appendChild(renderer.domElement);

    // luces
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 10, 7);
    scene.add(directionalLight);

    const pinkLight = new THREE.PointLight(0xff99cc, 1);
    pinkLight.position.set(-3, 2, 3);
    scene.add(pinkLight);

    // cargar modelo
    const loader = new GLTFLoader();

    loader.load(
      `${import.meta.env.BASE_URL}scene.gltf`,
      (gltf) => {
        const model = gltf.scene;

        model.scale.set(5, 5, 5);
        model.position.set(0, -2.4, 0);

        model.traverse((child: any) => {
          if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
            // Asegurar que las texturas se carguen correctamente
            if (child.material && child.material.map) {
              child.material.map.needsUpdate = true;
            }
          }
        });

        // Evitar agregar el modelo dos veces
        if (!scene.children.includes(model)) {
          scene.add(model);
        }

        modelRef.current = model;
      },
      undefined,
      (error) => {
        console.error("Error loading model:", error);
      }
    );

    // partículas (pétalos flotando)
    const particleCount = 120;

    const positions = new Float32Array(particleCount * 3);
   for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 3;
      positions[i * 3 + 1] = Math.random() * 1.5 -0.8;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 3;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    // Cargar textura de corazón para las partículas
    const heartTexture = new THREE.TextureLoader().load(`${import.meta.env.BASE_URL}heart.png`);
    const material = new THREE.PointsMaterial({
      size: 0.08,
      map: heartTexture,
      transparent: true,
      alphaTest: 0.5,
      color: 0xff66aa
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    particlesRef.current = particles;

    // click para acercar la flor
    let zoomed = false;

    renderer.domElement.addEventListener("click", () => {
      zoomed = !zoomed;

      if (zoomed) {
        camera.position.z = 0.6;
      } else {
        camera.position.z = 1.2;
      }
    });

    // animación
    const animate = () => {
      requestAnimationFrame(animate);

      if (modelRef.current) {
        modelRef.current.rotation.y += 0.004;
      }

      if (particlesRef.current) {
        particlesRef.current.rotation.y += 0.0008;
      }

      renderer.render(scene, camera);
    };

    animate();

    // resize
    const handleResize = () => {
      if (!containerRef.current) return;

      const newWidth = containerRef.current.clientWidth;
      const newHeight = containerRef.current.clientHeight;

      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
    };
  }, []);

  return <div ref={containerRef} className="w-full h-full" />;
}