import React from 'react';
import { Form } from '@unform/web'
import { Scope } from '@unform/core'
import './App.css';

import Input from './components/Form/input'

const initialData = {
  email: 'ericktrettel@gmail.com',
  address: {
    number: 10
  }
}

function App() {
  function handleSubmit(data) {
    console.log(data);
  }

  return (
    <div>
      <h1>Hello world</h1>

      <Form initialData={initialData} onSubmit={handleSubmit}>
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
