import { Link, Outlet } from "react-router-dom";

function App() {
    return (
        <div className={'flow'}>
            <header className={"container cluster"}>
                <Link to={ "/" }>URL Generator</Link>
                <Link to={ "/v-card" }>V-Card Generator</Link>
            </header>
            <main>
                <Outlet/>
            </main>
            <footer>Made by: <a href="https://manosm.com" target={ '_blank' } rel={ 'noopener noreferrer' }>Manos</a></footer>
        </div>
    )
}

export default App

