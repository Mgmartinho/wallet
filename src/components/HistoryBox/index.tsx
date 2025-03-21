import React from 'react'
import { Container } from './style';
import { ChartContainer } from './style';
import { Header } from './style';
import { Legend } from './style';
import { LegendContainer } from './style';
import { Pie, ResponsiveContainer, LineChart, Line, CartesianGrid, Tooltip, XAxis } from 'recharts';
import formatCurrency from '../../utils/formatCurrency';


interface IHistoryBoxProps {
    data: {
        month: string,
        amountEntry: number,
        amountOutput: number,


    }[],

    lineColorAmountEntry: string,
    lineColorAmountOutpu: string,
}


const HistoryBox: React.FC<IHistoryBoxProps> = (
    { data, lineColorAmountEntry, lineColorAmountOutpu }
) => (
    <Container>
        <Header>
            <h2>Histórico de saldo</h2>

            <LegendContainer>
                <Legend color={lineColorAmountEntry}>
                    <div>{ }</div>
                    <span>Entradas</span>
                </Legend>
                <Legend color={lineColorAmountOutpu}>
                    <div>{ }</div>
                    <span>Saidas</span>
                </Legend>
            </LegendContainer>
        </Header>
        <ChartContainer>
        <ResponsiveContainer width="100%" height={300}>

                <LineChart data={data} margin={{ top: 5, right: 5, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#cecece" />
                    <XAxis dataKey="month" stroke='#cecece' />
                    <Tooltip formatter={(value: number, name: string) => [formatCurrency(value), name]} />

                    <Line
                        type="monotone"
                        dataKey="amountEntry"
                        name="Entradas"
                        stroke={lineColorAmountEntry}
                        strokeWidth={5}
                        dot={{ r: 5 }}
                        activeDot={{ r: 8 }}
                    />

                    <Line
                        type="monotone"
                        dataKey="amountOutput" 
                        name="Saídas"
                        stroke={lineColorAmountOutpu}
                        strokeWidth={5}
                        dot={{ r: 5 }}
                        activeDot={{ r: 8 }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </ChartContainer>
    </Container>
)


export default HistoryBox;