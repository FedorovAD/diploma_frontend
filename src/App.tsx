import React, { useEffect, useState } from 'react';
import { Box, Button, Flex, Text, useDisclosure } from '@chakra-ui/react';
import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react'
import { Input, InputLeftAddon, InputRightAddon, Stack, InputGroup } from '@chakra-ui/react'
import {
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderMark,
} from '@chakra-ui/react'
import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from '@chakra-ui/react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Heading
} from '@chakra-ui/react'




function App() {
  const [sliderValue, setSliderValue] = useState(5)
  const labelStyles = {
    mt: '2',
    ml: '-2.5',
    fontSize: 'sm',
  }
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [counter, setCounter] = useState(0)
  useEffect(() => {
    setCounter(10)
  }, [])
  return (
    <Flex className="App" direction={'column'} width={"100vw"} height={"100vh"} justifyContent={'center'} alignItems={'center'}>
      <Flex direction={'column'} justifyContent={'center'} alignItems={'center'}>
      <Heading mb={'200'} fontSize='6xl' >Найди идеальное место для отдыха!</Heading>
      <Text mb={'100'} fontSize='2xl'>Чтобы найти наиболее подходящее тебе место для отдыха, заполни форму по кнопке ниже и наслаждайся результатом!</Text>
    <>
        <Button onClick={onOpen}>Нажми, чтобы начать!</Button>

        <Modal onClose={onClose} isOpen={isOpen} isCentered>
          <ModalOverlay />
          <ModalContent width={'50vw'} height={'70vh'}>
            <ModalHeader>Заполните данные для продолжения</ModalHeader>
            <ModalCloseButton />
            <ModalBody>

              <Card>
                <CardBody>

                  <Text mb={'5'}>Введите свой адрес:</Text>
                  <InputGroup>
                    <InputLeftAddon>
                      Москва
                    </InputLeftAddon>
                    <Input type='tel' placeholder='введите адрес' />
                    </InputGroup>
                    <Text mb={'5'} mt={'5'}>Введите максимальное расстояние, на которое готовы отправиться:</Text>
                    <Box p={4} pt={6}>
                      <Slider mb={'5'} mt={'5'} aria-label='slider-ex-6' min={0} max={10} onChange={(val) => setSliderValue(val)}>
                        <SliderMark value={2} {...labelStyles}>
                          2км
                        </SliderMark>
                        <SliderMark value={5} {...labelStyles}>
                          5км
                        </SliderMark>
                        <SliderMark value={8} {...labelStyles}>
                          8км
                        </SliderMark>
                        <SliderMark
                          value={sliderValue}
                          textAlign='center'
                          bg='blue.500'
                          color='white'
                          mt='-10'
                          ml='-5'
                          w='12'
                        >
                          {sliderValue}км
                        </SliderMark>
                        <SliderTrack>
                          <SliderFilledTrack />
                        </SliderTrack>
                        <SliderThumb />
                      </Slider>
                    </Box>
                    <Text mt={'5'} > Введите максимальную сумму(в рублях), которую вы готовы потратить:</Text>
                    <NumberInput mt={'5'} >
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>

                </CardBody>
              </Card>

            </ModalBody>
            <ModalFooter justifyContent={'space-between'} alignItems={'center'}>
              <Flex>
                <Button bg='red' onClick={onClose}>Выход</Button>
              </Flex>
              <Flex>
                <Button bg='green' onClick={onClose}>Поехали!</Button>
              </Flex>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>


      </Flex>  
    </Flex>
  );
}

export default App;
