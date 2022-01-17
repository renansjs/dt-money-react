import { FormEvent, useState} from 'react';

import Modal from 'react-modal';

import incomeImg from '../../assets/income.svg';
import outcomeImg from '../../assets/outcome.svg';

import { Container, TransactionTypeContainer, RadialBox } from './style';



import closeImg from '../../assets/close.svg';
import { useTransactions } from '../../hooks/useTransactions';


interface PropsNewTransactionModal {

    isOpen: boolean;
    onRequestClose: () => void;
}



export function NewtransactionModal({ isOpen, onRequestClose }: PropsNewTransactionModal) {

    const { createTransaction } = useTransactions();

    const [type, setType ] = useState('');
    const [title, setTitle] = useState('');
    const [amount, setAmount] = useState(0);
    const [category, setCategory] = useState('');

    //função assincrona usada para criar a nova transação do
    //sendo assim só passa pra fechar o modal apos 
    //a função ser concluida com sucesso.
    async function handleCreateNewTransaction ( event: FormEvent ) {

        event.preventDefault();

       await createTransaction( {
            title,
            amount,
            category,
            type
        });

        //resetando o estado dos campos do modal para o inicialización

        setTitle('');
        setAmount(0);
        setCategory('');
        setType('');


        //função pra fechar o modal apos ser criado
        onRequestClose()
    
    }

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            overlayClassName="react-modal-overlay"
            className="react-modal-content"

        >
            <button onClick={onRequestClose} className="react-modal-close">
                <img src={closeImg} alt="Fechar modal" />
            </button>
            <Container onSubmit={handleCreateNewTransaction}>
                <h2>Cadastrar Transação</h2>

                <input

                    placeholder="Título"
                    value={title}
                    onChange={event => setTitle(event.target.value)}

                />

                <input
                    type="number"
                    placeholder="Valor"
                    value={amount}
                    onChange={event => setAmount(Number(event.target.value))}

                />
            <TransactionTypeContainer>
                <RadialBox
                    type="button"
                    onClick={() => {setType('deposit')}}
                    isActive = {type === 'deposit'}
                    activeColors='green'
                >
                    <img src={incomeImg} alt="Entrada" />
                    <span>Entrada</span>
                </RadialBox>

                <RadialBox
                    type="button"
                    onClick={() => {setType('withDraw')}}
                    isActive = {type === 'withDraw'}
                    activeColors='red'
                >
                    <img src={outcomeImg} alt="Saída" />
                    <span>Saída</span>
                </RadialBox>

            </TransactionTypeContainer>


                <input

                    placeholder="Categoria"
                    value={category}
                    onChange={event => setCategory(event.target.value)}

                />

                <button type="submit">
                    Cadastrar
                </button>

            </Container>

        </Modal>
    )
}