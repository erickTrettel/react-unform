import React, { useRef } from 'react';
import { Form } from '@unform/web'
import { Scope } from '@unform/core'
import './App.css';

import Input from './components/Form/input'
import * as Yup from 'yup'

const initialData = {
  email: 'ericktrettel@gmail.com',
  address: {
    number: 10
  }
}

function App() {
  const formRef = useRef(null);

  async function handleSubmit(data, { reset }) {
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required('O nome é obrigatório'),
        email: Yup.string()
          .email('Digite um e-mail válido')
          .required('O e-mail é obrigatório'),
        address: Yup.object().shape({
          city: Yup.string().min(3, 'No mínimo 3 caracteres').required('A cidade é obrigatória')
        })
      });
  
      await schema.validate(data, {
        abortEarly: false
      })

      console.log(data);
  
      reset();

      // clear errors 
      formRef.current.setErrors({});
    } catch(e) {
      if(e instanceof Yup.ValidationError) {
        const errorMessages = {};
        e.inner.forEach(error => {
          errorMessages[error.path] = error.message;
        })

        formRef.current.setErrors(errorMessages);
      }
    }
  }

  return (
    <div>
      <h1>Hello world</h1>

      <Form ref={formRef} initialData={initialData} onSubmit={handleSubmit}>
        <Input name="name" />
        <Input type="email" name="email" />
        <Input type="password" name="password" />
        
        <Scope path="address">
          <Input name="street" />
          <Input name="city" />
          <Input type="number" name="number" />
        </Scope>

        <button type="submit">Enviar</button>
      </Form>
    </div>
  );
}

export default App;
