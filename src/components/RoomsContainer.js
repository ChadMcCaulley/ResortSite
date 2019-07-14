import React from 'react';
import RoomsFilter from "./RoomsFilter";
import RoomsList from "./RoomsList";
import {withRoomConsumer} from "../context";
import Loading from "./Loading";

// HOCS help if the same component is reused multiple times
function RoomContainer({context}) {
    const {loading, sortedRooms, rooms} = context;
    if (loading) {
        return <Loading/>;
    }
    return (
        <>
            <RoomsFilter rooms={rooms}/>
            <RoomsList rooms={sortedRooms}/>
        </>
    )
}

export default withRoomConsumer(RoomContainer);

// Without HOCS
// import {RoomConsumer} from "../context";
// export default function
// RoomsContainer() {
//     return (
//         <RoomConsumer>
//             {value => {
//                 const {loading, sortedRooms, rooms} = value;
//                 if (loading) {
//                     return <Loading/>
//                 }
//                 return (
//                     <div>
//                         <RoomsFilter rooms={rooms}/>
//                         <RoomsList rooms={sortedRooms}/>
//                     </div>
//                 )
//             }}
//         </RoomConsumer>
//     )
// }