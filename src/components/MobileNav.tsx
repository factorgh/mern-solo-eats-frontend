
import { useAuth0 } from '@auth0/auth0-react'
import { Button } from './ui/button'
import { Separator } from './ui/separator'
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from './ui/sheet'
import { Menu } from 'lucide-react'
import MobileNavLinks from './MobileNavLinks'

const MobileNav = () => {
  const {loginWithRedirect, isAuthenticated} = useAuth0();
  return (
    <Sheet>
      <SheetTrigger>
        <Menu className='text-orange-500'/>
      </SheetTrigger>
      <SheetContent className='space-y-5' >
        <SheetTitle className='text-xl p-2 md:text-2xl'>
           {!isAuthenticated && <span>Welcome to <span className='text-orange-600'>SoloEats.com</span> #</span>}
        </SheetTitle>
      {!isAuthenticated &&  <Separator/>}
        <SheetDescription className='flex' >
        {isAuthenticated?(<MobileNavLinks/>):(
           <Button onClick={async()=> await loginWithRedirect()} className='bg-orange-500  font-bold flex-1 '>Login </Button>
        )}
        </SheetDescription>
      </SheetContent>
    </Sheet>
  )
}

export default MobileNav
