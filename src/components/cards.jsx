import { featuresData, contactData } from '@/data';
import { FeatureCard } from '@/widgets/cards';
import { PageTitle } from '@/widgets/layout';
import { FingerPrintIcon } from '@heroicons/react/24/solid';
import {
  CardBody,
  Button,
  CardHeader,
  Card,
  IconButton,
  Typography,
} from '@material-tailwind/react';
import { TeamCard } from '@/widgets/cards';
import { teamData } from '@/data';
import React from 'react';

export const CardsTop = () => {
  return (
    <section className="-mt-32 bg-white px-4 pb-20 pt-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featuresData.map(({ color, title, icon, description }) => (
            <FeatureCard
              key={title}
              color={color}
              title={title}
              icon={React.createElement(icon, {
                className: 'w-5 h-5 text-white',
              })}
              description={description}
            />
          ))}
        </div>
        <div className="mt-32 flex flex-wrap items-center">
          <div className="mx-auto -mt-8 w-full px-4 md:w-5/12">
            <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-blue-gray-900 p-2 text-center shadow-lg">
              <FingerPrintIcon className="h-8 w-8 text-white " />
            </div>
            <Typography
              variant="h3"
              className="mb-3 font-bold"
              color="blue-gray"
            >
              Empowering Education with Technology
            </Typography>
            <Typography className="mb-8 font-normal text-blue-gray-500">
              Our Progressive Web App (PWA) revolutionizes access to digital
              learning tools for schools in areas with limited internet
              connectivity.
              <br />
              <br />
              With offline functionality using Service Workers and IndexedDB,
              educators and students can access essential content anytime,
              anywhere. The app also integrates AI to personalize learning
              pathways, ensuring every student receives tailored support.
            </Typography>
            <Button variant="filled">Learn More</Button>
          </div>
          <div className="mx-auto mt-24 flex w-full justify-center px-4 md:w-4/12 lg:mt-0">
            <Card className="shadow-lg border shadow-gray-500/50 rounded-lg">
              <CardHeader floated={false} className="relative h-56">
                <img
                  alt="PWA for Education"
                  src="/img/background-2.jpg" // Replace with a relevant image for your PWA
                  className="h-full w-full"
                />
              </CardHeader>
              <CardBody>
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                  Digital Learning Accessibility
                </Typography>
                <Typography
                  variant="h5"
                  color="blue-gray"
                  className="mb-3 mt-2 font-bold"
                >
                  A New Era of Learning
                </Typography>
                <Typography className="font-normal text-blue-gray-500">
                  Our PWA ensures that educational resources are accessible even
                  without internet access, providing equal opportunities for all
                  students. Features include data synchronization, AI-driven
                  content personalization, and a user-friendly interface
                  designed for seamless learning experiences.
                </Typography>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export const CardsMiddle = () => {
  return (
    <section className="px-4 pt-20 pb-48">
      <div className="container mx-auto">
        <PageTitle
          section="Our Project"
          heading="Empowering Education with Offline Access"
        >
          Our Progressive Web App (PWA) enables schools in areas with limited
          internet connectivity to access educational resources offline. By
          using advanced technologies like service workers and IndexedDB, our
          platform ensures that students can learn without interruption. With
          offline functionality and data synchronization when internet is
          available, we aim to bridge the digital divide in education.
        </PageTitle>
        <div className="mt-24 grid grid-cols-1 gap-12 gap-x-24 md:grid-cols-2 xl:grid-cols-4">
          {teamData.map(({ img, name, position, socials }) => (
            <TeamCard
              key={name}
              img={img}
              name={name}
              position={position}
              socials={
                <div className="flex items-center gap-2">
                  {socials.map(({ color, name }) => (
                    <IconButton key={name} color={color} variant="text">
                      <i className={`fa-brands text-xl fa-${name}`} />
                    </IconButton>
                  ))}
                </div>
              }
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export const CardsBottom = () => {
  return (
    <section className="relative bg-white py-24 px-4">
      <div className="container mx-auto">
        <PageTitle
          section="PWA for Education"
          heading="Empowering Offline Learning"
        >
          Our Progressive Web App (PWA) aims to provide students in areas with
          limited internet access a seamless learning experience. By enabling
          offline access to educational content, we are addressing the
          connectivity challenges many schools face, particularly in underserved
          regions like Suriname.
        </PageTitle>
        <div className="mx-auto mt-20 mb-48 grid max-w-5xl grid-cols-1 gap-16 md:grid-cols-2 lg:grid-cols-3">
          {contactData.map(({ title, icon, description }) => (
            <Card
              key={title}
              color="transparent"
              shadow={false}
              className="text-center text-blue-gray-900"
            >
              <div className="mx-auto mb-6 grid h-14 w-14 place-items-center rounded-full bg-blue-gray-900 shadow-lg shadow-gray-500/20">
                {React.createElement(icon, {
                  className: 'w-5 h-5 text-white',
                })}
              </div>
              <Typography variant="h5" color="blue-gray" className="mb-2">
                {title}
              </Typography>
              <Typography className="font-normal text-blue-gray-500">
                {description}
              </Typography>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
