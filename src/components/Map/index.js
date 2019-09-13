import React, { Fragment } from 'react';
import Geolocation from '@react-native-community/geolocation';
import { View, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Geocoder from 'react-native-geocoding';

import Search from '../Search'
import Directions from '../Directions'
import Details from '../Details'

import { getPixelSize } from '../../utils'

import backImage from '../../assets/back.png'

import { 
	LocationBox, LocationText,
	LocationTimeBox, LocationTimeText, LocationTimeSmall,
	Back
} from './styles'

Geocoder.init('AIzaSyARltgmoCHFP0Z_NucYNG2MCd9_845Cr4Y')

export default class Map extends React.Component {

	state = {
		region: null,
		destination: null,
		duration: null,
		location: null,
	}
 
	componentDidMount = () => {
		Geolocation.getCurrentPosition(
			async ({ coords: { latitude, longitude }}) => {
				const response = await Geocoder.from({latitude, longitude})
				const address = response.results[0].formatted_address
				const location = address.substring(0, address.indexOf(','))
				this.setState({
					location,
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

	handleBack = () => {
		this.setState({ destination: null })
	}

	render() {
		const { region, destination, duration, location } = this.state
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
										this.setState({
											duration: Math.floor(
												result.duration
											)
										})
										this.mapView.fitToCoordinates(
											result.coordinates, 
											{
												edgePadding: {
													right: getPixelSize(50),
													left: getPixelSize(50),
													top: getPixelSize(50),
													bottom: getPixelSize(350)
												}
											}
										)
									}}/>
									<Marker coordinate={destination}>
										<LocationBox>
											<LocationText>
												{ destination.title }
											</LocationText>
										</LocationBox>
									</Marker>

									<Marker coordinate={region}>
										<LocationBox>
											<LocationTimeBox>
												<LocationTimeText>
													{ duration }
												</LocationTimeText>
												<LocationTimeSmall>
													MIN
												</LocationTimeSmall>
											</LocationTimeBox>
											<LocationText>
												{ location }
											</LocationText>
										</LocationBox>
									</Marker>
							</Fragment>
						)}
				</MapView>
				{ destination 
					? 
					<Fragment>
						<Back onPress={this.handleBack}>
							<Image source={backImage}/>
						</Back>
						<Details />
					</Fragment>
					: 
					<Search onLocationSelected={this.handleLocationSelected}/> 
				}
				
			</View>
		)
	}
}
