import React, { useRef, useEffect } from 'react';
import { Form } from '@unform/web'
import { Scope } from '@unform/core'
import './App.css';

import Input from './components/Form/input'
import * as Yup from 'yup'

function App() {
  const formRef = useRef(null);

  useEffect(() => {
    setTimeout(() => {
        formRef.current.setData({
          name: 'Erick Trettel',
          email: 'ericktrettel@gmail.com'
        })
    }, 2000);
  }, []);

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

      <Form ref={formRef} onSubmit={handleSubmit}>
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
