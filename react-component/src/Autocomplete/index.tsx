import React, {useRef, FC, useCallback, ChangeEvent, ChangeEventHandler, useState} from 'react';

//Test data
interface TestType {
    value: string
}

const returnValue: OptionType[] =  Array(5).fill(0).map(( value, idx)=>({id:idx,  value: idx + 'hehe'}))

interface ObjectWithValue {
    value: string;
}

type OptionType = ObjectWithValue & {}

interface AutocompleteProps<T extends OptionType>{
    fetchSuggestions: (inputValue: string)=>Promise<T[]> | T[]
}


const initValue : AutocompleteProps<TestType> = {
    fetchSuggestions : (inputValue: string)=>{
        console.log("currentinput", inputValue)
        return returnValue
    }

}
//?咋用
export const Autocomplete : FC<T>= (props:AutocompleteProps<T extends OptionType> = initValue)=>{
    const {fetchSuggestions} = initValue
    const inputValue = useRef<HTMLInputElement>(null)
    const [options, setoptions] = useState<OptionType>()
    const handleChange = useCallback((_: ChangeEvent)=>{
        fetchSuggestions((inputValue.current as HTMLInputElement).value)
        // inputValue.current.value = event.target.value
    },[])

    return <>
        <input ref={inputValue} onChange={handleChange}/>
        <></>
    </>
}