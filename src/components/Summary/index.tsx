import IncomeImg from '../../assets/income.svg'
import OutcomeImg from '../../assets/outcome.svg'
import TotalImg from '../../assets/total.svg'

import { useTransactions } from '../../hooks/useTransactions';

import { Container } from "./style";

export function Summary() {
    //com Context Api do React 
    //Consumindo os dados do contexto
    const {transactions} = useTransactions();

    // const totalDeposits = transactions.reduce((acc, transaction) => {
    //     if(transaction.type === 'deposit') {
    //         return acc + transaction.amount;
    //     }

    //     return acc;
    // }, 0)

    const summary = transactions.reduce((acc, transaction) => {

        if(transaction.type === 'deposit') {
            acc.deposit += transaction.amount;
            acc.total += transaction.amount; 
        } else {
            acc.withdraw += transaction.amount;
            acc.total -= transaction.amount;
        }

        return acc;

    }, {
        deposit: 0,
        withdraw: 0,
        total: 0
    })

    return(
        <Container>
            <div>
                <header>
                    <p>Entradas</p>
                    <img src={IncomeImg} alt="Entradas" />
                </header>
                <strong>{new Intl.NumberFormat('pt-BR', {
                                    style: 'currency',
                                    currency: 'BRL'
                                }).format(summary.deposit)}</strong>
            </div>

            <div>
                <header>
                    <p>Saídas</p>
                    <img src={OutcomeImg} alt="Entradas" />
                </header>
                <strong>- {new Intl.NumberFormat 
                    ("pt-BR", {
                        style: 'currency',
                        currency: 'BRL'
                    }
                ).format(summary.withdraw)}</strong>
            </div>

            <div className='highlight-background'>
                <header>
                    <p>Total</p>
                    <img src={TotalImg} alt="Entradas" />
                </header>
                <strong>{new Intl.NumberFormat(
                    'pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                    }
                ).format(summary.total)}</strong>
            </div>
        </Container>
    )
}