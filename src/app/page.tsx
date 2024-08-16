'use client'
import { useRouter } from 'next/navigation';

const MeuComponente = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push('/pixelart');
  };

  return (
    <div className='min-h-screen min-w-full bg-gray-900 flex flex-col items-center justify-center'>
      <div className='text-center bg-gray-800 text-gray-200 p-10 rounded-lg shadow-lg'>
        <h1 className='text-4xl font-bold mb-4'>
          Olá! Bem-vindo ao projeto Pixel Art
        </h1>
        <p className='text-xl mb-4'>
          Esta é uma versão atualizada de um dos primeiros projetos que fiz durante meu curso na{' '}
          <a
            href='https://www.betrybe.com/'
            target='_blank'
            rel='noopener noreferrer'
            className='text-blue-400 underline'
          >
            Trybe
          </a>
          .<br />
          Refatorei o aplicativo para aplicar novas técnicas e funcionalidades.
        </p>
        <p className='text-lg mb-6'>
          Explore o app e veja as melhorias que implementei, incluindo uma interface mais intuitiva e recursos adicionais.
        </p>
        <button
          type='button'
          className='bg-blue-500 text-white font-bold py-2 px-6 rounded-lg hover:bg-blue-600 transition duration-300 flex items-center'
          onClick={handleClick}
        >
          <svg className='w-5 h-5 mr-2' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M10 19l7-7-7-7' />
          </svg>
          Acessar o App
        </button>
      </div>
    </div>
  );
};

export default MeuComponente;
