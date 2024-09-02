'use client'
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const MeuComponente = () => {
  const [isPortuguese, setIsPortuguese] = useState(false);
  const router = useRouter();

  const handleClick = () => {
    router.push('/pixelart');
  };

  const toggleLanguage = () => {
    setIsPortuguese(!isPortuguese);
  };

  return (
    <div className='h-screen w-full bg-gray-900 flex flex-col items-center justify-center'>
      <div className='gird'>
        <div className='flex justify-end'>
          <button
            type='button'
            className='bg-gray-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-gray-700 transition duration-300'
            onClick={toggleLanguage}
          >
            {isPortuguese ? 'English' : 'Português'}
          </button>
        </div>
        <div className='text-center bg-gray-800 text-gray-200 p-10 rounded-lg shadow-lg'>
          <h1 className='text-4xl font-bold mb-4'>
            {isPortuguese ? 'Olá! Bem-vindo ao projeto Pixel Art' : 'Hello! Welcome to the Pixel Art project'}
          </h1>
          <p className='text-xl mb-4'>
            {isPortuguese
              ? 'Esta é uma versão atualizada de um dos primeiros projetos que fiz durante meu curso na'
              : 'This is an updated version of one of the first projects I made during my course at'}{' '}
            <a
              href='https://www.betrybe.com/'
              target='_blank'
              rel='noopener noreferrer'
              className='text-blue-400 underline'
            >
              Trybe
            </a>
            .<br />
            {isPortuguese
              ? 'Refatorei o aplicativo para aplicar novas técnicas e funcionalidades.'
              : 'I refactored the app to apply new techniques and features.'}
          </p>
          <p className='text-lg mb-6'>
            {isPortuguese ? 'Para acessar o código da aplicação visite: ' : 'To access the application code visit: '}{' '}
            <a
              href='https://github.com/rm-l/PixelArt/'
              target='_blank'
              rel='noopener noreferrer'
              className='text-blue-400 underline'
            >
              github.com/rm-l/pixelart
            </a>
          </p>
          <div className='flex justify-center'>
            <button
              type='button'
              className='bg-blue-500 text-white font-bold py-2 px-6 rounded-lg hover:bg-blue-600 transition duration-300 flex items-center mr-4'
              onClick={handleClick}
            >
              <svg className='w-5 h-5 mr-2' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M10 19l7-7-7-7' />
              </svg>
              {isPortuguese ? 'Acessar o App' : 'Access the App'}
            </button>

          </div>
        </div>
      </div>
    </div>
  );
};

export default MeuComponente;
