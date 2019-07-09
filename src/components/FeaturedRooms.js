import React, { Component } from 'react';
import { RoomContext } from "../context";
import Room from "./Room";
import Title from "./Title";
import Loading from "./Loading";

export default class FeaturedRooms extends Component {
    static contextType = RoomContext;
    render() {
        let {loading, featuredRooms} = this.context;
        featuredRooms = featuredRooms.map(room => {
            return <Room key={room.id} room={room} />;
        });
        return (
            <section className="featured-rooms">
                <Title title="Featured Rooms"/>
                <div className="featured-rooms-center">
                    {loading ? <Loading/> : featuredRooms}
                </div>
            </section>
        )
    }
}
