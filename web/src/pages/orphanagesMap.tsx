import React, { useEffect, useState } from 'react'
import MapMarker from '../images/map-marker.svg'
import { Link } from 'react-router-dom'
import { FiPlus, FiArrowRight } from 'react-icons/fi'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
import Leaflet from 'leaflet'

import 'leaflet/dist/leaflet.css'

import '../styles/pages/orphanages-map.css'

import mapMarkerImg from '../images/map-marker.svg'
import api from '../services/api'

const mapIcon = Leaflet.icon({
    iconUrl: mapMarkerImg,
    iconAnchor: [20, 40],
    iconSize: [40, 40],
    popupAnchor: [170, 20]
})

interface Orphanage {
    id: number;
    latitude: number;
    longitude: number;
    name: string
}

const OrphanagesMap = () => {
    const [orphanages, setOrphanages] = useState<Orphanage[]>([])

    useEffect(() => {
        api.get('/orphanages').then(response => {
            setOrphanages(response.data)
        })
    }, [])

    return(
        <div id="page-map">
            <aside>
                <header>
                    <img src={MapMarker} alt=""/>
                    <h2>Escolha um orfanato no mapa</h2>
                    <p>Muitas crianças estão esperando a sua visita :)</p>
                </header>

                <footer>
                    <strong>São Paulo</strong>
                    <span>São Paulo</span>
                </footer>
            </aside>

            <Map center={[-23.7448976,-46.7981512]} zoom={14} style={{width: '100%', height: '100%'}}>
                <TileLayer url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_KEY}`} />

                {orphanages.map(orphanage => {
                    return(
                        <Marker 
                            icon={mapIcon}
                            position={[orphanage.latitude, orphanage.longitude]}
                            key={orphanage.id}>
                            
                            <Popup closeButton={false} minWidth={240} maxWidth={240} className="map-popup">
                                {orphanage.name}
                                <Link to={`/orphanages/${orphanage.id}`}>
                                    <FiArrowRight size={20} color="#FFF" />
                                </Link>
                            </Popup>
                        </Marker>
                    )
                })}

            </Map>

            <Link to="/create" className="create-orphanage">
                <FiPlus size={32} color="#FFF" />
            </Link>
        </div>
    )
}

export default OrphanagesMap