import useAuth from "../hooks/useAuth";

function Logout () {
        const {signout} = useAuth();
        
        signout();
}
export default Logout;
