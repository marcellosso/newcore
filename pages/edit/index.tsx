import React, { useCallback, useRef, useEffect, useState } from 'react';

import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { useRouter } from 'next/router';

import logo from '../../assets/logo.svg';

import Input from '../../components/Input';
import { useDispatch, useSelector } from 'react-redux';
import { editbyid, getusers } from '../../store/actions/userActions';

import './styles.css'

import getValidationErrors from '../../utils/getValidationErrors';


const Edit: React.FC = () => {
    const formRef = useRef<FormHandles>(null);

    const [user, setUser] = useState({
        name: '',
        cpf: '',
        date: '',
        income: '',
        id: 0,
    });

    const router = useRouter();
    const { id } = router.query;

    const dispatch = useDispatch();
    const { users } = useSelector(state => state.user);

    useEffect(() => {
        dispatch(getusers());
        getuserbyid();
  
    }, []);

    const getuserbyid = () => {
        users.forEach(user => {
            if(user.id == id){
                setUser(user);
            }
        });
    }

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

            let id = router.query.id;
            data = { ...data, id: parseInt(id.toString()) };

            dispatch(editbyid(data));

            router.push('/users');

        } catch (err) {

            const errors = getValidationErrors(err);

            formRef.current?.setErrors(errors);
        }
    }, []);

    return (
        <div className="editContainer">
            <div className="editBackground"></div>
            <div className="editContent">
                <img src={logo} alt="NewCore" />

                <Form initialData={{
                    name: user.name,
                    cpf: user.cpf,
                    date: user.date,
                    income: user.income,
    
                }} ref={formRef} onSubmit={handleSubmit}>
                    <h1>Editar informações</h1>

                    <Input name="name" placeholder="Nome" />
                    <Input name="cpf" placeholder="CPF" />
                    <Input name="date" placeholder="Data de nascimento" type="date" />
                    <Input name="income" placeholder="Renda Mensal" type="number" />

                    <button type="submit">Editar</button>
                </Form>
            </div>

        </div>
    )
};

export default Edit;

// export const getStaticProps: GetStaticProps = async () => {

// }
