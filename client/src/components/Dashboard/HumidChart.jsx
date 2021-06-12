import styled from "styled-components"
import {Line} from 'react-chartjs-2'
import { useEffect } from "react"
import axios from "axios"
import { useState } from "react"
import moment from "moment"
import { useStoreState } from "easy-peasy"
import theme from '../../utils/theme'
import Loader from "../Loader"
import { FaReact } from "react-icons/fa"
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
    position: relative;
    overflow: hidden;
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
const HumidChart = () => {

    let isDark = useStoreState(_ => _.isDark)
    let curTheme = theme[isDark ? "dark" : "light"]
    const [data, setData] = useState({
        labels: [],
        datasets: [{
            data: []
        }]
    })
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            let messages = (await axios.get('/api/message/10')).data.message.reverse()
            let labels = messages.map(message => moment(message.time).format("MM/DD hh:mm"))
            let datas = messages.map(message => message.humidity)
            setData({
                labels: labels,
                datasets: [{
                    data: datas,
                    backgroundColor: curTheme.color.fill.secondary,
                    borderColor: curTheme.color.fill.secondary
                }]
            })
            setLoading(false)
        }
        fetchData()
    }, [curTheme.color.fill.secondary])

    return (
        <Container>
            <p>Biểu đồ độ ẩm</p>
            <ChartWrapper>
                {loading && <Loader><FaReact size="4rem"/></Loader>}
                <Line data={data} options={options}/>
            </ChartWrapper>
        </Container>
    )
}

export default HumidChart