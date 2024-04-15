import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Controller, FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import {
  Box,
  Button,
  Flex,
  Text,
  useDisclosure,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Input,
  InputLeftAddon,
  InputRightAddon,
  Stack,
  InputGroup,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderMark,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  FormControl,
  ModalCloseButton,
  Heading,
  FormErrorMessage,
  FormLabel
} from '@chakra-ui/react'
import { FilterState, setFilters } from '../storage/filters';
import { useAppDispatch } from '../storage/context';





const MainPage = () => {
  const { control, formState: { errors }, handleSubmit, register } = useForm()
  const getErrorMessage = (fieldName: string, errs: Record<string, any>): string | undefined =>
    typeof errs?.[fieldName]?.message === 'string' ? errs?.[fieldName]?.message : undefined;
  const [sliderValue, setSliderValue] = useState(5)
  const labelStyles = {
    mt: '2',
    ml: '-2.5',
    fontSize: 'sm',
  }
  const navigate = useNavigate()
  const dispatch = useAppDispatch();
  const Handler = (data: FieldValues) => {
    const user_form: FilterState = {
      address: data.address,
      price: data.price,
      distance: sliderValue
    }
    dispatch(setFilters(user_form))
    navigate("/result")
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
              <FormControl isRequired isInvalid>
                <ModalHeader>Заполните данные для продолжения</ModalHeader>
                <ModalCloseButton />
                <ModalBody>

                  <Card>
                    <CardBody>
                      <FormLabel>Введите свой адрес:</FormLabel>
                      <Controller
                        control={control}
                        {...register("address", {
                        })}
                        render={({ field: { value, onChange } }) => (
                          <InputGroup>
                            <InputLeftAddon>
                              Москва
                            </InputLeftAddon>
                            <Input
                              id='address'
                              type='address'
                              value={value}
                              onChange={onChange}
                            />
                          </InputGroup>
                        )}
                      />
                      <FormErrorMessage>
                        {getErrorMessage('address', errors)}
                      </FormErrorMessage>

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
                      <FormLabel>Введите максимальную сумму(в рублях), которую вы готовы потратить:</FormLabel>
                      <Controller
                        control={control}
                        {...register("price", {
                        })}
                        render={({ field: { value, onChange } }) => (
                          <Input
                            id='price'
                            type='price'
                            value={value}
                            onChange={onChange}
                          />
                        )}
                      />
                    </CardBody>
                  </Card>

                </ModalBody>
                <ModalFooter justifyContent={'space-between'} alignItems={'center'}>
                  <Flex>
                    <Button bg='red' onClick={onClose}>Выход</Button>
                  </Flex>
                  <Flex>
                    <Button
                      mt={4}
                      colorScheme='teal'
                      type='submit'
                      onClick={handleSubmit(Handler)}
                    >
                      Поехали!
                    </Button>
                    {/* <Button bg='green' onClick={onClose}>
                      <Link to={'/result'}>Поехали!</Link>
                    </Button> */}
                  </Flex>
                </ModalFooter>
              </FormControl>
            </ModalContent>
          </Modal>
        </>


      </Flex>
    </Flex>
  );
}

export default MainPage;
