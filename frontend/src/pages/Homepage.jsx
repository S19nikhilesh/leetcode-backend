// Homepage.jsx - Simple version
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { logoutUser } from '../authSlice';

function Homepage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logoutUser())
            .unwrap()
            .then(() => {
                navigate('/login');
            })
            .catch((error) => {
                console.error('Logout failed:', error);
            });
    };

    return (
        <div>
            <h1>Homepage</h1>
            <button 
                onClick={handleLogout}
                className="btn btn-primary"
            >
                Logout
            </button>
        </div>
    );
}

export default Homepage;