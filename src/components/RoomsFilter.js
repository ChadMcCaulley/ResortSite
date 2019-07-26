import React, {useContext} from 'react';
import {RoomContext} from "../context";
import Title from "../components/Title";

const shortid = require("shortid");

// get all unique values
const getUnique = (items, value) => {
    return [...new Set(items.map(item => item[value]))];
}

export default function RoomsFilter({rooms}) {
    const context = useContext(RoomContext); // Hook for getting the context
    const {
        handleChange,
        type,
        capacity,
        price,
        minPrice,
        maxPrice,
        minSize,
        maxSize,
        breakfast,
        pets
    } = context;
    let types = getUnique(rooms, "type");
    types = [
        "all", ...types
    ]; // add the all values for showing all possible types
    const renderTypeOptions = types.map(type => {
        return <option value={type} key={shortid.generate()}>{type}</option>
    });
    let renderGuestOptions = getUnique(rooms, "capacity").sort().map(guest => {
        return <option value={guest} key={shortid.generate()}>
            {guest}
        </option>
    })
    return (
        <section className="filter-container">
            <Title title="Search Rooms"/>
            <form className="filter-form">
                {/* select type */}
                <div className="form-group">
                    <label htmlFor="type">
                        Room Type
                    </label>
                    <select
                        name="type"
                        id="type"
                        value={type}
                        className="form-control"
                        onChange={handleChange}>
                        {renderTypeOptions}
                    </select>
                </div>
                {/* end select type */}
                {/* select num guests */}
                <div className="form-group">
                    <label htmlFor="capacity">
                        Guests
                    </label>
                    <select
                        name="capacity"
                        id="capacity"
                        value={capacity}
                        className="form-control"
                        onChange={handleChange}>
                        {renderGuestOptions}
                    </select>
                </div>
                {/* end select num guests */}
                {/*select max price*/}
                <div className="form-group">
                    <label htmlFor="price">
                        room price ${price}
                    </label>
                    <input
                        type="range"
                        name="price"
                        min={minPrice}
                        max={maxPrice}
                        id="price"
                        value={price}
                        onChange={handleChange}
                        className="form-control"/>
                </div>
                {/* end select max price */}
                {/* select room size*/}
                <div className="form-group">
                    <label htmlFor="size">room size</label>
                    <div className="size-inputs">
                        <input type="number" name="minSize" id="size" value={minSize} onChange={handleChange} className="size-input"/>
                        <input type="number" name="maxSize" id="size" value={maxSize} onChange={handleChange} className="size-input"/>
                    </div>
                </div>
                {/* end select room size*/}
                {/* select extras */}
                <div className="form-group">
                    <div className="single-extra">
                        <input type="checkbox" name="breakfast" id="breakfast" checked={breakfast} onChange={handleChange}/>
                        <label htmlFor="breakfast"> Breakfast </label>
                    </div>
                    <div className="single-extra">
                        <input type="checkbox" name="pets" id="pets" checked={pets} onChange={handleChange}/>
                        <label htmlFor="pets"> pets </label>
                    </div>
                </div>
                {/* end select extras*/}
            </form>
        </section>
    )
}
