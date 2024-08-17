'use client'
import html2canvas from "html2canvas";
import Image from "next/image";
import { useState } from "react";
import { HexColorInput, HexColorPicker } from 'react-colorful';

export default function PixelArt() {
  const [collums, setCollums] = useState(336);
  const [selectedColor, setSelectedColor] = useState('#ffffff');
  const [border, setBorder] = useState(true);
  const [pixels, setPixels] = useState(Array(collums).fill('#ffffff'));
  const [pickingColor, setPickingColor] = useState(false); // Novo estado para controle de seleção de cor
  const [pickedColor, setPickedColor] = useState(''); // Novo estado para armazenar a cor selecionada

  const colorOptions: string[] = [
    "#E53935",
    "#FDD835",
    "#43A047",
    "#1E88E5",
    "#5E35B1",
    "#0e3c0b",
    "#ffffff",
    "#000000",
  ];

  const WHITE: string = "#ffffff"

  interface ISizeConfig {
    size: string;
    numberOfCollums: string;
  }

  const GRID_PEQUENO = 336
  const GRID_MEDIO = 1581
  const GRID_GRANDE = 5555

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
        numberOfCollums: 'grid-cols-51 min-w-[1020px]',
      };
    }

    if (collums === 336) {
      return {
        size: 'w-5 h-5',
        numberOfCollums: 'grid-cols-21 min-w-[420px]',
      };
    }
    else
      return {
        size: 'w-3 h-3',
        numberOfCollums: 'grid-cols-101 min-w-[1212px]',
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

  function startPickingColor() {
    setPickingColor(true);
  }

  function handleClickPixel(index: number) {
    if (pickingColor) {
      setPickedColor(pixels[index]);
      setSelectedColor(pixels[index]);
      setPickingColor(false);
    } else {
      handleSinglePixel(index);
    }
  }

  function getTextColor() {
    let atualcolor = selectedColor
    const parse = atualcolor.replace('#', '');
    const r = parseInt(parse.substring(0, 2), 16);
    const g = parseInt(parse.substring(2, 4), 16);
    const b = parseInt(parse.substring(4, 6), 16);
    const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    const result = luminance > 128 ? 'text-black' : 'text-white';
    console.log(result)

    return result
  }

  return (
    <div className="w-full h-screen bg-[#2e2e2e]">
      <div className="flex items-center justify-center w-screen h-screen">
        <div className="grid grid-cols-1 gap-2 min-w-[150px]">
          <button
            onClick={captureScreenshot}
            className="text-white rounded-lg border border-green-700 bg-green-500 hover:bg-green-600
             focus:outline-none focus:ring-2 focus:ring-green-300 transition duration-200 px-4 py-2"
          >
            Salvar
          </button>

          <button
            onClick={() => { handleCollums(GRID_PEQUENO); setPixels(Array(GRID_PEQUENO).fill(WHITE)); }}
            className="rounded-lg border border-gray-700 bg-yellow-200 text-black hover:bg-yellow-300 focus:outline-none
             focus:ring-2 focus:ring-yellow-100 transition duration-200 px-4 py-2"
          >
            Pequeno
          </button>
          <button
            onClick={() => { handleCollums(GRID_MEDIO); setPixels(Array(GRID_MEDIO).fill(WHITE)); }}
            className="rounded-lg border border-gray-700 bg-yellow-200 text-black hover:bg-yellow-300 focus:outline-none
             focus:ring-2 focus:ring-yellow-100 transition duration-200 px-4 py-2"
          >
            Médio
          </button>
          <button
            onClick={() => { handleCollums(GRID_GRANDE); setPixels(Array(GRID_GRANDE).fill(WHITE)); }}
            className="rounded-lg border border-gray-700 bg-yellow-200 text-black hover:bg-yellow-300 focus:outline-none focus:ring-2
             focus:ring-yellow-100 transition duration-200 px-4 py-2"
          >
            Grande
          </button>
          <button
            onClick={() => { setPixels(Array(collums).fill(selectedColor)); }}
            className="text-white rounded-lg border border-gray-700 bg-red-600 hover:bg-red-700 focus:outline-none
             focus:ring-2 focus:ring-red-300 transition duration-200 px-4 py-2"
          >
            Limpar
          </button>
        </div>
        <div
          className={`grid ${handleSize().numberOfCollums} gap-0 p-5 max-w-[80vw] max-h-[90vh] overflow-auto`}
          id="pixel-art-canvas"
        >
          {pixels.map((color, index) => (
            <div
              key={index}
              className={`${handleSize().size} ${border ? 'border-0.5 border-gray-600' : ''} border-blue-300 gap-0`}
              style={{ backgroundColor: color }}
              onClick={() => handleClickPixel(index)}
            ></div>
          ))}
        </div>
        <div className="flex flex-col items-center justify-start bg-gray-200 rounded-lg shadow-md border-2 p-3">
          <HexColorPicker color={selectedColor} onChange={setSelectedColor} />
          <HexColorInput color={selectedColor} onChange={setSelectedColor} placeholder="Type a color" prefixed alpha className={`max-w-[100px]
             mt-2 rounded-lg border-1 shadow-md shadow-gray-500 border-black text-center ${getTextColor()}`} style={{ backgroundColor: selectedColor }} />
          <div className="flex flex-col justify-center items-center align-middle gap-2 mt-5 mb-5">
            <Image
              src="/contagotas.svg"
              alt="Selecionar Cor"
              onClick={startPickingColor}
              className={`w-10 h-10 flexcursor-pointer shadow-lg shadow-gray-500 p-1 rounded-lg transition-transform duration-200 
                ${pickingColor ? 'scale-110 bg-gray-500 rounded-full' : 'scale-100'}`}
              width={0}
              height={0}
            />
            <button
              onClick={() => { handleBorder(border); }}
              className="text-white rounded-lg border border-gray-700 bg-blue-500 hover:bg-blue-600 focus:outline-none 
              focus:ring-2 focus:ring-blue-300 transition duration-200 px-4 py-2 mt-5 w-[100px]"
            >
              {border ? "Grid" : "Grid"}
            </button>
            {/* <div
              style={{ backgroundColor: selectedColor }}
              className="w-10 h-10 border border-gray-700 rounded-full"
            ></div> */}
          </div>
          <div className="grid grid-cols-2 gap-2 w-[100px]">
            {colorOptions.map((color, index) => (
              <button
                key={index}
                className="w-10 h-10 rounded-full border border-gray-300 shadow-md hover:shadow-gray-500 focus:outline-none 
                focus:ring-2 focus:ring-gray-300 transition-all duration-150"
                style={{ backgroundColor: color }}
                onClick={() => handleColor(color)}
              ></button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
