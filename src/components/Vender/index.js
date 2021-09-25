
import  Header from './Header';

import { SET_TOKEN } from './data/Storage';

export default function Vender(props){
const {token}=props
console.log("Going to vedor", token)
if(token!=""){
    SET_TOKEN(token)
    return(
        <>
        <Header />
        </>
    )
}else{
    return (
        <>
        <div>
            <h3>Your session has expired</h3>
            <h3>Please login again</h3>
        </div>
        </>
    )
}
    
}