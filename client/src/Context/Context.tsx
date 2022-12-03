import React, { createContext, useState } from "react";
import { Idata } from "../Interfaces/Interfaces";
interface Iprops {
    children: JSX.Element
}
type TdateShow = {
    year: number,
    month: number
}
const dataDefault: Idata[] = [{
    year: 1,
    month: 1,
    day: 1,
    key: 1
}]

export const DataContext = createContext({
    user: false,
    setUser: (user: boolean) => { },
    data: dataDefault,
    setData: (data: Idata[]) => { },
    dateToShow: { year: 0, month: 0 },
    setDateToShow: (date: TdateShow) => { }

});

export default function DataContextProvider(props: Iprops) {

    const existingLogin = !!sessionStorage.getItem("user")
    const existingData = localStorage.getItem("data")
    const [user, setUser] = useState<boolean>(() => {
        return existingLogin ?? false
    })
    const [data, setData] = useState<Idata[]>(() => {
        return !!existingData ? JSON.parse(existingData) : dataDefault
    })
    const [dateToShow, setDateToShow] = useState<TdateShow>({ year: 0, month: 0 })

    return (
        <DataContext.Provider value={{
            user,
            setUser,
            data,
            setData,
            dateToShow,
            setDateToShow
        }}>
            {props.children}
        </DataContext.Provider>
    )
}