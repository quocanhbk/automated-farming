import React from 'react'
import styled from 'styled-components'
import { useTable } from 'react-table'
import Header from "../Header"
import Redirector from '../Redirector'

const Container = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    
`
const Body = styled.div`
    flex: 1;
    padding: 1rem;
    display: flex;
    justify-content:center;
    flex-direction: column;
    gap: 1rem;
    background: ${props => props.theme.color.background.primary};
`
const Styles = styled.div`
  padding: 1rem;

  table {
    border-spacing: 0;
    border: 1px solid black;

    tr {
           td{ text-align: center;}
           :last-child {
                td {
                   border-bottom: 0;            
                }
            }
        
    }
    

    th,
    td {
      margin: 0;
      padding: 0.4rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;
      
      :last-child {
        border-right: 0;
        
      }
    }
  }
`

const Table=({ columns, data })=> {
    
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({
        columns,
        data,
    })

    
    return (
        <table {...getTableProps()}>
            <thead>
                {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map(column => (
                            <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody {...getTableBodyProps()}>
                {rows.map((row, i) => {
                    prepareRow(row)
                    return (
                        <tr {...row.getRowProps()}>
                            {row.cells.map(cell => {
                                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                            })}
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}

const History=()=> {
    const columns =
        [
            {
                Header: 'Thời điểm',
                accessor: 'time'
                
            },
            {
                Header: 'Độ ẩm',
                accessor: 'humid'
                
            },
            {
                Header: 'Thời gian(s)',
                accessor: 'duration'

            },
        ]
    

    const data = [
        {
            time: '17/05/2021 - 21:00',
            humid: 50,
            duration: 100
        },
        {
            time: '17/05/2021 - 21:00',
            humid: 50,
            duration: 100
        },
        {
            time: '17/05/2021 - 21:00',
            humid: 50,
            duration: 100
        },
        {
            time: '17/05/2021 - 21:00',
            humid: 50,
            duration: 100
        },
        {
            time: '17/05/2021 - 21:00',
            humid: 50,
            duration: 100
        },
        {
            time: '17/05/2021 - 21:00',
            humid: 50,
            duration: 100
        },
        {
            time: '17/05/2021 - 21:00',
            humid: 50,
            duration: 100
        },
        {
            time: '17/05/2021 - 21:00',
            humid: 50,
            duration: 100
        },
        {
            time: '17/05/2021 - 21:00',
            humid: 50,
            duration: 100
        },
        {
            time: '17/05/2021 - 21:00',
            humid: 50,
            duration: 100
        },
        {
            time: '17/05/2021 - 21:00',
            humid: 50,
            duration: 100
        }
    ]

    return (
        <Redirector>
            <Container>
                <Header text={'Xem lịch sử tưới'} />
                <Body>
                    
                    <Styles>
                        <Table columns={columns} data={data} />
                    </Styles>
                    
                </Body>
            </Container>
        </Redirector>
    )
}

export default History