import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Header from "../Header"
import axios from 'axios'
import moment from 'moment'
import { getFader } from '../../utils/color'
import Loader from '../Loader'
import {FaReact} from 'react-icons/fa'
const Container = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    
`
const Body = styled.div`
    flex: 1;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    background: ${props => props.theme.color.background.primary};
    background: ${props => getFader(props.theme.color.fill.primary, 0.2)};
    overflow: auto;
`
const Table = styled.div`
    border: 1px solid ${props => props.theme.color.fill.primary};
    overflow: auto;
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    border-radius: 0.5rem;
`
const HeaderCell = styled.div`
    padding: 0.5rem 0;
    background: ${props => props.theme.color.fill.primary};
    color: ${props => props.theme.color.background.primary};
    flex: ${props => props.flex};
    text-align: center;
`
const Tbody = styled.div`
    flex: 1;
    overflow: overlay;
    scroll-behavior: smooth;
    position: relative;
    /* width */
    ::-webkit-scrollbar {
        width: 0px;
    }   
`
const Row = styled.div`
    display: flex;
    background: ${props => props.theme.color.background.primary};
    &:nth-child(even) {
        background: ${props => getFader(props.theme.color.border.primary, 0.2)};
    }
`
const Cell = styled.div`
    text-align: center;
    padding: 0.5rem 0;
    flex: ${props => props.flex};
`
const History = () => {

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            let res = (await axios.get('/api/history/100')).data.history
            setData(res)
            setLoading(false)
        }
        fetchData()
    }, [])

    return (
        <Container>
            <Header text={'Xem lịch sử tưới'} />
            <Body>
                <Table>
                    <Row>
                        <HeaderCell flex={2}>Thời điểm</HeaderCell>
                        <HeaderCell flex={1}>Độ ẩm</HeaderCell>
                        <HeaderCell flex={1}>Thời gian</HeaderCell>
                    </Row>
                    <Tbody>
                        {loading && <Loader><FaReact size="4rem"/></Loader>}
                        {data.map(line => 
                            <Row className="cell-row" key={line.time}>
                                <Cell flex={2}>{moment(line.time).format("YYYY-MM-DD hh:mm")}</Cell>
                                <Cell flex={1}>{line.humidity}</Cell>
                                <Cell flex={1}>{line.duration}</Cell>
                            </Row>    
                        )}
                    </Tbody>
                </Table>                             
            </Body>
        </Container>
    )
}

export default History