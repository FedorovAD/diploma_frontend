import React, { useEffect, useMemo, useState } from 'react';
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
  FormLabel,
  background,
  transition,
  Radio,
  RadioGroup
} from '@chakra-ui/react'
import { FilterType, getSuitablePlaces, setFilters } from '../storage/filters';
import { useAppDispatch, useAppSelector } from '../storage/context';
import back from '../pictures/background.jpg'
import { transform } from 'typescript';

type FormData = {
  address: string;
  price: string;
  type: string;
}



const MainPage = () => {
  const [value, setValue] = React.useState('1')
  const { filters } = useAppSelector((state) => state.params)
  const { control, formState: { errors }, handleSubmit, register } = useForm<FormData>({
    defaultValues: useMemo(() => {
      return {
        address: filters?.address ?? '',
        price: filters?.price.toString() ?? '',
        type: filters?.type.toString() ?? '1'
      }
    }, [filters])
  })
  const getErrorMessage = (fieldName: string, errs: Record<string, any>): string | undefined =>
    typeof errs?.[fieldName]?.message === 'string' ? errs?.[fieldName]?.message : undefined;
  const [sliderValue, setSliderValue] = useState(filters?.distance ?? 5)
  const labelStyles = {
    mt: '2',
    ml: '-2.5',
    fontSize: 'sm',
  }
  const navigate = useNavigate()
  const dispatch = useAppDispatch();
  const Handler = (data: FieldValues) => {
    const user_form: FilterType = {
      address: data.address,
      price: parseInt(data.price, 10),
      distance: sliderValue,
      type: parseInt(data.type, 10)
    }
    dispatch(setFilters(user_form))
    dispatch(getSuitablePlaces())
    navigate("/result")
  }

  const { isOpen, onOpen, onClose } = useDisclosure()
  const [counter, setCounter] = useState(0)
  useEffect(() => {
    setCounter(10)
  }, [])
  const [isHover, setIsHover] = useState(false)
  const handleMouseEnter = () => {
    setIsHover(true);
  }
  const handleMouseLeave = () => {
    setIsHover(false);
  }
  const buttonStyle = {
    borderRadius: '20px',
    transform: isHover ? 'scale(1.2)' : 'scale(1)',
    transition: '0.15s',
    letterSpacing: isHover ? '0.15em' : '0',
    backgroundColor: isHover ? 'rgb(32, 178, 170)' : 'white',
  };

  return (
    <Flex className="App" direction={'column'} width={"100vw"} height={"100vh"} justifyContent={'center'} alignItems={'center'} backgroundImage={back} bgRepeat={'no-repeat'} bgSize={'cover'}>
      <Flex direction={'column'} justifyContent={'center'} alignItems={'center'}>
        <Heading mb={'200'} fontSize='6xl' textShadow='1px 1px' fontFamily={'monospace'}>Найди идеальное место для отдыха!</Heading>
        <Text mb={'100'} fontSize='2xl' textShadow='1px 1px' fontFamily={'monospace'}>Заполни форму по кнопке ниже и наслаждайся результатом!</Text>
        <>
          <Button onClick={onOpen} cursor={'pointer'} style={buttonStyle} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} fontFamily={'monospace'}>Нажми, чтобы начать!</Button>

          <Modal onClose={onClose} isOpen={isOpen} isCentered>
            <ModalOverlay />
            <ModalContent width={'50vw'} height={'70vh'} shadow='dark-lg'>
              <FormControl isRequired isInvalid>
                <ModalHeader fontFamily={'monospace'}>Заполните данные для продолжения</ModalHeader>
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
                            bg='rgb(32, 178, 170)'
                            color='white'
                            mt='-10'
                            ml='-5'
                            w='12'
                          >
                            {sliderValue}км
                          </SliderMark>
                          <SliderTrack>
                            <SliderFilledTrack bg='rgb(32, 178, 170)' />
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
                      <FormLabel>Введите предпочитаемое место для посещения:</FormLabel>
                      <Controller
                        control={control}
                        {...register("type", {
                        })}
                        render={({ field: { value, onChange } }) => (
                          <RadioGroup onChange={onChange} value={value}>
                            <Stack direction='row'>
                              <Radio value='1'>Все</Radio>
                              <Radio value='2'>Музей</Radio>
                              <Radio value='3'>Театр</Radio>
                              <Radio value='4'>Кинотеатр</Radio>
                            </Stack>
                          </RadioGroup>
                           )}
                           />
                           <FormErrorMessage>
                             {getErrorMessage('type', errors)}
                           </FormErrorMessage>
                    </CardBody>
                  </Card>

                </ModalBody>
                <ModalFooter justifyContent={'space-between'} alignItems={'center'}>
                  <Flex>
                    <Button mt='3' bg='red' onClick={onClose}>Выход</Button>
                  </Flex>
                  <Flex>
                    <Button
                      mt={3}
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
