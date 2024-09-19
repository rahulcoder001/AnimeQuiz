"use client";

import LeftIcon from '@mui/icons-material/ReplySharp';
import RightIcon from '@mui/icons-material/ForwardSharp';
import { useEffect, useState } from 'react';
import { Container } from './contauner';

export function Slider() {
  const [slide, setSlide] = useState(0);

  function positiveSlide() {
    setSlide((prevSlide) => (prevSlide === 0 ? 3 : prevSlide - 1));
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setSlide((prevSlide) => (prevSlide + 1) % 4);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex justify-center items-center flex-col w-full lato_init">
      <div className="flex w-full items-center justify-center">
        <div className="w-12 h-12 lg:ml-24 xl:ml-32 flex justify-center items-center hover:shadow-xl hover:shadow-yellow-500">
          <div className="w-8 h-8 text-orange-500 bg-opacity-50">
            <div
              className="h-full w-full flex justify-center items-center cursor-pointer bg-opacity-50"
              onClick={positiveSlide}
            >
              <LeftIcon />
            </div>
          </div>
        </div>

        <div className="flex justify-center shadow-yellow-500 shadow-lg items-center w-5/6 overflow-hidden relative">
          <Container slide={slide} />
        </div>

        <div className="w-12 h-12 lg:mr-24 xl:mr-32 flex justify-center items-center hover:shadow-xl hover:shadow-yellow-500">
          <div className="w-8 h-8 text-orange-500 bg-opacity-50">
            <div
              className="h-full w-full flex justify-center items-center cursor-pointer text-yellow-500 bg-opacity-50"
              onClick={() => setSlide((slide + 1) % 4)}
            >
              <RightIcon />
            </div>
          </div>
        </div>
      </div>

      <div className="h-6 w-28 rounded-full flex justify-center cursor-pointer">
        <span
          className={`${
            slide === 0 ? 'bg-yellow-500 w-4 h-4' : 'w-3 h-3'
          } border-2 rounded-full m-1`}
          onClick={() => setSlide(0)}
        ></span>
        <span
          className={`${
            slide === 1 ? 'bg-yellow-500 w-4 h-4' : 'w-3 h-3'
          } border-2 rounded-full m-1`}
          onClick={() => setSlide(1)}
        ></span>
        <span
          className={`${
            slide === 2 ? 'bg-yellow-500 w-4 h-4' : 'w-3 h-3'
          } border-2 rounded-full m-1`}
          onClick={() => setSlide(2)}
        ></span>
        <span
          className={`${
            slide === 3 ? 'bg-yellow-500 w-4 h-4' : 'w-3 h-3'
          } border-2 rounded-full m-1`}
          onClick={() => setSlide(3)}
        ></span>
      </div>
    </div>
  );
}
