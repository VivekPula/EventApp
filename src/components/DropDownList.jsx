import { useState } from "react";
import Select from "react-dropdown-select";
import { theme } from "./theme";
const DropDownList =({options,placeHolder})=>{
    const [values,setValues]=useState([]);
    return(
        <div className="flex-1/5 m-1">
        <Select 
            options={options} 
            multi
            placeholder={placeHolder}
            style={{border:"none",borderRadius:"10px",backgroundColor:theme.primaryColor(0.1)}}
            values={values} 
            onChange={(val)=>setValues(val)} 
            portal={document.body}
            itemRenderer={
                ({item,methods,state})=>{
                    const isSelected=state.values.some(v=>v.value===item.value);
                    return(
                        <div className="p-2 m-1 rounded-xl"
                            onClick={()=>methods.addItem(item)}
                            style={{
                                backgroundColor:!isSelected?"white":theme.primaryColor(0.2),
                                cursor:"pointer"
                            }}
                        >
                            {item.label}
                        </div>
                    );
                }
            }
            
            />
            </div>
    );
}
export default DropDownList;