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
            style={{border:"none",borderRadius:"10px",placeHolder:"white"}}
            values={values} 
            onChange={(val)=>setValues(val)} 
            portal={document.body}
            itemRenderer={
                ({item,methods,state})=>{
                    const isSelected=state.values.some(v=>v.value===item.value);
                    return(
                        <div className={isSelected?"p-2 m-1 rounded-xl bg-(--primaryColor)/20 darkMode:text-black darkMode:bg-(--secondaryColor)":"p-2 m-1 rounded-xl bg-white darkMode:bg-(--primaryColor)/50 darkMode:text-white"}
                            onClick={()=>methods.addItem(item)}
                            style={{
                               
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