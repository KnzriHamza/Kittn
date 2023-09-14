import React from 'react'
import { View, Text } from 'react-native'

import {Box, Button, CheckIcon, FormControl, Input, Modal, Select, TextArea} from "native-base";

const AddTodoModal = () => {




    return (
            <Modal.Content>
                <Modal.CloseButton />
                <Modal.Header>Add  new Note</Modal.Header>
                <Modal.Body >
                    <FormControl>
                        <FormControl.Label>Note Title</FormControl.Label>
                        <Input
                        />
                    </FormControl>
                    <FormControl mt="3">
                        <FormControl.Label>Note Description</FormControl.Label>

                        <TextArea width="100%" // for android and ios
                                  w="100%" maxW="300" />
                    </FormControl>
                    <FormControl>
                        <FormControl.Label>Note Categorie</FormControl.Label>
                        <Box maxW="300">
                            <Select
                                minWidth="200" accessibilityLabel="Choose Service" placeholder="Choose Service" _selectedItem={{
                                bg: "teal.600",
                                endIcon: <CheckIcon size="5" />
                            }} mt={1} >
                                <Select.Item label="Uncategorized" value="0" />

                            </Select>
                        </Box>
                    </FormControl>
                    <FormControl>
                        <FormControl.Label>Due Date</FormControl.Label>
                        <Input  />
                    </FormControl>
                    <FormControl>
                        <FormControl.Label>Priority</FormControl.Label>
                        <Select minWidth="200" accessibilityLabel="Choose Service" placeholder="Choose Service" _selectedItem={{
                            bg: "teal.600",
                            endIcon: <CheckIcon size="5" />
                        }} mt={1} >
                            <Select.Item label="Lowest" value="Lowest" />
                            <Select.Item label="Low" value="Low" />
                            <Select.Item label="Medium" value="Medium" />
                            <Select.Item label="High" value="High" />
                            <Select.Item label="Highest" value="Highest" />
                        </Select>
                    </FormControl>

                </Modal.Body>
                <Modal.Footer>
                    <Button.Group space={2}>
                        <Button variant="ghost" colorScheme="blueGray" onPress={() => {
                            setModalVisible(false);
                        }}>
                            Cancel
                        </Button>
                        <Button onPress={() => {
                            setModalVisible(false);
                            onModalSubmit();
                        }}>
                            Save
                        </Button>
                    </Button.Group>
                </Modal.Footer>
            </Modal.Content>
  )
}

export default AddTodoModal