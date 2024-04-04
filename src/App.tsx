import React, { useEffect, useState } from 'react';
import { Button, Flex, Text } from '@chakra-ui/react';

function App() {
  const [counter, setCounter] = useState(0)
  useEffect(() => {
    setCounter(10)
  }, [])
  return (
    <Flex className="App" direction={'column'} width={"100vw"} height={"100vh"} justifyContent={'center'} alignItems={'center'}>
      <Text>
        {counter}
      </Text>
      <Flex gap={'3'}>
        <Button onClick={() => setCounter((prev) => prev - 1)} width={'30px'} height={'20px'} variant={'outline'} colorScheme='blue'>
            -
        </Button>
        <Button onClick={() => setCounter((prev) => prev + 1)} width={'30px'} height={'20px'} variant={'outline'} colorScheme='red'>
            +
        </Button>
      </Flex>
    </Flex>
  );
}

export default App;
