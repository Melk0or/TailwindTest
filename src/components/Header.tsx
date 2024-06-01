import { useLocation, useNavigate } from '@tanstack/react-router'
import { LucideDoorClosed } from 'lucide-react'

const Header = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const signOut = () => {
        localStorage.removeItem('access-token')
        navigate({ to: '/' })
    }
    return (
        <div className="p-2 flex gap-2 justify-evenly text-4xl">
            <span className="font-bold">Melkor</span>
            {location.pathname !== '/' && (
                <LucideDoorClosed
                    className="cursor-pointer"
                    onClick={signOut}
                    width={40}
                    height={40}
                />
            )}
        </div>
    )
}

export default Header
