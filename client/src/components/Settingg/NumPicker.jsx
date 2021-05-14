
import styled from "styled-components"
import React from 'react'
const Container = styled.div`
    
    display: flex;
    width:100%;
    flex-direction: row;
    justify-content: center;

    & button {
        display: block;
        width: 20%;
        background: ${props => props.theme.color.fill.primary};
        color: ${props => props.theme.color.background.primary};
        text-align: center;
        border: none;
        outline: none;
        padding: 0.5rem 1rem;
        
        &:hover {
            background: grey;
        }
        justify-content:space-between;
    }
    & input[type='text']{
        width: 60%;
        text-align: center;
    }
        
    
    
`
class NumPicker extends React.Component {
    constructor(props) {
        super(props);
        this.state = { value: 150 };
        this.handleIncrease = this.handleIncrease.bind(this);
        this.handleDecrease = this.handleDecrease.bind(this);        
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({ value: parseInt(event.target.value) });
    }
    handleIncrease(event) {
        this.setState({ value: this.state.value + 1 });
    }
    handleDecrease(event) {
        this.setState({ value: this.state.value - 1 });
    }
    
    render() {
        return (
                
            <Container >
                <button onClick={this.handleDecrease} >-</button>
                <input type='text' value={this.state.value} onChange={this.handleChange} />
                <button onClick={this.handleIncrease}>+</button>
            </Container>
        )
    }
}



export default NumPicker