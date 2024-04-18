import React, { useEffect, useState, useContext } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import axios from 'axios';

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
  ModalCloseButton,
  Heading,
  Link,
  Image
} from '@chakra-ui/react'
import { useAppDispatch, useAppSelector } from '../storage/context';
import { getSuitablePlaces } from '../storage/filters';
import back from '../pictures/background.jpg'
import museum from '../pictures/museum.png'
import cinema from '../pictures/cinema.png'
import theatre from '../pictures/theatre.png'



function ResultPage() {
  const scrollSettings = {
    '&::-webkit-scrollbar': {
      width: '5px',
      borderRadius: '8px',
      backgroundColor: `rgba(0, 0, 0, 0.1)`,
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: `rgba(240, 230, 140, 1)`,
      height: '10px'
    }
  }
  const dispatch = useAppDispatch();
  const { data } = useAppSelector((state) => state.params)
  return (
    <Flex className="App" direction={'column'} width={"100vw"} height={"100vh"} justifyContent={'center'} alignItems={'center'} backgroundImage={back} bgRepeat={'no-repeat'} bgSize={'cover'}>
      <Flex width={"90vw"} height={"90vh"} border={'solid'} borderRadius='10' borderColor={'transparent'} wrap={'wrap'} alignContent={'flex-start'} padding={5} justifyContent={'start'} gap={5} bg={'transparent'} overflowY={'scroll'} overflowX={'hidden'} sx={scrollSettings}>
        {data &&
          data.map((item, idx) =>
            <Card key={idx} shadow='dark-lg' height={"24%"} border={'solid'} borderRadius='10' borderColor={'transparent'} marginBottom={2} flex='0 1 24%' bg={'transparent'} backdropFilter={'blur(20px)'}>
              <CardBody>
                <Flex alignItems={'center'} justifyContent={'flex-start'} gap={10}>
                  <Box minHeight={'130px'} minWidth={'130px'} maxHeight={'130px'} maxWidth={'130px'}>
                    {(item.place_type === 'Музей') &&
                      <Image src={museum} w='100%' h='100%' objectFit={'contain'} />
                    }
                    {(item.place_type === 'Кинотеатр') &&
                      <Image src={cinema} w='100%' h='100%' objectFit={'contain'} />
                    }
                    {(item.place_type === 'Театр') &&
                      <Image src={theatre} w='100%' h='100%' objectFit={'contain'} />
                    }
                  </Box>
                  <Stack maxW='50%'>
                    <Text>Название: {item.name}</Text>
                    <Text>Тип: {item.place_type}</Text>
                    <Link href={item.link} isExternal>Ссылка на сайт</Link>
                  </Stack>
                </Flex>
              </CardBody>
            </Card>
          )}
      </Flex>
    </Flex>
  );
}

export default ResultPage;
