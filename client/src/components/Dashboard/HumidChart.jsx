import styled from "styled-components"
import {Line} from 'react-chartjs-2'
const Container = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.2rem;

    & p {
        color: ${props => props.theme.color.fill.primary};
        font-weight: 500;
        font-style: italic;
    }
`
const ChartWrapper = styled.div`
    flex: 1;
    border: 1px solid ${props => props.theme.color.border.primary};
    background: ${props => props.theme.color.background.primary};
    border-radius: 0.5rem;
    
`
const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            display: false
        }
    }
}
const data = {
    labels: ['a', 'b', 'c'],
    datasets: [{
        label: 'Dataset 1',
        data: [1,2,3,4,5]
    }]
}
const HumidChart = () => {
    return (
        <Container>
            <p>Biểu đồ độ ẩm</p>
            <ChartWrapper>
                <Line data={data} options={options}/>
            </ChartWrapper>
        </Container>
    )
}

export default HumidChart