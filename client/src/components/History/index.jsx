import styled from "styled-components"
import Header from "../Header"
import React from 'react'
import ReactDataGrid from '@inovua/reactdatagrid-enterprise';
import '@inovua/reactdatagrid-enterprise/index.css';


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
`

const columns = [
    { name: 'time', header: 'Thời điểm', defaultFlex: 2 },
    { name: 'humid', header: 'Độ ẩm', defaultFlex: 1  },
    { name: 'duration', header: 'Thời gian \n (giây)', defaultFlex: 1 }
];
const gridStyle = { minHeight: 550 };
const rows = [
    { time: '16/5/2021 - 15:00', humid: '50', duration: '300' },
    { time: '16/5/2021 - 15:00', humid: '50', duration: '300' },
    { time: '16/5/2021 - 15:00', humid: '50', duration: '300' },
    { time: '16/5/2021 - 15:00', humid: '50', duration: '300' },
    { time: '16/5/2021 - 15:00', humid: '50', duration: '300' },
    { time: '16/5/2021 - 15:00', humid: '50', duration: '300' },
    { time: '16/5/2021 - 15:00', humid: '50', duration: '300' },
    { time: '16/5/2021 - 15:00', humid: '50', duration: '300' },
    { time: '16/5/2021 - 15:00', humid: '50', duration: '300' },
    { time: '16/5/2021 - 15:00', humid: '50', duration: '300' },
    { time: '16/5/2021 - 15:00', humid: '50', duration: '300' }

];


const History = () => {
    

    
    return (       
        <Container>
            <Header text={'Xem lịch sử tưới'}/>
            <Body>
                <ReactDataGrid 
                    idProperty="time"
                    columns={columns}
                    dataSource={rows}                    
                    style={gridStyle}
                    />
            </Body>
        </Container>
    )
}

export default History