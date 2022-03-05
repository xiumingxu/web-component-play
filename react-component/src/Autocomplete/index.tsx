import React, {useRef, FC, useCallback, ChangeEvent, ChangeEventHandler, useState} from 'react';

//Test data
interface TestType {
    value: string
    id: number
    other: string
}


interface ObjectWithValue {
    value: string;
}

type OptionType<T={}> = ObjectWithValue & T

interface AutocompleteProps{ //并没有对interface进行抽象
    fetchSuggestions: (inputValue: string)=>Promise<OptionType[]> | OptionType[]
    onSelect: (item: OptionType)=>void
}


const initValue : AutocompleteProps = {
    fetchSuggestions : (inputValue: string)=>{
        const returnValue: TestType[] =  Array(5).fill(0).map(( value, idx)=>({id:idx,  other: 'test', value: idx + inputValue}))
        return returnValue
    },
    onSelect: (item)=>{
        console.log(item)
    }

}
//?咋用
export const Autocomplete: FC<AutocompleteProps>= (props
)=>{
    const {fetchSuggestions, onSelect} = initValue
    const inputValue = useRef<HTMLInputElement>(null)
    const [options, setOptions] = useState<OptionType[]>([])
    const [selectedOption, setSelectedOption] = useState<OptionType>()

    const handleChange = useCallback((_: ChangeEvent)=>{
        console.log("triggered")
        const results = fetchSuggestions((inputValue.current as HTMLInputElement).value)
        if (results instanceof Promise){
            results.then(options=> { setOptions(options)})
        }else{
            setOptions(results)
        }
    },[])

    //怎么写不用
    const handleSelect = useCallback((idx)=>(event: React.MouseEvent<HTMLLIElement> )=>{
        const curOption = options[idx]
        setSelectedOption(curOption)
        setOptions([])
        onSelect(curOption)

        inputValue.current!.value = curOption.value
    },[options, inputValue])

    return <>
        <input ref={inputValue} onChange={handleChange}/>
        {options.length !==0 && options.map((option, idx)=>(<li key={idx} onClick={handleSelect(idx)}>{option.value}</li>))}
    </>
}