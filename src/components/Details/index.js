import React, { Component } from 'react';

import { View } from 'react-native';

import { 
    Container, TypeTitle, TypeDescription, TypeImage, 
    RequestButton, RequestButtonText
} from './styles';

import uberX from '../../assets/uberx.png'

export default class Details extends Component {
  render() {
    return (
        <Container>
            <TypeTitle>Popular</TypeTitle>
            <TypeDescription>Viagens baratas para o dia a dia</TypeDescription>
            
            <TypeImage source={uberX}/>
            <TypeTitle>UberX</TypeTitle>
            <TypeDescription>RS 6,00</TypeDescription>
            
            <RequestButton>
                <RequestButtonText>SOLICITAR UBERX</RequestButtonText>
            </RequestButton>
        </Container>
    );
  }
}
