import React from 'react';
import { Modal, ScrollView } from 'react-native';
import AsyncStoreManager from '../../utils/asyncStoreManager';
import { useEffect } from 'react';
import TextBox from './TextBox';

const ShopList = (props) => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={true}
            style={{ zIndex: 30 }}
        >
            <ScrollView>
                <TextBox>
                    asdfjasdfjhkasdfasdfasdfasdfsad
                </TextBox>
            </ScrollView>
        </Modal>
    );
};

export default ShopList;