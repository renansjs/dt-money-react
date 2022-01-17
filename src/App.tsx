import { useState } from 'react'


import {TransactionsContextProvider } from './hooks/useTransactions'

import { Dashboard } from "./components/Dashboard";
import { Header } from "./components/Header";
import { GlobalStyle } from "./styles/global";
import { NewtransactionModal } from './components/NewTransactionModal';

import Modal from 'react-modal'


Modal.setAppElement('#root')


function App() {


  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] = useState(false);

    function handleOpenNewTransactionModal(){
        setIsNewTransactionModalOpen(true)
    }

    function handleCloseNewTransactionModal(){
        setIsNewTransactionModalOpen(false);
    }

  return (

    //Obrigatoriamente o contexto precisa passar um value, no qual é o mesmo que
    //foi definido na sua criação

    <TransactionsContextProvider>

      <Header onOpenNewTransactionModal={handleOpenNewTransactionModal} />

      <Dashboard />

      <NewtransactionModal  

        isOpen={isNewTransactionModalOpen}
        onRequestClose={handleCloseNewTransactionModal}
      />

      <GlobalStyle />
    </TransactionsContextProvider>
  );
}

export default App;
