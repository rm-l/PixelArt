'use client'
import html2canvas from "html2canvas";
import { useState } from "react";

export default function PixelArt() {
  const [collums, setCollums] = useState(110);
  const [selectedColor, setSelectedColor] = useState('#ffffff');
  const [border, setBorder] = useState(true);
  const [pixels, setPixels] = useState(Array(collums).fill('#ffffff'));

  const colorOptions: string[] = [
    "#E53935",
    "#ff7777",
    "#FDD835",
    "#43A047",
    "#1E88E5",
    "#ffffff",
    "#D81B60",
    "#01b7a7",
    "#FF7043",
    "#5E35B1",
    "#0e3c0b",
    "#000000",
  ];

  interface ISizeConfig {
    size: string;
    numberOfCollums: string;
  }

  const GRID_PEQUENO = 336
  const GRID_MEDIO = 1581
  const GRID_GRANDE = 5151

  function handleColor(value: string): void {
    setSelectedColor(value);
  }

  function handleSinglePixel(index: number): void {
    const newPixels = [...pixels];
    newPixels[index] = selectedColor;
    setPixels(newPixels);
  }

  function handleBorder(border: boolean): void {
    setBorder(!border);
  }

  function handleCollums(collums: number): void {
    setCollums(collums);
  }

  function handleSize(): ISizeConfig {
    if (collums === 1581) {
      return {
        size: 'w-5 h-5',
        numberOfCollums: 'grid-cols-51',
      };
    }

    if (collums === 336) {
      return {
        size: 'w-5 h-5',
        numberOfCollums: 'grid-cols-21',
      };
    }
    else
      return {
        size: 'w-3 h-3',
        numberOfCollums: 'grid-cols-101',
      };
  }

  function captureScreenshot() {
    const element = document.getElementById('pixel-art-canvas');
    if (element) {
      html2canvas(element).then((canvas) => {
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = 'pixel-art.png';
        link.click();
      });
    }
  }

  return (
    <div className="flex items-center justify-center bg-slate-400 p-10 rounded-lg shadow-lg w-full h-screen">
      <div className="grid grid-cols-1 gap-2 min-w-[150px]">
        <button
          onClick={() => { handleBorder(border); }}
          className="text-white rounded-lg border border-gray-700 bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-200 px-4 py-2"
        >
          {border ? "Bordas" : "Bordas"}
        </button>
        <button
          onClick={captureScreenshot}
          className="text-white rounded-lg border border-gray-700 bg-purple-500 hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-300 transition duration-200 px-4 py-2"
        >
          Salvar
        </button>
        <button
          onClick={() => { handleCollums(GRID_PEQUENO); setPixels(Array(GRID_PEQUENO).fill(selectedColor)); }}
          className="rounded-lg border border-gray-700 bg-yellow-200 text-black hover:bg-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-100 transition duration-200 px-4 py-2"
        >
          Pequeno
        </button>
        <button
          onClick={() => { handleCollums(GRID_MEDIO); setPixels(Array(GRID_MEDIO).fill(selectedColor)); }}
          className="rounded-lg border border-gray-700 bg-yellow-200 text-black hover:bg-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-100 transition duration-200 px-4 py-2"
        >
          Médio
        </button>
        <button
          onClick={() => { handleCollums(GRID_GRANDE); setPixels(Array(GRID_GRANDE).fill(selectedColor)); }}
          className="rounded-lg border border-gray-700 bg-yellow-200 text-black hover:bg-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-100 transition duration-200 px-4 py-2"
        >
          Grande
        </button>
        <button
          onClick={() => { setPixels(Array(collums).fill(selectedColor)); }}
          className="text-white rounded-lg border border-gray-700 bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-300 transition duration-200 px-4 py-2"
        >
          Limpar
        </button>
      </div>

      <div
        className={`grid ${handleSize().numberOfCollums} gap-0 min-w-max p-5`}
        id="pixel-art-canvas"
      >
        {pixels.map((color, index) => (
          <div
            key={index}
            className={`${handleSize().size} ${border ? 'border-2' : ''} border-blue-300 gap-0`}
            style={{ backgroundColor: color }}
            onClick={() => handleSinglePixel(index)}
          ></div>
        ))}
      </div>
      <div className="flex flex-col items-center justify-start bg-gray-200 rounded-lg shadow-md border-2 p-3">
        <input
          type="color"
          value={selectedColor}
          onChange={(e) => handleColor(e.target.value)}
          className="w-20 h-10 border border-gray-700 rounded-lg mt-5 mb-7"
        />
        <div className="grid grid-cols-2 gap-2 w-[100px]">
          {colorOptions.map((color, index) => (
            <button
              key={index}
              className="w-10 h-10 rounded-full border border-gray-300 shadow-md hover:shadow-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-all duration-150"
              style={{ backgroundColor: color }}
              onClick={() => handleColor(color)}
            ></button>
          ))}
        </div>
      </div>
    </div>
  );
}
