import React from 'react';

import * as L from 'leaflet';
import './App.css';
import { useEffect } from 'react';

import  MovingMarker   from './MovingMarker';
import { Marker, icon } from 'leaflet';


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
  lat: 55.73953573722872, lng:37.996671677062636
}, {
  lat: 55.73921322589313, lng: 38.00901580852176
}, {
  lat: 55.72709040900645, lng: 38.01215370062164
}, {
  lat: 55.72934605947811, lng: 37.983082492331135
} ];


function App() {

	useEffect(() => {    
	  const map = L.map('map', {
		
    	center: [55.7321061648069, 38.00508479327943],
   		 zoom: 13
  		 });
		L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
		
		var marker = L.marker([ 55.73953573722872, 37.996671677062636]).addTo(map);
		const myMovingMarker = MovingMarker(points, 4000).addTo(map);
		myMovingMarker.start();
	  
	 });
	
  return (
	<>
    <div id="ctrl">
   	<h1>Hello</h1>
 	  <button id="start">Start</button>
		 <select name="type" id="type">
    		<option value="1">marker.start()</option>
    		<option value="2">marker.moveTo()</option>
  		</select>
		  <input type="checkbox" id="fixed"/>
 		   <label htmlFor="fixed">setTimeout</label>
    </div>
	<div id="map"></div>
	</>
  );
}

export default App;
