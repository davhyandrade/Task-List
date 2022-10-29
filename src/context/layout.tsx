import { createContext } from "react"
import Menu from "../components/Menu";
import Footer from "../components/Footer";

export const Context = createContext({});

export default function Layout({ children }: any) {

    return(
        <>
            <Menu/>
            <Context.Provider
                value={{}}
            >
                <section>
                    {children}
                </section>
            </Context.Provider>    
            <Footer/>
        </>
    )
}