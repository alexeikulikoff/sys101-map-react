import React from 'react';

import * as L from 'leaflet';
import './App.css';
import { useEffect } from 'react';

import MovingMarker from './MovingMarker';
import { Marker, icon } from 'leaflet';
import { useState } from 'react';

interface MarkerFeaturs {
	id: string,
	marker: any
} 

const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';
const iconDefault = icon({
	iconRetinaUrl,
	iconUrl,
	shadowUrl,
	iconSize: [25, 41],
	iconAnchor: [12, 41],
	popupAnchor: [1, -34],
	tooltipAnchor: [16, -28],
	shadowSize: [41, 41]
});
Marker.prototype.options.icon = iconDefault;

const points = [{
	lat: 55.73953573722872, lng: 37.996671677062636
}, {
	lat: 55.73921322589313, lng: 38.00901580852176
}, {
	lat: 55.72709040900645, lng: 38.01215370062164
}, {
	lat: 55.72934605947811, lng: 37.983082492331135
}];

const points1 = [{
	
	lat: 55.74411916718369, lng: 37.9757205061743
}, {
	
	lat: 55.73609834923234, lng: 37.98323069091525
}, {
	
	lat: 55.73783794371552, lng: 37.96915445894364
}, {
	
	lat: 55.74456606186508, lng: 37.96190176625097
}];
const MOVE_TIME = 800;
let type = 1;
let curIndex = 0;
let isMoving = false;

const marker0: MarkerFeaturs[] = [{id: '0', marker: L.marker([0,0])}];

function App() {
	let map: any;
	let myMovingMarker: any;
	let myMovingMarker1: any;
    const [state, setState] = useState(marker0);
	
	
	useEffect(() => {
		map = L.map('map', {
				center: [55.7321061648069, 38.00508479327943],
				zoom: 13
		});
		L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
	
	},[]);

	const start = () => {
		const id = '2222';

		setState(m=>{
				console.log(m);
				if (m.filter(f=>f.id === id).length > 0){
					return m;
				}else{
					const m11 = MovingMarker(points1, 4000, id)
						.on('end', () => {
							console.log('reach end');
						});
					//m11.start();	
					const z = { id: id, marker: m11 };
					return m.concat(z);
				}
		});
	//	console.log(myMovingMarker.getId());
	}
	const addMarker = () =>{
		myMovingMarker1 = MovingMarker(points, 4000,'111' ).addTo(map)
			.on('end', () => {
				console.log('reach end');
			});
		 
		myMovingMarker1.start();
		console.log(myMovingMarker1.getId());
	}
	return (
		<>
			<div id="ctrl">
				<h1>Hello</h1>
				<button id="start" onClick={start}>Start</button>
				<button id="start" onClick={addMarker}>Add</button>
				<select name="type" id="type">
					<option value="1">marker.start</option>
					<option value="2">marker.moveTo</option>
				</select>
				<input type="checkbox" id="fixed" />
				<label htmlFor="fixed">setTimeout</label>
			</div>
			<div id="map"></div>
		</>
	);
}

export default App;
