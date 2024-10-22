import { PageTitle } from '@/widgets/layout';
import {
  Typography,
  Button,
  Input,
  Textarea,
  Checkbox,
} from '@material-tailwind/react';
import React, { useState } from 'react';

const Form = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    message: '',
    agreed: false,
  });

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [id]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;

    const data = new FormData(form);

    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(data).toString(),
    })
      .then(() => alert('Formulario enviado con éxito'))
      .catch((error) => alert('Error al enviar el formulario', error));
  };

  return (
    <>
      <PageTitle section="Contact Us" heading="Want to work with us?">
        Complete this form and we will get back to you in 24 hours.
      </PageTitle>
      <form
        className="mx-auto w-full mt-12 lg:w-5/12"
        name="contact"
        method="POST"
        data-netlify="true"
        data-netlify-honeypot="bot-field"
        onSubmit={handleSubmit}
      >
        {/* Campo oculto requerido por Netlify */}
        <input type="hidden" name="form-name" value="contact" />

        {/* Campo honeypot oculto para evitar bots */}
        <p className="hidden">
          <label>
            Don’t fill this out if you’re human: <input name="bot-field" />
          </label>
        </p>

        <div className="mb-8 flex gap-8">
          <label htmlFor="fullName">
            <Input
              id="fullName"
              name="fullName"
              type="text"
              variant="outlined"
              size="lg"
              label="Full Name"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </label>
          <label htmlFor="email">
            <Input
              id="email"
              name="email"
              type="email"
              variant="outlined"
              size="lg"
              label="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <Textarea
          id="message"
          name="message"
          variant="outlined"
          size="lg"
          label="Message"
          rows={8}
          value={formData.message}
          onChange={handleChange}
          required
        />
        <Checkbox
          id="agreed"
          name="agreed"
          checked={formData.agreed}
          onChange={handleChange}
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
        <Button
          variant="gradient"
          size="lg"
          className="mt-8"
          fullWidth
          type="submit"
        >
          Send
        </Button>
      </form>
    </>
  );
};

export default Form;
