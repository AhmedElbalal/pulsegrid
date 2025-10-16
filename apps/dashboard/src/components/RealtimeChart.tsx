// apps/dashboard/src/components/RealtimeChart.tsx
import React, { useState, useRef, useEffect } from "react";
import { Line } from "react-chartjs-2";
import * as THREE from 'three';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

interface Point {
  ts: number;
  count: number;
}

interface RealtimeChartProps {
  points: Point[];
}

const RealtimeChart: React.FC<RealtimeChartProps> = ({ points }) => {
  const [is3D, setIs3D] = useState(false);
  const threeContainerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const barsRef = useRef<THREE.Mesh[]>([]);

  // 2D Chart Data (your existing code)
  const data = {
    labels: points.map((p) =>
      new Date(p.ts).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })
    ),
    datasets: [
      {
        label: "Events per Tick",
        data: points.map((p) => p.count),
        borderColor: "#38bdf8",
        backgroundColor: "rgba(56,189,248,0.2)",
        tension: 0.3,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
    },
    scales: {
      x: { grid: { color: "#1e293b" } },
      y: { grid: { color: "#1e293b" } },
    },
  };

  // 3D Chart Setup
  useEffect(() => {
    if (!is3D || !threeContainerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0f172a);
    const camera = new THREE.PerspectiveCamera(75, 2, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    
    renderer.setSize(400, 200);
    threeContainerRef.current.innerHTML = '';
    threeContainerRef.current.appendChild(renderer.domElement);

    sceneRef.current = scene;
    rendererRef.current = renderer;
    cameraRef.current = camera;

    // Add lights
    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    camera.position.z = 8;
    camera.position.y = 3;
    camera.lookAt(0, 0, 0);

    // Animation
    const animate = () => {
      if (!is3D) return;
      
      requestAnimationFrame(animate);
      
      // Rotate slowly for 3D effect
      scene.rotation.y += 0.005;
      
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
    };
  }, [is3D]);

  // Update 3D bars when data changes
  useEffect(() => {
    if (!is3D || !sceneRef.current || points.length === 0) return;

    // Clear existing bars
    barsRef.current.forEach(bar => sceneRef.current!.remove(bar));
    barsRef.current = [];

    // Create 3D bars from real-time data
    points.forEach((point, index) => {
      const height = (point.count / Math.max(...points.map(p => p.count))) * 3;
      const geometry = new THREE.BoxGeometry(0.3, height, 0.3);
      const material = new THREE.MeshPhongMaterial({ 
        color: new THREE.Color(`hsl(${(index * 360) / points.length}, 70%, 50%)`),
        shininess: 100
      });
      
      const bar = new THREE.Mesh(geometry, material);
      bar.position.set(
        (index - points.length / 2) * 0.5,
        height / 2,
        0
      );
      
      sceneRef.current!.add(bar);
      barsRef.current.push(bar);
    });
  }, [points, is3D]);

  if (!points.length) {
    return <p style={{ color: "#94a3b8" }}>Waiting for data...</p>;
  }

  return (
    <div style={{ background: "#0f172a", padding: 12, borderRadius: 8 }}>
      {/* 3D Toggle Button */}
      <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 style={{ color: "#38bdf8", margin: 0 }}>Real-time Events</h3>
        <button
          onClick={() => setIs3D(!is3D)}
          style={{
            padding: '8px 16px',
            background: is3D ? '#38bdf8' : '#334155',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          {is3D ? '2D View' : '3D View'}
        </button>
      </div>

      {/* Chart Container */}
      {is3D ? (
        <div 
          ref={threeContainerRef} 
          style={{ 
            width: '100%', 
            height: '200px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        />
      ) : (
        <Line data={data} options={options} />
      )}
    </div>
  );
};

export default RealtimeChart;