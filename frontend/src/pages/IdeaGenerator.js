import React, { useEffect, useState } from 'react';
import { Container, FlexBox } from "../components";
import { HiOutlineChevronRight } from "react-icons/hi";
import styled from "styled-components";
import API from "../api/api";

export const IdeaGenerator = () => {

    const [input, setInput] = useState('')
    const [payload, setPayload] = useState({})
    const [messages, setMessages] = useState([
        {
            sender: "bot",
            message: "This is your idea generating assistant."
        },
        {
            sender: "bot",
            message: "Enter 3 keywords keywords separated by a commas that have to do with your idea."
        },
        {
            sender: "bot",
            message: "Here's an example:"
        },
        {
            sender: "bot",
            message: "train, wait times, algorithm"
        }
    ])


    const submitKeywords = () => {
        const message = {
            sender: 'user@McHacks/namegenerator',
            message: input
        }
        setMessages([
            ...messages, message
        ])
        setPayload({
            ...payload,
            keywords: input.split(' ')
        })
        setInput('')
    }

    useEffect(() => {
        if (!!payload.keywords) {
            findName()
        }
    }, [payload])


    const findName = () => {
        API.post(`/test`, payload).then((res) => {
            console.log(res)
            const message = {
                sender: 'bot',
                message: res.data.name
            }
            setMessages([
                ...messages, message
            ])
            setPayload({})
        })
    }

    const handleKeypress = (e) => {
        //it triggers by pressing the enter key
        if (e.keyCode === 13) {
            submitKeywords()
        }
    };

    return (
        <Container
            initial={{ opacity: 0.8 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            direction={'column'}>
            <div style={{ maxHeight: '70vh', height: '70vh', overflowY: 'scroll', width: '100%' }}>
                <Messages id={'messages'} fluid={"true"} direction={'column'} justify={'flex-end'} align={'flex-start'}
                    style={{ paddingBottom: 20 }}>
                    {messages.map((idea, id) =>
                        <FlexBox key={id}>
                            <Text>{idea.sender}</Text>
                            <Text>{idea.message}</Text>
                        </FlexBox>
                    )}
                </Messages>
            </div>
            <InputContainer align={'center'} justify={'flex-start'}>
                <HiOutlineChevronRight style={{ color: 'white', width: '40px', fontSize: 30, paddingLeft: 20 }} />
                <Input onKeyDown={(e) => {
                    handleKeypress(e)
                }} value={input} onChange={e => setInput(e.target.value)}
                    variant="unstyled" placeholder={"Add an Idea"} />
            </InputContainer>
        </Container>
    )
}

export default IdeaGenerator


const Messages = styled(FlexBox)`
`

const Input = styled.input`
  font-size: 20px;
  background-color: transparent;
  border: none;
  padding: 20px;
  width: 100%;
  &:focus {
    outline: none;
  }
  &::placeholder {
  color: white;
  opacity: 0.8;
  }
`

const InputContainer = styled(FlexBox)`
  width: 100%;
  box-shadow:0 0 0 1px black inset;
  margin-inside: 20px;
  height: 10vh;
`

const Text = styled.p`
  margin-left: 16px;
  font-size: 18px;
`