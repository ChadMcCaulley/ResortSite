import {createClient} from "contentful";

console.log(process.env.REACT_APP_SPACE);
export default createClient({
    space: process.env.REACT_APP_SPACE,
    accessToken: process.env.REACT_APP_ACCCESS_TOKEN
})