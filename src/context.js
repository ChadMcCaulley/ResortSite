import React, {Component} from 'react';
import items from "./data";

const RoomContext = React.createContext();

class RoomProvider extends Component {
    state = {
        rooms: [],
        sortedRooms: [],
        featuredRooms: [],
        loading: true,
        type: "all",
        capacity: 1,
        price: 0,
        minPrice: 0,
        maxPrice: 0,
        minSize: 0,
        maxSize: 0,
        breakfast: false,
        pets: false
    }
    componentDidMount() {
        let rooms = this.formatData(items);
        let featuredRooms = rooms.filter(room => room.featured);
        let maxPrice = Math.max(...rooms.map(room => room.price));
        let maxSize = Math.max(...rooms.map(room => room.size));
        this.setState({rooms, 
            featuredRooms, 
            sortedRooms: rooms, 
            loading: false,
            price: maxPrice,
            maxPrice: maxPrice,
            maxSize: maxSize
        });
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
        let sortedRooms = [...this.state.rooms];
        const room = sortedRooms.find(room => room.slug === slug);
        return room;
    }
    handleChange = event => {
        const target = event.target;
        const value = target.type === "checkbox" ? target.checked : target.value;
        const name = event.target.name;
        //if(name === "minSize" && value < 0) return;
        this.setState({
            [name]: value
        }, this.filterRooms)
    }
    filterRooms = () => {
        let{rooms, type, capacity, price, minSize, maxSize, breakfast, pets} = this.state;
        // all rooms
        let sortedRooms = [...rooms]; 
        // transform values
        capacity = parseInt(capacity);
        price = parseInt(price);
        // filter rooms 
        if(type !== "all")
            sortedRooms = sortedRooms.filter(room => room.type === type);
        sortedRooms = sortedRooms.filter(room => room.capacity >= capacity);
        sortedRooms = sortedRooms.filter(room => room.price <= price);
        sortedRooms = sortedRooms.filter(room => room.size >= minSize && room.size <= maxSize);
        if(breakfast)
            sortedRooms = sortedRooms.filter(room => room.breakfast === breakfast);
        if(pets)
            sortedRooms = sortedRooms.filter(room => room.pets);
        this.setState({sortedRooms: sortedRooms});
    }
    render() {
        return (
            <RoomContext.Provider value={{...this.state,getRoom: this.getRoom, handleChange: this.handleChange}}>
                {this.props.children}
            </RoomContext.Provider>
        )
    }
}

const RoomConsumer = RoomContext.Consumer;

// HOC => Higher order component to improve the code layout
export function withRoomConsumer(Component) {
    return function ConsumerWrapper(props) {
        return (
            <RoomConsumer>
                {value => <Component {...props} context={value}/>}
            </RoomConsumer>
        )
    }
}

export {RoomProvider, RoomConsumer, RoomContext}