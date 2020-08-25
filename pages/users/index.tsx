import React, { useEffect, useState } from 'react';

import { useRouter } from 'next/router';
import { FiEdit, FiTrash } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { getusers, removeuser } from '../../store/actions/userActions';
import Link from 'next/link';
import Modal from 'react-modal';


import logo from '../../assets/logo.svg';

import './styles.css'



const Users: React.FC = () => {

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)'
        }
    }

    Modal.setAppElement('#__next');


    const dispatch = useDispatch();
    const { users } = useSelector(state => state.user);
    const [modalIsOpen, setIsOpen] = useState(false);
    const [activeItem, setActive] = useState({});

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
        closeModal();
    }

    const openModal = (dado) => {
        setActive(dado);
        setIsOpen(true);
    }

    const closeModal = () => {
        setIsOpen(false);
    }

    return (
        <div className="userContainer">

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="CONFIRMAÇÃO"
            >

                <div className="modalContainer">
                    <h3>TEM CERTEZA QUE DESEJA DELETAR O USUÁRIO?</h3>
                    <h5>*Essa ação não pode ser desfeita*</h5>

                    <div>
                        <button className="modalButton" style={{ backgroundColor: '#32a852' }} onClick={() => { handleDeleteButton(activeItem) }}>SIM</button>
                        <button className="modalButton" style={{ backgroundColor: '#a83432' }} onClick={closeModal}>NÃO</button>
                    </div>
                </div>

            </Modal>

            <img src={logo} alt="NewCore" />

            <div className="userContent">
                <button onClick={() => { router.push('/register') }}>Novo Usuário</button>
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
                                    <p>R$ {data.income}</p>
                                </div>
                                <div className="semi-col">
                                    <button onClick={() => { handleEditButton(data) }} >
                                        <FiEdit />
                                    </button>
                                    {/* <button onClick={() => { handleDeleteButton(data) }}> */}
                                    <button onClick={() => { openModal(data) }}>
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
