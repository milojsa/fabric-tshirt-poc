import { useRef, useState, useEffect } from 'react'
import * as fabric from 'fabric'
import useStore from './store/useStore'
import { generateTShirtPath } from './canvas/TShirtPath'
import './App.css'

function App() {
  const canvasRef = useRef(null);
  const fabricRef = useRef(null)
  const tshirtRef = useRef(null);
  const { measurements, setChest } = useStore();

  useEffect(()=> {
    const canvas = new fabric.Canvas(canvasRef.current, {
      width: 400,
      height:300,
      backgroundColor: '#f5f5f5',
    })
    fabricRef.current = canvas

    const pathString = generateTShirtPath(measurements.chest);
    const tshirt = new fabric.Path(pathString, {
      fill: '#3498db',
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

      <canvas ref={canvasRef} />

      <div className="json-output">
        <h3>JSON State (Freesewing Brian compatible)</h3>
        <pre>{JSON.stringify({ measurements }, null, 2)}</pre>
      </div>
    </div>
  )
}

export default App
