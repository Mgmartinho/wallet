import React from 'react'
import {
    Container,
    SideLeft,
    LegendContainer,
    Legend,
    SideRight
} from './sytle'

import {
    Pie,
    PieChart,
    ResponsiveContainer,
    Cell
} from 'recharts'


interface IPieChartProps {
    data: {
        name: string,
        value: number,
        percent: number,
        color: string,
    }[],
}

const PieChartBox: React.FC<IPieChartProps> = ({ data }) => (
    <Container>
        <SideLeft>
            <h2>Legendas:</h2>
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
                <PieChart>  {/*GRAFICO D PIZZA */}
                    <Pie
                        data={data}
                        dataKey="percent" labelLine={false}
                    >
                        {
                            data.map((indicator) => (
                                <Cell
                                    key={indicator.name}
                                    fill={indicator.color} 
                                />
                            ))
                        }
                    </Pie>
                </PieChart>
            </ResponsiveContainer>
        </SideRight>
    </Container>
)


export default PieChartBox;