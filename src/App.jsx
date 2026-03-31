import { useRef, useState, useEffect } from 'react'
import * as fabric from 'fabric'
import useStore from './store/useStore'
import { generateTShirtPath } from './canvas/TShirtPath'
import './App.css'

// Natural color palette
const COLORS = [
  { name: 'White', hex: '#FFFFFF' },
  { name: 'Cream', hex: '#FFFDD0' },
  { name: 'Ivory', hex: '#FFFFF0' },
  { name: 'Beige', hex: '#F5F5DC' },
  { name: 'Sand', hex: '#C2B280' },
  { name: 'Khaki', hex: '#C3B091' },
  { name: 'Olive', hex: '#808000' },
  { name: 'Sage', hex: '#9DC183' },
  { name: 'Stone', hex: '#928E85' },
  { name: 'Charcoal', hex: '#36454F' },
  { name: 'Navy', hex: '#000080' },
  { name: 'Black', hex: '#1a1a1a' },
];

function App() {
  const canvasRef = useRef(null);
  const fabricRef = useRef(null)
  const tshirtRef = useRef(null);
  const { measurements, setChest, color, setColor } = useStore();

  useEffect(()=> {
    const canvas = new fabric.Canvas(canvasRef.current, {
      width: 400,
      height:300,
      backgroundColor: '#f5f5f5',
    })
    fabricRef.current = canvas

    const pathString = generateTShirtPath(measurements.chest);
    const tshirt = new fabric.Path(pathString, {
      fill: color,
      stroke: '#2c3e50',
      strokeWidth: 2,
      selectable: false,
    }, []);
    tshirtRef.current = tshirt;
    canvas.add(tshirt);
    canvas.renderAll();

    return () => canvas.dispose();
  })

  useEffect(() => {
    if (!fabricRef.current || !tshirtRef.current) return
    const newPath = generateTShirtPath(measurements.chest)

    requestAnimationFrame(() => {
      const pathData = fabric.util.parsePath(newPath);
      tshirtRef.current.set({ path: pathData });
      fabricRef.current.renderAll();
    })
  }, [measurements.chest])

  // Update T-shirt color
  useEffect(() => {
    if (!fabricRef.current || !tshirtRef.current) return
    requestAnimationFrame(() => {
      tshirtRef.current.set({ fill: color });
      fabricRef.current.renderAll();
    })
  }, [color])

  const handleSliderChange = (e) => {
    setChest(Number(e.target.value));
  };
  return (
    <div className="app">
      <h1>Parametric T-Shirt Builder</h1>
      
      <div className="controls">
        <label>
          Chest: <strong>{measurements.chest} cm</strong>
          <input
            type="range"
            min="80"
            max="130"
            value={measurements.chest}
            onChange={handleSliderChange}
          />
        </label>
      </div>

      <div className="canvas-area">
        <canvas ref={canvasRef} />
        
        <div className="color-panel">
          <h3>Colors</h3>
          <div className="color-grid">
            {COLORS.map((c) => (
              <button
                key={c.hex}
                className={`color-swatch ${color === c.hex ? 'active' : ''}`}
                style={{ backgroundColor: c.hex }}
                onClick={() => setColor(c.hex)}
                title={c.name}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="json-output">
        <h3>JSON State (Freesewing Brian compatible)</h3>
        <pre>{JSON.stringify({ measurements, color }, null, 2)}</pre>
      </div>
    </div>
  )
}

export default App
