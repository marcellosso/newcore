import React, { useEffect } from 'react';

import { useRouter } from 'next/router';
import { FiEdit, FiTrash } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { getusers, removeuser } from '../../store/actions/userActions';
import Link from 'next/link';


import logo from '../../assets/logo.svg';

import './styles.css'




const Users: React.FC = () => {

    const dispatch = useDispatch();
    const { users } = useSelector(state => state.user);

    useEffect(() => {
        dispatch(getusers());
    }, [])

    const router = useRouter();

    const handleEditButton = (dado) => {
        // console.log(dado);
        router.push({
            pathname: '/edit',
            query: {
                id: dado.id,
            }
        });
    }

    const handleDeleteButton = async (dado) => {
        await dispatch(removeuser(dado));
    }

    return (
        <div className="userContainer">


            <img src={logo} alt="NewCore" />

            <div className="userContent">
                <button onClick={() => { router.push('/register') }}>Voltar</button>
                <div className="table">
                    <div className="col main"><p>NOME</p></div>
                    <div className="col main"><p>CPF</p></div>
                    <div className="col main"><p>DATA</p></div>
                    <div className="col main edit">
                        <div className="semi-col">
                            <p>RENDA MENSAL</p>
                        </div>
                        <div className="semi-col">
                            <p>EDITAR</p>
                        </div>
                    </div>
                </div>

                {users.map((data, index) => {
                    return (
                        <div key={index} className="table">
                            <div className="col"><p>{data.name}</p></div>
                            <div className="col"><p>{data.cpf}</p></div>
                            <div className="col"><p>{data.date}</p></div>
                            <div className="col edit">
                                <div className="semi-col">
                                    <p>{data.income}</p>
                                </div>
                                <div className="semi-col">
                                    <button onClick={() => { handleEditButton(data) }} >
                                        <FiEdit />
                                    </button>
                                    <button onClick={() => { handleDeleteButton(data) }}>
                                        <FiTrash />
                                    </button>
                                </div>
                            </div>
                        </div>
                    )
                })}

            </div>
        </div>
    )
};

export default Users;

// export const getStaticProps: GetStaticProps = async () => {

// }
