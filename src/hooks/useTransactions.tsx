import { createContext, useState, useEffect, ReactNode, useContext } from 'react';
import { api } from '../services/api';

//Criando uma tipagem do type script para os tipos
// da transação
interface Transaction {
    id: number;
    title: string;
    type: string;
    amount: number;
    category: string;
    createdAt: string;
}

//herdando os tipos da transação e omitindo os campos id e createdAt,
//que são preenchidos automaticamente.
type TransactionInput = Omit<Transaction, 'id' | 'createdAt'>

//Criando uma tipagem para exportar o componente TransactionContextProvaider 
//essa tipagem, faz com que o componente possa herdar para seus filhos serem
//reenderizados na tela.
interface TransactionsContextProviderProps {
    children: ReactNode;
}

//Tipagem para passar um objeto para value da TransactionsContext.Provider
interface TransactionsContextData {
    transactions: Transaction[],
    createTransaction(transaction: TransactionInput) : Promise<void>;
}


const TransactionsContext = createContext<TransactionsContextData>(
    {} as TransactionsContextData);


export function TransactionsContextProvider({children }: TransactionsContextProviderProps) {

    
    const [transactions, setTransactions] = useState<Transaction[]>([]);

    useEffect(() => {
        api.get('transactions')
            .then(response => setTransactions(response.data.transactions))
    }, []);


   async function createTransaction(transactionInput: TransactionInput) {
        const response = await api.post('/transactions', {
            ...transactionInput,
            createdAt: new Date()
        })
        //Pega as transações de dentro do respose.data 
        const { transaction } = response.data;

        //pelo conceito da imutabilidade, dispeja todas as trasações 
        //e adiciona no final a nova transação
        setTransactions([
            ...transactions,
            transaction
        ])
    }

    return (
        <TransactionsContext.Provider value={{transactions, createTransaction}}>
            {children}
        </TransactionsContext.Provider>
    );
}

export function useTransactions(){
    const context = useContext(TransactionsContext);

    return context;
}