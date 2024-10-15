import { PageTitle } from '@/widgets/layout';
import {
  Typography,
  Button,
  Input,
  Textarea,
  Checkbox,
} from '@material-tailwind/react';
import React from 'react';

const Form = () => {
  return (
    <>
      <PageTitle section="Contact Us" heading="Want to work with us?">
        Complete this form and we will get back to you in 24 hours.
      </PageTitle>
      <form className="mx-auto w-full mt-12 lg:w-5/12">
        <div className="mb-8 flex gap-8">
          <label htmlFor="input-name">
            <Input
              id="input-name"
              type='text'
              variant="outlined"
              size="lg"
              label="Full Name"
              required
            />
          </label>
          <label htmlFor="input-email">
            <Input
              id="input-email"
              type='email'
              variant="outlined"
              size="lg"
              label="Email Address"
              required
            />
          </label>
        </div>
        <Textarea
          id="input-msg"
          type='text'
          variant="outlined"
          size="lg"
          label="Message"
          rows={8}
          required
        />
        <Checkbox
          label={
            <Typography
              variant="small"
              color="gray"
              className="flex items-center font-normal"
            >
              I agree the
              <a
                href=""
                className="font-medium transition-colors hover:text-gray-900"
              >
                &nbsp;Terms and Conditions
              </a>
            </Typography>
          }
          containerProps={{ className: '-ml-2.5' }}
        />
        <Button variant="gradient" size="lg" className="mt-8" fullWidth>
          Send Message
        </Button>
      </form>
    </>
  );
};

export default Form;
