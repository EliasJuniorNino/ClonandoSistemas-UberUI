import React, { Fragment } from 'react';
import Geolocation from '@react-native-community/geolocation';
import { View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

import Search from '../Search'
import Directions from '../Directions'

import { getPixelSize } from '../../utils'

export default class Map extends React.Component {

	state = {
		region: null,
		destination: null
	}
 
	componentDidMount = () => {
		Geolocation.getCurrentPosition(
			({ coords: { latitude, longitude }}) => {
				this.setState({
					region: {
						latitude,
						longitude,
						latitudeDelta: 0.0143,
						longitudeDelta: 0.0134
					}
				})
			},
			() => { 
				alert('Não foi possivel pegar a localização')
			},
			{
				enableHighAccuracy: true, 
				timeout: 20000, 
				maximumAge: 1000
			}
		)
	}

	handleLocationSelected = (data, { geometry }) => {
		const { location: { lat: latitude, lng: longitude }} = geometry
		this.setState({ 
			destination: {
				latitude, 
				longitude, 
				title: data.structured_formatting.main_text 
			}
		})
	}

	render() {
		const { region, destination } = this.state
		return (
			<View style={{ flex: 1}}>
				<MapView 
						style={{ flex: 1}}
						region={region}
						showsUserLocation
						loadingEnabled
						ref={ el => this.mapView = el }
					>
						{ destination && (
							<Fragment>
								<Directions
									origin={region}
									destination={destination}
									onReady={result => {
										console.log(result)
										this.mapView.fitToCoordinates(result.coordinates, {
											edgePadding: {
												right: getPixelSize(50),
												left: getPixelSize(50),
												top: getPixelSize(50),
												bottom: getPixelSize(50)
											}
										})
									}}/>
									<Marker coordinate={destination}/>
							</Fragment>
						)}
				</MapView>
				<Search onLocationSelected={ this.handleLocationSelected }/>
			</View>
		)
	}
}
