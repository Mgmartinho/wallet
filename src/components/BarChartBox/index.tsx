import React from 'react'
import { Container } from './style'
import { SideLeft } from './style'
import { SideRight } from './style'

import { Legend, LegendContainer } from './style'

import {
    ResponsiveContainer,
    BarChart,
    Bar,
    Cell,
    Tooltip
} from 'recharts'
import formatCurrency from '../../utils/formatCurrency'


interface IBarChartBoxProps {
    title: string;
    data: {
        name: string;
        amount: number;
        percent: number;
        color: string;
    }[],
}

const BarChartBox: React.FC<IBarChartBoxProps> = ({
    title, data
}) => {
    return (
        <Container>

            <SideLeft>
                <h2>{title}</h2>

                <LegendContainer>
                    {
                        data.map(indicator => (
                            <Legend
                                key={indicator.name}
                                color={indicator.color}
                            >
                                <div>{indicator.percent}%</div>
                                <span>{indicator.name}</span>
                            </Legend>
                        ))
                    }


                </LegendContainer>
            </SideLeft>

            <SideRight>
                <ResponsiveContainer>
                    <BarChart data={data}>
                        <Bar dataKey="amount"
                        name='Valor'>
                            {
                                data.map((indicator) => (
                                    <Cell
                                        key={indicator.name}
                                        cursor="pointer"
                                        fill={indicator.color}

                                    />

                                ))
                            }
                        </Bar>
                        <Tooltip 
                            cursor={{fill: 'none'}}
                            formatter={(value) => formatCurrency(Number(value))}
                            
                        />
                    </BarChart>
                </ResponsiveContainer>
            </SideRight>

        </Container>
    )

};


export default BarChartBox;

