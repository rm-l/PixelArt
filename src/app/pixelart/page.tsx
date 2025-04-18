"use client";
import html2canvas from "html2canvas";
import Image from "next/image";
import { useEffect, useState } from "react";
import { HexColorInput, HexColorPicker } from "react-colorful";

const GRID_CONFIG = {
  small: { pixels: 336, cols: 21, pixelSize: 20 },
  medium: { pixels: 1581, cols: 51, pixelSize: 10 },
  large: { pixels: 5555, cols: 101, pixelSize: 5 },
};

export default function PixelArt() {
  const [gridSize, setGridSize] = useState<"small" | "medium" | "large">(
    "small"
  );
  const [selectedColor, setSelectedColor] = useState("#000000");
  const [pixels, setPixels] = useState<string[]>([]);
  const [showBorder, setShowBorder] = useState(true);
  const [zoom, setZoom] = useState(1);
  const [isColorPickerActive, setIsColorPickerActive] = useState(false);

  const config = GRID_CONFIG[gridSize];
  const rows = Math.ceil(config.pixels / config.cols);

  const colorOptions = [
    "#E53935",
    "#FDD835",
    "#43A047",
    "#1E88E5",
    "#5E35B1",
    "#0e3c0b",
    "#ffffff",
    "#000000",
  ];

  useEffect(() => {
    setPixels(Array(config.pixels).fill("#ffffff"));
  }, [gridSize]);

  const handlePixelClick = (index: number) => {
    if (isColorPickerActive) {
      setSelectedColor(pixels[index]);
      setIsColorPickerActive(false);
      return;
    }

    const newPixels = [...pixels];
    newPixels[index] = selectedColor;
    setPixels(newPixels);
  };

  const resetGrid = () => {
    setPixels(Array(config.pixels).fill("#ffffff"));
  };

  const captureScreenshot = () => {
    const element = document.getElementById("pixel-art-canvas");
    if (element) {
      html2canvas(element).then((canvas) => {
        const link = document.createElement("a");
        link.href = canvas.toDataURL("image/png");
        link.download = "pixel-art.png";
        link.click();
      });
    }
  };

  const getTextColor = () => {
    const hex = selectedColor.replace("#", "");
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    return r * 0.299 + g * 0.587 + b * 0.114 > 186
      ? "text-black"
      : "text-white";
  };

  return (
    <div className="flex flex-col h-screen bg-gray-800 p-1 sm:p-2 md:p-4">
      <div className="flex flex-col sm:flex-row sm:justify-between mb-1 sm:mb-2 md:mb-4 gap-1 sm:gap-2">
        <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-white text-center sm:text-left">
          Pixel Art Editor
        </h1>
        <div className="flex justify-center gap-1 sm:gap-2">
          <button
            onClick={() => setZoom(Math.min(2, zoom + 0.1))}
            className="px-2 py-1 bg-blue-600 text-white rounded text-xs sm:text-sm md:text-base"
          >
            +
          </button>
          <button
            onClick={() => setZoom(Math.max(0.5, zoom - 0.1))}
            className="px-2 py-1 bg-blue-600 text-white rounded text-xs sm:text-sm md:text-base"
          >
            -
          </button>
        </div>
      </div>
      <div className="flex flex-col md:flex-row flex-1 gap-1 sm:gap-2 md:gap-4">
        <div className="w-full md:w-48 lg:w-64 bg-gray-700 p-1 sm:p-2 md:p-4 rounded-lg flex flex-row md:flex-col gap-1 sm:gap-2 md:gap-4 overflow-x-auto md:overflow-x-visible">
          <div className="flex flex-col gap-1 sm:gap-2 min-w-[150px] sm:min-w-[180px] md:min-w-0">
            <HexColorPicker
              color={selectedColor}
              onChange={setSelectedColor}
              className="!w-[100px] !h-[100px] sm:!w-[120px] sm:!h-[120px] md:!w-full md:!h-[160px]"
            />

            <HexColorInput
              color={selectedColor}
              onChange={setSelectedColor}
              className={`p-1 sm:p-2 rounded text-xs sm:text-sm md:text-base ${getTextColor()}`}
              style={{ backgroundColor: selectedColor }}
            />
          </div>

          <div className="grid grid-cols-4 gap-1 min-w-[80px] sm:min-w-[100px]">
            {colorOptions.map((color) => (
              <button
                key={color}
                style={{ backgroundColor: color }}
                className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 rounded border border-gray-300"
                onClick={() => setSelectedColor(color)}
              />
            ))}
          </div>
          <div className="flex flex-row md:flex-col gap-1 sm:gap-2 min-w-[100px] sm:min-w-[120px] md:min-w-0">
            <button
              onClick={() => setIsColorPickerActive(!isColorPickerActive)}
              className={`p-1 sm:p-2 ${
                isColorPickerActive ? "bg-blue-600" : "bg-gray-600"
              } text-white rounded flex items-center justify-center`}
              title="Conta-gotas"
            >
              <Image
                src="/contagotas.svg"
                alt="Conta-gotas"
                width={16}
                height={16}
                className="filter invert"
              />
              <span className="sr-only">Conta-gotas</span>
            </button>

            <button
              onClick={() => setShowBorder(!showBorder)}
              className="p-1 sm:p-2 bg-gray-600 text-white rounded text-xs"
            >
              {showBorder ? "Remover Grid" : "Adcionar Grid"}
            </button>
            <button
              onClick={resetGrid}
              className="p-1 sm:p-2 bg-red-600 text-white rounded text-xs"
            >
              Limpar
            </button>
            <button
              onClick={captureScreenshot}
              className="p-1 sm:p-2 bg-green-600 text-white rounded text-xs"
            >
              Salvar
            </button>
          </div>

          <div className="flex flex-row md:flex-col gap-1 sm:gap-2 min-w-[120px] sm:min-w-[140px] md:min-w-0">
            <h3 className="hidden md:block text-white text-sm md:text-base">
              Tamanho:
            </h3>
            {(["small", "medium", "large"] as const).map((size) => (
              <button
                key={size}
                onClick={() => setGridSize(size)}
                className={`p-1 rounded text-xs ${
                  gridSize === size ? "bg-blue-600" : "bg-gray-600"
                } text-white`}
              >
                {size === "small" && "Pequeno"}
                {size === "medium" && "Médio"}
                {size === "large" && "Grande"}
              </button>
            ))}
          </div>
        </div>
        <div className="flex-1 bg-gray-900 rounded-lg p-1 sm:p-2 md:p-4 flex items-center justify-center overflow-auto">
          <div
            id="pixel-art-canvas"
            className="bg-white shadow-lg mx-auto"
            style={{
              maxWidth: "100%",
              overflow: "auto",
            }}
          >
            <div
              className="grid"
              style={{
                gridTemplateColumns: `repeat(${config.cols}, ${
                  config.pixelSize * zoom
                }px)`,
              }}
            >
              {pixels.map((color, index) => (
                <div
                  key={index}
                  style={{
                    width: `${config.pixelSize * zoom}px`,
                    height: `${config.pixelSize * zoom}px`,
                    backgroundColor: color,
                    border: showBorder ? "1px solid rgba(0,0,0,0.05)" : "none",
                  }}
                  onClick={() => handlePixelClick(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
