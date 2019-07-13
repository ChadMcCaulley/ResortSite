import React, {Component} from 'react';
import items from "./data";

const RoomContext = React.createContext();

class RoomProvider extends Component {
    state = {
        rooms: [],
        sortedRooms: [],
        featuredRooms: [],
        loading: true
    }
    componentDidMount() {
        let rooms = this.formatData(items);
        let featuredRooms = rooms.filter(room => room.featured);
        this.setState({rooms, featuredRooms, sortedRooms: rooms, loading: false});
    }
    formatData(arr) {
        let tempItems = arr.map(item => {
            let id = item.sys.id;
            let images = item
                .fields
                .images
                .map(image => image.fields.file.url);
            let room = {
                ...item.fields,
                images: images,
                id
            }; // images is being overridden, could just write images
            return room;
        });
        return tempItems;
    }

    // Based on the slug used to get to room url, get the room info
    getRoom = (slug) => {
        let tempRooms = [...this.state.rooms];
        const room = tempRooms.find(room => room.slug === slug);
        return room;
    }

    render() {
        return (
            <RoomContext.Provider
                value={{
                ...this.state,
                getRoom: this.getRoom
            }}>
                {this.props.children}
            </RoomContext.Provider>
        )
    }
}

const RoomConsumer = RoomContext.Consumer;

export {RoomProvider, RoomConsumer, RoomContext}