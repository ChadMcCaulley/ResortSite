import React from 'react';
import Room from "./Room";

const shortid = require("shortid");

export default function RoomsList({rooms}) {
    if(rooms.length === 0){
        return (
            <div className="empty-search">
                <h3> Unfortunately No Rooms Match Your Search Parameters </h3>
            </div>
        )
    }
    const renderRooms = rooms.map(room => {
        return <Room key={shortid.generate()} room={room}/>
    })
    return (
        <section className="roomslist">
            <div className="roomslist-center">
                {renderRooms}
            </div>
        </section>
    )
}
