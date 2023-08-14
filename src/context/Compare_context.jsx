import { createContext, useContext } from "react";
import useCompare from "../hooks/useCompare";

const CompareContext =createContext()
const CompareProvider =({children})=>{
    return <CompareContext.Provider value={useCompare()}>{children}</CompareContext.Provider>
}
const useCompareContext  =()=>{
    return useContext(CompareContext)
}
export {CompareProvider, useCompareContext}