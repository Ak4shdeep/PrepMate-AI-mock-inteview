import { db } from "@/config/firebase.config";
import LoaderPage from "@/routes/loader-page";
import type { User } from "@/types";
import { useAuth, useUser } from "@clerk/clerk-react"
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const AuthHandler = () => {
    const { isSignedIn } = useAuth();
    const { user } = useUser();

    const pathname = useLocation().pathname;
    const navigate = useNavigate();
    const [loading, setloading] = useState(false);

    useEffect(() => {
        const storeUserData = async () => {
            if (isSignedIn && user) {
                setloading(true);
                try {
                    const userSnap = await getDoc(doc(db,'users',user.id))
                    if(!userSnap.exists())
                    {
                        const userData : User = {
                            id : user.id,
                            name: user.fullName || user.firstName || 'Anonymous',
                            email : user.primaryEmailAddress?.emailAddress || 'NA',
                            imageUrl : user.imageUrl,
                            createdAt : serverTimestamp(),
                            updateAt : serverTimestamp()
                        }
                        await setDoc(doc(db,'users', user.id), userData)
                    }
                } catch (error) {
                    console.log('Error on storing the useer data :', error);
                }
                finally
                {
                    setloading(false)
                }
            }
        }
        // invoke the helper to persist user data when available
        storeUserData();
    }, [isSignedIn, user, pathname, navigate])

    if (loading) {
        return <LoaderPage />
    }
    return null;
}

export default AuthHandler
