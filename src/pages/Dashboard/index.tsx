import React, { useMemo, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useCallback } from 'react';
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
import PieChartBox from '../../components/PieChartBox';
import HistoryBox from '../../components/HistoryBox';
import BarChartBox from '../../components/BarChartBox';
import { title } from 'process';

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

        expenses.forEach(item => {
            const date = new Date(item.date);
            const year = date.getFullYear();
            const month = date.getMonth() + 1;

            if (month === monthSelected && year === yearSelected) {
                try {
                    total += Number(item.amount)
                } catch {
                    throw new Error('Amount invalido! Amount de ser numero.')
                }
            }
        });
        return total;
    }, [monthSelected, yearSelected]);

    //FUNÇÃO CALCULO DE ENTRADAS
    const totalGains = useMemo(() => {
        let total: number = 0;

        gains.forEach(item => {
            const date = new Date(item.date);
            const year = date.getFullYear();
            const month = date.getMonth() + 1;

            if (month === monthSelected && year === yearSelected) {
                try {
                    total += Number(item.amount)
                } catch {
                    throw new Error('Amount invalido! Amount de ser numero.')
                }
            }
        });
        return total;
    }, [monthSelected, yearSelected]);

    //FUNÇÃO CALCULO DO SALDO
    const totalSaldo = useMemo(() => {
        const total = totalGains - totalExpenses
        return total;
    }, [totalGains, totalExpenses]);

    //MENSAGENS MOTIVACIONAIS
    const message = useMemo(() => {
        if (totalSaldo < 0) {
            return {
                title: "Esse mês não foi dos melhores!",
                description: "Sua Carteira esta Negativa",
                footerText: "Precisamos Melhorar...Gastamos mais do que deveriamos.",
                icon: sadImd

            }
        } else if (totalSaldo == 0) {
            return {
                title: "Uffaaa essa foi por pouco...",
                description: "Sua Carteira esta ZERADA.",
                footerText: "Que tal Fazer alguns lançamentos...adoraria ver o seu Saldo Positivo.",
                icon: happyImg

            }
        } else {
            return {
                title: "Muiiito Bem!!!!",
                description: "Sua Carteira está Positiva...",
                footerText: "Que tal fazer alguns investimentos?!!...Vamos ganhar mais dinheiro. Continue assim",
                icon: happyImg

            }
        }
    }, [totalSaldo]);

    //GRAFICO DE PIZZA
    const relationExpensesVesusGains = useMemo(() => {
        const total = totalGains + totalExpenses;

        const percentGains = Number(((totalGains / total) * 100).toFixed(1));
        const percentExpenses = Number(((totalExpenses / total) * 100).toFixed(1));

        const data = [
            {
                name: "Entradas",
                value: totalExpenses,
                percent: percentGains ? percentGains : 0,
                color: "#F7931b"
            },
            {
                name: "Saidas",
                value: totalGains,
                percent: percentExpenses ? percentExpenses : 0,
                color: "#e44c4e"
            },


        ];

        return data;

    }, [totalGains, totalExpenses])


    const hitoryData = useMemo(() => {
        return listOfMonths.map((_, month) => {
            let amountEntry = 0;
            gains.forEach(gain => {
                const date = new Date(gain.date);
                const gainMonth = date.getMonth();
                const gainYear = date.getFullYear();

                if (gainMonth === month && gainYear === yearSelected) {
                    try {
                        amountEntry += Number(gain.amount);

                    } catch {
                        throw new Error("AmountEntry is invalid. amount Entry muyst be a valid Number")
                    }
                }
            })



            let amountOutput = 0;
            expenses.forEach(expense => {
                const date = new Date(expense.date);
                const expenseMonth = Number(date.getMonth());
                const expenseYear = Number(date.getFullYear());

                if (expenseMonth === month && expenseYear === yearSelected) {
                    try {
                        amountOutput += Number(expense.amount);

                    } catch {
                        throw new Error("AmountOutput is invalid. amount Entry muyst be a valid Number")
                    }
                }
            })


            return {
                monthNumber: month,
                month: listOfMonths[month].substring(0, 3),
                amountEntry,
                amountOutput,
            }
        })

            .filter((item) => {
                const currentMonth = new Date().getMonth();
                const currentYear = new Date().getFullYear();
                return (yearSelected === currentYear && item.monthNumber <= currentMonth) || (yearSelected < currentYear)
            })
    }, [yearSelected]);

    //GRAFICOS DE BARRAS
    const relationExpensevesRecurrenteVersusEventual = useMemo(() => {
        let amountRecorrent = 0;
        let amountEventual = 0;

        expenses.filter((expenses) => {
            const date = new Date(expenses.date);
            const year = date.getFullYear();
            const month = date.getMonth() + 1;

            return month === monthSelected && year === yearSelected;
        })
            .forEach((expense) => {
                if (expense.frequency === "recorrente") {
                    return amountEventual += Number(expense.amount);
                } if (expense.frequency === "eventual") {
                    return amountRecorrent += Number(expense.amount);

                }
            });


        const total = amountRecorrent + amountEventual;
        const Recurrentpercent = Number(((amountRecorrent / total) * 100).toFixed(1));
        const Eventualpercent = Number(((amountEventual / total) * 100).toFixed(1));
        return [
            {
                name: 'recorrente',
                amount: amountRecorrent,
                percent: Recurrentpercent ? Recurrentpercent : 0,
                color: "#f7931b",
            },

            {
                name: 'eventuais',
                amount: amountEventual,
                percent: Eventualpercent ? Eventualpercent : 0,
                color: "#e44c4e",
            },
        ]

    }, [monthSelected, yearSelected]);
    //GRAFICOS DE BARRAS
    const relationGainsRecurrenteVersusEventual = useMemo(() => {
        let amountRecorrent = 0;
        let amountEventual = 0;

        gains.filter((gain) => {
            const date = new Date(gain.date);
            const year = date.getFullYear();
            const month = date.getMonth() + 1;

            return month === monthSelected && year === yearSelected;
        })
            .forEach((gain) => {
                if (gain.frequency === "recorrente") {
                    return amountEventual += Number(gain.amount);
                } if (gain.frequency === "eventual") {
                    return amountRecorrent += Number(gain.amount);

                }
            });

            const total = amountRecorrent + amountEventual;
            const percentRecurrent = Number(((amountRecorrent / total) * 100).toFixed(1));
            const percentEventual = Number(((amountEventual / total) * 100).toFixed(1));

        return [
            {
                name: 'recorrente',
                amount: amountRecorrent,
                percent:  percentRecurrent ? percentRecurrent : 0,
                color: "#f7931b",
            },

            {
                name: 'Eventual',
                amount: amountEventual,
                percent: percentEventual ? percentEventual : 0,
                color: "#e44c4e",
            },
        ]

    }, [monthSelected, yearSelected]);

    interface IData {
        id: string;
        description: string;
        amountFormmated: string;
        frequency: string;
        dateFormatted: string;
        tagColor: string;
    }



    const handleMonthSelected = useCallback((month: string) => {
        try {
            const parseMonth = Number(month);
            setMonthSelected(parseMonth);
        } catch {
            throw new Error('Invalide month value. is accept 0- 24.')
        }
    },[]);

    const handleYearSelected = useCallback((year: string) => {
        try {
            const parseYear = Number(year);
            setYearSelected(parseYear);
        } catch {
            throw new Error('Invalide Year value. is accept Integer Numbers.')
        }
    },[]);

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
                    color="#4e41f0"
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

                <PieChartBox data={relationExpensesVesusGains}
                />

                <HistoryBox
                    data={hitoryData}
                    lineColorAmountEntry="#f7931b"
                    lineColorAmountOutpu="#e44c4e"
                />

                <BarChartBox
                    data={relationExpensevesRecurrenteVersusEventual}
                    title="Saidas"
                />

                <BarChartBox
                    data={relationGainsRecurrenteVersusEventual}
                    title="Entradas"
                />
            </Content>
        </Container>
    )
}

export default Dashboard;