
import { useAuth0 } from '@auth0/auth0-react'
import { Button } from './ui/button'
import MainNavLinks from './MainNavLinks';


const MainNav = () => {
  const {loginWithRedirect,isAuthenticated} = useAuth0();
  return (
  <div>
    {!isAuthenticated?( <Button variant="ghost" onClick={async()=> await loginWithRedirect() } className=' font-bold hover:text-orange-500 hover:bg-white'>Login </Button>):
    (<MainNavLinks/>)}
  </div>
    
  )
  
}

export default MainNav
