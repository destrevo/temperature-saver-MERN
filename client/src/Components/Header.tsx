import React, { useContext } from 'react'
import { DataContext } from '../Context/Context'
import { Link } from 'react-router-dom'

export default function Header(): JSX.Element {
    const { user, setUser } = useContext(DataContext)
    
    return (
        <div className='Header'>
            {!!user &&
                <>
                    <Link to='/graph'>Graph</Link>
                    <Link to='/customize'>Customize</Link>
                    <span onClick={()=>{
                        sessionStorage.removeItem('user')
                        localStorage.removeItem('data')
                        setUser(false)
                    }} 
                    >Sign Out</span> 
                </>
            }
                {!user &&
                <>
                    <Link to='/login'>Login</Link>
                    <Link to='/register'>Register</Link>
                </>
            }

        </div>
    )
}
