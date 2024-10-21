import { PageTitle } from '@/widgets/layout';
import {
  Typography,
  Button,
  Input,
  Textarea,
  Checkbox,
} from '@material-tailwind/react';
import React from 'react';
import { NetlifyForm, Honeypot } from 'react-netlify-forms';

const Form = () => {
  return (
    <NetlifyForm
      name="Contact"
      action="/thanks"
      netlify
      honeypotName="bot-field"
    >
      {({ handleChange, success, error }) => (
        <>
          <Honeypot />
          {success && <p>Thanks for contacting us!</p>}
          {error && (
            <p>
              Sorry, we could not reach our servers. Please try again later.
            </p>
          )}
          <div className="mx-auto lg:w-6/12">
            <div className="w-full mt-12 lg:w-12/12">
              <PageTitle section="Contact Us" heading="Want to work with us?">
                Complete this form and we will get back to you in 24 hours.
              </PageTitle>
              <div className="mb-8 flex gap-8">
                <Input
                  type="text"
                  name="name"
                  id="name"
                  variant="outlined"
                  size="lg"
                  label="Full Name"
                  onChange={handleChange}
                />
                <Input
                  type="email"
                  name="email"
                  id="email"
                  variant="outlined"
                  size="lg"
                  label="Email Address"
                  onChange={handleChange}
                />
              </div>
              <div>
                <Textarea
                  name="message"
                  id="message"
                  variant="outlined"
                  size="lg"
                  label="Message"
                  rows="4"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div>
              <Button
                variant="gradient"
                size="lg"
                className="mt-8"
                fullWidth
                type="submit"
              >
                Submit
              </Button>
            </div>
          </div>
        </>
      )}
    </NetlifyForm>
  );
};

export default Form;
