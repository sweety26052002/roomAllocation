/* eslint-disable react/prop-types */
interface DropDownProps{
    defaultValue:string;
    options: {value:string | number, label:string}[]
    handleChange:()=>void
}
const DropDown:React.FC<DropDownProps>=({defaultValue, options, handleChange})=>{
    return(
        <select defaultValue={defaultValue} onChange={handleChange}>
            {
                options.map((each)=>(
                    <option value={each.value} key={each.value}>{each.label}</option>
                ))
            }
        </select>
    )
}
export default DropDown;