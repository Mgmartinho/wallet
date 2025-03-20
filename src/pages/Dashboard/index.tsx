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


const Dashboard = () => {

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


    interface IData {
        id: string;
        description: string;
        amountFormmated: string;
        frequency: string;
        dateFormatted: string;
        tagColor: string;
    }

    const [monthSelected, setMonthSelected] = useState<number>(new Date().getMonth() + 1);
    const [yearSelected, setYearSelected] = useState<number>(new Date().getFullYear());
    const [data, setData] = useState<IData[]>([]);
    const [selectedFrequency, setSelectedFrequency] = useState(['recorrente', 'eventual']);


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
        } catch (error) {
            throw new Error('Invalide month value. is accept 0- 24.')
        }
    };

    const handleYearSelected = (year: string) => {
        try {
            const parseYear = Number(year);
            setYearSelected(parseYear);
        } catch (error) {
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
                    amount={150.00}
                    footerLabel='Atualizado com base nas Entradas e Saídas'
                    icon={"dolar"}
                    color= "#4e41f0"
                />

                <WalletBox
                    title="Entradas"
                    amount={5000.00}
                    footerLabel='Atualizado com base nas Entradas e Saídas'
                    icon="arrowUp"
                    color='#f7931b'
                />

                <WalletBox
                    title="Saídas"
                    amount={4500.00}
                    footerLabel='Atualizado com base nas Entradas e Saídas'
                    icon='arrowDown'
                    color='#e44c4e'
                />
            </Content>
        </Container>
    )
}

export default Dashboard;