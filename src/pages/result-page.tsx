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
import { useAppSelector } from '../storage/context';


const aboba = [{name: 'cock', age: '25'},{name: 'cock', age: '25'},{name: 'cock', age: '25'},{name: 'cock', age: '25'},{name: 'cock', age: '25'},{name: 'cock', age: '25'}]



function ResultPage() {
  const filter = useAppSelector(state => state.params);
  const [data, setData] = useState([]);
   useEffect(() => {
    console.log(filter)
    new Promise((resolve) => {
      const response = await axios
            .request({
                method: "post",
                url: `http://localhost:8080/v1/result`,
                data: {
                    street
                },
                withCredentials: true,
            });
      return setTimeout(() => resolve(aboba), 500)
    }).then((data:unknown) => setData(data as never[]));
   }, [])
  return (
    <Flex className="App" direction={'column'} width={"100vw"} height={"100vh"} justifyContent={'center'} alignItems={'center'}>
      <Flex width={"90vw"} height={"90vh"} border={'solid'} borderRadius='10' borderColor={'grey'} wrap={'wrap'} alignContent={'flex-start'} padding={5} justifyContent={'start'} gap={5}>
        {
          data.map((item, idx) =>
            <Card key={idx} height={"24%"} border={'solid'} borderRadius='10' borderColor={'grey'} marginBottom={2} flex='0 1 24%'>
              <CardBody>
               <Text>{(item as any).name}</Text>
               <Text>{(item as any).age}</Text>
              </CardBody>
            </Card>
        )}
      </Flex>
    </Flex>
  );
}

export default ResultPage;
