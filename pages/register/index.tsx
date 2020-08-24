import React, { useCallback, useRef } from 'react';

import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { useRouter } from 'next/router';

import logo from '../../assets/logo.svg';

import Input from '../../components/Input';

import './styles.css'

import { useDispatch, useSelector } from 'react-redux';
import { adduser } from '../../store/actions/userActions';

import getValidationErrors from '../../utils/getValidationErrors';

// Podemos usar essa biblioteca para verificar se o cpf existe, mas a critério de testes, não utilizei ela
import { cpf } from 'cpf-cnpj-validator';


const Register: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const router = useRouter();
  const dispatch = useDispatch();

  const handleSubmit = useCallback(async (data: object) => {
    const regexCPF = /([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})/gm;
   
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required('Nome obrigatório'),
        cpf: Yup.string().matches(regexCPF, 'CPF Inválido'),
        date: Yup.date().required('Data obrigatória').typeError('Data inválida'),
        income: Yup.number().required('Renda mensal obrigatória').typeError('Renda inválida'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      dispatch(adduser(data));
   
      router.push('/users');

    } catch (err) {

      const errors = getValidationErrors(err);

      formRef.current?.setErrors(errors);
    }
  }, []);

  return (
    <div className="container">
      <div className="content">
        <img src={logo} alt="NewCore" />

        <Form ref={formRef} onSubmit={handleSubmit}>
          <h1>Formulario de registro</h1>

          <Input name="name" placeholder="Nome" />
          <Input name="cpf" placeholder="CPF" type="number" />
          <Input name="date" placeholder="Data de nascimento" type="date" />
          <Input name="income" placeholder="Renda Mensal" type="number" />

          <button type="submit">Registrar</button>
        </Form>
      </div>
      <div className="background"></div>
    </div>
  )
};

export default Register;

// export const getStaticProps: GetStaticProps = async () => {

// }
