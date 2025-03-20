import React, { useMemo, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { Container, Content } from './style';
import ContentHeader from '../../components/ContentHeader';
import SelectInput from '../../components/SelectInput';

import gains from '../../repositories/gains';
import expenses from '../../repositories/expenses';

import formatCurrency from '../../utils/formatCurrency';
import formatDate from '../../utils/formatDate';
import listOfMonths from '../../utils/months';

import WalletBox from '../../components/WalletBox';

import MessageBox from '../../components/MessageBox';

import happyImg from '../../assets/happy.svg'
import sadImd from '../../assets/sad.svg'
import emojis from '../../utils/emojis';

const Dashboard = () => {

    const [monthSelected, setMonthSelected] = useState<number>(new Date().getMonth() + 1);
    const [yearSelected, setYearSelected] = useState<number>(new Date().getFullYear());
    const [data, setData] = useState<IData[]>([]);
    const [selectedFrequency, setSelectedFrequency] = useState(['recorrente', 'eventual']);

    const { type } = useParams(); // Captura o parâmetro "type" da URL


    // Definição de listDate ANTES de usá-la
    const listDate = useMemo(() => (type === 'entry-balance' ? gains : expenses), [type]);

    const years = useMemo(() => {
        let uniqueYears: number[] = [];

        [...expenses, ...gains].forEach(item => {
            const date = new Date(item.date);
            const year = date.getFullYear();

            if (!uniqueYears.includes(year)) {
                uniqueYears.push(year);
            }
        });

        return uniqueYears.map(year => ({ value: year, label: year }));
    }, [listDate]);

    const months = useMemo(() => {
        return listOfMonths.map((month, index) => {
            return {
                value: index + 1,
                label: month,
            };
        });
    }, []);

    //FUNÇÃO CALCULO DE SAIDAS
    const totalExpenses = useMemo(() => {
        let total: number = 0;

        expenses.forEach(item =>  {
           const date = new Date(item.date);
           const year = date.getFullYear();
           const month = date.getMonth() +1;

           if(month === monthSelected && year === yearSelected){
                try{
                    total += Number(item.amount)
                }catch{
                    throw new Error('Amount invalido! Amount de ser numero.')
                }
           }
        });
        return total;
    },[monthSelected, yearSelected]);

     //FUNÇÃO CALCULO DE ENTRADAS
     const totalGains = useMemo(() => {
        let total: number = 0;

        gains.forEach(item =>  {
           const date = new Date(item.date);
           const year = date.getFullYear();
           const month = date.getMonth() +1;

           if(month === monthSelected && year === yearSelected){
                try{
                    total += Number(item.amount)
                }catch{
                    throw new Error('Amount invalido! Amount de ser numero.')
                }
           }
        });
        return total;
    },[monthSelected, yearSelected]);

     //FUNÇÃO CALCULO DO SALDO
     const totalSaldo = useMemo(() => {
       const total = totalGains-totalExpenses
        return total;
    },[totalGains,totalExpenses]);


    const message = useMemo(() => {
        if(totalSaldo < 0){
            return{ 
            title: "Esse mês não foi dos melhores!",
            description:"Sua Carteira esta Negativa",
            footerText:"Precisamos Melhorar...Gastamos mais do que deveriamos.",
            icon:sadImd
            
        }
    }else if(totalSaldo == 0){
        return{ 
            title: "Uffaaa essa foi por pouco...",
            description:"Sua Carteira esta ZERADA.",
            footerText:"Que tal Fazer alguns lançamentos...adoraria ver o seu Saldo Positivo.",
            icon:happyImg
            
        }
    }else{
        return{ 
            title: "Muiiito Bem!!!!",
            description:"Sua Carteira está Positiva...",
            footerText:"Que tal fazer alguns investimentos?!!...Vamos ganhar mais dinheiro. Continue assim",
            icon:happyImg
            
        }
    }
    },[totalSaldo]);

    interface IData {
        id: string;
        description: string;
        amountFormmated: string;
        frequency: string;
        dateFormatted: string;
        tagColor: string;
    }

    


    const handleFrequencyClick = (frequency: string = 'teste') => {
        const alreadySelected = selectedFrequency.findIndex(item => item === frequency);
        if (alreadySelected >= 0) {
            const filtered = selectedFrequency.filter(item => item !== frequency);
            setSelectedFrequency(filtered);
        } else {
            setSelectedFrequency((prev) => [...prev, frequency]);
        };
    };

    const handleMonthSelected = (month: string) => {
        try {
            const parseMonth = Number(month);
            setMonthSelected(parseMonth);
        } catch{
            throw new Error('Invalide month value. is accept 0- 24.')
        }
    };

    const handleYearSelected = (year: string) => {
        try {
            const parseYear = Number(year);
            setYearSelected(parseYear);
        } catch {
            throw new Error('Invalide Year value. is accept Integer Numbers.')
        }
    };

    useEffect(() => {
        const filteredDate = listDate.filter(item => {
            const date = new Date(item.date);
            const month = (date.getMonth() + 1);
            const year = (date.getFullYear());
            return month === monthSelected
                && year === yearSelected
                && selectedFrequency.includes(item.frequency)
                ;
        });

        const formattedData = filteredDate.map(item => ({
            id: uuidv4(),
            description: item.description,
            amountFormmated: formatCurrency(Number(item.amount)),
            frequency: item.frequency,
            dateFormatted: formatDate(String(item.date)),
            tagColor: item.frequency === 'recorrente' ? '#4E41F0' : '#E44C4E',
        }));

        setData(formattedData);
    }, [listDate, monthSelected, yearSelected, data.length, selectedFrequency]);

    return (
        <Container>
            <ContentHeader title="Dashboard" lineColors="#9b9394">
                <SelectInput options={months} onChange={(e) => handleMonthSelected(e.target.value)}
                    defaultValue={monthSelected} />
                <SelectInput options={years} onChange={(e) => handleYearSelected(e.target.value)}
                    defaultValue={yearSelected} />
            </ContentHeader>

            <Content>
                <WalletBox
                    title="Saldo"
                    amount={totalSaldo}
                    footerLabel='Atualizado com base nas Entradas e Saídas'
                    icon={"dolar"}
                    color= "#4e41f0"
                />

                <WalletBox
                    title="Entradas"
                    amount={totalGains}
                    footerLabel='Atualizado com base nas Entradas e Saídas'
                    icon="arrowUp"
                    color='#f7931b'
                />

                <WalletBox
                    title="Saídas"
                    amount={totalExpenses}
                    footerLabel='Atualizado com base nas Entradas e Saídas'
                    icon='arrowDown'
                    color='#e44c4e'
                />

                <MessageBox 
                title={message.title}
                description={message.description}
                footerText={message.footerText}
                icon={message.icon}


                />
            </Content>
        </Container>
    )
}

export default Dashboard;