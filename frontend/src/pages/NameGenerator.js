import React, { useEffect, useState } from 'react'
import { Container, FlexBox } from "../components";
import styled from 'styled-components'
import { HiOutlineChevronRight } from 'react-icons/hi'
import API from "../api/api";
import { motion } from "framer-motion";
import { styles } from "../styles";


export const NameGenerator = () => {
    const [input, setInput] = useState('')
    const [loading, setLoading] = useState(false)
    const [disabled, setDisabled] = useState(false)
    const [receiveValue, setReceiveValue] = useState('keywords')
    const [payload, setPayload] = useState({})
    const [messages, setMessages] = useState([
        {
            sender: "bot@davinci",
            message: "This is the name generating program."
        },
        {
            sender: "bot@davinci",
            message: "Enter a description of your project and I'll give you a cool name!"
        }
    ])

    useEffect(() => {
        if (disabled) {
            setTimeout(() => {
                setDisabled(false)
            }, 3000)
        }
    }, [disabled])

    useEffect(() => {
        if (receiveValue === 'description') {
            const message = {
                sender: 'bot@davinci',
                message: 'You can keep sending descriptions and we\'ll give you names'
            }
            setMessages([
                ...messages, message
            ])
        }
    }, [receiveValue])

    useEffect(() => {
        if (!!payload.description) {
            findName()
        }
    }, [payload])


    const handleKeypress = (e) => {
        //it triggers by pressing the enter key
        if (e.keyCode === 13 && disabled === false) {
            submitDescription()
            setDisabled(true)
        }
    };

    const submitDescription = () => {
        const message = {
            sender: 'user@McHacks9/namegenerator',
            message: input
        }
        setMessages([
            ...messages, message
        ])
        setPayload({
            ...payload,
            description: input
        })
        setInput('')
    }

    const findName = () => {
        setLoading(true)
        API.post(`/nameGenerator`, payload).then((res) => {
            const message = {
                sender: 'bot@davinci',
                message: res.data.name
            }
            setMessages([
                ...messages, message
            ])
            setPayload({})
            setLoading(false)

        })
    }


    useEffect(() => {
        var elem = document.getElementById('scroll');
        elem.scrollTop = elem.scrollHeight;
    }, [messages])

    return (
        <Container
            initial={{ opacity: 0.8 }}
            animate={{ opacity: 0.95 }}
            transition={{ duration: 0.5 }}
            direction={'column'}>
            <div id="scroll" style={{ maxHeight: '70vh', height: '70vh', overflowY: 'scroll', width: '100%' }}>
                <Messages id={'messages'} fluid={"true"} direction={'column'} justify={'flex-end'} align={'flex-start'}
                    style={{ paddingBottom: 20 }}>
                    {messages.map((idea, id) =>
                        <FlexBox
                            key={id}>
                            <Text style={{ display: 'flex', alignSelf: 'flex-start', whiteSpace: 'nowrap' }}>{idea.sender} ></Text>
                            <Text style={{ maxWidth: '95%', whiteSpace: 'pre-line' }}>{idea.message}</Text>
                        </FlexBox>
                    )}
                </Messages>
            </div>
            <InputContainer align={'center'} justify={'flex-start'}>
                <HiOutlineChevronRight style={{ color: 'white', width: '40px', fontSize: 30, paddingLeft: 20 }} />
                <Input onKeyDown={(e) => {
                    handleKeypress(e)
                }} value={input} onChange={e => setInput(e.target.value)}
                    variant="unstyled" placeholder={loading ? "Loading..." : "Input an idea description"} />
            </InputContainer>
        </Container>
    )
}


const Messages = styled(FlexBox)`
`

const Input = styled.input`
  font-size: 20px;
  background-color: transparent;
  border: none;
  padding: 20px;
  width: 100%;
  color: white;
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
  box-shadow:0 0 0 1px ${styles.colors.black} inset;
  margin-inside: 20px;
  height: 10vh;
    border-top: 1px solid white;

`

const Text = styled(motion.p)`
  margin-left: 16px;
  font-size: 18px;
`

