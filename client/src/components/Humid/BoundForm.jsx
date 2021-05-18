import styled from "styled-components"
import { getFader } from "../../utils/color"
import React, { useState } from 'react';
const Container = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: center;
    gap: 1rem;
    
`
const MainContent = styled.div`
    display: flex;
    padding:0.7rem;
    width: 100%;
    border: 2px solid grey;    
    flex-direction: column;    
    border-radius: 0.3rem;
    gap: 0.5rem;

    
`

const Button = styled.button`
    display: block;    
    width:40%;
    background: ${props => props.theme.color.fill.primary};
    color: ${props => props.theme.color.background.primary};
    border: none;
    outline: none;
    padding: 0.5rem 0.5rem;
    border-radius: 0.5rem;
    gap: 0.5rem;
    &:hover {
        background: ${props => getFader(props.theme.color.fill.primary, 0.8)}
    }
`
const LabelWrapper = styled.div`
    text-align: center;
    width: 100%;
    padding: 0.5rem;
    background: ${props => props.theme.color.background.secondary};
    color: ${props => props.theme.color.fill.primary};
    font-weight: 700;

`
const ElementWrapper = styled.div`
    
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
            background: ${props => getFader(props.theme.color.fill.primary, 0.8)};
        }
        justify-content:space-between;
        &:disabled{
        background: ${props => getFader(props.theme.color.fill.primary, 0.2)};
    }
        
    }
    
     & input[type='text']{
        width: 60%;
        text-align: center;
    }
`
const ButtonWrapper = styled.div`
    
    display:flex;
    flex-direction: row;
    gap: 1rem;
    align-items:center;
    justify-content: space-between;
`
const BoundForm = (props) => {
    const [upper, setUpper] = useState(parseInt(props.upper));
    const [lower, setLower] = useState(parseInt(props.lower));
    const reset = () => {
        setUpper(parseInt(props.upper));
        setLower(parseInt(props.lower));
    }
    return (
        
        <Container >
            <MainContent>
                <LabelWrapper>
                    <label>Ngưỡng trên</label>
                </LabelWrapper>
                <ElementWrapper>
                    <button onClick={() => setUpper(upper - 1)} disabled={(upper <= 0) ? true : false}> - </button>
                    <input type='text' className='upperBound' value={parseInt(upper)} onChange={(e) => setUpper(parseInt(e.target.value))} />
                    <button onClick={() => setUpper(upper + 1)} disabled={(upper >= 100) ? true : false}> + </button>
                </ElementWrapper>            
                <LabelWrapper>
                    <label>Ngưỡng dưới</label>
                </LabelWrapper>
                <ElementWrapper>
                    <button onClick={() => setLower(lower - 1)} disabled={(lower <= 0) ? true : false}> - </button>
                    <input type='text' className='lowerBound' value={parseInt(lower)} onChange={(e) => setLower(parseInt(e.target.value))} />
                    <button onClick={() => setLower(lower + 1)} disabled={(lower >= 100) ? true : false}> + </button>
                </ElementWrapper>
            </MainContent>
            <ButtonWrapper>
                <Button type='submit'>   Lưu   </Button>
                <Button onClick={reset}>   Hủy </Button>
            </ButtonWrapper>
        </Container>
        
    );
}
export default BoundForm