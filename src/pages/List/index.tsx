import React, { useMemo, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { Container, Content, Filters } from './style';
import ContentHeader from '../../components/ContentHeader';
import SelectInput from '../../components/SelectInput';
import HistoryFinanceCard from '../../components/HistoryFinanceCard';

import gains from '../../repositories/gains';
import expenses from '../../repositories/expenses';

import formatCurrency from '../../utils/formatCurrency';
import formatDate from '../../utils/formatDate';
import listOfMonths from '../../utils/months';

const List: React.FC = () => {
    const { type } = useParams(); // Captura o parâmetro "type" da URL

    const title = useMemo(() => (type === 'entry-balance' ? 'Entradas' : 'Saídas'), [type]);

    const lineColor = useMemo(() => (type === 'entry-balance' ? '#F7931B' : '#E44c4E'), [type]);



    // Definição de listDate ANTES de usá-la
    const listDate = useMemo(() => (type === 'entry-balance' ? gains : expenses), [type]);

    const years = useMemo(() => {
        let uniqueYears: number[] = [];

        listDate.forEach(item => {
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
    const [selectedFrequency, setSelectedFrequency]= useState(['recorrente', 'eventual']);


    const handleFrequencyClick = (frequency: string = 'teste') => {
       const alreadySelected = selectedFrequency.findIndex(item => item === frequency);
       if(alreadySelected >= 0){
        const filtered = selectedFrequency.filter(item => item !== frequency);
        setSelectedFrequency(filtered);
       }else{
        setSelectedFrequency((prev) => [...prev, frequency]);
       };
    };
        
    const handleMonthSelected = (month: string) => {
        try{
            const parseMonth = Number(month);
            setMonthSelected(parseMonth);
        }catch(error){
            throw new Error('Invalide month value. is accept 0- 24.')
        }
    };

    const handleYearSelected = (year: string) => {
        try{
            const parseYear = Number(year);
            setYearSelected(parseYear);
        }catch(error){
            throw new Error('Invalide Year value. is accept Integer Numbers.')
        }
    };

    useEffect(() => {
        const filteredDate = listDate.filter(item => {
            const date = new Date(item.date);
            const month = (date.getMonth()+1);
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
            <ContentHeader title={title} lineColors={lineColor}>
                <SelectInput options={months} onChange={(e) => handleMonthSelected(e.target.value)} 
                defaultValue={monthSelected} />
                <SelectInput options={years} onChange={(e) => handleYearSelected(e.target.value)} 
                defaultValue={yearSelected} />
            </ContentHeader>

            <Filters>
                <button
                    type="button"
                    className={`tag-filter tag-filter-recurrent
                    ${selectedFrequency.includes('recorrente') && 'tag-active'}`}
                    onClick={() => handleFrequencyClick('recorrente')}
                    title='Clique para remover o filtro'
                >
                    Recorrentes
                </button>
                <button
                    type="button"
                    className= {`tag-filter tag-filter-eventual
                        ${selectedFrequency.includes('eventual') && 'tag-active'}`}
                    
                    onClick={() => handleFrequencyClick('eventual')}
                    title='Clique para remover o filtro'

                    >
                    Eventuais
                </button>
            </Filters>

            <Content>
                {data.map(item => (
                    <HistoryFinanceCard
                        key={item.id}
                        tagColor={item.tagColor}
                        title={item.description}
                        subTitle={item.dateFormatted}
                        amount={item.amountFormmated}
                    />
                ))}
            </Content>
        </Container>
    );
};

export default List;
