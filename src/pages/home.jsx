import React from 'react';
import { Typography } from '@material-tailwind/react';
import { Footer } from '@/widgets/layout';
import Form from '@/components/form';
import { CardsBottom, CardsMiddle, CardsTop } from './home/cards';

export function Home() {
  return (
    <>
      <div className="relative flex h-screen content-center items-center justify-center pt-16 pb-32">
        <div className="absolute top-0 h-full w-full bg-[url('/img/suriname-bg.png')] bg-cover bg-center" />
        <div className="absolute top-0 h-full w-full bg-black/20 bg-cover bg-center" />
        <div className="max-w-8xl container relative mx-auto">
          <div className="flex flex-wrap items-center">
            <div className="ml-auto mr-auto w-full px-4 text-center lg:w-8/12">
              <Typography
                variant="h1"
                color="white"
                className="mb-6 font-black"
              >
                Suriname Offline Education Web.
              </Typography>
              <Typography variant="lead" color="white" className="opacity-80">
                Progressive Web Application (PWA) that allows students in areas
                with limited internet access to use digital learning tools. The
                app should work offline, synchronize data when online, and
                integrate AI to enhance the learning experience.
              </Typography>
            </div>
          </div>
        </div>
      </div>

      <CardsTop />

      <CardsMiddle />

      <CardsBottom />

      <Form />

      <Footer />
    </>
  );
}

export default Home;
