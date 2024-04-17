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
  Heading
} from '@chakra-ui/react'
import { useAppDispatch, useAppSelector } from '../storage/context';
import { getSuitablePlaces } from '../storage/filters';




function ResultPage() {
  const dispatch = useAppDispatch();
  const {data} = useAppSelector((state) => state.params)
  return (
    <Flex className="App" direction={'column'} width={"100vw"} height={"100vh"} justifyContent={'center'} alignItems={'center'}>
      <Flex width={"90vw"} height={"90vh"} border={'solid'} borderRadius='10' borderColor={'grey'} wrap={'wrap'} alignContent={'flex-start'} padding={5} justifyContent={'start'} gap={5}>
        { data &&
          data.map((item, idx) =>
            <Card key={idx} height={"24%"} border={'solid'} borderRadius='10' borderColor={'grey'} marginBottom={2} flex='0 1 24%'>
              <CardBody>
               <Text>{item.name}</Text>
               <Text>{item.place_type}</Text>
               <Text>{item.link}</Text>
              </CardBody>
            </Card>
        )}
      </Flex>
    </Flex>
  );
}

export default ResultPage;
